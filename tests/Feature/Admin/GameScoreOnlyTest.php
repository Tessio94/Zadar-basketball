<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Player;
use App\Models\Season;
use App\Models\Team;
use App\Models\TeamSeason;
use App\Models\User;
use App\Services\AdminGameBoxscoreService;
use App\Services\ArticleGameSummary;
use App\Services\StandingsService;
use App\Services\TeamStatisticsService;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function(): void {
    $this->withoutVite();
    $this->actingAs(User::factory()->admin()->create());
    $this->season = Season::create(['name' => 'Test', 'start_date' => '2025-01-01', 'end_date' => '2027-12-31', 'is_active' => true]);
    $this->home = Team::create(['name' => 'Home']);
    $this->away = Team::create(['name' => 'Away']);
    $this->rows = [];
    foreach ([$this->home, $this->away] as $index => $team) {
        $roster = TeamSeason::create(['season_id' => $this->season->id, 'team_id' => $team->id]);
        $player = Player::create(['first_name' => 'Player', 'last_name' => (string) $index]);
        $roster->players()->attach($player->id, ['jersey_number' => $index]);
        $this->rows[] = array_replace(array_fill_keys(AdminGameBoxscoreService::FIELDS, 0), [
            'player_id' => $player->id, 'team_id' => $team->id, 'is_starter' => true,
            'ft_made' => $index === 0 ? 80 : 70, 'ft_attempted' => 80,
        ]);
    }
    $this->game = Game::create([
        'season_id' => $this->season->id, 'home_team_id' => $this->home->id, 'away_team_id' => $this->away->id,
        'game_date' => now()->subDay()->format('Y-m-d H:i:s'), 'round_number' => 2, 'status' => 'scheduled',
    ]);
    $this->periods = array_map(fn(int $n): array => [
        'period_number' => $n, 'home_score' => 20, 'away_score' => $n <= 2 ? 20 : 15,
    ], range(1, 4));
    $this->url = '/admin-panel/utakmice/' . $this->game->id . '/boxscore';
    $this->payload = ['revision' => 0, 'intent' => 'score', 'periods' => $this->periods];
});

it('publishes quarters without players and immediately exposes the result and standings', function(): void {
    $date = $this->game->game_date;
    $this->put($this->url, $this->payload)->assertSessionHasNoErrors()->assertRedirect($this->url);
    $game = $this->game->fresh();
    expect($game->status)->toBe('finished')->and($game->home_score)->toBe(80)
        ->and($game->away_score)->toBe(70)->and($game->admin_revision)->toBe(1)
        ->and($game->game_date)->toBe($date);
    $this->assertDatabaseCount('game_period_scores', 4);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    $this->get(route('game', $game))->assertInertia(fn(Assert $page) => $page
        ->where('game.home_score', 80)->has('game.period_scores', 4)->has('game.player_stats', 0)
        ->has('leaders.points', 0)->where('teamTotals.home.has_stats', false));
    $this->get('/admin-panel/utakmice')->assertInertia(fn(Assert $page) => $page
        ->where('games.data.0.has_boxscore', false)->where('games.data.0.status', 'finished'));
    $this->get($this->url)->assertInertia(fn(Assert $page) => $page
        ->where('game.has_boxscore', false)->has('players', 0)->has('periods', 4)->where('hasDraft', false));
    $standing = app(StandingsService::class)->getStandings($this->season->id)->firstWhere('id', $this->home->id);
    expect($standing['played'])->toBe(1)->and($standing['wins'])->toBe(1)->and($standing['scored'])->toBe(80);
    $summary = app(ArticleGameSummary::class)->make($game);
    expect($summary['home_score'])->toBe(80)->and($summary['period_scores'])->toHaveCount(4)->and($summary['scorers'])->toBe([]);
    $roster = TeamSeason::where('team_id', $this->home->id)->firstOrFail();
    $teamStats = app(TeamStatisticsService::class)->forTeamSeason($roster);
    expect($teamStats['summary']['games_played'])->toBe(1)
        ->and($teamStats['summary']['boxscore_games'])->toBe(0)
        ->and($teamStats['players'][0]['games_played'])->toBe(0);
});

