<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\Team;
use App\Models\PlayerGameStat;

class ArticleGameSummary
{
    public function make(Game $game): array
    {
        $game->loadMissing(['homeTeam', 'awayTeam', 'season', 'periodScores', 'playerStats.player']);

        return [
            'id' => $game->id,
            'url' => route('game', $game),
            'season_name' => $game->season->name,
            'round_number' => (int) $game->round_number,
            'game_date' => $game->game_date,
            'status' => $game->status,
            'home_score' => (int) $game->home_score,
            'away_score' => (int) $game->away_score,
            'home_team' => $this->team($game->homeTeam),
            'away_team' => $this->team($game->awayTeam),
            'period_scores' => $game->periodScores->map->only(['period_number', 'home_score', 'away_score'])->values()->all(),
            'scorers' => $game->playerStats
                ->filter(fn(PlayerGameStat $stat): bool => $stat->player !== null && in_array((int) $stat->team_id, [(int) $game->home_team_id, (int) $game->away_team_id], true))
                ->sortBy([['points', 'desc'], ['player_id', 'asc']])
                ->map(fn(PlayerGameStat $stat): array => [
                    'player_id' => $stat->player_id,
                    'team_id' => $stat->team_id,
                    'name' => $stat->player->first_name . ' ' . $stat->player->last_name,
                    'points' => (int) $stat->points,
                    'url' => route('player.show', $stat->player_id),
                ])->values()->all(),
        ];
    }

    private function team(Team $team): array
    {
        return $team->only(['id', 'name', 'short_name', 'logo']);
    }
}
