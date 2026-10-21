<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Season;
use App\Services\PlayoffBracketService;
use App\Services\StandingsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index(
        Request $request,
        StandingsService $standingsService,
        PlayoffBracketService $bracketService,
    ) {
        $season = $request->filled('season')
            ? Season::findOrFail($request->integer('season'))
            : Season::where('is_active', true)->firstOrFail();

        $standings = $standingsService->getStandings($season->id);
        $games = Game::with(['homeTeam', 'awayTeam'])
            ->where('season_id', $season->id)
            ->orderBy('game_date')->get();

        return Inertia::render('table', [
            'season' => $season,
            'standings' => $standings,
            'games' => $games,
            'playoffBracket' => $bracketService->build($season, $standings),
        ]);
    }
}
