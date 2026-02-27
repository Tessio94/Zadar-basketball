<?php

namespace App\Services;

use App\Models\Team;
use App\Models\Game;


class StandingsService
{
    public function getStandings($seasonId = null)
    {
        $teams = Team::all();

        return $teams->map(function ($team) use ($seasonId) {

            $games = Game::where('status', 'finished')
                ->when($seasonId, fn($q) => $q->where('season_id', $seasonId))
                ->where(function ($query) use ($team) {
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
                $oppScore  = $isHome ? $game->away_score : $game->home_score;

                $scored += $teamScore;
                $allowed += $oppScore;

                if ($teamScore > $oppScore) {
                    $wins++;
                } else {
                    $losses++;
                }
            }

            $lastFive = $games->take(5)->map(function ($game) use ($team) {

                $isHome = $game->home_team_id === $team->id;
                $teamScore = $isHome ? $game->home_score : $game->away_score;
                $oppScore  = $isHome ? $game->away_score : $game->home_score;

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
