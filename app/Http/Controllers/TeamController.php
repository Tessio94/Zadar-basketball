<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Game;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use Inertia\Inertia;

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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
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
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamRequest $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }
}
