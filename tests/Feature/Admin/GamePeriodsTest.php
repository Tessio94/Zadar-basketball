<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\User;
use App\Models\Player;
use App\Models\Season;
use App\Models\TeamSeason;
use Illuminate\Support\Facades\DB;
use App\Services\AdminGameBoxscoreService;

beforeEach(function(): void {
    $this->withoutVite();
    $this->actingAs(User::factory()->create());
    $this->season = Season::create(['name' => 'Test', 'start_date' => '2025-01-01', 'end_date' => '2027-12-31', 'is_active' => true]);
    $this->home = Team::create(['name' => 'Home']);
    $this->away = Team::create(['name' => 'Away']);
    $this->rows = [];
    foreach ([$this->home, $this->away] as $index => $team) {
        $ts = TeamSeason::create(['season_id' => $this->season->id, 'team_id' => $team->id]);
        $player = Player::create(['first_name' => 'Player', 'last_name' => (string) $index]);
        $ts->players()->attach($player->id, ['jersey_number' => $index]);
        $this->rows[] = array_fill_keys(AdminGameBoxscoreService::FIELDS, 0) + ['player_id' => $player->id, 'team_id' => $team->id, 'is_starter' => true];
    }
    $this->rows[0]['fg2_made'] = 2;
    $this->rows[0]['fg2_attempted'] = 3;
    $this->rows[1]['ft_made'] = 1;
    $this->rows[1]['ft_attempted'] = 2;
    $this->schedule = [
        'season_id' => $this->season->id, 'home_team_id' => $this->home->id, 'away_team_id' => $this->away->id,
        'game_date' => now()->subDay()->format('Y-m-d\TH:i'), 'round_number' => 1,
        'playoff_id' => null, 'playoff_round' => null,
    ];
    $this->game = Game::create([...$this->schedule, 'status' => 'scheduled']);
    $this->url = '/admin-panel/utakmice/' . $this->game->id;
});

function draftQuarters(): array
{
    return array_map(fn(int $n): array => ['period_number' => $n, 'home_score' => 1, 'away_score' => $n === 4 ? 1 : 0], range(1, 4));
}

it('keeps partial quarter drafts private and publishes periods and players together', function(): void {
    $periods = draftQuarters();
    $periods[3]['home_score'] = null;
    $payload = ['revision' => 0, 'intent' => 'draft', 'players' => $this->rows, 'periods' => $periods];
    $this->put($this->url . '/boxscore', $payload)->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_period_scores', 0);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->get($this->url . '/boxscore')->assertInertia(fn(Inertia\Testing\AssertableInertia $page) => $page->where('periods.3.home_score', null)->where('hasDraft', true));
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'intent' => 'publish'])->assertSessionHasErrors('periods.3.home_score');
    expect($this->game->fresh()->admin_revision)->toBe(1);
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'intent' => 'publish', 'periods' => draftQuarters()])->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_period_scores', 4);
    $this->assertDatabaseCount('player_game_stats', 2);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    expect($this->game->fresh()->home_score)->toBe(4);
    $this->get(route('game', $this->game))->assertInertia(fn(Inertia\Testing\AssertableInertia $page) => $page->has('game.period_scores', 4)->where('game.period_scores.3.away_score', 1));
});

it('rejects an invalid breakdown without changing any published data', function(string $kind): void {
    $payload = ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows, 'periods' => draftQuarters()];
    $this->put($this->url . '/boxscore', $payload)->assertSessionHasNoErrors();
    $periods = draftQuarters();
    match ($kind) {
        'total' => $periods[0]['home_score'] = 5,
        'gap' => $periods[1]['period_number'] = 7,
        'duplicate' => $periods[1]['period_number'] = 1,
        'negative' => $periods[0]['away_score'] = -1,
        'decimal' => $periods[0]['away_score'] = 0.5,
        'missing' => $periods[0]['away_score'] = null,
        'incomplete' => array_pop($periods),
        'overtime' => $periods[] = ['period_number' => 5, 'home_score' => 0, 'away_score' => 0],
    };
    $changedPlayers = $this->rows;
    $changedPlayers[0]['assists'] = 99;
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'players' => $changedPlayers, 'periods' => $periods])->assertSessionHasErrors();
    expect($this->game->fresh()->home_score)->toBe(4)->and($this->game->fresh()->admin_revision)->toBe(1);
    expect($this->game->periodScores()->sum('home_score'))->toBe(4);
    $this->assertDatabaseHas('player_game_stats', ['game_id' => $this->game->id, 'player_id' => $this->rows[0]['player_id'], 'assists' => 0]);
})->with(['total', 'gap', 'duplicate', 'negative', 'decimal', 'missing', 'incomplete', 'overtime']);

