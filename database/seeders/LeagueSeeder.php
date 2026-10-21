<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerGameStat;
use App\Models\Playoff;
use App\Models\Season;
use App\Models\Team;
use App\Models\TeamSeason;
use App\Services\StandingsService;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\CarbonInterface;
use RuntimeException;
use Throwable;

class LeagueSeeder extends Seeder
{
    private const ACTIVE_FINISHED_ROUNDS = 4;

    /** @var list<string> */
    private array $createdLogoPaths = [];

    public function run(): void
    {
        $this->createdLogoPaths = [];

        try {
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
                        'start_date' => now()->startOfDay()->subDays(28),
                        'end_date' => now()->startOfDay()->addMonths(4),
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
        } catch (Throwable $exception) {
            // Database rollback does not remove filesystem writes.
            if ($this->createdLogoPaths !== []) {
                Storage::disk('public')->delete($this->createdLogoPaths);
            }
            throw $exception;
        }
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
                'logo' => $this->storeTeamLogo($teamData['logo']),
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

        $this->seedRegularGames($season, $teams, $teamSeasons, $matchups);

        // Only the two historical seasons get completed playoff brackets.
        if (! $season->is_active) {
            $this->seedPlayoffs($season, $teams, $teamSeasons);
        }
    }

    private function seedRegularGames(
        Season $season,
        Collection $teams,
        Collection $teamSeasons,
        Collection $matchups,
    ): void {
        $gamesPerRound = intdiv($teams->count(), 2);
        $finishedGameCount = min(
            self::ACTIVE_FINISHED_ROUNDS * $gamesPerRound,
            $matchups->count(),
        );
        $today = now()->startOfDay();

        foreach ($matchups->values() as $index => $match) {
            $roundNumber = intdiv($index, $gamesPerRound) + 1;
            $upcoming = $season->is_active && $index >= $finishedGameCount;

            if ($upcoming) {
                $date = $today->copy()
                    ->addDays($index - $finishedGameCount + 1)
                    ->setTime(20, 0);

                Game::create([
                    'season_id' => $season->id,
                    'home_team_id' => $match['home']->id,
                    'away_team_id' => $match['away']->id,
                    'game_date' => $date,
                    'round_number' => $roundNumber,
                    'status' => 'scheduled',
                    'home_score' => 0,
                    'away_score' => 0,
                ]);

                // No result or player statistics before the fixture is played.
                continue;
            }

            $date = $season->is_active
                ? $today->copy()->subDays($finishedGameCount - $index)->setTime(20, 0)
                : Carbon::parse($season->start_date)->addDays($index + 1)->setTime(20, 0);

            $this->createFinishedGame(
                season: $season,
                home: $match['home'],
                away: $match['away'],
                teamSeasons: $teamSeasons,
                date: $date,
                roundNumber: $roundNumber,
            );
        }
    }

    private function storeTeamLogo(string $filename): string
    {
        $source = public_path('images/teams/' . $filename);
        if (! is_file($source)) {
            throw new RuntimeException("Missing seed logo: {$source}");
        }

        // Same public disk, directory and generated filenames as TeamController.
        $path = Storage::disk('public')->putFile('teams', new File($source));
        if ($path === false) {
            throw new RuntimeException("Could not store seed logo: {$filename}");
        }
        $this->createdLogoPaths[] = $path;

        return $path;
    }

    private function createFinishedGame(
        Season $season,
        Team $home,
        Team $away,
        Collection $teamSeasons,
        CarbonInterface $date,
        int $roundNumber,
        ?Playoff $playoff = null,
        ?string $playoffRound = null,
    ): Game {
        $game = new Game([
            'season_id' => $season->id,
            'home_team_id' => $home->id,
            'away_team_id' => $away->id,
            'game_date' => $date,
            'round_number' => $roundNumber,
            'status' => 'finished',
        ]);

        // Explicit assignment works with your current Game::$fillable.
        $game->playoff_id = $playoff?->id;
        $game->playoff_round = $playoffRound;
        $game->save();

        $this->generateBoxscore($game, $teamSeasons->get($home->id));
        $this->generateBoxscore($game, $teamSeasons->get($away->id));

        $homePoints = (int) $game->playerStats()->where('team_id', $home->id)->sum('points');
        $awayPoints = (int) $game->playerStats()->where('team_id', $away->id)->sum('points');

        // A finished basketball game must have a winner. Add one made free
        // throw to a player's line, keeping the box score and total consistent.
        if ($homePoints === $awayPoints) {
            $winnerId = rand(0, 1) === 0 ? $home->id : $away->id;
            $stat = $game->playerStats()->where('team_id', $winnerId)->firstOrFail();
            $stat->update([
                'ft_attempted' => $stat->ft_attempted + 1,
                'ft_made' => $stat->ft_made + 1,
                'points' => $stat->points + 1,
                'efficiency' => $stat->efficiency + 1,
            ]);
            if ($winnerId === $home->id) {
                $homePoints++;
            } else {
                $awayPoints++;
            }
        }

        $game->update(['home_score' => $homePoints, 'away_score' => $awayPoints]);
        $this->assignPlusMinus($game, $home, $away, $homePoints - $awayPoints);

        return $game;
    }

