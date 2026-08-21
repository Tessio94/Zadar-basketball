<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Team;
use Inertia\Inertia;
use App\Services\StatisticsService;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();

        return Inertia::render('teams', ['teams' => $teams]);
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
    public function store(StoreTeamRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team, StatisticsService $stats)
    {

        $team->load([
            'players',
        ]);

        $games = Game::with(['homeTeam', 'awayTeam'])
            ->where('home_team_id', $team->id)
            ->orWhere('away_team_id', $team->id)
            ->orderBy('round_number')
            ->get();

        return Inertia::render('team', [
            'team' => $team,
            'games' => $games,
            'stats' => $stats->seasonLeaders($team->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamRequest $request, Team $team): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team): void
    {
        //
    }
}
