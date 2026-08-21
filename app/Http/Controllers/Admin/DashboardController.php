<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
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
