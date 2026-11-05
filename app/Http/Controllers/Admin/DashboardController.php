<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\Game;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if (! $request->user()->can('manage-league')) {
            return to_route('novosti.index');
        }

        // $upcomingGames = Game::query()
        //     ->where('date', '>=', now())
        //     ->orderBy('date')
        //     ->limit(2)
        //     ->get();

        $lastGames = Game::query()
            ->with('homeTeam', 'awayTeam')
            ->where('game_date', '<', now())
            ->orderByDesc('game_date')
            ->limit(5)
            ->get();

        $lastNews = Article::query()
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            // 'upcomingGames' => $upcomingGames,
            // 'lastGames' => $lastGames,
            'lastGames' => $lastGames->toResourceCollection()->resolve(),
            'lastNews' => $lastNews->toResourceCollection()->resolve(),
        ]);
    }
}
