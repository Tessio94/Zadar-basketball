<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class ArticleGameController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $input = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);
        $search = trim($input['search'] ?? '');
        $games = Game::query()->with(['homeTeam', 'awayTeam', 'season'])
            ->when($search !== '', function($query) use ($search): void {
                $query->where(function($query) use ($search): void {
                    if (ctype_digit($search)) {
                        $query->orWhere('id', (int) $search);
                    }
                    $query->orWhereHas('homeTeam', fn($team) => $team->whereLike('name', '%' . $search . '%'))
                        ->orWhereHas('awayTeam', fn($team) => $team->whereLike('name', '%' . $search . '%'))
                        ->orWhereHas('season', fn($season) => $season->whereLike('name', '%' . $search . '%'));
                });
            })
            ->orderByDesc('game_date')->orderByDesc('id')->paginate(20);

        return response()->json([
            'data' => $games->getCollection()->map(fn(Game $game): array => [
                'id' => $game->id,
                'label' => '#' . $game->id . ' · ' . $game->homeTeam->name . ' — ' . $game->awayTeam->name . ' · ' . $game->season->name . ' · ' . substr((string) $game->game_date, 0, 10) . ' · ' . $game->status,
            ]),
            'current_page' => $games->currentPage(),
            'last_page' => $games->lastPage(),
        ]);
    }
}
