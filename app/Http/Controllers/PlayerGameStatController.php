<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PlayerGameStat;
use App\Services\StatisticsService;
use App\Http\Requests\StorePlayerGameStatRequest;
use App\Http\Requests\UpdatePlayerGameStatRequest;
use App\Models\Season;
use Illuminate\Http\Request;

class PlayerGameStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, StatisticsService $stats)
    {
        $season = $request->filled('season')
            ? Season::findOrFail($request->integer('season'))
            : Season::where('is_active', true)->firstOrFail();

        return Inertia::render('statistics', [
            'season' => $season,
            'leaders' => $stats->seasonLeaders($season->id),
            'lastRound' => $stats->lastRoundLeaders(),
            'bestPerformances' => $stats->seasonBestPerformances($season->id),
        ]);

    }

}
