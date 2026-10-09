<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Season;
use App\Models\PlayerGameStat;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PlayerController extends Controller
{
    public function show(Request $request, Player $player)
    {
        $selectedSeason = $request->filled('season')
            ? Season::findOrFail($request->integer('season'))
            : Season::where('is_active', true)->firstOrFail();

        $player->load([
            'teamSeasons.team',
            'teamSeasons.season',
        ]);

        // Base query: all games played by this player.
        $baseStats = $player->gameStats();

        // Career statistics: all seasons combined.
        $careerStats = [
            'regular' => $this->summarize(
                (clone $baseStats)->whereHas(
                    'game',
                    fn (Builder $q) => $q->whereNull('playoff_id')
                )
            ),
            'playoffs' => $this->summarize(
                (clone $baseStats)->whereHas(
                    'game',
                    fn (Builder $q) => $q->whereNotNull('playoff_id')
                )
            ),
            'total' => $this->summarize(clone $baseStats),
        ];

        // Statistics grouped by season.
        $seasonStats = Season::query()
            ->orderByDesc('start_date')
            ->get()
            ->map(function (Season $season) use ($baseStats) {
                $seasonQuery = fn () => (clone $baseStats)
                    ->whereHas(
                        'game',
                        fn (Builder $q) => $q->where(
                            'season_id',
                            $season->id
                        )
                    );

                return [
                    'season' => $season,
                    'regular' => $this->summarize(
                        $seasonQuery()->whereHas(
                            'game',
                            fn (Builder $q) => $q->whereNull('playoff_id')
                        )
                    ),
                    'playoffs' => $this->summarize(
                        $seasonQuery()->whereHas(
                            'game',
                            fn (Builder $q) => $q->whereNotNull('playoff_id')
                        )
                    ),
                    'total' => $this->summarize($seasonQuery()),
                ];
            });

        // Game history: optionally filter by season.
        $gamesQuery = $player->gameStats()
            ->with([
                'game.season',
                'game.playoff',
                'game.homeTeam',
                'game.awayTeam',
                'team',
            ]);


        $gamesQuery->whereHas(
            'game',
            fn (Builder $q) => $q->where(
                'season_id',
                $selectedSeason->id
            )
        );


        $games = $gamesQuery
            ->whereHas('game')
            ->get()
            ->sortByDesc(fn ($stat) => $stat->game->game_date)
            ->values()
            ->map(function ($stat) {
                $game = $stat->game;

                $stat->opponent = $stat->team_id === $game->home_team_id
                    ? $game->awayTeam
                    : $game->homeTeam;

                return $stat;
            });

        return Inertia::render('player', [
            'player' => $player,
            'careerStats' => $careerStats,
            'seasonStats' => $seasonStats,
            'games' => $games,
            'seasons' => Season::orderByDesc('start_date')->get(),
            'selectedSeason' => $selectedSeason->id,
        ]);
    }

    private function summarize(HasMany $query): array
    {
        $totals = $query->selectRaw('
            COUNT(*) as games,
            COALESCE(SUM(minutes_played), 0) as minutes,
            COALESCE(SUM(points), 0) as points,
            COALESCE(SUM(assists), 0) as assists,
            COALESCE(SUM(blocks), 0) as blocks,
            COALESCE(SUM(steals), 0) as steals,
            COALESCE(SUM(turnovers), 0) as turnovers,
            COALESCE(SUM(offensive_rebounds), 0) as offensive_rebounds,
            COALESCE(SUM(defensive_rebounds), 0) as defensive_rebounds,
            COALESCE(SUM(fg2_made), 0) as fg2_made,
            COALESCE(SUM(fg2_attempted), 0) as fg2_attempted,
            COALESCE(SUM(fg3_made), 0) as fg3_made,
            COALESCE(SUM(fg3_attempted), 0) as fg3_attempted,
            COALESCE(SUM(ft_made), 0) as ft_made,
            COALESCE(SUM(ft_attempted), 0) as ft_attempted,
            COALESCE(SUM(fouls), 0) as fouls,
            COALESCE(SUM(plus_minus), 0) as plus_minus,
            COALESCE(SUM(efficiency), 0) as efficiency
        ')->first();

        $games = (int) $totals->games;

        // Prevent division by zero.
        $average = fn ($value) => $games
            ? round($value / $games, 1)
            : 0;

        $percentage = fn ($made, $attempted) => $attempted
            ? round(($made / $attempted) * 100, 1)
            : 0;

        return [
            'totals' => $totals,
            'averages' => [
                'minutes' => $average($totals->minutes),
                'points' => $average($totals->points),
                'assists' => $average($totals->assists),
                'blocks' => $average($totals->blocks),
                'steals' => $average($totals->steals),
                'turnovers' => $average($totals->turnovers),
                'offensive_rebounds' => $average(
                    $totals->offensive_rebounds
                ),
                'defensive_rebounds' => $average(
                    $totals->defensive_rebounds
                ),
                'rebounds' => $average(
                    $totals->offensive_rebounds
                    + $totals->defensive_rebounds
                ),
                'fg_made' => $average(
                    $totals->fg_made
                ),
                'fg_attempted' => $average(
                    $totals->fg_attempted
                ),
                'fg_percentage' => $percentage(
                    $totals->fg2_made + $totals->fg3_made,
                    $totals->fg2_attempted + $totals->fg3_attempted
                ),
                'fg2_made' => $average(
                    $totals->fg2_made
                ),
                'fg2_attempted' => $average(
                    $totals->fg2_attempted
                ),
                'fg2_percentage' => $percentage(
                    $totals->fg2_made,
                    $totals->fg2_attempted
                ),
                'fg3_made' => $average(
                    $totals->fg3_made
                ),
                'fg3_attempted' => $average(
                    $totals->fg3_attempted
                ),
                'fg3_percentage' => $percentage(
                    $totals->fg3_made,
                    $totals->fg3_attempted
                ),
                'ft_made' => $average(
                    $totals->fg3_made
                ),
                'ft_attempted' => $average(
                    $totals->fg3_attempted
                ),
                'ft_percentage' => $percentage(
                    $totals->ft_made,
                    $totals->ft_attempted
                ),
                'fouls' => $average($totals->fouls),
                'plus_minus' => $average($totals->plus_minus),
                'efficiency' => $average($totals->efficiency),
            ],
        ];
    }
}
