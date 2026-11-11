<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\Player;
use App\Models\Season;
use App\Models\TeamSeason;
use App\Models\PlayerGameStat;
use Illuminate\Support\Facades\DB;
use App\Services\TeamStatisticsService;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function(): void {
    $this->withoutVite();
    $this->season = Season::create(['name' => '2026-2027', 'start_date' => '2026-09-01', 'end_date' => '2027-07-01', 'is_active' => true]);
    $this->oldSeason = Season::create(['name' => '2025-2026', 'start_date' => '2025-09-01', 'end_date' => '2026-07-01', 'is_active' => false]);
    $this->team = Team::create(['name' => 'Test team']);
    $this->opponent = Team::create(['name' => 'Opponent']);
    $this->teamSeason = TeamSeason::create(['team_id' => $this->team->id, 'season_id' => $this->season->id]);
});

function teamStatisticsGame(Season $season, Team $home, Team $away, int $homeScore = 80, int $awayScore = 70, string $status = 'finished'): Game
{
    return Game::create([
        'season_id' => $season->id, 'home_team_id' => $home->id, 'away_team_id' => $away->id,
        'home_score' => $homeScore, 'away_score' => $awayScore, 'status' => $status,
        'game_date' => '2026-11-08 11:30:00', 'round_number' => 1,
    ]);
}

function teamStatisticsPlayer(TeamSeason $teamSeason, string $name = 'Player', ?int $jersey = 0): Player
{
    $player = Player::create(['first_name' => $name, 'last_name' => 'Test']);
    $teamSeason->players()->attach($player, ['jersey_number' => $jersey]);

    return $player;
}

function teamStatisticsLine(Game $game, Team $team, Player $player, array $values = []): PlayerGameStat
{
    return PlayerGameStat::create([
        'game_id' => $game->id, 'team_id' => $team->id, 'player_id' => $player->id,
        ...$values,
    ]);
}

it('uses official home and away results and weighted player shooting while preserving stored efficiency', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason);
    $home = teamStatisticsGame($this->season, $this->team, $this->opponent);
    $away = teamStatisticsGame($this->season, $this->opponent, $this->team, 75, 65);
    teamStatisticsLine($home, $this->team, $player, [
        'minutes_played' => 10, 'points' => 20, 'fg2_made' => 1, 'fg2_attempted' => 2,
        'fg3_made' => 1, 'fg3_attempted' => 1, 'offensive_rebounds' => 1,
        'defensive_rebounds' => 3, 'assists' => 2, 'efficiency' => -9,
    ]);
    teamStatisticsLine($away, $this->team, $player, [
        'minutes_played' => 31, 'points' => 30, 'fg2_made' => 8, 'fg2_attempted' => 10,
        'fg3_made' => 1, 'fg3_attempted' => 5, 'ft_made' => 4, 'ft_attempted' => 5,
        'offensive_rebounds' => 2, 'defensive_rebounds' => 2, 'assists' => 7, 'efficiency' => 3,
    ]);

    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['summary'])->toMatchArray([
        'games_played' => 2, 'wins' => 1, 'losses' => 1, 'draws' => 0,
        'points_for' => 145, 'points_against' => 145, 'score_difference' => 0,
        'points_per_game' => 72.5, 'points_allowed_per_game' => 72.5, 'boxscore_games' => 2,
    ]);
    $row = $stats['players'][0];
    expect($row['jersey_number'])->toBe(0)
        ->and($row['games_played'])->toBe(2)
        ->and($row['totals']['points'])->toBe(50)
        ->and($row['totals']['rebounds'])->toBe(8)
        ->and($row['averages']['minutes_played'])->toBe(20.5)
        ->and($row['averages']['assists'])->toBe(4.5)
        ->and($row['averages']['efficiency'])->toBe(-3.0)
        ->and($row['shooting']['fg2']['percentage'])->toBe(75.0)
        ->and($row['shooting']['fg']['percentage'])->toBe(61.1)
        ->and($row['shooting']['fg3']['percentage'])->toBe(33.3)
        ->and($row['shooting']['ft']['percentage'])->toBe(80.0);
    expect($stats['summary']['shooting']['fg2']['percentage'])->toBe(75.0)
        ->and($stats['summary']['averages']['rebounds'])->toBe(4.0);
});

it('excludes scheduled games other seasons other teams and unrelated fixtures', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason);
    $game = teamStatisticsGame($this->season, $this->team, $this->opponent);
    teamStatisticsLine($game, $this->team, $player, ['points' => 11]);
    $scheduled = teamStatisticsGame($this->season, $this->team, $this->opponent, 100, 80, 'scheduled');
    teamStatisticsLine($scheduled, $this->team, $player, ['points' => 999]);
    $old = teamStatisticsGame($this->oldSeason, $this->team, $this->opponent);
    teamStatisticsLine($old, $this->team, $player, ['points' => 888]);
    $outside = Player::create(['first_name' => 'Opponent', 'last_name' => 'Only']);
    teamStatisticsLine($game, $this->opponent, $outside, ['points' => 777]);
    $third = Team::create(['name' => 'Third team']);
    $unrelated = teamStatisticsGame($this->season, $third, $this->opponent);
    teamStatisticsLine($unrelated, $this->team, $player, ['points' => 666]);

    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['summary']['games_played'])->toBe(1)
        ->and($stats['players'])->toHaveCount(1)
        ->and($stats['players'][0]['totals']['points'])->toBe(11)
        ->and($stats['players'][0]['games_played'])->toBe(1);
});

