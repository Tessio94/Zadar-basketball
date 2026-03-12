<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use Inertia\Inertia;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        //
        $player->load([
            'teams',
            'gameStats',
        ]);

        $stats = $player->gameStats();

        $player->gameStats->transform(function ($stat) {

            $game = $stat->game;

            if ($stat->team_id === $game->home_team_id) {
                $stat->opponent = $game->awayTeam;
            } else {
                $stat->opponent = $game->homeTeam;
            }

            return $stat;
        });

        $totals = $stats->selectRaw('
            COUNT(*) as games,
            SUM(minutes_played) as minutes,
            SUM(points) as points,
            SUM(assists) as assists,
            SUM(blocks) as blocks,
            SUM(steals) as steals,
            SUM(turnovers) as turnovers,
            SUM(offensive_rebounds) as offensive_rebounds,
            SUM(defensive_rebounds) as defensive_rebounds,
            SUM(fg2_made) as fg2_made,
            SUM(fg2_attempted) as fg2_attempted,
            SUM(fg3_made) as fg3_made,
            SUM(fg3_attempted) as fg3_attempted,
            SUM(ft_made) as ft_made,
            SUM(ft_attempted) as ft_attempted,
            SUM(fouls) as fouls,
            SUM(plus_minus) as plus_minus,
            SUM(efficiency) as efficiency
        ')->first();

        $games = $totals->games ?: 1;

        $averages = [
            'minutes' => round($totals->minutes / $games, 1),
            'points' => round($totals->points / $games, 1),
            'assists' => round($totals->assists / $games, 1),
            'blocks' => round($totals->blocks / $games, 1),
            'steals' => round($totals->steals / $games, 1),
            'turnovers' => round($totals->turnovers / $games, 1),
            'offensive_rebounds' => round($totals->offensive_rebounds  / $games, 1),
            'defensive_rebounds' => round($totals->defensive_rebounds / $games, 1),
            'rebounds' => round(($totals->offensive_rebounds + $totals->defensive_rebounds) / $games, 1),
            'fg_percentage'=> round((($totals->fg2_made + $totals->fg3_made) / ($totals->fg2_attempted + $totals->fg3_attempted))*100, 1),
            'fg2_percentage'=> round(($totals->fg2_made / $totals->fg2_attempted)*100, 1),
            'fg3_percentage'=> round(($totals->fg3_made / $totals->fg3_attempted)*100, 1),
            'ft_percentage'=> round(($totals->ft_made / $totals->ft_attempted)*100, 1),
            'fouls' => round($totals->fouls / $games, 1),
            'plus_minus'=> round($totals->plus_minus / $games, 1),
            'efficiency'=> round($totals->efficiency / $games,1)
        ];


         return Inertia::render('player', [
            'player' => $player,
            'totals' => $totals,
            'averages' => $averages
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerRequest $request, Player $player)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        //
    }
}
