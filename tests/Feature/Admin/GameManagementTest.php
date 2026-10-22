<?php

use App\Models\Game;
use App\Models\Player;
use App\Models\Season;
use App\Models\Team;
use App\Models\TeamSeason;
use App\Models\User;
use App\Services\AdminGameBoxscoreService;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
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
    $this->url = '/admin-panel/utakmice/'.$this->game->id;
});

it('requires authentication on game mutations', function () {
    auth()->logout();
    $this->post('/admin-panel/utakmice', $this->schedule)->assertRedirect('/login');
    $this->put($this->url.'/boxscore', [])->assertRedirect('/login');
    $this->delete($this->url)->assertRedirect('/login');
});

it('creates scheduled games and rejects a team playing itself', function () {
    $this->post('/admin-panel/utakmice', [...$this->schedule, 'home_team_id' => $this->away->id])->assertSessionHasErrors('home_team_id');
    $this->post('/admin-panel/utakmice', $this->schedule)->assertSessionHasNoErrors()->assertRedirect();
    $this->assertDatabaseCount('games', 2);
});

it('rejects teams and playoffs from another season', function () {
    $other = Season::create(['name' => 'Other', 'start_date' => '2024-01-01', 'end_date' => '2024-12-31']);
    $this->post('/admin-panel/utakmice', [...$this->schedule, 'season_id' => $other->id])->assertSessionHasErrors('home_team_id');
    $playoff = \App\Models\Playoff::create(['season_id' => $other->id, 'name' => 'Other playoffs']);
    $this->post('/admin-panel/utakmice', [...$this->schedule, 'playoff_id' => $playoff->id, 'playoff_round' => 'final'])->assertSessionHasErrors('playoff_id');
});

it('saves drafts privately and publishes scores computed from shooting', function () {
    $payload = ['revision' => 0, 'intent' => 'draft', 'players' => $this->rows];
    $this->put($this->url.'/boxscore', $payload)->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_boxscore_drafts', 1);
    $this->assertDatabaseCount('player_game_stats', 0);
    expect($this->game->fresh()->status)->toBe('scheduled');
    $this->put($this->url.'/boxscore', [...$payload, 'revision' => 1, 'intent' => 'publish'])->assertSessionHasNoErrors();
    $game = $this->game->fresh();
    expect($game->status)->toBe('finished')->and($game->home_score)->toBe(4)->and($game->away_score)->toBe(1);
    $this->assertDatabaseCount('player_game_stats', 2);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    $this->assertDatabaseHas('player_game_stats', ['game_id' => $game->id, 'team_id' => $this->home->id, 'points' => 4, 'efficiency' => 4]);
    // A draft correction must leave the published result intact.
    $rows = $this->rows;
    $rows[0]['fg2_made'] = 3;
    $this->put($this->url.'/boxscore', ['revision' => 2, 'intent' => 'draft', 'players' => $rows])->assertSessionHasNoErrors();
    expect($this->game->fresh()->home_score)->toBe(4);
});

it('rejects impossible shooting and never partially saves a bad boxscore', function () {
    $this->rows[1]['ft_made'] = 5;
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasErrors('players.1.ft_made');
    $this->assertDatabaseCount('player_game_stats', 0);
    expect($this->game->fresh()->admin_revision)->toBe(0);
});

it('rejects duplicate players, wrong team membership and negative counts', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => [$this->rows[0], $this->rows[0]]])->assertSessionHasErrors('players.0.player_id');
    $rows = $this->rows; $rows[0]['team_id'] = $this->away->id;
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => $rows])->assertSessionHasErrors('players.0.player_id');
    $rows = $this->rows; $rows[0]['assists'] = -1;
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => $rows])->assertSessionHasErrors('players.0.assists');
});

it('allows incomplete drafts but rejects missing teams and ties on publication', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => []])->assertSessionHasErrors('players');
    $rows = $this->rows; $rows[0]['fg2_made'] = 0; $rows[1]['ft_made'] = 0;
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $rows])->assertSessionHasErrors('players');
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => []])->assertSessionHasNoErrors();
});

it('rejects stale saves and deletes without overwriting newer work', function () {
    $this->put($this->url, [...$this->schedule, 'revision' => 0, 'round_number' => 2])->assertSessionHasNoErrors();
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => $this->rows])->assertSessionHasErrors('revision');
    $this->delete($this->url, ['revision' => 0])->assertSessionHasErrors('revision');
    expect($this->game->fresh()->round_number)->toBe(2);
});

it('locks game participants once a draft exists', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'draft', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->put($this->url, [...$this->schedule, 'revision' => 1, 'home_team_id' => $this->away->id, 'away_team_id' => $this->home->id])->assertSessionHasErrors('home_team_id');
});

it('does not publish future fixtures', function () {
    $this->game->update(['game_date' => now()->addDay()]);
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasErrors('players');
});

it('preserves existing historical participants after roster changes', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
    DB::table('team_season_players')->delete();
    $this->put($this->url.'/boxscore', ['revision' => 1, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
});

it('deletes a game with its published statistics and draft', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->put($this->url.'/boxscore', ['revision' => 1, 'intent' => 'draft', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->delete($this->url, ['revision' => 2])->assertSessionHasNoErrors()->assertRedirect('/admin-panel/utakmice');
    $this->assertDatabaseCount('games', 0);
    $this->assertDatabaseCount('player_game_stats', 0);
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
});

it('discards only the private draft and advances the edit revision', function () {
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->put($this->url.'/boxscore', ['revision' => 1, 'intent' => 'draft', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->delete($this->url.'/boxscore/draft', ['revision' => 2])->assertSessionHasNoErrors();
    $this->assertDatabaseCount('game_boxscore_drafts', 0);
    $this->assertDatabaseCount('player_game_stats', 2);
    expect($this->game->fresh()->home_score)->toBe(4)->and($this->game->fresh()->admin_revision)->toBe(3);
});

it('loads season jersey zero and existing participants into the boxscore page', function () {
    $this->get($this->url.'/boxscore')->assertOk()->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
        ->component('admin/utakmice/boxscore')->has('roster', 2)
        ->where('roster.0.jersey_number', 0)->where('hasDraft', false));
});

it('ignores supplied points and efficiency and calculates them on the server', function () {
    $this->rows[0]['points'] = 999;
    $this->rows[0]['efficiency'] = 999;
    $this->put($this->url.'/boxscore', ['revision' => 0, 'intent' => 'publish', 'players' => $this->rows])->assertSessionHasNoErrors();
    $this->assertDatabaseHas('player_game_stats', ['game_id' => $this->game->id, 'team_id' => $this->home->id, 'points' => 4, 'efficiency' => 4]);
});
