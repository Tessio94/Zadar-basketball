<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\TeamSeason;
use Illuminate\Support\Facades\DB;

class TeamStatisticsService
{
    private const FIELDS = [
        'minutes_played', 'points',
        'fg2_made', 'fg2_attempted', 'fg3_made', 'fg3_attempted',
        'ft_made', 'ft_attempted', 'offensive_rebounds', 'defensive_rebounds',
        'assists', 'steals', 'blocks', 'turnovers', 'fouls', 'efficiency',
    ];

    /** Season statistics include regular-season and playoff games. */
    public function forTeamSeason(TeamSeason $teamSeason): array
    {
        $teamId = (int) $teamSeason->team_id;
        $games = Game::query()
            ->where('season_id', $teamSeason->season_id)
            ->where('status', 'finished')
            ->where(fn($query) => $query->where('home_team_id', $teamId)
                ->orWhere('away_team_id', $teamId))
            ->get(['id', 'home_team_id', 'away_team_id', 'home_score', 'away_score']);

        $statsQuery = DB::table('player_game_stats')
            ->where('team_id', $teamId)
            ->whereIn('game_id', $games->modelKeys());

        $boxscoreGames = (clone $statsQuery)->distinct()->count('game_id');
        $aggregate = (clone $statsQuery)
            ->select('player_id')
            ->selectRaw('COUNT(DISTINCT game_id) AS games_played');

        // These column names are a fixed whitelist, never request input.
        foreach (self::FIELDS as $field) {
            $aggregate->selectRaw("SUM({$field}) AS {$field}");
        }

        $recorded = $aggregate->groupBy('player_id')->get()->keyBy('player_id');
        $teamSeason->loadMissing('players');
        $roster = $teamSeason->players->keyBy('id');

        // A later roster edit must not erase a player's contribution to this team.
        $formerIds = $recorded->keys()->diff($roster->keys())->values();
        $formerPlayers = $formerIds->isEmpty()
            ? collect()
            : Player::query()->whereIn('id', $formerIds)->get(['id', 'first_name', 'last_name']);

        $players = $roster->values()->concat($formerPlayers)->sortBy('id')
            ->map(function(Player $player) use ($recorded, $roster): array {
                $row = $recorded->get($player->id);
                $gamesPlayed = (int) ($row->games_played ?? 0);
                $totals = $this->totals($row);
                $jersey = $roster->get($player->id)?->pivot?->jersey_number;

                return [
                    'id' => (int) $player->id,
                    'first_name' => $player->first_name,
                    'last_name' => $player->last_name,
                    'jersey_number' => $jersey === null ? null : (int) $jersey,
                    'on_roster' => $roster->has($player->id),
                    'games_played' => $gamesPlayed,
                    'totals' => $totals,
                    'averages' => $this->averages($totals, $gamesPlayed),
                    'shooting' => $this->shooting($totals),
                ];
            })->values();

        $totals = $this->totals();
        foreach ($recorded as $row) {
            foreach ($this->totals($row) as $field => $value) {
                $totals[$field] += $value;
            }
        }

        $wins = $losses = $draws = $pointsFor = $pointsAgainst = 0;
        foreach ($games as $game) {
            $home = (int) $game->home_team_id === $teamId;
            $scored = (int) ($home ? $game->home_score : $game->away_score);
            $allowed = (int) ($home ? $game->away_score : $game->home_score);
            $pointsFor += $scored;
            $pointsAgainst += $allowed;
            $wins += (int) ($scored > $allowed);
            $losses += (int) ($scored < $allowed);
            $draws += (int) ($scored === $allowed);
        }

        return [
            'summary' => [
                'games_played' => $games->count(),
                'wins' => $wins,
                'losses' => $losses,
                'draws' => $draws,
                'points_for' => $pointsFor,
                'points_against' => $pointsAgainst,
                'score_difference' => $pointsFor - $pointsAgainst,
                // Official results remain correct even when a boxscore is missing.
                'points_per_game' => $this->average($pointsFor, $games->count()),
                'points_allowed_per_game' => $this->average($pointsAgainst, $games->count()),
                'boxscore_games' => $boxscoreGames,
                'totals' => $totals,
                // Missing boxscores are unknown, not zero-rebound/zero-assist games.
                'averages' => $this->averages($totals, $boxscoreGames),
                'shooting' => $this->shooting($totals),
            ],
            'players' => $players->all(),
        ];
    }

    private function totals(?object $row = null): array
    {
        $totals = [];
        foreach (self::FIELDS as $field) {
            $totals[$field] = (int) ($row->{$field} ?? 0);
        }

        $totals['rebounds'] = $totals['offensive_rebounds'] + $totals['defensive_rebounds'];
        $totals['fg_made'] = $totals['fg2_made'] + $totals['fg3_made'];
        $totals['fg_attempted'] = $totals['fg2_attempted'] + $totals['fg3_attempted'];

        // Efficiency is read from storage; no alternative formula is applied.
        return $totals;
    }

    private function average(int $total, int $games): ?float
    {
        return $games > 0 ? round($total / $games, 1) : null;
    }

    private function averages(array $totals, int $games): array
    {
        return array_map(fn(int $total): ?float => $this->average($total, $games), $totals);
    }

    private function shooting(array $totals): array
    {
        $shooting = [];
        foreach (['fg', 'fg2', 'fg3', 'ft'] as $shot) {
            $made = $totals[$shot . '_made'];
            $attempted = $totals[$shot . '_attempted'];
            $shooting[$shot] = [
                'made' => $made,
                'attempted' => $attempted,
                'percentage' => $attempted > 0 ? round($made / $attempted * 100, 1) : null,
            ];
        }

        return $shooting;
    }
}
