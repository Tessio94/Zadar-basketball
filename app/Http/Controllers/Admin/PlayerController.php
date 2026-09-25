<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Models\Season;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'sort' => ['nullable', 'in:first_name,last_name'],
            'direction' => ['nullable', 'in:asc,desc']
        ]);

        $search = $validated['search'] ?? null;
        $sort = $validated['sort'] ?? 'last_name';
        $direction = $validated['direction'] ?? 'asc';

        $players = Player::query()
            ->with([
                'teamAssignments.team',
                'teamAssignments.season',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query
                        ->where('first_name', 'ilike', "%{$search}%")
                        ->orWhere('last_name', 'ilike', "%{$search}%");
                });
            })
            ->orderBy($sort, $direction)
            ->paginate(20)
            ->withQueryString();

         return Inertia::render('admin/igraci/players', [
            'players' => $players,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/igraci/createPlayer', [
            'teams' => Team::orderBy('name')->get(),
            'seasons' => Season::orderByDesc('start_date')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'date_of_birth' => 'nullable|date',
            'height' => ['nullable', 'integer', 'min:100', 'max:250'],
            'position' => ['nullable', 'string', 'max:50'],
            'season_id' => ['required', 'exists:seasons,id'],
            'team_id' => ['required', 'exists:teams,id'],
            'jersey_number' => ['nullable', 'integer', 'min:0', 'max:99'],
        ]);

        DB::transaction(function () use ($validated) {
            $player = Player::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'height' => $validated['height'] ?? null,
                'position' => $validated['position'] ?? null,
            ]);

            $player->teamAssignments()->create([
                'season_id' => $validated['season_id'],
                'team_id' => $validated['team_id'],
                'jersey_number' => $validated['jersey_number'] ?? null,
            ]);
        });

          return redirect()
            ->route('igraci.index')
            ->with('success', 'Igrač je uspješno kreiran.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        $player->load([
            'teamAssignments' => function ($query) {
                $query->latest();
            },
            'teamAssignments.team',
            'teamAssignments.season',
        ]);

        return Inertia::render('admin/igraci/editPlayer', [
            'player' => [
                'id' => $player->id,
                'first_name' => $player->first_name,
                'last_name' => $player->last_name,
                'date_of_birth' => $player->date_of_birth?->format('Y-m-d'),
                'height' => $player->height,
                'position' => $player->position,
                'team_assignments' => $player->teamAssignments,
            ],
            'teams' => Team::orderBy('name')->get(),
            'seasons' => Season::orderByDesc('start_date')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        if ($player->logo) {
            Storage::disk('public')->delete($player->slika);
        }

        $player->delete();

        return redirect()->back();
    }
}