it('does not require any roster entries to publish a result', function(): void {
    DB::table('team_season_players')->delete();
    $this->put($this->url, $this->payload)->assertSessionHasNoErrors();
    expect($this->game->fresh()->home_score)->toBe(80);
    $this->assertDatabaseCount('player_game_stats', 0);
});

it('ignores any supplied player data on a score-only request', function(): void {
    $this->put($this->url, [...$this->payload, 'players' => 'not a boxscore', 'home_score' => 999])
        ->assertSessionHasNoErrors();
    expect($this->game->fresh()->home_score)->toBe(80);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
});

it('preserves a partial player draft and synchronizes its quarters with the published result', function(): void {
    $this->put($this->url, [
        'revision' => 0, 'intent' => 'draft', 'players' => [$this->rows[0]], 'periods' => [],
    ])->assertSessionHasNoErrors();
    $draft = DB::table('game_boxscore_drafts')->where('game_id', $this->game->id)->first();
    $this->put($this->url, [...$this->payload, 'revision' => 1])->assertSessionHasNoErrors();
    $savedDraft = DB::table('game_boxscore_drafts')->where('game_id', $this->game->id)->first();
    expect($savedDraft->players)->toBe($draft->players)
        ->and($savedDraft->created_at)->toBe($draft->created_at)
        ->and(json_decode($savedDraft->periods, true))->toBe($this->periods);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->get($this->url)->assertInertia(fn(Assert $page) => $page
        ->has('players', 1)->where('hasDraft', true)->where('periods.0.home_score', 20));
    $this->delete($this->url . '/draft', ['revision' => 2])->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    expect($this->game->fresh()->home_score)->toBe(80)->and($this->game->periodScores()->count())->toBe(4);
});

it('allows private statistic drafts after the result and requires matching totals before full publication', function(): void {
    $this->put($this->url, $this->payload)->assertSessionHasNoErrors();
    $draft = ['revision' => 1, 'intent' => 'draft', 'players' => [$this->rows[0]], 'periods' => $this->periods];
    $this->put($this->url, $draft)->assertSessionHasNoErrors();
    $this->assertDatabaseCount('player_game_stats', 0);
    expect($this->game->fresh()->away_score)->toBe(70);
    $wrong = $this->rows;
    $wrong[1]['ft_made'] = 69;
    $this->put($this->url, [...$draft, 'revision' => 2, 'intent' => 'publish', 'players' => $wrong])
        ->assertSessionHasErrors('periods');
    expect($this->game->fresh()->admin_revision)->toBe(2);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->put($this->url, [...$draft, 'revision' => 2, 'intent' => 'publish', 'players' => $this->rows])
        ->assertSessionHasNoErrors();
    $this->assertDatabaseCount('player_game_stats', 2);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    expect($this->game->fresh()->home_score)->toBe(80)->and($this->game->fresh()->away_score)->toBe(70);
    $this->get($this->url)->assertInertia(fn(Assert $page) => $page->where('game.has_boxscore', true));
});

it('rejects missing or invalid result-only periods atomically', function(string $kind): void {
    $payload = $this->payload;
    match ($kind) {
        'absent' => $payload = array_diff_key($payload, ['periods' => true]),
        'empty' => $payload['periods'] = [],
        'incomplete' => array_pop($payload['periods']),
        'null' => $payload['periods'][0]['home_score'] = null,
        'missing-score' => $payload['periods'][0] = ['period_number' => 1, 'home_score' => 20],
        'negative' => $payload['periods'][0]['home_score'] = -1,
        'decimal' => $payload['periods'][0]['away_score'] = 0.5,
        'invalid' => $payload['periods'][0]['away_score'] = 'invalid',
        'gap' => $payload['periods'][1]['period_number'] = 6,
        'duplicate' => $payload['periods'][1]['period_number'] = 1,
        'tie' => $payload['periods'][0]['home_score'] = 10,
        'invalid-overtime' => $payload['periods'][] = ['period_number' => 5, 'home_score' => 5, 'away_score' => 4],
    };
    $this->put($this->url, $payload)->assertSessionHasErrors();
    expect($this->game->fresh()->admin_revision)->toBe(0)->and($this->game->fresh()->status)->toBe('scheduled');
    $this->assertDatabaseCount('game_period_scores', 0);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
})->with(['absent', 'empty', 'incomplete', 'null', 'missing-score', 'negative', 'decimal', 'invalid', 'gap', 'duplicate', 'tie', 'invalid-overtime']);

