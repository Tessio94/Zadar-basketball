<?php

declare(strict_types=1);

use App\Models\Tag;
use App\Models\User;
use App\Models\Article;
use App\Services\ArticleTagService;
use Inertia\Testing\AssertableInertia as Assert;

function taggedArticle(array $attributes = []): Article
{
    return Article::create(array_merge([
        'title' => fake()->unique()->uuid(), 'slug' => fake()->unique()->uuid(),
        'content' => '<p>Izvještaj.</p>', 'status' => 'published', 'published_at' => now()->subDay(),
    ], $attributes));
}

beforeEach(function(): void {
    $this->withoutVite();
    config(['inertia.ssr.enabled' => false]);
});

it('creates reusable tags, normalizes whitespace and ignores case duplicates', function(): void {
    $this->actingAs(User::factory()->admin()->create());
    $input = ['title' => 'Finale', 'slug' => 'finale', 'content' => '<p>Finale.</p>', 'status' => 'published',
        'tags_input' => '  Doigravanje, doigravanje , KK   Zadar, , Četvrtfinale '];
    $this->post(route('novosti.store'), $input)->assertSessionHasNoErrors();
    $article = Article::where('slug', 'finale')->firstOrFail();
    expect($article->tags()->count())->toBe(3);
    $this->assertDatabaseHas('tags', ['name' => 'KK Zadar', 'normalized_name' => 'kk zadar']);
    $this->post(route('novosti.store'), [...$input, 'title' => 'Drugi', 'slug' => 'drugi', 'tags_input' => 'DOIGRAVANJE, četvrtfinale'])->assertSessionHasNoErrors();
    $this->assertDatabaseCount('tags', 3);
    $this->get(route('novosti.edit', $article))->assertInertia(fn(Assert $page) => $page->has('article.tags', 3)->has('tagOptions', 3));
    $this->get(route('novosti.create'))->assertInertia(fn(Assert $page) => $page->has('tagOptions', 3));
});

it('supports replacing, explicitly clearing and preserving omitted tags on edit', function(): void {
    $this->actingAs(User::factory()->admin()->create());
    $article = taggedArticle();
    app(ArticleTagService::class)->sync($article, '2025-2026, Doigravanje');
    $input = ['title' => $article->title, 'slug' => $article->slug, 'status' => 'published', 'content' => '<p>Izmjena.</p>'];
    $this->put(route('novosti.update', $article), $input)->assertSessionHasNoErrors();
    expect($article->tags()->count())->toBe(2);
    $this->put(route('novosti.update', $article), [...$input, 'tags_input' => 'Finale'])->assertSessionHasNoErrors();
    expect($article->tags()->pluck('name')->all())->toBe(['Finale']);
    // Empty form text is converted to null by Laravel, including multipart edits.
    $this->post(route('novosti.update', $article), [...$input, '_method' => 'put', 'tags_input' => ''])->assertSessionHasNoErrors();
    expect($article->tags()->count())->toBe(0);
});

it('validates tag length and count before writing the article', function(): void {
    $this->actingAs(User::factory()->admin()->create());
    $input = ['title' => 'Test', 'slug' => 'test', 'status' => 'draft', 'content' => '<p>Test.</p>'];
    foreach ([str_repeat('č', 61), implode(',', range(1, 11)), ['invalid']] as $tags) {
        $this->post(route('novosti.store'), [...$input, 'tags_input' => $tags])->assertSessionHasErrors('tags_input');
    }
    $this->assertDatabaseCount('articles', 0);
    $this->assertDatabaseCount('tags', 0);
    $this->post(route('novosti.store'), [...$input, 'tags_input' => implode(',', range(1, 10))])->assertSessionHasNoErrors();
});

it('returns optional tags with the public article', function(): void {
    $article = taggedArticle();
    $this->get(route('article', $article))->assertInertia(fn(Assert $page) => $page->has('article.tags', 0));
    app(ArticleTagService::class)->sync($article, 'Finale');
    $this->get(route('article', $article))->assertInertia(fn(Assert $page) => $page->where('article.tags.0.name', 'Finale')->missing('article.tags.0.normalized_name'));
});

it('filters and paginates only published matching articles', function(): void {
    $service = app(ArticleTagService::class);
    for ($i = 0; $i < 11; $i++) {
        $article = taggedArticle();
        $service->sync($article, 'Finale');
    }
    $service->sync(taggedArticle(['status' => 'draft']), 'Finale');
    $service->sync(taggedArticle(['published_at' => now()->addDay()]), 'Finale');
    $service->sync(taggedArticle(), 'Druga tema');
    $tag = Tag::where('name', 'Finale')->firstOrFail();
    $this->get(route('archive', ['tag' => $tag->id]))->assertOk()->assertInertia(fn(Assert $page) => $page
        ->where('activeTag.id', $tag->id)->where('articles.total', 11)->has('articles.data', 10)
        ->where('articles.next_page_url', fn(string $url) => str_contains($url, 'tag=' . $tag->id)));
    $this->get(route('archive', ['tag' => $tag->id, 'page' => 2]))->assertInertia(fn(Assert $page) => $page->has('articles.data', 1));
    $this->get(route('archive'))->assertInertia(fn(Assert $page) => $page->where('activeTag', null)->where('articles.total', 12));
});

it('handles unused tags and missing tag IDs without exposing drafts', function(): void {
    $article = taggedArticle(['status' => 'draft']);
    app(ArticleTagService::class)->sync($article, 'Skorašnja vijest');
    $tag = $article->tags()->firstOrFail();
    $this->get(route('archive', ['tag' => $tag->id]))->assertOk()->assertInertia(fn(Assert $page) => $page->where('articles.total', 0));
    $this->get(route('archive', ['tag' => 99999]))->assertNotFound();
});

it('detaches tags on article deletion without deleting shared tags', function(): void {
    $first = taggedArticle();
    $second = taggedArticle();
    $service = app(ArticleTagService::class);
    $service->sync($first, 'Finale');
    $service->sync($second, 'Finale');
    $first->delete();
    $this->assertDatabaseCount('tags', 1);
    $this->assertDatabaseCount('article_tag', 1);
    expect($second->tags()->count())->toBe(1);
});
