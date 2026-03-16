<?php

namespace App\Services;

use App\Models\Game;
use App\Models\PlayerGameStat;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class StatisticsService
{

    const TYPE_AVG = 'avg';
    const TYPE_PERCENTAGE = 'pcg';

    private function buildAvgLeaderboard(string $title, string $type, $collection, string $avgKey, string $totalKey, ?string $totalKeyTwo = null)
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

    public function seasonLeaders(?int $teamId = null)
    {
        $averages = PlayerGameStat::select(
            'player_id',
            DB::raw('COUNT(*) as games'),

            DB::raw('SUM(minutes_played) as minutes_total'),
            DB::raw('ROUND(SUM(minutes_played)::decimal / COUNT(*), 1) as mpg'),

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

            DB::raw('SUM(fg2_made) as two_made_total'),
            DB::raw('SUM(fg2_attempted) as two_attempted_total'),
            DB::raw('ROUND((SUM(fg2_made)::decimal / NULLIF(SUM(fg2_attempted),0)) * 100, 1) as fg2prc'),

            DB::raw('SUM(fg3_attempted) as three_attempted_total'),
            DB::raw('SUM(fg3_made) as three_made_total'),
            DB::raw('ROUND((SUM(fg3_made)::decimal / NULLIF(SUM(fg3_attempted),0)) * 100, 1) as fg3prc'),

            DB::raw('SUM(ft_made) as free_throw_made_total'),
            DB::raw('SUM(ft_attempted) as free_throw_attempted_total'),
            DB::raw('ROUND((SUM(ft_made)::decimal / NULLIF(SUM(ft_attempted),0)) * 100, 1) as ftprc')
        )
        ->when($teamId, function ($query) use ($teamId) {
            $query->where('team_id', $teamId);
        })
        ->with('player.teams')
        ->groupBy('player_id')
        ->havingRaw('COUNT(*) >= 3')
        ->get()
        ->each->setAppends([]);

        return [
            'mpg' => $this->buildAvgLeaderboard("Minute po utakmici", self::TYPE_AVG, $averages, 'mpg', 'minutes_total'),
            'ppg' => $this->buildAvgLeaderboard("Poeni po utakmici", self::TYPE_AVG, $averages, 'ppg', 'points_total'),
            'drpg' => $this->buildAvgLeaderboard("Obrambeni skokovi po utakmici", self::TYPE_AVG, $averages, 'drpg', 'defensive_rebounds_total'),
            'orpg' => $this->buildAvgLeaderboard("Napadački skokovi po utakmici", self::TYPE_AVG, $averages, 'orpg', 'offensive_rebounds_total'),
            'rpg' => $this->buildAvgLeaderboard("Skokovi po utakmici", self::TYPE_AVG, $averages, 'rpg', 'rebounds_total'),
            'apg' => $this->buildAvgLeaderboard("Asistencije po utakmici", self::TYPE_AVG, $averages, 'apg', 'assists_total'),
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



    private function buildLastRoundLeaderboard(string $title, $collection, string $categoryKey)
    {
    // var_dump($collection);

        return [
            'title' => $title,
            'topFive' => $collection
                ->sortByDesc($categoryKey)
                ->take(5)
                ->map(fn ($p) => [
                    'player' => $p->player,
                    'total' => $p->$categoryKey,
                ])
                ->values()
            ];

    }

    public function lastRoundLeaders()
    {
        $lastRound = Game::max('round_number');

        $lastRoundLeaders = PlayerGameStat::select(
            'player_id',
            DB::raw('SUM(minutes_played) as minutes'),
            DB::raw('SUM(points) as points'),
            DB::raw('SUM(blocks) as blocks'),
            DB::raw('SUM(steals) as steals'),
            DB::raw('SUM(assists) as assists'),
            DB::raw('SUM(defensive_rebounds) as defensive_rebounds'),
            DB::raw('SUM(offensive_rebounds) as offensive_rebounds'),
            DB::raw('SUM(defensive_rebounds + offensive_rebounds) as total_rebounds'),
            DB::raw('SUM(turnovers) as turnovers'),
            DB::raw('SUM(fg3_made) as three_made'),
            DB::raw('SUM(ft_made) as free_throw_made'),
            DB::raw('SUM(efficiency) as efficiency')
        )
        ->whereHas('game', function ($q) use ($lastRound) {
            $q->where('round_number', $lastRound);
        })
        ->with('player.teams')
        ->groupBy('player_id')
        ->get()
        ->each->setAppends([]);

       return [
            'minutes' => $this->buildLastRoundLeaderboard("Minute po utakmici", $lastRoundLeaders, 'minutes'),
            'points' => $this->buildLastRoundLeaderboard("Poeni po utakmici", $lastRoundLeaders, 'points'),
            'defensive_rebounds' => $this->buildLastRoundLeaderboard("Obrambeni skokovi po utakmici", $lastRoundLeaders, 'defensive_rebounds'),
            'offensive_rebounds' => $this->buildLastRoundLeaderboard("Napadački skokovi po utakmici", $lastRoundLeaders, 'offensive_rebounds'),
            'rebounds_total' => $this->buildLastRoundLeaderboard("Skokovi po utakmici", $lastRoundLeaders, 'total_rebounds'),
            'assists' => $this->buildLastRoundLeaderboard("Asistencije", $lastRoundLeaders, 'assists'),
            'blocks' => $this->buildLastRoundLeaderboard("Blokade", $lastRoundLeaders, 'blocks'),
            'steals' => $this->buildLastRoundLeaderboard("Ukradene", $lastRoundLeaders, 'steals'),
            'turnovers' => $this->buildLastRoundLeaderboard("Izgubljene", $lastRoundLeaders, 'turnovers'),
            'three_made' => $this->buildLastRoundLeaderboard("Zabijene trice", $lastRoundLeaders, 'three_made'),
            'free_throw_made' => $this->buildLastRoundLeaderboard("Slobodna bacanja", $lastRoundLeaders, 'free_throw_made'),
            'efficiency' => $this->buildLastRoundLeaderboard("Efikasnost", $lastRoundLeaders, 'efficiency'),
       ];

    }
}