it('publishes a result after multiple valid overtimes without player statistics', function(): void {
    $periods = array_map(fn($n) => ['period_number' => $n, 'home_score' => 20, 'away_score' => 20], range(1, 4));
    $periods[] = ['period_number' => 5, 'home_score' => 8, 'away_score' => 8];
    $periods[] = ['period_number' => 6, 'home_score' => 7, 'away_score' => 5];
    $this->put($this->url, [...$this->payload, 'periods' => $periods])->assertSessionHasNoErrors();
    expect($this->game->fresh()->home_score)->toBe(95)->and($this->game->fresh()->away_score)->toBe(93)
        ->and($this->game->periodScores()->count())->toBe(6);
});

it('allows quarter-only corrections without touching existing player rows', function(): void {
    $this->put($this->url, [...$this->payload, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->game->playerStats()->update(['efficiency' => -7]);
    $before = $this->game->playerStats()->orderBy('id')->get()->toArray();
    $periods = $this->periods;
    $periods[0]['home_score'] = 25;
    $periods[1]['home_score'] = 15;
    $this->put($this->url, [...$this->payload, 'revision' => 1, 'periods' => $periods])->assertSessionHasNoErrors();
    expect($this->game->playerStats()->orderBy('id')->get()->toArray())->toBe($before);
    expect($this->game->periodScores()->first()->home_score)->toBe(25);
    $periods[0]['home_score'] = 30;
    $this->put($this->url, [...$this->payload, 'revision' => 2, 'periods' => $periods])->assertSessionHasErrors('periods');
    expect($this->game->fresh()->admin_revision)->toBe(2)->and($this->game->fresh()->home_score)->toBe(80)
        ->and($this->game->periodScores()->first()->home_score)->toBe(25)
        ->and($this->game->playerStats()->orderBy('id')->get()->toArray())->toBe($before);
});

it('allows score corrections before player statistics are published but rejects stale saves', function(): void {
    $this->put($this->url, $this->payload)->assertSessionHasNoErrors();
    $this->put($this->url, $this->payload)->assertSessionHasErrors('revision');
    $periods = $this->periods;
    $periods[0]['home_score'] = 21;
    $this->put($this->url, [...$this->payload, 'revision' => 1, 'periods' => $periods])->assertSessionHasNoErrors();
    expect($this->game->fresh()->home_score)->toBe(81)->and($this->game->fresh()->admin_revision)->toBe(2);
});

it('refuses future results and does not relax the existing full-boxscore validation', function(): void {
    $this->put($this->url, [...$this->payload, 'intent' => 'publish', 'players' => []])->assertSessionHasErrors('players');
    $this->game->update(['game_date' => now()->addDay()->format('Y-m-d H:i:s')]);
    $this->put($this->url, $this->payload)->assertSessionHasErrors('periods');
    expect($this->game->fresh()->status)->toBe('scheduled')->and($this->game->fresh()->admin_revision)->toBe(0);
    $this->assertDatabaseCount('game_period_scores', 0);
});

it('protects score-only publication with the existing staff permissions', function(): void {
    auth()->logout();
    $this->put($this->url, $this->payload)->assertRedirect('/login');
    $this->actingAs(User::factory()->editor()->create());
    $this->put($this->url, $this->payload)->assertForbidden();
    expect($this->game->fresh()->status)->toBe('scheduled');
});
