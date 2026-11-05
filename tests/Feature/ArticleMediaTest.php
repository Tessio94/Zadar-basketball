<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\User;
use App\Models\Player;
use App\Models\Season;
use App\Models\Article;
use App\Models\Gallery;
use App\Support\ArticleHtml;
use App\Models\PlayerGameStat;
use Inertia\Testing\AssertableInertia as Assert;

function mediaGame(array $attributes = []): Game
{
    return Game::create(array_merge([
        'season_id' => Season::factory()->create()->id,
        'home_team_id' => Team::factory()->create()->id,
        'away_team_id' => Team::factory()->create()->id,
        'game_date' => '2026-10-01 19:00:00',
        'round_number' => 3,
        'home_score' => 78,
        'away_score' => 67,
        'status' => 'finished',
    ], $attributes));
}

function mediaPeriods(): array
{
    return [
        ['period_number' => 1, 'home_score' => 20, 'away_score' => 16],
        ['period_number' => 2, 'home_score' => 25, 'away_score' => 20],
        ['period_number' => 3, 'home_score' => 15, 'away_score' => 17],
        ['period_number' => 4, 'home_score' => 18, 'away_score' => 14],
    ];
}

function mediaArticle(array $attributes = []): Article
{
    return Article::create(array_merge([
        'title' => 'Izvještaj ' . fake()->unique()->uuid(),
        'slug' => fake()->unique()->slug(),
        'content' => '<p>Izvještaj.</p>',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ], $attributes));
}

beforeEach(function(): void {
    $this->withoutVite();
    config(['inertia.ssr.enabled' => false]);
});

it('persists a gallery selection and game marker through article create and edit', function(): void {
    $this->actingAs(User::factory()->create());
    $gallery = Gallery::create(['title' => 'Fotografije', 'slug' => 'fotografije']);
    $this->get(route('novosti.create'))->assertOk()->assertInertia(fn(Assert $page) => $page
        ->component('admin/novosti/createArticle')->where('galleries.0.id', $gallery->id)->where('galleries.0.images_count', 0));
    $game = mediaGame();
    $input = ['title' => 'Finale', 'slug' => 'finale', 'status' => 'published', 'gallery_id' => $gallery->id,
        'content' => '<p>Tekst.</p><div class="mceNonEditable" contenteditable="false" data-likar-widget="game" data-game-id="' . $game->id . '">Utakmica</div>'];
    $this->post(route('novosti.store'), $input)->assertSessionHasNoErrors()->assertRedirect();
    $article = Article::where('slug', 'finale')->firstOrFail();
    expect($article->gallery_id)->toBe($gallery->id)
        ->and($article->content)->toContain('data-game-id="' . $game->id . '"')
        ->and($article->content)->toContain('contenteditable="false"');
    $this->get(route('novosti.edit', $article))->assertOk()->assertInertia(fn(Assert $page) => $page
        ->component('admin/novosti/editArticle')->where('article.gallery_id', $gallery->id)->where('galleries.0.id', $gallery->id));
    $article->update(['main_image' => 'articles/existing.jpg']);
    $input['gallery_id'] = '';
    $input['main_image'] = null;
    $this->put(route('novosti.update', $article), $input)->assertSessionHasNoErrors();
    expect($article->fresh()->gallery_id)->toBeNull()
        ->and($article->fresh()->main_image)->toBe('articles/existing.jpg');
});

it('does not delete an article when its linked gallery is deleted', function(): void {
    $gallery = Gallery::create(['title' => 'Fotografije', 'slug' => 'delete-test']);
    $article = mediaArticle(['gallery_id' => $gallery->id]);
    $gallery->delete();
    expect($article->fresh()->gallery_id)->toBeNull();
});

it('rejects missing galleries and forged or deleted game references', function(): void {
    $this->actingAs(User::factory()->create());
    $this->post(route('novosti.store'), ['title' => 'Test', 'slug' => 'invalid', 'status' => 'draft', 'gallery_id' => 99999,
        'content' => '<div data-likar-widget="game" data-game-id="99999">Game</div>'])
        ->assertSessionHasErrors(['gallery_id', 'content']);
    $this->post(route('novosti.store'), ['title' => 'Test', 'slug' => 'invalid', 'status' => 'draft',
        'content' => '<div data-likar-widget="game" data-game-id="nope">Game</div>'])
        ->assertSessionHasErrors('content');
});

it('sanitizes scripts and dangerous URLs while retaining formatting and widget markers', function(): void {
    $safe = app(ArticleHtml::class)->sanitize('<p style="text-align: center;"><strong>Članak</strong></p><script>alert(1)</script><img src="/storage/photo.jpg" onerror="alert(2)"><a href="javascript:alert(3)">link</a><div data-likar-widget="game" data-game-id="5">Utakmica</div>');
    expect($safe)->not->toContain('<script', 'onerror', 'javascript:')
        ->and($safe)->toContain('Članak', 'text-align:center', 'data-game-id="5"');
});

it('renders current game scores, points and sorted gallery images with the public article', function(): void {
    $gallery = Gallery::create(['title' => 'Fotografije', 'slug' => 'gallery-test']);
    $gallery->images()->create(['path' => 'galleries/b.jpg', 'sort_order' => 2]);
    $gallery->images()->create(['path' => 'galleries/a.jpg', 'sort_order' => 1]);
    $game = mediaGame();
    $game->periodScores()->createMany(mediaPeriods());
    $player = Player::create(['first_name' => 'Test', 'last_name' => 'Strijelac']);
    $stat = PlayerGameStat::create(['game_id' => $game->id, 'player_id' => $player->id, 'team_id' => $game->home_team_id, 'points' => 20]);
    $article = mediaArticle(['gallery_id' => $gallery->id, 'content' => '<div data-likar-widget="game" data-game-id="' . $game->id . '">Utakmica</div>']);
    $this->get(route('article', $article))->assertOk()->assertInertia(fn(Assert $page) => $page->component('article')
        ->has('embeddedGames', 1)->where('embeddedGames.0.scorers.0.points', 20)->has('embeddedGames.0.period_scores', 4)
        ->where('article.gallery.images.0.path', 'galleries/a.jpg'));
    $stat->update(['points' => 25]);
    $this->get(route('article', $article))->assertInertia(fn(Assert $page) => $page->where('embeddedGames.0.scorers.0.points', 25));
    $game->delete();
    $this->get(route('article', $article))->assertOk()->assertInertia(fn(Assert $page) => $page->has('embeddedGames', 0));
    $this->assertDatabaseCount('game_period_scores', 0);
});

it('does not publish drafts or future articles', function(): void {
    $this->get(route('article', mediaArticle(['status' => 'draft'])))->assertNotFound();
    $this->get(route('article', mediaArticle(['published_at' => now()->addDay()])))->assertNotFound();
});

it('searches games through the authenticated endpoint and exposes public quarters', function(): void {
    $game = mediaGame();
    $this->get(route('admin.article-games.index'))->assertRedirect(route('login'));
    $this->actingAs(User::factory()->create());
    $this->getJson(route('admin.article-games.index', ['search' => $game->id]))->assertOk()->assertJsonPath('data.0.id', $game->id);
    $game->periodScores()->createMany(mediaPeriods());
    expect($game->periodScores()->count())->toBe(4);
    $this->get(route('game', $game))->assertInertia(fn(Assert $page) => $page->has('game.period_scores', 4));
});
