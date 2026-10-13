<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Services\StandingsService;
use App\Models\Season;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, StandingsService $standingsService)
    {
        $season = $request->filled('season')
            ? Season::findOrFail($request->integer('season'))
            : Season::where('is_active', true)->firstOrFail();

        $standings = $standingsService->getStandings($season->id);

        $games = Game::with(['homeTeam', 'awayTeam'])
            ->where('season_id', $season->id)
            ->orderBy('game_date')
            ->get();

        return Inertia::render('table', [
            'season' => $season,
            'standings' => $standings,
            'games' => $games,
        ]);
    }
}
