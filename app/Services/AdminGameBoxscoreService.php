<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use App\Models\TeamSeason;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AdminGameBoxscoreService
{
    public const FIELDS = ['minutes_played', 'fg2_made', 'fg2_attempted', 'fg3_made', 'fg3_attempted',
        'ft_made', 'ft_attempted', 'offensive_rebounds', 'defensive_rebounds', 'assists', 'steals',
        'blocks', 'turnovers', 'fouls', 'plus_minus'];

    public function roster(Game $game): array
    {
        $rows = [];
        foreach (TeamSeason::where('season_id', $game->season_id)
            ->whereIn('team_id', [$game->home_team_id, $game->away_team_id])
            ->with('players')->get() as $teamSeason) {
            foreach ($teamSeason->players as $player) {
                $key = $teamSeason->team_id.':'.$player->id;
                $rows[$key] = [
                    'player_id' => $player->id, 'team_id' => $teamSeason->team_id,
                    'name' => $player->first_name.' '.$player->last_name,
                    'jersey_number' => $player->pivot->jersey_number,
                    'on_roster' => true,
                ];
            }
        }
        // Preserve historical participants even when their season roster was subsequently edited.
        foreach ($game->playerStats()->with('player')->get() as $stat) {
            $key = $stat->team_id.':'.$stat->player_id;
            $rows[$key] ??= [
                'player_id' => $stat->player_id, 'team_id' => $stat->team_id,
                'name' => $stat->player->first_name.' '.$stat->player->last_name,
                'jersey_number' => null, 'on_roster' => false,
            ];
        }
        return array_values($rows);
    }

    public static function derived(array $row): array
    {
        $points = 2 * $row['fg2_made'] + 3 * $row['fg3_made'] + $row['ft_made'];
        return [
            'points' => $points,
            'efficiency' => $points + $row['offensive_rebounds'] + $row['defensive_rebounds']
                + $row['assists'] + $row['steals'] + $row['blocks'] - $row['turnovers'],
        ];
    }

    public function validatePlayers(Game $game, array $input, bool $publish): array
    {
        $rules = [
            'players' => ['present', 'array', 'max:100'],
            'players.*' => ['array'],
            'players.*.player_id' => ['required', 'integer', 'distinct'],
            'players.*.team_id' => ['required', 'integer'],
            'players.*.is_starter' => ['required', 'boolean'],
        ];
        foreach (self::FIELDS as $field) {
            $rules['players.*.'.$field] = ['required', 'integer', 'min:'.($field === 'plus_minus' ? -1000 : 0), 'max:1000'];
        }
        $validated = Validator::make(['players' => $input], $rules)->validate()['players'];
        $allowed = array_fill_keys(array_map(fn ($row) => $row['team_id'].':'.$row['player_id'], $this->roster($game)), true);
        $rows = [];
        $errors = [];
        foreach ($validated as $index => $row) {
            if (!isset($allowed[$row['team_id'].':'.$row['player_id']])) {
                $errors["players.$index.player_id"] = 'Igrač nije član ove ekipe u sezoni utakmice. Osvježite popis.';
            }
            foreach (['fg2', 'fg3', 'ft'] as $shot) {
                if ($row[$shot.'_made'] > $row[$shot.'_attempted']) {
                    $errors["players.$index.{$shot}_made"] = 'Broj pogodaka ne može biti veći od broja pokušaja.';
                }
            }
            $clean = ['player_id' => (int) $row['player_id'], 'team_id' => (int) $row['team_id'], 'is_starter' => (bool) $row['is_starter']];
            foreach (self::FIELDS as $field) {
                $clean[$field] = (int) $row[$field];
            }
            $rows[] = $clean + self::derived($clean);
        }
        foreach ([$game->home_team_id, $game->away_team_id] as $teamId) {
            $team = array_filter($rows, fn ($row) => $row['team_id'] === (int) $teamId);
            if (count(array_filter($team, fn ($row) => $row['is_starter'])) > 5) {
                $errors['players'] = 'Ekipa može imati najviše pet startera.';
            }
            if ($publish && count($team) === 0) {
                $errors['players'] = 'Za objavu unesite igrače i statistiku obje ekipe.';
            }
        }
        $home = array_sum(array_column(array_filter($rows, fn ($r) => $r['team_id'] === (int) $game->home_team_id), 'points'));
        $away = array_sum(array_column(array_filter($rows, fn ($r) => $r['team_id'] === (int) $game->away_team_id), 'points'));
        if ($publish && $home === $away) {
            $errors['players'] = 'Završena košarkaška utakmica ne može biti neriješena.';
        }
        if ($errors) {
            throw ValidationException::withMessages($errors);
        }
        return $rows;
    }

    // Caller holds the game row lock, checks revision and wraps this in a transaction.
    public function save(Game $game, array $rows, bool $publish): void
    {
        if (!$publish) {
            DB::table('game_boxscore_drafts')->updateOrInsert(['game_id' => $game->id], [
                'players' => json_encode($rows, JSON_THROW_ON_ERROR), 'created_at' => now(), 'updated_at' => now(),
            ]);
            return;
        }
        $ids = array_column($rows, 'player_id');
        $game->playerStats()->whereNotIn('player_id', $ids)->delete();
        foreach ($rows as $row) {
            $game->playerStats()->updateOrCreate(['player_id' => $row['player_id']], $row);
        }
        $game->home_score = array_sum(array_column(array_filter($rows, fn ($r) => $r['team_id'] === (int) $game->home_team_id), 'points'));
        $game->away_score = array_sum(array_column(array_filter($rows, fn ($r) => $r['team_id'] === (int) $game->away_team_id), 'points'));
        $game->status = 'finished';
        DB::table('game_boxscore_drafts')->where('game_id', $game->id)->delete();
    }
}
