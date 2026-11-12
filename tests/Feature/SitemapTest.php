<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\Player;
use App\Models\Season;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\TeamSeason;
use Illuminate\Support\Facades\DB;
use Illuminate\Testing\TestResponse;
use App\Services\SeasonLeaderboardService;

beforeEach(function(): void {
    $this->withoutVite();
    config(['app.url' => 'https://likarzadar.com']);
});

/** @return list<string> */
function sitemapLocations(TestResponse $response, string $root = 'urlset'): array
{
    $response->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
    $xml = new DOMDocument();
    expect($xml->loadXML($response->getContent(), LIBXML_NONET))->toBeTrue()
        ->and($xml->documentElement->localName)->toBe($root)
        ->and($xml->documentElement->namespaceURI)->toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
    $xpath = new DOMXPath($xml);
    $xpath->registerNamespace('sm', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    $locations = [];

    foreach ($xpath->query('//sm:loc') as $node) {
        $locations[] = $node->textContent;
    }

    return $locations;
}

function sitemapSeason(string $name = '2026-2027', bool $active = true): Season
{
    return Season::create([
        'name' => $name,
        'start_date' => '2026-09-01',
        'end_date' => '2027-07-01',
        'is_active' => $active,
    ]);
}

function sitemapArticle(string $slug, array $attributes = []): Article
{
    return Article::create([
        'title' => $slug,
        'slug' => $slug,
        'content' => '<p>Vijesti iz lige.</p>',
        'status' => 'published',
        'published_at' => now()->subDay(),
        ...$attributes,
    ]);
}

it('serves public XML and safe static pages even with an empty database', function(): void {
    expect(sitemapLocations($this->get('/sitemap.xml'), 'sitemapindex'))
        ->toBe(['https://likarzadar.com/sitemap-pages-1.xml']);
    expect(sitemapLocations($this->get('/sitemap-pages-1.xml')))->toBe([
        'https://likarzadar.com/',
        'https://likarzadar.com/novosti',
        'https://likarzadar.com/o-nama',
        'https://likarzadar.com/arhiva',
        'https://likarzadar.com/galerija',
    ]);
    $this->get('/sitemap-players-1.xml')->assertNotFound();
});

it('only lists published articles whose publication time has arrived and updates automatically', function(): void {
    $visible = sitemapArticle('published');
    $future = sitemapArticle('future', ['published_at' => now()->addDay()]);
    sitemapArticle('draft', ['status' => 'draft']);
    sitemapArticle('undated', ['published_at' => null]);

    expect(sitemapLocations($this->get('/sitemap-articles-1.xml')))
        ->toBe(['https://likarzadar.com/novosti/' . $visible->id]);

    $this->travel(2)->days();
    expect(sitemapLocations($this->get('/sitemap-articles-1.xml')))->toBe([
        'https://likarzadar.com/novosti/' . $visible->id,
        'https://likarzadar.com/novosti/' . $future->id,
    ]);

    $visible->update(['status' => 'draft']);
    $future->delete();
    expect(sitemapLocations($this->get('/sitemap.xml'), 'sitemapindex'))
        ->not->toContain('https://likarzadar.com/sitemap-articles-1.xml');
    $this->get('/sitemap-articles-1.xml')->assertNotFound();
});

it('includes listed gallery slugs and excludes article-only galleries', function(): void {
    $gallery = Gallery::create(['title' => 'Finale', 'slug' => 'finale', 'is_listed' => true]);
    Gallery::create(['title' => 'Article only', 'slug' => 'article-only', 'is_listed' => false]);

    expect(sitemapLocations($this->get('/sitemap-galleries-1.xml')))
        ->toBe(['https://likarzadar.com/galerija/finale']);

    $gallery->update(['is_listed' => false]);
    $this->get('/sitemap-galleries-1.xml')->assertNotFound();
});

it('uses valid team season URLs and lists each associated player only once', function(): void {
    $current = sitemapSeason();
    $old = sitemapSeason('2025-2026', false);
    $team = Team::create(['name' => 'Public team']);
    Team::create(['name' => 'Team without a season']);
    $player = Player::create(['first_name' => 'Šime', 'last_name' => 'Test']);
    Player::create(['first_name' => 'Unassigned', 'last_name' => 'Player']);

    foreach ([$current, $old] as $season) {
        $roster = TeamSeason::create(['team_id' => $team->id, 'season_id' => $season->id]);
        $roster->players()->attach($player, ['jersey_number' => 0]);
    }

    $teamUrls = sitemapLocations($this->get('/sitemap-teams-1.xml'));
    expect($teamUrls)->toBe([
        "https://likarzadar.com/ekipe/{$team->id}?season={$current->id}",
        "https://likarzadar.com/ekipe/{$team->id}?season={$old->id}",
    ]);
    expect(sitemapLocations($this->get('/sitemap-players-1.xml')))
        ->toBe(['https://likarzadar.com/igrac/' . $player->id]);

    // These must be final public destinations, not redirects or missing pages.
    foreach ($teamUrls as $url) {
        $this->get($url)->assertOk();
    }
    $this->get('/igrac/' . $player->id)->assertOk();
    expect(sitemapLocations($this->get('/sitemap-pages-1.xml')))->toContain('https://likarzadar.com/ekipe');
});

it('includes both historical and current season pages and all fourteen leaderboard categories', function(): void {
    $seasons = [sitemapSeason(), sitemapSeason('2025-2026', false)];
    $urls = sitemapLocations($this->get('/sitemap-seasons-1.xml'));
    expect($urls)->toHaveCount(34)->and(array_unique($urls))->toHaveCount(34);

    foreach ($seasons as $season) {
        foreach (['tablica', 'utakmice', 'statistika'] as $path) {
            expect($urls)->toContain("https://likarzadar.com/{$path}?season={$season->id}");
        }
        foreach (SeasonLeaderboardService::links($season->id) as $path) {
            expect($urls)->toContain('https://likarzadar.com' . $path);
        }
    }

    expect(implode(' ', $urls))->not->toContain('page=', 'tag=', '/admin-panel', '/login');
});

it('matches the public games listing status filter', function(): void {
    $season = sitemapSeason();
    $home = Team::create(['name' => 'Home']);
    $away = Team::create(['name' => 'Away']);
    $expected = [];

    foreach (['scheduled', 'finished', 'cancelled', 'postponed', 'in_progress'] as $status) {
        $game = Game::create([
            'season_id' => $season->id,
            'home_team_id' => $home->id,
            'away_team_id' => $away->id,
            'game_date' => now(),
            'round_number' => 1,
            'status' => $status,
        ]);
        if (in_array($status, ['scheduled', 'finished'], true)) {
            $expected[] = 'https://likarzadar.com/utakmice/' . $game->id;
        }
    }

    expect(sitemapLocations($this->get('/sitemap-games-1.xml')))->toBe($expected);
});

it('splits large datasets without omissions or duplicate URLs', function(): void {
    $articles = [];
    for ($i = 1; $i <= 1001; $i++) {
        $articles[] = [
            'title' => "News {$i}", 'slug' => "news-{$i}", 'content' => '<p>News</p>',
            'status' => 'published', 'published_at' => now()->subDay(),
        ];
    }
    foreach (array_chunk($articles, 100) as $chunk) {
        DB::table('articles')->insert($chunk);
    }

    $index = sitemapLocations($this->get('/sitemap.xml'), 'sitemapindex');
    expect($index)->toContain('https://likarzadar.com/sitemap-articles-1.xml', 'https://likarzadar.com/sitemap-articles-2.xml')
        ->not->toContain('https://likarzadar.com/sitemap-articles-3.xml');
    $first = sitemapLocations($this->get('/sitemap-articles-1.xml'));
    $second = sitemapLocations($this->get('/sitemap-articles-2.xml'));
    expect($first)->toHaveCount(1000)->and($second)->toHaveCount(1)
        ->and(array_unique([...$first, ...$second]))->toHaveCount(1001)
        ->and([...$first, ...$second])->toBe(Article::query()->orderBy('id')->pluck('id')
        ->map(fn($id): string => 'https://likarzadar.com/novosti/' . $id)->all());
    $this->get('/sitemap-articles-3.xml')->assertNotFound();
});

it('bounds expanded season sitemaps too', function(): void {
    for ($i = 1; $i <= 51; $i++) {
        sitemapSeason("Season {$i}", false);
    }

    expect(sitemapLocations($this->get('/sitemap.xml'), 'sitemapindex'))
        ->toContain('https://likarzadar.com/sitemap-seasons-2.xml');
    expect(sitemapLocations($this->get('/sitemap-seasons-1.xml')))->toHaveCount(850);
    expect(sitemapLocations($this->get('/sitemap-seasons-2.xml')))->toHaveCount(17);
    expect(sitemapLocations($this->get('/sitemap-pages-1.xml')))->not->toContain('https://likarzadar.com/ekipe');
    $this->get('/sitemap-seasons-3.xml')->assertNotFound();
});

it('anchors URLs to APP_URL even behind an untrusted request host', function(): void {
    config(['app.url' => 'https://canonical.example/']);
    $this->withServerVariables(['HTTP_HOST' => 'wrong.example'])
        ->withHeaders(['X-Forwarded-Host' => 'injected.example']);
    expect(sitemapLocations($this->get('/sitemap.xml'), 'sitemapindex'))
        ->toBe(['https://canonical.example/sitemap-pages-1.xml']);
    expect(sitemapLocations($this->get('/sitemap-pages-1.xml'))[0])->toBe('https://canonical.example/');
});

it('escapes XML metacharacters and does not fabricate modification dates', function(): void {
    Gallery::create(['title' => 'Special', 'slug' => 'a&b', 'is_listed' => true]);
    $response = $this->get('/sitemap-galleries-1.xml');
    $response->assertSee('a&amp;b', false)->assertDontSee('<lastmod>', false);
    expect(sitemapLocations($response))->toBe(['https://likarzadar.com/galerija/a&b']);
});

it('rejects unknown sections and invalid page identifiers', function(string $path): void {
    $this->get($path)->assertNotFound();
})->with([
    '/sitemap-admin-1.xml',
    '/sitemap-pages-2.xml',
    '/sitemap-pages-0.xml',
    '/sitemap-pages-01.xml',
    '/sitemap-pages--1.xml',
    '/sitemap-pages-abc.xml',
    '/sitemap-articles-99999999999999999999.xml',
]);
