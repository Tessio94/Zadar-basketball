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
            'playerStats.player',
            'playerStats.team',
        ]);

        $leaders = [
            'points' => $game->playerStats
                ->sortByDesc('points')
                ->take(5)
                ->values(),

            'rebounds' => $game->playerStats
                ->sortByDesc(fn($s) => $s->offensive_rebounds + $s->defensive_rebounds)
                ->take(5)
                ->values(),

            'assists' => $game->playerStats
                ->sortByDesc('assists')
                ->take(5)
                ->values(),

            'blocks' => $game->playerStats
                ->sortByDesc('blocks')
                ->take(5)
                ->values(),

            'steals' => $game->playerStats
                ->sortByDesc('steals')
                ->take(5)
                ->values(),

            'shootingPercentage' => $game->playerStats
                ->sortByDesc('fg_percentage')
                ->take(5)
                ->values(),

            'madeThrees' => $game->playerStats
                ->sortByDesc('fg3_made')
                ->take(5)
                ->values(),

            'threesPercentage' => $game->playerStats
                ->sortByDesc('fg3_percentage')
                ->take(5)
                ->values(),

            'efficiency' => $game->playerStats
                ->sortByDesc('efficiency')
                ->take(5)
                ->values(),
        ];

        return Inertia::render('games', [
            'games' => $games,
            'game'  => $game,
            'leaders' => $leaders
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