it('supports multiple overtimes only after consecutive cumulative ties', function(): void {
    $rows = $this->rows;
    foreach ($rows as $index => &$row) {
        foreach (['fg2_made', 'fg2_attempted', 'fg3_made', 'fg3_attempted'] as $key) {
            $row[$key] = 0;
        }
        $row['ft_made'] = $index === 0 ? 95 : 93;
        $row['ft_attempted'] = $row['ft_made'];
    }
    unset($row);
    $periods = array_map(fn($n) => ['period_number' => $n, 'home_score' => 20, 'away_score' => 20], range(1, 4));
    $periods[] = ['period_number' => 5, 'home_score' => 8, 'away_score' => 8];
    $periods[] = ['period_number' => 6, 'home_score' => 7, 'away_score' => 5];
    $payload = ['revision' => 0, 'intent' => 'publish', 'players' => $rows, 'periods' => $periods];
    $this->put($this->url . '/boxscore', $payload)->assertSessionHasNoErrors();
    expect($this->game->periodScores()->count())->toBe(6)->and($this->game->fresh()->home_score)->toBe(95);
    $periods[4]['home_score'] = 9;
    $periods[5]['home_score'] = 6;
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'periods' => $periods])->assertSessionHasErrors('periods');
});

it('preserves published periods while editing and discarding a private correction', function(): void {
    $payload = ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows, 'periods' => draftQuarters()];
    $this->put($this->url . '/boxscore', $payload)->assertSessionHasNoErrors();
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'intent' => 'draft', 'periods' => []])->assertSessionHasNoErrors();
    expect($this->game->periodScores()->count())->toBe(4);
    $this->get($this->url . '/boxscore')->assertInertia(fn(Inertia\Testing\AssertableInertia $page) => $page->has('periods', 0));
    $this->delete($this->url . '/boxscore/draft', ['revision' => 2])->assertSessionHasNoErrors();
    $this->get($this->url . '/boxscore')->assertInertia(fn(Inertia\Testing\AssertableInertia $page) => $page->has('periods', 4));
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 3, 'periods' => []])->assertSessionHasNoErrors();
    expect($this->game->periodScores()->count())->toBe(0)->and($this->game->fresh()->home_score)->toBe(4);
});

it('checks stored periods on legacy client saves and respects stale revisions', function(): void {
    $payload = ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows];
    $this->put($this->url . '/boxscore', [...$payload, 'periods' => draftQuarters()])->assertSessionHasNoErrors();
    $this->rows[0]['fg2_made'] = 3;
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'players' => $this->rows])->assertSessionHasErrors('periods');
    $this->put($this->url . '/boxscore', [...$payload, 'periods' => []])->assertSessionHasErrors('revision');
    expect($this->game->fresh()->home_score)->toBe(4)->and($this->game->periodScores()->count())->toBe(4);
});

it('loads pre-migration drafts without losing their published quarters', function(): void {
    $this->game->periodScores()->createMany(draftQuarters());
    DB::table('game_boxscore_drafts')->insert(['game_id' => $this->game->id, 'players' => json_encode($this->rows), 'periods' => null]);
    $this->get($this->url . '/boxscore')->assertInertia(fn(Inertia\Testing\AssertableInertia $page) => $page->has('periods', 4));
});

it('cascades published periods and private draft periods on game deletion', function(): void {
    $payload = ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows, 'periods' => draftQuarters()];
    $this->put($this->url . '/boxscore', $payload)->assertSessionHasNoErrors();
    $this->put($this->url . '/boxscore', [...$payload, 'revision' => 1, 'intent' => 'draft'])->assertSessionHasNoErrors();
    $this->delete($this->url, ['revision' => 2])->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_period_scores', 0);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
});
