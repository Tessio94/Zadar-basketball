<?php

namespace Database\Seeders;

use App\Models\Season;
use App\Models\Team;
use App\Models\Player;
use App\Models\Game;
use App\Models\PlayerGameStat;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class LeagueSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {

            // 1 Create Season
            $season = Season::create([
                'name' => '2025-2026',
                'start_date' => now(),
                'end_date' => now()->addMonths(8),
                'is_active' => true,
            ]);

            // 2 Create Teams (Your real ones)
            $teamsData = [
                ['name' => 'KK Vodovod Ballers', 'logo' => 'vodovod.png'],
                ['name' => 'KK Jadera', 'logo' => 'jadera.webp'],
                ['name' => 'KK Sfinga Staffordi', 'logo' => 'sfinga.jpg'],
                ['name' => 'KK Voštarnica', 'logo' => 'vostarnica.png'],
                ['name' => 'KK Voštarnica Veterani', 'logo' => 'vosta.png'],
                ['name' => 'KK Sabunjar Privlaka', 'logo' => 'sabunjar.png'],
                ['name' => 'KK Zaglav', 'logo' => 'zaglav.png'],
                ['name' => 'KK Brodarica', 'logo' => 'brodarica.png'],
            ];

            $teams = collect();

            foreach ($teamsData as $teamData) {
                $team = Team::create([
                    'name' => $teamData['name'],
                    'short_name' => Str::upper(Str::substr($teamData['name'], 3, 3)),
                    'logo' => '/images/teams/' . $teamData['logo'],
                    'city' => 'Zadar',
                ]);

                $teams->push($team);

                // 3️ Create 12 players per team
                $players = Player::factory()->count(12)->create();

                foreach ($players as $index => $player) {
                    $team->players()->attach($player->id, [
                        'season_id' => $season->id,
                        'jersey_number' => rand(4, 15),
                    ]);
                }
            }

            // Create balanced schedule (max 1 game difference)

            $matchups = collect();

            // Generate all unique team combinations (round robin)
            for ($i = 0; $i < $teams->count(); $i++) {
                for ($j = $i + 1; $j < $teams->count(); $j++) {

                    $matchups->push([
                        'home' => $teams[$i],
                        'away' => $teams[$j],
                    ]);
                }
            }

            // Shuffle matchups
            $matchups = $matchups->shuffle();

            // Take only 30 games (or however many you want)
            $gamesToPlay = $matchups->take(40)->values();

            foreach ($gamesToPlay as $index => $match) {

                $game = Game::create([
                    'season_id' => $season->id,
                    'home_team_id' => $match['home']->id,
                    'away_team_id' => $match['away']->id,
                    'game_date' => now()->addDays($index + 1),
                    'round_number' => ceil(($index + 1) / 4),
                    'status' => 'finished',
                ]);

                $this->generateBoxscore($game, $match['home']);
                $this->generateBoxscore($game, $match['away']);

                // Update final score
                $homePoints = PlayerGameStat::where('game_id', $game->id)
                    ->where('team_id', $match['home']->id)
                    ->sum('points');

                $awayPoints = PlayerGameStat::where('game_id', $game->id)
                    ->where('team_id', $match['away']->id)
                    ->sum('points');

                $game->update([
                    'home_score' => $homePoints,
                    'away_score' => $awayPoints,
                ]);

                $margin = $homePoints - $awayPoints;

                $this->assignPlusMinus($game, $match['home'], $match['away'], $margin);
            }
        });
    }

    private function generateBoxscore($game, $team)
    {
        $players = $team->players->shuffle();

        foreach ($players as $index => $player) {

            $isStarter = $index < 5;

            // Starters play more minutes
            $minutes = $isStarter ? rand(20, 35) : rand(5, 20);

            $fg2a = rand(0, 10);
            $fg2m = rand(0, $fg2a);

            $fg3a = rand(0, 8);
            $fg3m = rand(0, $fg3a);

            $fta = rand(0, 6);
            $ftm = rand(0, $fta);

            $points = ($fg2m * 2) + ($fg3m * 3) + $ftm;

            $rebOff = rand(0, 3);
            $rebDef = rand(0, 7);

            $assists = rand(0, 8);
            $steals = rand(0, 4);
            $blocks = rand(0, 3);
            $turnovers = rand(0, 5);
            $fouls = rand(0, 5);

            $eff = $points
                + $rebOff + $rebDef
                + $assists + $steals + $blocks
                - $turnovers;

            PlayerGameStat::create([
                'game_id' => $game->id,
                'player_id' => $player->id,
                'team_id' => $team->id,
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
                'efficiency' => $eff,
                'is_starter' => $isStarter,
                'plus_minus' => 0,
            ]);
        }
    }

    private function assignPlusMinus($game, $home, $away, $margin)
    {
        // Home team
        $homeStats = PlayerGameStat::where('game_id', $game->id)
            ->where('team_id', $home->id)
            ->get();

        foreach ($homeStats as $stat) {

            // Starters influenced more
            $variation = rand(-5, 5);

            $stat->update([
                'plus_minus' => $margin + $variation
            ]);
        }

        // Away team
        $awayStats = PlayerGameStat::where('game_id', $game->id)
            ->where('team_id', $away->id)
            ->get();

        foreach ($awayStats as $stat) {

            $variation = rand(-5, 5);

            $stat->update([
                'plus_minus' => (-$margin) + $variation
            ]);
        }
    }
}
