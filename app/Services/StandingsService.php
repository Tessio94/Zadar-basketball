<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\Season;
use App\Models\Team;

class StandingsService
{
    public function getStandings($seasonId = null)
    {
        $season = $seasonId
            ? Season::findOrFail($seasonId)
            : Season::where('is_active', true)->firstOrFail();

        $teams = $season->teams()->get();

        return $teams->map(function($team) use ($season) {

            $games = Game::query()
                ->where('status', 'finished')
                ->where('season_id', $season->id)
                ->where(function($query) use ($team): void {
                    $query->where('home_team_id', $team->id)
                        ->orWhere('away_team_id', $team->id);
                })
                ->orderByDesc('game_date')
                ->get();

            $played = $games->count();

            $wins = 0;
            $losses = 0;
            $scored = 0;
            $allowed = 0;

            foreach ($games as $game) {

                $isHome = $game->home_team_id === $team->id;

                $teamScore = $isHome ? $game->home_score : $game->away_score;
                $oppScore = $isHome ? $game->away_score : $game->home_score;

                $scored += $teamScore;
                $allowed += $oppScore;

                if ($teamScore > $oppScore) {
                    $wins++;
                } else {
                    $losses++;
                }
            }

            $lastFive = $games
                    ->take(5)
                    ->map(function($game) use ($team) {

                    $isHome = $game->home_team_id === $team->id;
                    $teamScore = $isHome ? $game->home_score : $game->away_score;
                    $oppScore = $isHome ? $game->away_score : $game->home_score;

                    return $teamScore > $oppScore ? 'W' : 'L';
            });

            return [
                'id' => $team->id,
                'name' => $team->name,
                'logo' => $team->logo,
                'played' => $played,
                'wins' => $wins,
                'losses' => $losses,
                'scored' => $scored,
                'allowed' => $allowed,
                'difference' => $scored - $allowed,
                'form' => $lastFive->values(),
            ];
        })
            ->sortBy([
                ['wins', 'desc'],
                ['difference', 'desc'],
            ])
            ->values();
    }
}
