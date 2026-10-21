<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\PlayerGameStat;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GameBoxscoreService
{
    private const SUM_FIELDS = [
        'minutes_played', 'points',
        'fg2_made', 'fg2_attempted', 'fg3_made', 'fg3_attempted',
        'ft_made', 'ft_attempted',
        'offensive_rebounds', 'defensive_rebounds',
        'assists', 'steals', 'blocks', 'turnovers', 'fouls',
        'efficiency', 'plus_minus',
    ];

    public function prepare(Game $game): array
    {
        $game->load(['homeTeam', 'awayTeam', 'playerStats.player', 'playerStats.team']);
        $stats = $game->playerStats;

        // One roster lookup, scoped to the game season AND each player's team.
        $jerseys = $stats->isEmpty()
            ? collect()
            : DB::table('team_season_players as roster')
                ->join('team_seasons as ts', 'ts.id', '=', 'roster.team_season_id')
                ->where('ts.season_id', $game->season_id)
                ->whereIn('ts.team_id', [$game->home_team_id, $game->away_team_id])
                ->whereIn('roster.player_id', $stats->pluck('player_id')->unique()->all())
                ->select('ts.team_id', 'roster.player_id', 'roster.jersey_number')
                ->get()
                ->keyBy(fn (object $row): string => $row->team_id . ':' . $row->player_id);

        foreach ($stats as $stat) {
            $jersey = $jerseys->get($stat->team_id . ':' . $stat->player_id)?->jersey_number;
            // Response-only attribute: no database update or model migration.
            // Preserve jersey 0 and distinguish it from a missing roster entry.
            $stat->setAttribute('jersey_number', $jersey === null ? null : (int) $jersey);
        }

        $leaders = [];
        foreach ([
            'points' => 'points',
            'rebounds' => 'rebounds',
            'assists' => 'assists',
            'blocks' => 'blocks',
            'steals' => 'steals',
            'shootingPercentage' => 'fg_percentage',
            'madeThrees' => 'fg3_made',
            'threesPercentage' => 'fg3_percentage',
            'efficiency' => 'efficiency',
        ] as $name => $field) {
            $leaders[$name] = $stats
                ->sortByDesc(fn (PlayerGameStat $stat): int|float => $field === 'rebounds'
                    ? (int) $stat->offensive_rebounds + (int) $stat->defensive_rebounds
                    : (float) $stat->getAttribute($field))
                ->take(5)
                ->values();
        }

        return [
            'leaders' => $leaders,
            'teamTotals' => [
                'home' => $this->totals(
                    $stats->where('team_id', $game->home_team_id),
                    (int) $game->home_team_id,
                    (int) $game->home_score - (int) $game->away_score,
                ),
                'away' => $this->totals(
                    $stats->where('team_id', $game->away_team_id),
                    (int) $game->away_team_id,
                    (int) $game->away_score - (int) $game->home_score,
                ),
            ],
        ];
    }

    private function totals(Collection $stats, int $teamId, int $scoreDifference): array
    {
        $totals = [
            'team_id' => $teamId,
            'player_count' => $stats->count(),
            'has_stats' => $stats->isNotEmpty(),
        ];

        foreach (self::SUM_FIELDS as $field) {
            $totals[$field] = (int) $stats->sum($field);
        }

        $totals['rebounds'] = $totals['offensive_rebounds'] + $totals['defensive_rebounds'];
        $totals['fg_made'] = $totals['fg2_made'] + $totals['fg3_made'];
        $totals['fg_attempted'] = $totals['fg2_attempted'] + $totals['fg3_attempted'];

        foreach (['fg', 'fg2', 'fg3', 'ft'] as $shot) {
            $attempted = $totals[$shot . '_attempted'];
            $totals[$shot . '_percentage'] = $attempted === 0
                ? 0
                : round($totals[$shot . '_made'] / $attempted * 100, 0);
        }

        // Keep the requested sum of player +/- above, but expose the actual
        // team score differential separately; those are different statistics.
        $totals['score_difference'] = $scoreDifference;

        return $totals;
    }
}
