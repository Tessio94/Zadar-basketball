<?php

namespace App\Services;

use App\Models\Game;
use App\Models\PlayerGameStat;
use Illuminate\Support\Facades\DB;

class StatisticsService
{
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
            'ppg' => [
                'title' => "Poeni po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                    ->sortByDesc('ppg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->points_total,
                        'avg' => $p->ppg,
                    ])
                    ->values()],
            'drpg' => [
                'title' => "Obrambeni skokovi po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                    ->sortByDesc('drpg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->defensive_rebounds_total,
                        'avg' => $p->drpg,
                    ])
                ->values()
                ],
            'orpg' => [
                'title' => "Napadački skokovi po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                    ->sortByDesc('orpg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->offensive_rebounds_total,
                        'avg' => $p->orpg,
                    ])
                    ->values()
                ],
            'rpg' => [
                'title' => "Skokovi po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                    ->sortByDesc('rpg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->rebounds_total,
                        'avg' => $p->rpg,
                    ])
                    ->values()
                ],
            'apg' => [
                'title' => "Asistencije po utakmici",
                'type' => 'avg',
                'topFive' =>$averages
                    ->sortByDesc('apg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->assists_total,
                        'avg' => $p->apg,
                    ])
                    ->values()
                ],
            'bpg' => [
                'title' => "Blokade po utakmici",
                'type' => 'avg',
                'topFive' =>$averages
                    ->sortByDesc('bpg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->blocks_total,
                        'avg' => $p->bpg,
                    ])
                    ->values()
                ],
            'spg' => [
                'title' => "Ukradene po utakmici",
                'type' => 'avg',
                'topFive' =>$averages
                    ->sortByDesc('spg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->steals_total,
                        'avg' => $p->spg,
                    ])
                    ->values()
                ],
            'tpg' => [
                'title' => "Izgubljene po utakmici",
                'type' => 'avg',
                'topFive' =>$averages
                    ->sortByDesc('tpg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->turnovers_total,
                        'avg' => $p->tpg,
                    ])
                    ->values()
                ],
            'tppg' => [
                'title' => "Zabijene trice po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                    ->sortByDesc('tppg')
                    ->take(5)
                    ->map(fn ($p) => [
                        'player' => $p->player,
                        'games' => $p->games,
                        'total' => $p->three_points_total,
                        'avg' => $p->tppg,
                    ])
                    ->values()
                ],
            'fg2prc' => [
                'title' => "Postotak šuta za dva",
                'type' => 'pcg',
                'topFive' => $averages
                ->sortByDesc('fg2prc')
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total_made' => $p->two_made_total,
                    'total_attempted' => $p->two_attempted_total,
                    'pcg' => $p->fg2prc,
                ])
                ->values()
            ],
            'fg3prc' => [
                'title' => "Postotak šuta za tri",
                'type' => 'pcg',
                'topFive' => $averages
                ->sortByDesc('fg3prc')
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total_made' => $p->three_made_total,
                    'total_attempted' => $p->three_attempted_total,
                    'pcg' => $p->fg3prc,
                ])
                ->values()
            ],
            'ftprc' => [
                'title' => "Postotak šuta za jedan",
                'type' => 'pcg',
                'topFive' => $averages
                ->sortByDesc('ftprc')
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total_made' => $p->free_throw_made_total,
                    'total_attempted' => $p->free_throw_attempted_total,
                    'pcg' => $p->ftprc,
                ])
                ->values()
            ],
            'epg' => [
                'title' => "Efikasnost po utakmici",
                'type' => 'avg',
                'topFive' => $averages
                ->sortByDesc('epg')
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'games' => $p->games,
                    'total' => $p->efficiency_total,
                    'avg' => $p->epg,
                ])
                ->values()
            ],
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
