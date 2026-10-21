<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\Season;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class PlayoffBracketService
{
    public function build(Season $season, Collection $standings): array
    {
        $playoff = $season->playoff()->latest('id')->first();
        $games = $playoff
            ? $playoff->games()
                ->where('season_id', $season->id)
                ->with(['homeTeam', 'awayTeam'])
                ->orderBy('game_date')->orderBy('id')->get()
            : collect();

        $seededTeams = $standings->take(8)->values()->map(
            fn (array $row, int $index): array => [
                'id' => (int) $row['id'],
                'name' => $row['name'],
                'logo' => $row['logo'],
                'seed' => $index + 1,
            ],
        );
        $groups = $games->groupBy(fn (Game $game): string =>
            $game->playoff_round . ':' . $this->pairKey((int) $game->home_team_id, (int) $game->away_team_id)
        );
        // Do not project live standings into a bracket before fixtures exist.
        $teamAt = fn (int $index): ?array => $games->isEmpty() ? null : $seededTeams->get($index);

        // Visual order puts each semifinal beside its two quarterfinals.
        $quarterfinals = [];
        foreach ([[0, 7], [3, 4], [1, 6], [2, 5]] as $index => [$first, $second]) {
            $quarterfinals[] = $this->series(
                'qf' . ($index + 1), 'quarterfinal', 'ČF' . ($index + 1),
                $teamAt($first), $teamAt($second), $groups,
                'TBD', 'TBD',
            );
        }

        $semifinals = [];
        foreach ([[0, 1], [2, 3]] as $index => [$first, $second]) {
            $semifinals[] = $this->series(
                'sf' . ($index + 1), 'semifinal', 'PF' . ($index + 1),
                $quarterfinals[$first]['winner'], $quarterfinals[$second]['winner'], $groups,
                'Pobjednik ČF' . ($first + 1), 'Pobjednik ČF' . ($second + 1),
            );
        }
        $final = $this->series(
            'final', 'final', 'Finale',
            $semifinals[0]['winner'], $semifinals[1]['winner'], $groups,
            'Pobjednik PF1', 'Pobjednik PF2',
        );

        return [
            'season_id' => (int) $season->id,
            'season_name' => $season->name,
            'status' => $games->isEmpty() ? 'pending' : ($final['winner'] ? 'finished' : 'in_progress'),
            'wins_required' => 2,
            'quarterfinals' => $quarterfinals,
            'semifinals' => $semifinals,
            'final' => $final,
            'champion' => $final['winner'],
        ];
    }

    private function pairKey(int $first, int $second): string
    {
        return min($first, $second) . '-' . max($first, $second);
    }

    private function series(
        string $id,
        string $round,
        string $label,
        ?array $first,
        ?array $second,
        Collection $groups,
        string $firstPlaceholder,
        string $secondPlaceholder,
    ): array {
        // Original regular-season seeding determines card order and home advantage.
        if ($first !== null && $second !== null && $first['seed'] > $second['seed']) {
            [$first, $second] = [$second, $first];
            [$firstPlaceholder, $secondPlaceholder] = [$secondPlaceholder, $firstPlaceholder];
        }

        $games = $first !== null && $second !== null
            ? $groups->get($round . ':' . $this->pairKey($first['id'], $second['id']), collect())
            : collect();
        $wins = [];
        foreach ($games as $game) {
            if ($game->status !== 'finished' || (int) $game->home_score === (int) $game->away_score) {
                continue;
            }
            $winnerId = $game->home_score > $game->away_score ? $game->home_team_id : $game->away_team_id;
            $wins[$winnerId] = ($wins[$winnerId] ?? 0) + 1;
        }
        $winner = null;
        foreach ([$first, $second] as $team) {
            if ($team !== null && ($wins[$team['id']] ?? 0) >= 2) {
                $winner = $team;
                break;
            }
        }

        return [
            'id' => $id,
            'label' => $label,
            'round' => $round,
            'teams' => [
                ['team' => $first, 'wins' => $first === null ? null : ($wins[$first['id']] ?? 0), 'placeholder' => $firstPlaceholder],
                ['team' => $second, 'wins' => $second === null ? null : ($wins[$second['id']] ?? 0), 'placeholder' => $secondPlaceholder],
            ],
            'winner' => $winner,
            'games' => $games->map(fn (Game $game): array => [
                'id' => (int) $game->id,
                'game_date' => Carbon::parse($game->game_date)->toIso8601String(),
                'status' => $game->status,
                'home_score' => (int) $game->home_score,
                'away_score' => (int) $game->away_score,
                'home_team' => ['id' => (int) $game->home_team_id, 'name' => $game->homeTeam->name],
                'away_team' => ['id' => (int) $game->away_team_id, 'name' => $game->awayTeam->name],
            ])->values()->all(),
        ];
    }
}
