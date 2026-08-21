<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Season;
use App\Http\Requests\StoreSeasonRequest;
use App\Http\Requests\UpdateSeasonRequest;

class SeasonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
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
    public function store(StoreSeasonRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Season $season): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Season $season): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeasonRequest $request, Season $season): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Season $season): void
    {
        //
    }
}
