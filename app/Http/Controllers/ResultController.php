<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Services\StandingsService;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(StandingsService $standingsService)
    {
        $standings = $standingsService->getStandings();

        $games = Game::with(['homeTeam', 'awayTeam'])
            ->orderBy('game_date')
            ->get();

        return Inertia::render('table', [
            'standings' => $standings,
            'games' => $games,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGameRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game): void
    {
        //
    }
}
