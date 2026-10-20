<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Team;
use Inertia\Inertia;
use App\Services\StatisticsService;
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
        // Load only seasons in which this team participates.
        $team->load('seasons:id,name,start_date,is_active');

        $availableSeasons = $team->seasons
            ->sortByDesc('start_date')
            ->values();

        // A team without any season associations has no public season page.
        abort_if($availableSeasons->isEmpty(), 404);

        // Use the requested season only if this team participates in it.
        $requestedSeasonId = $request->filled('season')
            ? $request->integer('season')
            : null;

        $season = $availableSeasons->firstWhere('id', $requestedSeasonId)
            ?? $availableSeasons->first();

        // Canonicalize the URL so the selected season is explicit.
        if (
            !$request->filled('season') ||
            $requestedSeasonId !== $season->id
        ) {
            return redirect()->to(
                url()->current() . '?season=' . $season->id
            );
        }

        $teamSeason = $team->teamSeasons()
            ->where('season_id', $season->id)
            ->with(['season', 'players'])
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
            'seasons' => $availableSeasons
            ->map(fn ($item) => $item->only([
                'id',
                'name',
                'start_date',
                'is_active',
            ]))
            ->values(),
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
