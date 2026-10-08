<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Services\StandingsService;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\Season;
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

        $games = Game::with(['homeTeam', 'awayTeam'])
            ->where('season_id', $season->id)
            ->orderBy('game_date')
            ->get();

        $lastRound = Game::max('round_number');

        $lastRoundGames = Game::with(['homeTeam', 'awayTeam'])
            ->where('season_id', $season->id)
            ->where('round_number', $lastRound)
            ->orderBy('game_date')
            ->get();

        return Inertia::render('games', [
            'season' => $season,
            'games' => $games,
            'lastRoundGames' => $lastRoundGames,
            'lastRound' => $lastRound,
        ]);
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

        return Inertia::render('game', [
            'games' => $games,
            'game' => $game,
            'leaders' => $leaders,
        ]);
    }
}
