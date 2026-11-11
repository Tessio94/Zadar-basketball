<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Player;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class SeasonLeaderboardService
{
    // Slugs and SQL expressions are a fixed whitelist, never user-provided SQL.
    private const CATEGORIES = [
        'minute-po-utakmici' => ['mpg', 'Minute po utakmici', 'minutes_played'],
        'poeni-po-utakmici' => ['ppg', 'Poeni po utakmici', 'points'],
        'obrambeni-skokovi-po-utakmici' => ['drpg', 'Obrambeni skokovi po utakmici', 'defensive_rebounds'],
        'napadacki-skokovi-po-utakmici' => ['orpg', 'Napadački skokovi po utakmici', 'offensive_rebounds'],
        'skokovi-po-utakmici' => ['rpg', 'Skokovi po utakmici', 'offensive_rebounds + defensive_rebounds'],
        'asistencije-po-utakmici' => ['apg', 'Asistencije po utakmici', 'assists'],
        'blokade-po-utakmici' => ['bpg', 'Blokade po utakmici', 'blocks'],
        'ukradene-po-utakmici' => ['spg', 'Ukradene po utakmici', 'steals'],
        'izgubljene-po-utakmici' => ['tpg', 'Izgubljene po utakmici', 'turnovers'],
        'zabijene-trice-po-utakmici' => ['tppg', 'Zabijene trice po utakmici', 'fg3_made'],
        'prosjecna-efikasnost' => ['epg', 'Prosječna efikasnost', 'efficiency'],
        'postotak-suta-za-dva' => ['fg2prc', 'Postotak šuta za dva', 'fg2_made', 'fg2_attempted'],
        'postotak-suta-za-tri' => ['fg3prc', 'Postotak šuta za tri', 'fg3_made', 'fg3_attempted'],
        'postotak-suta-za-jedan' => ['ftprc', 'Postotak šuta za jedan', 'ft_made', 'ft_attempted'],
    ];

    public static function links(int $seasonId): array
    {
        $links = [];
        foreach (self::CATEGORIES as $slug => $definition) {
            $links[$definition[0]] = route('stats.category', ['category' => $slug, 'season' => $seasonId], false);
        }

        return $links;
    }

    public function category(string $slug, int $seasonId): array
    {
        abort_unless(isset(self::CATEGORIES[$slug]), 404);
        [$key, $title] = self::CATEGORIES[$slug];

        return [
            'key' => $key,
            'slug' => $slug,
            'title' => $title,
            'type' => count(self::CATEGORIES[$slug]) === 4 ? 'pcg' : 'avg',
            'url' => self::links($seasonId)[$key],
        ];
    }

    public function paginate(string $slug, int $seasonId): LengthAwarePaginator
    {
        abort_unless(isset(self::CATEGORIES[$slug]), 404);
        $definition = self::CATEGORIES[$slug];
        $field = $definition[2];
        $attempted = $definition[3] ?? null;
        $total = "SUM({$field})";
        $denominator = $attempted === null ? 'COUNT(*)' : "NULLIF(SUM({$attempted}), 0)";
        $multiplier = $attempted === null ? '1.0' : '100.0';
        // Numeric arithmetic supports both PostgreSQL and the SQLite test DB.
        $value = "ROUND(CAST({$total} AS DECIMAL) * {$multiplier} / {$denominator}, 1)";
        $query = DB::table('player_game_stats as stats')
            ->whereExists(fn($games) => $games->selectRaw('1')->from('games')
                ->whereColumn('games.id', 'stats.game_id')
                ->where('games.season_id', $seasonId)->where('games.status', 'finished'))
            ->select('player_id')
            ->selectRaw('COUNT(*) AS games')
            ->selectRaw("{$total} AS total")
            ->selectRaw("{$value} AS value")
            ->groupBy('player_id');

        if ($attempted !== null) {
            $query->selectRaw("SUM({$attempted}) AS attempted");
        }

        // Order in SQL before LIMIT/OFFSET. Null percentages always come last.
        // Total and player ID give tied values a stable order across pages.
        $page = $query->orderByRaw("CASE WHEN {$value} IS NULL THEN 1 ELSE 0 END")
            ->orderByDesc('value')->orderByDesc('total')->orderBy('player_id')
            ->paginate(30)->withQueryString()->onEachSide(1);

        // Eager-load only this page's players and selected-season teams.
        $players = Player::query()->whereIn('id', $page->getCollection()->pluck('player_id'))
            ->select('id', 'first_name', 'last_name')
            ->with(['teamSeasons' => fn($teams) => $teams->where('season_id', $seasonId)->orderBy('team_seasons.id'),
                'teamSeasons.team:id,name,logo,logo_color'])
            ->get()->keyBy('id');

        return $page->through(function(object $row) use ($players, $attempted): array {
            $player = $players->get($row->player_id);

            return [
                'player' => [
                    'id' => (int) $row->player_id,
                    'first_name' => $player?->first_name ?? '',
                    'last_name' => $player?->last_name ?? '',
                    'teams' => $player?->teamSeasons->pluck('team')->filter()->unique('id')->values()
                        ->map(fn($team): array => $team->only('id', 'name', 'logo', 'logo_color'))->all() ?? [],
                ],
                'games' => (int) $row->games,
                'total' => (int) $row->total,
                'value' => $row->value === null ? null : (float) $row->value,
                'attempted' => $attempted === null ? null : (int) $row->attempted,
            ];
        });
    }
}
