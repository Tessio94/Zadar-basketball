<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\Player;
use App\Models\Season;
use App\Models\TeamSeason;
use App\Models\PlayerGameStat;
use App\Services\StatisticsService;
use App\Services\SeasonLeaderboardService;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function(): void {
    $this->withoutVite();
    $this->season = Season::create(['name' => '2026-2027', 'start_date' => '2026-09-01', 'end_date' => '2027-07-01', 'is_active' => true]);
    $this->team = Team::create(['name' => 'Current team', 'logo' => 'teams/current.png', 'logo_color' => '#ff6e00']);
    $this->opponent = Team::create(['name' => 'Opponent']);
    $this->roster = TeamSeason::create(['team_id' => $this->team->id, 'season_id' => $this->season->id]);
    $this->game = seasonLeaderboardGame($this->season, $this->team, $this->opponent);
});

function seasonLeaderboardGame(Season $season, Team $home, Team $away, string $status = 'finished'): Game
{
    return Game::create(['season_id' => $season->id, 'home_team_id' => $home->id, 'away_team_id' => $away->id,
        'game_date' => '2026-11-08 11:30:00', 'round_number' => 1, 'status' => $status, 'home_score' => 80, 'away_score' => 70]);
}

function seasonLeaderboardPlayer(TeamSeason $roster, string $name): Player
{
    $player = Player::create(['first_name' => $name, 'last_name' => 'Test']);
    $roster->players()->attach($player, ['jersey_number' => 0]);

    return $player;
}

function seasonLeaderboardLine(Game $game, Team $team, Player $player, array $fields): void
{
    PlayerGameStat::create(['game_id' => $game->id, 'team_id' => $team->id, 'player_id' => $player->id, ...$fields]);
}

it('paginates all qualifying players thirty at a time with season links and continuous ranks', function(): void {
    for ($i = 1; $i <= 35; $i++) {
        seasonLeaderboardLine($this->game, $this->team, seasonLeaderboardPlayer($this->roster, "Player {$i}"), ['minutes_played' => $i]);
    }
    $url = route('stats.category', ['category' => 'minute-po-utakmici', 'season' => $this->season->id]);
    $this->get($url)->assertOk()->assertInertia(fn(Assert $page) => $page->component('statistics/category')
        ->where('leaders.total', 35)->where('leaders.per_page', 30)->where('leaders.from', 1)->where('leaders.to', 30)
        ->has('leaders.data', 30)->where('leaders.data.0.total', 35)->where('leaders.data.29.total', 6)
        ->where('leaders.data.0.player.teams.0.name', 'Current team')
        ->where('leaders.next_page_url', fn($url) => str_contains($url, 'season=' . $this->season->id) && str_contains($url, 'page=2')));
    $this->get($url . '&page=2')->assertOk()->assertInertia(fn(Assert $page) => $page
        ->has('leaders.data', 5)->where('leaders.from', 31)->where('leaders.to', 35)
        ->where('leaders.data.0.total', 5)->where('leaders.data.4.total', 1));
});

it('orders per game categories by averages rather than career totals', function(): void {
    $a = seasonLeaderboardPlayer($this->roster, 'More total');
    $b = seasonLeaderboardPlayer($this->roster, 'Higher average');
    $second = seasonLeaderboardGame($this->season, $this->team, $this->opponent);
    seasonLeaderboardLine($this->game, $this->team, $a, ['minutes_played' => 30]);
    seasonLeaderboardLine($second, $this->team, $a, ['minutes_played' => 30]);
    seasonLeaderboardLine($this->game, $this->team, $b, ['minutes_played' => 40]);
    $rows = app(SeasonLeaderboardService::class)->paginate('minute-po-utakmici', $this->season->id)->items();
    expect($rows[0]['player']['id'])->toBe($b->id)->and($rows[0]['value'])->toBe(40.0)
        ->and($rows[1]['total'])->toBe(60)->and($rows[1]['games'])->toBe(2)->and($rows[1]['value'])->toBe(30.0);
});

it('weights shooting by attempts and places no attempt percentages after actual zero percent', function(): void {
    $a = seasonLeaderboardPlayer($this->roster, 'Weighted twenty');
    $b = seasonLeaderboardPlayer($this->roster, 'Eighty');
    $c = seasonLeaderboardPlayer($this->roster, 'Zero');
    $d = seasonLeaderboardPlayer($this->roster, 'No attempts');
    $second = seasonLeaderboardGame($this->season, $this->team, $this->opponent);
    seasonLeaderboardLine($this->game, $this->team, $a, ['fg3_made' => 1, 'fg3_attempted' => 1]);
    seasonLeaderboardLine($second, $this->team, $a, ['fg3_made' => 1, 'fg3_attempted' => 9]);
    seasonLeaderboardLine($this->game, $this->team, $b, ['fg3_made' => 4, 'fg3_attempted' => 5]);
    seasonLeaderboardLine($this->game, $this->team, $c, ['fg3_attempted' => 10]);
    seasonLeaderboardLine($this->game, $this->team, $d, []);
    $rows = app(SeasonLeaderboardService::class)->paginate('postotak-suta-za-tri', $this->season->id)->items();
    expect(array_column(array_column($rows, 'player'), 'id'))->toBe([$b->id, $a->id, $c->id, $d->id])
        ->and(array_column($rows, 'value'))->toBe([80.0, 20.0, 0.0, null])
        ->and($rows[1]['total'])->toBe(2)->and($rows[1]['attempted'])->toBe(10);
});