    private function seedPlayoffs(
        Season $season,
        Collection $teams,
        Collection $teamSeasons,
    ): void {
        // StandingsService excludes playoff games and uses wins, difference,
        // then team ID as a deterministic fallback for a complete tie.
        $standings = app(StandingsService::class)->getStandings($season->id)->take(8);
        if ($standings->count() !== 8) {
            throw new RuntimeException('The playoff bracket requires eight teams.');
        }
        $teamsById = $teams->keyBy('id');
        $seededTeams = $standings->map(fn (array $row): Team => $teamsById->get($row['id']))->values();
        $seeds = $seededTeams->mapWithKeys(fn (Team $team, int $index): array => [$team->id => $index + 1]);

        $regularGames = $season->games()->whereNull('playoff_id');
        $lastRegularDate = Carbon::parse((clone $regularGames)->max('game_date'));
        $lastRegularRound = (int) (clone $regularGames)->max('round_number');
        $quarterfinalStart = $lastRegularDate->copy()->addDays(7);

        $playoff = Playoff::create([
            'season_id' => $season->id,
            'name' => 'Doigravanje ' . $season->name,
        ]);

        // Quarterfinals: 1-8, 2-7, 3-6, 4-5.
        $quarterfinalWinners = collect();
        foreach ([[0, 7], [1, 6], [2, 5], [3, 4]] as [$higher, $lower]) {
            $quarterfinalWinners->push($this->playSeries(
                $season, $playoff, $seededTeams[$higher], $seededTeams[$lower],
                $teamSeasons, $seeds, 'quarterfinal', $lastRegularRound + 1,
                $quarterfinalStart,
            ));
        }

        // Fixed bracket: winner(1-8) v winner(4-5), winner(2-7) v winner(3-6).
        $semifinalStart = $quarterfinalStart->copy()->addDays(10);
        $finalists = collect();
        foreach ([[0, 3], [1, 2]] as [$first, $second]) {
            $finalists->push($this->playSeries(
                $season, $playoff, $quarterfinalWinners[$first], $quarterfinalWinners[$second],
                $teamSeasons, $seeds, 'semifinal', $lastRegularRound + 2,
                $semifinalStart,
            ));
        }

        $this->playSeries(
            $season, $playoff, $finalists[0], $finalists[1],
            $teamSeasons, $seeds, 'final', $lastRegularRound + 3,
            $semifinalStart->copy()->addDays(10),
        );
    }

    private function playSeries(
        Season $season,
        Playoff $playoff,
        Team $first,
        Team $second,
        Collection $teamSeasons,
        Collection $seeds,
        string $round,
        int $roundNumber,
        CarbonInterface $startDate,
    ): Team {
        // Higher regular-season seed hosts games one and three (H-A-H).
        [$higher, $lower] = $seeds[$first->id] < $seeds[$second->id]
            ? [$first, $second]
            : [$second, $first];
        $wins = [$higher->id => 0, $lower->id => 0];

        for ($gameNumber = 1; $gameNumber <= 3; $gameNumber++) {
            $home = $gameNumber === 2 ? $lower : $higher;
            $away = $gameNumber === 2 ? $higher : $lower;
            $game = $this->createFinishedGame(
                $season, $home, $away, $teamSeasons,
                $startDate->copy()->addDays(($gameNumber - 1) * 3),
                $roundNumber, $playoff, $round,
            );
            $winner = $game->home_score > $game->away_score ? $home : $away;
            $wins[$winner->id]++;

            if ($wins[$winner->id] === 2) {
                return $winner;
            }
        }

        throw new RuntimeException('A best-of-three series must have a winner.');
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
