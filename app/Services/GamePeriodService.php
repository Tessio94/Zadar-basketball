<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Game;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class GamePeriodService
{
    /**
     * Drafts may be incomplete; publishing requires a complete, consistent breakdown.
     * An empty list deliberately means "not recorded", including historical games.
     *
     * @return list<array{period_number: int, home_score: ?int, away_score: ?int}>
     */
    public function validate(Game $game, array $periods, bool $publish): array
    {
        $scoreRules = [$publish ? 'required' : 'nullable', 'integer', 'min:0', 'max:999'];
        $validated = Validator::make(['periods' => $periods], [
            'periods' => ['present', 'array', 'list', 'max:20'],
            'periods.*' => ['required', 'array:period_number,home_score,away_score'],
            'periods.*.period_number' => ['required', 'integer', 'min:1', 'max:20', 'distinct'],
            'periods.*.home_score' => $scoreRules,
            'periods.*.away_score' => $scoreRules,
        ])->validate()['periods'];
        $rows = array_map(fn(array $row): array => [
            'period_number' => (int) $row['period_number'],
            'home_score' => isset($row['home_score']) ? (int) $row['home_score'] : null,
            'away_score' => isset($row['away_score']) ? (int) $row['away_score'] : null,
        ], $validated);
        if ($rows === []) {
            return [];
        }
        if (array_column($rows, 'period_number') !== range(1, count($rows))) {
            $this->fail('Unesite četvrtine redom, bez preskakanja ili ponavljanja.');
        }
        if (! $publish) {
            return $rows;
        }
        if (count($rows) < 4) {
            $this->fail('Za objavu unesite sve četiri četvrtine ili uklonite cijelu raspodjelu ako nije poznata.');
        }
        $home = 0;
        $away = 0;
        foreach ($rows as $row) {
            if ($row['period_number'] > 4 && $home !== $away) {
                $this->fail('Produžetak je moguć samo ako je rezultat prije njega izjednačen.');
            }
            $home += $row['home_score'];
            $away += $row['away_score'];
        }
        if ($home !== (int) $game->home_score || $away !== (int) $game->away_score) {
            $this->fail("Zbroj četvrtina ({$home} : {$away}) mora odgovarati zbroju poena igrača ({$game->home_score} : {$game->away_score}).");
        }
        if ($home === $away) {
            $this->fail('Završena utakmica ne može biti neriješena. Unesite produžetak.');
        }

        return $rows;
    }

    private function fail(string $message): never
    {
        throw ValidationException::withMessages(['periods' => $message]);
    }
}
