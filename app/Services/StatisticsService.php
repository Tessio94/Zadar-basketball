<?php

namespace App\Services;

use App\Models\Game;
use App\Models\PlayerGameStat;
use Illuminate\Support\Facades\DB;

class StatisticsService
{

    const TYPE_AVG = 'avg';
    const TYPE_PERCENTAGE = 'pcg';

    private function buildAvgLeaderboard(string $title, string $type, $collection, string $avgKey,string $totalKey,?string $totalKeyTwo = null)
    {
        return $type === self::TYPE_AVG ? [
            'title' => $title,
            'type' => $type,
            'topFive' => $collection
                ->sortByDesc($avgKey)
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total' => $p->$totalKey,
                    'avg' => $p->$avgKey,
                ])
                ->values()
            ] :
            [
            'title' => $title,
            'type' => $type,
            'topFive' => $collection
                ->sortByDesc($avgKey)
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total_made' => $p->$totalKey,
                    'total_attempted' => $p -> $totalKeyTwo,
                    'pcg' => $p->$avgKey,
                ])
                ->values()
            ];
    }

    public function seasonLeaders()
    {
        $averages = PlayerGameStat::select(
            'player_id',
            DB::raw('COUNT(*) as games'),

            DB::raw('SUM(points) as points_total'),
            DB::raw('ROUND(SUM(points)::decimal / COUNT(*), 1) as ppg'),

            DB::raw('SUM(assists) as assists_total'),
            DB::raw('ROUND(SUM(assists)::decimal / COUNT(*), 1) as apg'),

            DB::raw('SUM(blocks) as blocks_total'),
            DB::raw('ROUND(SUM(blocks)::decimal / COUNT(*), 1) as bpg'),

            DB::raw('SUM(steals) as steals_total'),
            DB::raw('ROUND(SUM(steals)::decimal / COUNT(*), 1) as spg'),

            DB::raw('SUM(defensive_rebounds) as defensive_rebounds_total'),
            DB::raw('ROUND(SUM(defensive_rebounds)::decimal / COUNT(*), 1) as drpg'),

            DB::raw('SUM(offensive_rebounds) as offensive_rebounds_total'),
            DB::raw('ROUND(SUM(offensive_rebounds)::decimal / COUNT(*), 1) as orpg'),

            DB::raw('SUM(offensive_rebounds + defensive_rebounds) as rebounds_total'),
            DB::raw('ROUND(SUM(offensive_rebounds + defensive_rebounds)::decimal / COUNT(*), 1) as rpg'),

            DB::raw('SUM(turnovers) as turnovers_total'),
            DB::raw('ROUND(SUM(turnovers)::decimal / COUNT(*), 1) as tpg'),

            DB::raw('SUM(fg3_made) as three_points_total'),
            DB::raw('ROUND(SUM(fg3_made)::decimal / COUNT(*), 1) as tppg'),

            DB::raw('SUM(efficiency) as efficiency_total'),
            DB::raw('ROUND(SUM(efficiency)::decimal / COUNT(*), 1) as epg'),

            DB::raw('SUM(fg3_made) as three_made_total'),
            DB::raw('SUM(fg3_attempted) as three_attempted_total'),
            DB::raw('ROUND((SUM(fg2_made)::decimal / NULLIF(SUM(fg2_attempted),0)) * 100, 1) as fg2prc'),

            DB::raw('SUM(fg2_made) as two_made_total'),
            DB::raw('SUM(fg2_attempted) as two_attempted_total'),
            DB::raw('ROUND((SUM(fg3_made)::decimal / NULLIF(SUM(fg3_attempted),0)) * 100, 1) as fg3prc'),

            DB::raw('SUM(ft_made) as free_throw_made_total'),
            DB::raw('SUM(ft_attempted) as free_throw_attempted_total'),
            DB::raw('ROUND((SUM(ft_made)::decimal / NULLIF(SUM(ft_attempted),0)) * 100, 1) as ftprc')
        )
        ->with('player.teams')
        ->groupBy('player_id')
        ->havingRaw('COUNT(*) >= 3')
        ->get()
        ->each->setAppends([]);

        return [
            'ppg' => $this->buildAvgLeaderboard("Poeni po utakmici", self::TYPE_AVG, $averages, 'ppg', 'points_total'),
            'drpg' => $this->buildAvgLeaderboard("Obrambeni skokovi po utakmici", self::TYPE_AVG, $averages, 'drpg', 'defensive_rebounds_total'),
            'orpg' => $this->buildAvgLeaderboard("Napadački skokovi po utakmici", self::TYPE_AVG, $averages, 'orpg', 'offensive_rebounds_total'),
            'rpg' => $this->buildAvgLeaderboard("Skokovi po utakmici", self::TYPE_AVG, $averages, 'rpg', 'rebounds_total'),
            'apg' => $this->buildAvgLeaderboard("Asistencije po utakmici po utakmici", self::TYPE_AVG, $averages, 'apg', 'assists_total'),
            'bpg' => $this->buildAvgLeaderboard("Blokade po utakmici", self::TYPE_AVG, $averages, 'bpg', 'blocks_total'),
            'spg' => $this->buildAvgLeaderboard("Ukradene po utakmici", self::TYPE_AVG, $averages, 'spg', 'steals_total'),
            'tpg' => $this->buildAvgLeaderboard("Izgubljene po utakmici", self::TYPE_AVG, $averages, 'tpg', 'turnovers_total'),
            'tppg' => $this->buildAvgLeaderboard("Zabijene trice po utakmici", self::TYPE_AVG, $averages, 'tppg', 'three_points_total'),
            'epg' => $this->buildAvgLeaderboard("Prosječna efikasnost", self::TYPE_AVG, $averages, 'epg', 'efficiency_total'),
            'fg2prc' => $this->buildAvgLeaderboard("Postotak šuta za dva", self::TYPE_PERCENTAGE, $averages, 'fg2prc', 'two_made_total', 'two_attempted_total'),
            'fg3prc' => $this->buildAvgLeaderboard("Postotak šuta za tri", self::TYPE_PERCENTAGE, $averages, 'fg3prc', 'three_made_total', 'three_attempted_total'),
            'ftprc' => $this->buildAvgLeaderboard("Postotak šuta za jedan", self::TYPE_PERCENTAGE, $averages, 'ftprc', 'free_throw_made_total', 'free_throw_attempted_total'),

        ];

    }

    // public function lastRoundLeaders()
    // {
    //     $lastRound = Game::max('round_number');

    //     $lastRoundLeaders = PlayerGameStat::select(
    //         'player_id',
    //         DB::raw('SUM(points) as points')
    //     )
    //     ->whereHas('game', function ($q) use ($lastRound) {
    //         $q->where('round_number', $lastRound);
    //     })
    //     ->with('player.team')
    //     ->groupBy('player_id')
    //     ->orderByDesc('points')
    //     ->limit(5)
    //     ->get();

    //     $lastRoundLeaders = PlayerGameStat::select(
    //         'player_id',
    //         DB::raw('SUM(points) as points')
    //     )
    //     ->whereHas('game', function ($q) use ($lastRound) {
    //         $q->where('round_number', $lastRound);
    //     })
    //     ->with('player.team')
    //     ->groupBy('player_id')
    //     ->orderByDesc('points')
    //     ->limit(5)
    //     ->get();

    //     $lastRoundLeaders = PlayerGameStat::select(
    //         'player_id',
    //         DB::raw('SUM(points) as points')
    //     )
    //     ->whereHas('game', function ($q) use ($lastRound) {
    //         $q->where('round_number', $lastRound);
    //     })
    //     ->with('player.team')
    //     ->groupBy('player_id')
    //     ->orderByDesc('points')
    //     ->limit(5)
    //     ->get();

    //     $lastRoundLeaders = PlayerGameStat::select(
    //         'player_id',
    //         DB::raw('SUM(points) as points')
    //     )
    //     ->whereHas('game', function ($q) use ($lastRound) {
    //         $q->where('round_number', $lastRound);
    //     })
    //     ->with('player.team')
    //     ->groupBy('player_id')
    //     ->orderByDesc('points')
    //     ->limit(5)
    //     ->get();

    // }
}
