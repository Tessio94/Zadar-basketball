<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerGameStat;
use App\Models\Season;
use App\Models\Team;
use App\Models\TeamSeason;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LeagueSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {

            /*
             * ---------------------------------------------------------
             * 1. Create real-world teams ONCE
             * ---------------------------------------------------------
             */

            $teams = $this->createTeams();

            /*
             * ---------------------------------------------------------
             * 2. Create real-world players ONCE
             *
             * Players are not tied to a season here.
             * The same Player record can therefore appear in multiple
             * seasons through team_season_players.
             * ---------------------------------------------------------
             */

            $playersByTeam = $this->createPlayers($teams);

            /*
             * ---------------------------------------------------------
             * 3. Create seasons
             * ---------------------------------------------------------
             */

            $seasonsData = [
                [
                    'name' => '2025-2026',
                    'start_date' => now()->subYear(),
                    'end_date' => now()->subYear()->addMonths(8),
                    'is_active' => true,
                ],
                [
                    'name' => '2024-2025',
                    'start_date' => now()->subYears(2),
                    'end_date' => now()->subYears(2)->addMonths(8),
                    'is_active' => false,
                ],
                [
                    'name' => '2023-2024',
                    'start_date' => now()->subYears(3),
                    'end_date' => now()->subYears(3)->addMonths(8),
                    'is_active' => false,
                ],
            ];

            foreach ($seasonsData as $seasonData) {
                $season = Season::create($seasonData);

                $this->seedSeason(
                    season: $season,
                    teams: $teams,
                    playersByTeam: $playersByTeam,
                );
            }
        });
    }

    /*
     * -------------------------------------------------------------
     * Create real-world teams.
     *
     * IMPORTANT:
     * There is only one Team record per real-world team.
     * -------------------------------------------------------------
     */

    private function createTeams(): Collection
    {
        $teamsData = [
            [
                'name' => 'KK Vodovod Ballers',
                'logo' => 'vodovod.png',
                'logo_color' => '#2f92d0',
            ],
            [
                'name' => 'KK Jadera',
                'logo' => 'jadera.webp',
                'logo_color' => '#192a6d',
            ],
            [
                'name' => 'KK Sfinga Staffordi',
                'logo' => 'sfinga.jpg',
                'logo_color' => '#505050',
            ],
            [
                'name' => 'KK Voštarnica',
                'logo' => 'vostarnica.png',
                'logo_color' => '#0a682c',
            ],
            [
                'name' => 'KK Voštarnica Veterani',
                'logo' => 'vosta.png',
                'logo_color' => '#0a682c',
            ],
            [
                'name' => 'KK Sabunjar Privlaka',
                'logo' => 'sabunjar.png',
                'logo_color' => '#f2eb3d',
            ],
            [
                'name' => 'KK Zaglav',
                'logo' => 'zaglav.png',
                'logo_color' => '#7fcbf9',
            ],
            [
                'name' => 'KK Brodarica',
                'logo' => 'brodarica.png',
                'logo_color' => '#352e70',
            ],
        ];

        return collect($teamsData)->map(function (array $teamData): Team {
            return Team::create([
                'name' => $teamData['name'],
                'short_name' => Str::upper(
                    Str::substr($teamData['name'], 3, 3)
                ),
                'logo' => '/images/teams/' . $teamData['logo'],
                'logo_color' => $teamData['logo_color'],
                'city' => 'Zadar',
            ]);
        });
    }

    /*
     * -------------------------------------------------------------
     * Create players ONCE.
     *
     * Each team receives 12 real-world Player records.
     *
     * These same players are reused in every season.
     *
     * Example:
     *
     * Player #1
     *   -> Vodovod / 2023-2024
     *   -> Vodovod / 2024-2025
     *   -> Vodovod / 2025-2026
     *
     * -------------------------------------------------------------
     */

    private function createPlayers(Collection $teams): Collection
    {
        $playersByTeam = collect();

        foreach ($teams as $team) {
            $players = Player::factory()
                ->count(12)
                ->create();

            $playersByTeam->put($team->id, $players);
        }

        return $playersByTeam;
    }

    /*
     * -------------------------------------------------------------
     * Seed one season.
     * -------------------------------------------------------------
     */

    private function seedSeason(
        Season $season,
        Collection $teams,
        Collection $playersByTeam,
    ): void {
        /*
         * ---------------------------------------------------------
         * Create TeamSeason records.
         *
         * Team remains the same.
         * TeamSeason changes per season.
         * ---------------------------------------------------------
         */

        $teamSeasons = collect();

        foreach ($teams as $team) {
            $teamSeason = TeamSeason::create([
                'team_id' => $team->id,
                'season_id' => $season->id,
            ]);

            /*
             * Attach the same real-world players to this team's
             * roster for this particular season.
             *
             * Jersey number can change between seasons.
             */

            $players = $playersByTeam->get($team->id);

            foreach ($players as $player) {
                $teamSeason->players()->attach($player->id, [
                    'jersey_number' => rand(4, 15),
                ]);
            }

            $teamSeason->load('players');

            $teamSeasons->put($team->id, $teamSeason);
        }

        /*
         * ---------------------------------------------------------
         * Create balanced schedule.
         *
         * With 8 teams this creates:
         *
         * 8 * 7 / 2 = 28 games
         *
         * Each team therefore plays 7 games.
         * ---------------------------------------------------------
         */

        $matchups = collect();

        for ($i = 0; $i < $teams->count(); $i++) {
            for ($j = $i + 1; $j < $teams->count(); $j++) {
                $matchups->push([
                    'home' => $teams[$i],
                    'away' => $teams[$j],
                ]);
            }
        }

        $matchups = $matchups->shuffle();

        /*
         * ---------------------------------------------------------
         * Create games and box scores.
         * ---------------------------------------------------------
         */

        foreach ($matchups->values() as $index => $match) {
            $homeTeam = $match['home'];
            $awayTeam = $match['away'];

            $homeTeamSeason = $teamSeasons->get($homeTeam->id);
            $awayTeamSeason = $teamSeasons->get($awayTeam->id);

            $game = Game::create([
                'season_id' => $season->id,
                'home_team_id' => $homeTeam->id,
                'away_team_id' => $awayTeam->id,
                'game_date' => $season->start_date->copy()->addDays($index + 1),
                'round_number' => (int) ceil(($index + 1) / 4),
                'status' => 'finished',
            ]);

            /*
             * Generate player stats from the roster belonging to
             * this particular TeamSeason.
             */

            $this->generateBoxscore(
                game: $game,
                teamSeason: $homeTeamSeason,
            );

            $this->generateBoxscore(
                game: $game,
                teamSeason: $awayTeamSeason,
            );

            /*
             * -----------------------------------------------------
             * Calculate final score from player statistics.
             * -----------------------------------------------------
             */

            $homePoints = PlayerGameStat::query()
                ->where('game_id', $game->id)
                ->where('team_id', $homeTeam->id)
                ->sum('points');

            $awayPoints = PlayerGameStat::query()
                ->where('game_id', $game->id)
                ->where('team_id', $awayTeam->id)
                ->sum('points');

            $game->update([
                'home_score' => $homePoints,
                'away_score' => $awayPoints,
            ]);

            /*
             * -----------------------------------------------------
             * Generate plus/minus.
             * -----------------------------------------------------
             */

            $margin = $homePoints - $awayPoints;

            $this->assignPlusMinus(
                game: $game,
                home: $homeTeam,
                away: $awayTeam,
                margin: $margin,
            );
        }
    }

    /*
     * -------------------------------------------------------------
     * Generate box score for a team's roster in a particular
     * season.
     * -------------------------------------------------------------
     */

    private function generateBoxscore(
        Game $game,
        TeamSeason $teamSeason,
    ): void {
        $players = $teamSeason->players->shuffle();

        foreach ($players as $index => $player) {
            $isStarter = $index < 5;

            /*
             * Starters play more minutes.
             */

            $minutes = $isStarter
                ? rand(20, 35)
                : rand(5, 20);

            /*
             * Two-point shooting.
             */

            $fg2a = rand(0, 10);
            $fg2m = rand(0, $fg2a);

            /*
             * Three-point shooting.
             */

            $fg3a = rand(0, 8);
            $fg3m = rand(0, $fg3a);

            /*
             * Free throws.
             */

            $fta = rand(0, 6);
            $ftm = rand(0, $fta);

            /*
             * Points.
             */

            $points = ($fg2m * 2)
                + ($fg3m * 3)
                + $ftm;

            /*
             * Rebounds.
             */

            $rebOff = rand(0, 3);
            $rebDef = rand(0, 7);

            /*
             * Other statistics.
             */

            $assists = rand(0, 8);
            $steals = rand(0, 4);
            $blocks = rand(0, 3);
            $turnovers = rand(0, 5);
            $fouls = rand(0, 5);

            /*
             * Efficiency.
             */

            $efficiency = $points
                + $rebOff
                + $rebDef
                + $assists
                + $steals
                + $blocks
                - $turnovers;

            /*
             * -----------------------------------------------------
             * IMPORTANT:
             *
             * season is NOT stored on PlayerGameStat.
             *
             * The season comes from:
             *
             * PlayerGameStat
             *     -> Game
             *         -> Season
             *
             * team_id identifies the team the player represented
             * in this particular game.
             * -----------------------------------------------------
             */

            PlayerGameStat::create([
                'game_id' => $game->id,
                'player_id' => $player->id,
                'team_id' => $teamSeason->team_id,

                'minutes_played' => $minutes,
                'points' => $points,

                'fg2_made' => $fg2m,
                'fg2_attempted' => $fg2a,

                'fg3_made' => $fg3m,
                'fg3_attempted' => $fg3a,

                'ft_made' => $ftm,
                'ft_attempted' => $fta,

                'offensive_rebounds' => $rebOff,
                'defensive_rebounds' => $rebDef,

                'assists' => $assists,
                'steals' => $steals,
                'blocks' => $blocks,

                'turnovers' => $turnovers,
                'fouls' => $fouls,

                'efficiency' => $efficiency,

                'is_starter' => $isStarter,
                'plus_minus' => 0,
            ]);
        }
    }

    /*
     * -------------------------------------------------------------
     * Assign plus/minus.
     * -------------------------------------------------------------
     */

    private function assignPlusMinus(
        Game $game,
        Team $home,
        Team $away,
        int $margin,
    ): void {
        /*
         * Home team
         */

        $homeStats = PlayerGameStat::query()
            ->where('game_id', $game->id)
            ->where('team_id', $home->id)
            ->get();

        foreach ($homeStats as $stat) {
            $variation = rand(-5, 5);

            $stat->update([
                'plus_minus' => $margin + $variation,
            ]);
        }

        /*
         * Away team
         */

        $awayStats = PlayerGameStat::query()
            ->where('game_id', $game->id)
            ->where('team_id', $away->id)
            ->get();

        foreach ($awayStats as $stat) {
            $variation = rand(-5, 5);

            $stat->update([
                'plus_minus' => (-$margin) + $variation,
            ]);
        }
    }
}
