<?php

declare(strict_types=1);

use App\Models\Article;
use App\Models\Gallery;
use App\Models\Game;
use App\Models\Season;
use App\Models\Team;
use App\Models\User;
use App\Support\ArticleHtml;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->withoutVite();
    config(['inertia.ssr.enabled' => false]);
});

it('defaults article gallery creation to unlisted without changing normal creation', function (): void {
    $this->actingAs(User::factory()->admin()->create());
    $this->get(route('galerije.create', ['context' => 'article']))
        ->assertOk()->assertInertia(fn (Assert $page) => $page->where('defaultListed', false));
    $this->get(route('galerije.create'))
        ->assertOk()->assertInertia(fn (Assert $page) => $page->where('defaultListed', true));
});

it('lists only opted-in galleries but keeps unlisted galleries available in articles and by link', function (): void {
    $listed = Gallery::create(['title' => 'Public', 'slug' => 'public']);
    $unlisted = Gallery::create(['title' => 'Article photos', 'slug' => 'article-photos', 'is_listed' => false]);
    $unlisted->images()->create(['path' => 'galleries/photo.jpg', 'sort_order' => 0]);
    $article = Article::create([
        'title' => 'With photos', 'slug' => 'with-photos', 'content' => '<p>Text</p>',
        'status' => 'published', 'published_at' => now()->subDay(), 'gallery_id' => $unlisted->id,
    ]);

    expect($listed->fresh()->is_listed)->toBeTrue();
    $this->get(route('galleries'))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->where('galleries.total', 1)->has('galleries.data', 1)->where('galleries.data.0.id', $listed->id));
    $this->get(route('article', $article))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->where('article.gallery.id', $unlisted->id)->has('article.gallery.images', 1));
    $this->get(route('gallery', ['gallery' => $unlisted->slug]))->assertOk();

    $this->actingAs(User::factory()->admin()->create());
    $this->get(route('galerije.index'))->assertInertia(fn (Assert $page) => $page->where('galleries.total', 2));
    $this->get(route('novosti.create'))->assertInertia(fn (Assert $page) => $page
        ->has('galleries', 2)->where('galleries.0.is_listed', false));
});

it('persists gallery visibility with multipart create and edit and preserves omitted settings', function (): void {
    Storage::fake('public');
    $this->actingAs(User::factory()->admin()->create());
    $this->post(route('galerije.store'), [
        'title' => 'Article photos', 'slug' => 'article-photos', 'is_listed' => '0',
        'images' => [UploadedFile::fake()->image('first.jpg')],
    ])->assertSessionHasNoErrors()->assertRedirect();
    $gallery = Gallery::where('slug', 'article-photos')->firstOrFail();
    expect($gallery->is_listed)->toBeFalse()->and($gallery->images()->count())->toBe(1);

    $this->post(route('galerije.update', $gallery), [
        '_method' => 'put', 'title' => 'Article photos', 'slug' => 'article-photos',
        'is_listed' => '1', 'images' => [UploadedFile::fake()->image('second.jpg')],
    ])->assertSessionHasNoErrors()->assertRedirect();
    expect($gallery->fresh()->is_listed)->toBeTrue()->and($gallery->images()->count())->toBe(2);

    $this->put(route('galerije.update', $gallery), [
        'title' => 'Article photos', 'slug' => 'article-photos', 'is_listed' => false,
    ])->assertSessionHasNoErrors();
    $this->put(route('galerije.update', $gallery), [
        'title' => 'Renamed', 'slug' => 'article-photos',
    ])->assertSessionHasNoErrors();
    expect($gallery->fresh()->is_listed)->toBeFalse();
    $this->put(route('galerije.update', $gallery), [
        'title' => 'Renamed', 'slug' => 'article-photos', 'is_listed' => 'invalid',
    ])->assertSessionHasErrors('is_listed');
});

it('preserves per-widget display choices through create edit and public sanitization', function (): void {
    $this->actingAs(User::factory()->admin()->create());
    $game = Game::create([
        'season_id' => Season::factory()->create()->id,
        'home_team_id' => Team::factory()->create()->id,
        'away_team_id' => Team::factory()->create()->id,
        'game_date' => now()->addWeek(), 'round_number' => 2, 'status' => 'scheduled',
    ]);
    $markers = '<div data-likar-widget="game" data-game-id="'.$game->id.'" data-game-display="preview">Najava</div>'
        .'<div data-likar-widget="game" data-game-id="'.$game->id.'" data-game-display="results">Rezultat</div>';
    $input = ['title' => 'Display modes', 'slug' => 'display-modes', 'status' => 'published', 'content' => $markers];
    $this->post(route('novosti.store'), $input)->assertSessionHasNoErrors();
    $article = Article::where('slug', 'display-modes')->firstOrFail();
    expect($article->content)->toContain('data-game-display="preview"', 'data-game-display="results"');
    $this->put(route('novosti.update', $article), $input)->assertSessionHasNoErrors();
    $game->update(['status' => 'finished', 'home_score' => 68, 'away_score' => 64]);
    $this->get(route('article', $article))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->has('embeddedGames', 1)->where('embeddedGames.0.status', 'finished')
        ->where('article.content', fn (string $html): bool => str_contains($html, 'data-game-display="preview"')
            && str_contains($html, 'data-game-display="results"')));
});

it('keeps legacy markers and strips unsupported display values', function (): void {
    $html = app(ArticleHtml::class);
    $legacy = '<div data-likar-widget="game" data-game-id="5">Game</div>';
    expect($html->sanitize($legacy))->toContain('data-game-id="5"')->not->toContain('data-game-display');
    $invalid = '<div data-likar-widget="game" data-game-id="5" data-game-display="bogus" onclick="alert(1)">Game</div>';
    expect($html->sanitize($invalid))->toContain('data-game-id="5"')->not->toContain('data-game-display', 'onclick');
});
