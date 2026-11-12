<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\Season;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\TeamSeason;
use Illuminate\Database\Eloquent\Builder;

class SitemapService
{
    // Each season expands into several URLs. Keep every child sitemap small.
    private const PAGE_SIZES = [
        'articles' => 1000,
        'galleries' => 1000,
        'teams' => 1000,
        'players' => 1000,
        'games' => 1000,
        'seasons' => 50,
    ];

    /** @return list<string> */
    public function index(): array
    {
        $sitemaps = [$this->sitemapUrl('pages', 1)];

        foreach (self::PAGE_SIZES as $section => $size) {
            $pages = (int) ceil($this->query($section)->count() / $size);

            for ($page = 1; $page <= $pages; $page++) {
                $sitemaps[] = $this->sitemapUrl($section, $page);
            }
        }

        return $sitemaps;
    }

    /** @return list<string> */
    public function urls(string $section, int $page): array
    {
        abort_if($page < 1, 404);

        if ($section === 'pages') {
            abort_unless($page === 1, 404);

            return array_map($this->absolute(...), $this->pagePaths());
        }

        abort_unless(isset(self::PAGE_SIZES[$section]), 404);

        $records = $this->query($section)
            ->orderBy('id')
            ->forPage($page, self::PAGE_SIZES[$section])
            ->get();

        abort_if($records->isEmpty(), 404);

        $paths = [];

        foreach ($records as $record) {
            $recordPaths = match ($section) {
                'articles' => [route('article', ['article' => $record->id], false)],
                'galleries' => [route('gallery', ['gallery' => $record->slug], false)],
                'teams' => [route('teams.show', [
                    'team' => $record->team_id,
                    'season' => $record->season_id,
                ], false)],
                'players' => [route('player.show', ['player' => $record->id], false)],
                'games' => [route('game', ['game' => $record->id], false)],
                'seasons' => $this->seasonPaths((int) $record->id),
            };

            array_push($paths, ...$recordPaths);
        }

        return array_map($this->absolute(...), $paths);
    }

    private function query(string $section): Builder
    {
        return match ($section) {
            'articles' => Article::query()->select('id')
                ->where('status', 'published')
                ->where('published_at', '<=', now()),
            'galleries' => Gallery::query()->select('id', 'slug')->where('is_listed', true),
            'teams' => TeamSeason::query()->select('id', 'team_id', 'season_id')
                ->whereHas('team')->whereHas('season'),
            // The public player page returns 404 without a season association.
            'players' => Player::query()->select('id')->whereHas('teamSeasons.season'),
            'games' => Game::query()->select('id')->whereIn('status', ['scheduled', 'finished']),
            'seasons' => Season::query()->select('id'),
            default => abort(404),
        };
    }

    /** @return list<string> */
    private function pagePaths(): array
    {
        $names = ['home', 'news', 'about', 'archive', 'galleries'];

        // /ekipe requires an active season and canonicalizes to this base URL.
        if (Season::query()->where('is_active', true)->exists()) {
            $names[] = 'teams.index';
        }

        return array_map(fn(string $name): string => route($name, [], false), $names);
    }

    /** @return list<string> */
    private function seasonPaths(int $seasonId): array
    {
        return [
            route('table', ['season' => $seasonId], false),
            route('games', ['season' => $seasonId], false),
            route('stats.index', ['season' => $seasonId], false),
            // Reuse the category whitelist, including future additions.
            ...array_values(SeasonLeaderboardService::links($seasonId)),
        ];
    }

    private function sitemapUrl(string $section, int $page): string
    {
        return $this->absolute(route('sitemap.show', ['section' => $section, 'page' => $page], false));
    }

    private function absolute(string $path): string
    {
        // Use the configured canonical origin, never an incoming Host header.
        return rtrim((string) config('app.url'), '/') . '/' . ltrim($path, '/');
    }
}