it('scopes data and team associations to the selected season and finished games', function(): void {
    $old = Season::create(['name' => 'Old', 'start_date' => '2025-09-01', 'end_date' => '2026-07-01', 'is_active' => false]);
    $player = seasonLeaderboardPlayer($this->roster, 'Scoped');
    $oldRoster = TeamSeason::create(['team_id' => $this->opponent->id, 'season_id' => $old->id]);
    $oldRoster->players()->attach($player);
    seasonLeaderboardLine($this->game, $this->team, $player, ['points' => 12]);
    seasonLeaderboardLine(seasonLeaderboardGame($old, $this->opponent, $this->team), $this->opponent, $player, ['points' => 99]);
    seasonLeaderboardLine(seasonLeaderboardGame($this->season, $this->team, $this->opponent, 'scheduled'), $this->team, $player, ['points' => 888]);
    $this->get(route('stats.category', ['category' => 'poeni-po-utakmici']))->assertOk()
        ->assertInertia(fn(Assert $page) => $page->where('season.id', $this->season->id)
            ->where('leaders.data.0.total', 12)->has('leaders.data.0.player.teams', 1)
            ->where('leaders.data.0.player.teams.0.id', $this->team->id));
    $this->get(route('stats.category', ['category' => 'poeni-po-utakmici', 'season' => $old->id]))->assertOk()
        ->assertInertia(fn(Assert $page) => $page->where('season.id', $old->id)
            ->where('leaders.data.0.total', 99)->where('leaders.data.0.player.teams.0.id', $this->opponent->id));
});

it('supports all fourteen categories including total rebounds and stored negative efficiency', function(): void {
    $player = seasonLeaderboardPlayer($this->roster, 'All categories');
    seasonLeaderboardLine($this->game, $this->team, $player, ['minutes_played' => 31, 'points' => 22,
        'offensive_rebounds' => 2, 'defensive_rebounds' => 7, 'assists' => 6, 'blocks' => 3, 'steals' => 4,
        'turnovers' => 5, 'fg2_made' => 3, 'fg2_attempted' => 4, 'fg3_made' => 2, 'fg3_attempted' => 5,
        'ft_made' => 1, 'ft_attempted' => 2, 'efficiency' => -12]);
    $expected = [31, 22, 7, 2, 9, 6, 3, 4, 5, 2, -12, 75, 40, 50];
    $links = SeasonLeaderboardService::links($this->season->id);
    expect($links)->toHaveCount(14);
    foreach (array_values($links) as $i => $url) {
        $this->get($url)->assertOk()->assertInertia(fn(Assert $page) => $page
            ->where('leaders.data.0.value', $expected[$i])->where('leaders.total', 1));
    }
});

it('keeps tied rankings stable and does not impose a three game qualification', function(): void {
    $ids = [];
    for ($i = 0; $i < 32; $i++) {
        $player = seasonLeaderboardPlayer($this->roster, "Tie {$i}");
        $ids[] = $player->id;
        seasonLeaderboardLine($this->game, $this->team, $player, ['points' => 0]);
    }
    $service = app(SeasonLeaderboardService::class);
    $first = $service->paginate('poeni-po-utakmici', $this->season->id);
    expect(array_column(array_column($first->items(), 'player'), 'id'))->toBe(array_slice($ids, 0, 30));
    $this->get(route('stats.category', ['category' => 'poeni-po-utakmici', 'page' => 2]))->assertOk()
        ->assertInertia(fn(Assert $page) => $page->where('leaders.total', 32)
            ->where('leaders.data.0.player.id', $ids[30])->where('leaders.data.1.player.id', $ids[31]));
});

it('rejects unknown categories invalid seasons and invalid page values and supports an empty season', function(): void {
    $this->get('/statistika/not-a-category')->assertNotFound();
    $this->get('/statistika/minute-po-utakmici?season=9999')->assertNotFound();
    $this->getJson('/statistika/minute-po-utakmici?season=abc')->assertUnprocessable();
    $this->getJson('/statistika/minute-po-utakmici?page=0')->assertUnprocessable();
    $this->get('/statistika/minute-po-utakmici')->assertOk()->assertInertia(fn(Assert $page) => $page
        ->where('leaders.total', 0)->has('leaders.data', 0)->where('leaders.from', null));
});

it('adds title destinations without changing any of the three existing leaderboard datasets', function(): void {
    $seasonLeaders = ['mpg' => ['title' => 'Minute po utakmici', 'type' => 'avg', 'topFive' => []]];
    $daily = ['blocks' => ['title' => 'Blokade', 'topFive' => []]];
    $best = ['points' => ['title' => 'Poeni', 'topFive' => []]];
    $mock = Mockery::mock(StatisticsService::class);
    $mock->shouldReceive('seasonLeaders')->once()->with($this->season->id)->andReturn($seasonLeaders);
    $mock->shouldReceive('lastRoundLeaders')->once()->with($this->season->id, 1)->andReturn($daily);
    $mock->shouldReceive('seasonBestPerformances')->once()->with($this->season->id)->andReturn($best);
    $this->app->instance(StatisticsService::class, $mock);
    $this->get(route('stats.index', ['season' => $this->season->id]))->assertOk()
        ->assertInertia(fn(Assert $page) => $page->where('leaders', $seasonLeaders)
            ->where('lastRoundStats', $daily)->where('bestPerformances', $best)
            ->where('categoryLinks.mpg', '/statistika/minute-po-utakmici?season=' . $this->season->id)
            ->has('categoryLinks', 14));
});
