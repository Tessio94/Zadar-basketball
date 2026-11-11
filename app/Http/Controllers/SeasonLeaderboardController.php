<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Season;
use Illuminate\Http\Request;
use App\Services\SeasonLeaderboardService;

class SeasonLeaderboardController extends Controller
{
    public function __invoke(Request $request, string $category, SeasonLeaderboardService $leaderboards): Response
    {
        $filters = $request->validate([
            'season' => ['nullable', 'integer', 'min:1'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);
        $season = isset($filters['season'])
            ? Season::findOrFail($filters['season'])
            : Season::where('is_active', true)->firstOrFail();

        return Inertia::render('statistics/category', [
            'season' => $season,
            'category' => $leaderboards->category($category, (int) $season->id),
            'leaders' => $leaderboards->paginate($category, (int) $season->id),
            'backUrl' => route('stats.index', ['season' => $season->id], false),
        ]);
    }
}
