<?php

namespace App\Http\Controllers;

use App\Models\PlayerGameStat;
use App\Http\Requests\StorePlayerGameStatRequest;
use App\Http\Requests\UpdatePlayerGameStatRequest;
use App\Models\Game;
use App\Services\StatisticsService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlayerGameStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(StatisticsService $stats)
    {




        return Inertia::render('statistics', [
            'leaders' => $stats->seasonLeaders(),
        ]);

    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerGameStatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PlayerGameStat $playerGameStat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlayerGameStat $playerGameStat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerGameStatRequest $request, PlayerGameStat $playerGameStat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlayerGameStat $playerGameStat)
    {
        //
    }
}
