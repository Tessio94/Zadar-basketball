<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Team;
use Inertia\Inertia;
use App\Services\StatisticsService;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Models\Season;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $season = $request->filled('season')
                ? Season::findOrFail($request->integer('season'))
                : Season::where('is_active', true)->firstOrFail();

        $teams = $season->teams;

        return Inertia::render('teams', [
            'season' => $season,
            'teams' => $teams
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Team $team, StatisticsService $stats)
    {
        $season = $request->filled('season')
                ? Season::findOrFail($request->integer('season'))
                : Season::where('is_active', true)->firstOrFail();

        $teamSeason = $team->teamSeasons()
            ->where('season_id', $season->id)
            ->with([
                'season',
                'players',
            ])
            ->firstOrFail();

        $games = Game::with(['homeTeam', 'awayTeam'])
            ->where('season_id', $season->id)
             ->where(function ($query) use ($team) {
                $query->where('home_team_id', $team->id)
                    ->orWhere('away_team_id', $team->id);
            })
            ->orderBy('round_number')
            ->get();

        return Inertia::render('team', [
            'season' => $season,
            'team' => $team,
            'teamSeason' => $teamSeason,
            'games' => $games,
            'stats' => $stats->seasonLeaders(
                 seasonId: $season->id,
                 teamId: $team->id,
            ),
        ]);
    }
}
