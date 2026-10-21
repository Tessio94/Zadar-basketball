<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Models\Season;
use App\Services\GameBoxscoreService;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $season = $request->filled('season')
            ? Season::findOrFail($request->integer('season'))
            : Season::where('is_active', true)->firstOrFail();

        $games = $season->games()
            ->whereIn('status', ['finished', 'scheduled'])
            ->with(['homeTeam', 'awayTeam'])
            ->orderBy('game_date')
            ->orderBy('id')
            ->get();

        $finishedGames = $games->where('status', 'finished');

        $lastRound = $finishedGames->max('round_number');

        $lastRoundGames = $finishedGames
            ->where('round_number', $lastRound)
            ->values();

        $upcomingQuery = $season->games()->upcoming();

        $nextGame = (clone $upcomingQuery)
            ->orderBy('game_date')
            ->orderBy('id')
            ->first();

        $upcomingRound = $nextGame?->round_number;

        $upcomingGames = $upcomingRound === null
            ? collect()
            : (clone $upcomingQuery)
                ->where('round_number', $upcomingRound)
                ->with(['homeTeam', 'awayTeam'])
                ->orderBy('game_date')
                ->orderBy('id')
                ->get();

        return Inertia::render('games', [
            'season' => $season,
            'games' => $games,
            'lastRoundGames' => $lastRoundGames,
            'lastRound' => $lastRound,
            'upcomingGames' => $upcomingGames,
            'upcomingRound' => $upcomingRound,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game, GameBoxscoreService $boxscoreService)
    {
        $games = Game::with(['homeTeam', 'awayTeam'])
        ->orderBy('game_date')
        ->get();

        $boxscore = $boxscoreService->prepare($game);

        return Inertia::render('game', [
            'games' => $games,
            'game' => $game,
            'leaders' => $boxscore['leaders'],
            'teamTotals' => $boxscore['teamTotals'],
        ]);
    }
}
