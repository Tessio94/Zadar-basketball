<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PlayerGameStat;
use App\Services\StatisticsService;
use App\Http\Requests\StorePlayerGameStatRequest;
use App\Http\Requests\UpdatePlayerGameStatRequest;

class PlayerGameStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(StatisticsService $stats)
    {

        return Inertia::render('statistics', [
            'leaders' => $stats->seasonLeaders(),
            'lastRound' => $stats->lastRoundLeaders(),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerGameStatRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PlayerGameStat $playerGameStat): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlayerGameStat $playerGameStat): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerGameStatRequest $request, PlayerGameStat $playerGameStat): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlayerGameStat $playerGameStat): void
    {
        //
    }
}