it('returns the entire roster with no top five limit or minimum appearances', function(): void {
    $game = teamStatisticsGame($this->season, $this->team, $this->opponent);
    foreach (range(0, 7) as $number) {
        $player = teamStatisticsPlayer($this->teamSeason, 'Player ' . $number, $number);
        if ($number < 7) {
            teamStatisticsLine($game, $this->team, $player, ['points' => $number]);
        }
    }
    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['players'])->toHaveCount(8)
        ->and($stats['players'][0]['games_played'])->toBe(1)
        ->and($stats['players'][0]['totals']['points'])->toBe(0)
        ->and($stats['players'][7]['games_played'])->toBe(0)
        ->and($stats['players'][7]['averages']['points'])->toBeNull()
        ->and($stats['players'][7]['shooting']['fg']['percentage'])->toBeNull();
});

it('keeps historical contributors without borrowing another teams jersey or statistics', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason, 'Transferred', 0);
    $game = teamStatisticsGame($this->season, $this->team, $this->opponent);
    teamStatisticsLine($game, $this->team, $player, ['points' => 15]);
    $this->teamSeason->players()->detach($player);
    $otherRoster = TeamSeason::create(['team_id' => $this->opponent->id, 'season_id' => $this->season->id]);
    $otherRoster->players()->attach($player, ['jersey_number' => 99]);
    $otherGame = teamStatisticsGame($this->season, $this->opponent, $this->team);
    teamStatisticsLine($otherGame, $this->opponent, $player, ['points' => 60]);

    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['players'])->toHaveCount(1)
        ->and($stats['players'][0]['on_roster'])->toBeFalse()
        ->and($stats['players'][0]['jersey_number'])->toBeNull()
        ->and($stats['players'][0]['totals']['points'])->toBe(15)
        ->and($stats['players'][0]['games_played'])->toBe(1);
});

it('distinguishes missing boxscores from zero statistics and uses the available team game count', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason);
    $one = teamStatisticsGame($this->season, $this->team, $this->opponent);
    teamStatisticsGame($this->season, $this->team, $this->opponent, 90, 75);
    teamStatisticsLine($one, $this->team, $player, ['offensive_rebounds' => 2, 'defensive_rebounds' => 6]);
    $secondPlayer = teamStatisticsPlayer($this->teamSeason, 'Second', null);
    teamStatisticsLine($one, $this->team, $secondPlayer, ['defensive_rebounds' => 4]);

    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['summary']['games_played'])->toBe(2)
        ->and($stats['summary']['boxscore_games'])->toBe(1)
        ->and($stats['summary']['points_per_game'])->toBe(85.0)
        ->and($stats['summary']['averages']['rebounds'])->toBe(12.0)
        ->and($stats['players'][1]['jersey_number'])->toBeNull();
});

it('provides safe empty values for a season without games or player statistics', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason);
    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['summary']['games_played'])->toBe(0)
        ->and($stats['summary']['points_per_game'])->toBeNull()
        ->and($stats['summary']['averages']['rebounds'])->toBeNull()
        ->and($stats['summary']['shooting']['fg2']['percentage'])->toBeNull()
        ->and($stats['players'][0]['id'])->toBe($player->id)
        ->and($stats['players'][0]['games_played'])->toBe(0);

    teamStatisticsGame($this->season, $this->team, $this->opponent);
    $withResult = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($withResult['summary']['points_per_game'])->toBe(80.0)
        ->and($withResult['summary']['boxscore_games'])->toBe(0)
        ->and($withResult['summary']['averages']['assists'])->toBeNull();
});

it('includes finished playoff games in the selected season', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason);
    $playoffId = DB::table('playoffs')->insertGetId(['season_id' => $this->season->id, 'name' => 'Finale']);
    $game = teamStatisticsGame($this->season, $this->team, $this->opponent);
    $game->forceFill(['playoff_id' => $playoffId, 'playoff_round' => 'final'])->save();
    teamStatisticsLine($game, $this->team, $player, ['points' => 18]);
    $stats = app(TeamStatisticsService::class)->forTeamSeason($this->teamSeason);
    expect($stats['summary']['games_played'])->toBe(1)
        ->and($stats['players'][0]['totals']['points'])->toBe(18);
});

it('serves the new statistics contract and changes the data with the season filter', function(): void {
    $player = teamStatisticsPlayer($this->teamSeason, 'Current', 0);
    $oldRoster = TeamSeason::create(['team_id' => $this->team->id, 'season_id' => $this->oldSeason->id]);
    $oldRoster->players()->attach($player, ['jersey_number' => 42]);
    teamStatisticsLine(teamStatisticsGame($this->season, $this->team, $this->opponent), $this->team, $player, ['points' => 11]);
    teamStatisticsLine(teamStatisticsGame($this->oldSeason, $this->team, $this->opponent, 55, 50), $this->team, $player, ['points' => 28]);

    $this->get(route('teams.show', ['team' => $this->team, 'season' => $this->season->id]))
        ->assertOk()->assertInertia(fn(Assert $page) => $page->component('team')
        ->where('stats.summary.points_for', 80)->has('stats.players', 1)
        ->where('stats.players.0.totals.points', 11)->where('stats.players.0.jersey_number', 0));
    $this->get(route('teams.show', ['team' => $this->team, 'season' => $this->oldSeason->id]))
        ->assertOk()->assertInertia(fn(Assert $page) => $page->component('team')
        ->where('season.id', $this->oldSeason->id)->where('stats.summary.points_for', 55)
        ->where('stats.players.0.totals.points', 28)->where('stats.players.0.jersey_number', 42));
});
