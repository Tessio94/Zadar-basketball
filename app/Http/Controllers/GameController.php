<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Services\StandingsService;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(StandingsService $standingsService)
    {

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
    public function store(StoreGameRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        $games = Game::with(['homeTeam', 'awayTeam'])
            ->orderBy('game_date')
            ->get();


        $game->load([
            'homeTeam',
            'awayTeam',
            // 'homeTeam.players' => function ($query) use ($game) {
            //     $query->wherePivot('season_id', $game->season_id);
            // },
            // 'awayTeam.players' => function ($query) use ($game) {
            //     $query->wherePivot('season_id', $game->season_id);
            // },
            'playerStats.player'
        ]);

        return Inertia::render('games', [
            'games' => $games,
            'game'  => $game,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        //
    }

}
