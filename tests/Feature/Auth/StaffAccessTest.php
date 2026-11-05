<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\Team;
use App\Models\User;
use App\Models\Season;
use App\Models\Article;
use App\Models\Gallery;
use App\Enums\StaffRole;
use App\Services\StaffAccounts;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Testing\AssertableInertia as Assert;

test('new and existing nonstaff accounts have no access by default', function(): void {
    $user = User::factory()->create();
    expect($user->role)->toBeNull()->and($user->is_active)->toBeFalse();

    $this->post('/login', ['email' => $user->email, 'password' => 'password'])
        ->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('disabled staff cannot log in even with a correct password', function(): void {
    $user = User::factory()->admin()->create(['is_active' => false]);
    $this->post('/login', ['email' => $user->email, 'password' => 'password'])
        ->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('disabling staff also rejects an existing authenticated session', function(): void {
    $user = User::factory()->editor()->create(['is_active' => false]);
    $this->actingAs($user)->get('/settings/profile')->assertRedirect('/login');
    $this->assertGuest();
});

test('disabled staff cannot finish a pending two factor challenge', function(): void {
    $user = User::factory()->editor()->withTwoFactor()->create(['is_active' => false]);
    $this->withSession(['login.id' => $user->id, 'login.remember' => true])
        ->post('/two-factor-challenge', ['recovery_code' => 'recovery-code-1'])
        ->assertRedirect('/login')->assertSessionMissing('login.id');
    $this->assertGuest();
});

test('an unverified staff account must verify its email before entering the panel', function(): void {
    $this->actingAs(User::factory()->admin()->unverified()->create())
        ->get('/admin-panel')->assertRedirect('/email/verify');
});

test('editor login lands in the content section and exposes only permitted capabilities', function(): void {
    $editor = User::factory()->editor()->create();
    $this->post('/login', ['email' => $editor->email, 'password' => 'password'])
        ->assertRedirect('/admin-panel');
    $this->get('/admin-panel')->assertRedirect('/admin-panel/novosti');
    $this->get('/admin-panel/novosti')->assertOk()->assertInertia(fn(Assert $page) => $page
        ->where('auth.permissions.manageLeague', false)
        ->where('auth.permissions.manageContent', true)
        ->where('auth.permissions.deleteContent', false));
});

test('editor cannot create league data through direct requests', function(string $resource): void {
    $this->actingAs(User::factory()->editor()->create())
        ->postJson('/admin-panel/' . $resource, [])->assertForbidden();
})->with(['ekipe', 'igraci', 'sezone', 'utakmice']);

test('editor cannot save publish or discard boxscores or edit or delete a game', function(): void {
    $season = Season::create(['name' => 'Test', 'start_date' => '2026-01-01', 'end_date' => '2027-01-01']);
    $home = Team::create(['name' => 'Home']);
    $away = Team::create(['name' => 'Away']);
    $game = Game::create([
        'season_id' => $season->id, 'home_team_id' => $home->id, 'away_team_id' => $away->id,
        'game_date' => now()->subDay(), 'round_number' => 1, 'status' => 'scheduled',
    ]);
    $this->actingAs(User::factory()->editor()->create());
    $url = '/admin-panel/utakmice/' . $game->id;
    $this->putJson($url, [])->assertForbidden();
    $this->deleteJson($url)->assertForbidden();
    $this->getJson($url . '/boxscore')->assertForbidden();
    $this->putJson($url . '/boxscore', ['intent' => 'draft'])->assertForbidden();
    $this->putJson($url . '/boxscore', ['intent' => 'publish'])->assertForbidden();
    $this->deleteJson($url . '/boxscore/draft')->assertForbidden();
    expect($game->fresh()->status)->toBe('scheduled');
    $this->assertDatabaseCount('player_game_stats', 0);
});

test('editors can publish articles and upload images but cannot delete articles', function(): void {
    Storage::fake('public');
    $this->actingAs(User::factory()->editor()->create());
    $payload = ['title' => 'Editor report', 'slug' => 'editor-report', 'content' => '<p>Report.</p>', 'status' => 'published'];
    $this->post('/admin-panel/novosti', $payload)->assertSessionHasNoErrors()->assertRedirect();
    $article = Article::where('slug', 'editor-report')->firstOrFail();
    $this->put('/admin-panel/novosti/' . $article->id, [...$payload, 'title' => 'Updated'])
        ->assertSessionHasNoErrors();
    $this->post('/admin-panel/novosti/upload-image', ['file' => UploadedFile::fake()->image('report.png')])->assertOk();
    $this->deleteJson('/admin-panel/novosti/' . $article->id)->assertForbidden();
    expect($article->fresh()->title)->toBe('Updated');
});

test('editors cannot delete whole galleries', function(): void {
    $gallery = Gallery::create(['title' => 'Photos', 'slug' => 'photos']);
    $this->actingAs(User::factory()->editor()->create())
        ->deleteJson('/admin-panel/galerije/' . $gallery->id)->assertForbidden();
    expect($gallery->fresh())->not->toBeNull();
});

test('profile updates cannot grant staff privileges', function(): void {
    $editor = User::factory()->editor()->create();
    $this->actingAs($editor)->patch('/settings/profile', [
        'name' => 'Editor', 'email' => $editor->email, 'role' => 'admin', 'is_active' => false,
    ])->assertSessionHasNoErrors();
    expect($editor->fresh()->role)->toBe(StaffRole::Editor)
        ->and($editor->fresh()->is_active)->toBeTrue();
});

test('all existing admin endpoints carry backend authorization', function(): void {
    $count = 0;
    foreach (Route::getRoutes() as $route) {
        if (! str_starts_with($route->uri(), 'admin-panel')) {
            continue;
        }
        $count++;
        $middleware = $route->gatherMiddleware();
        expect($middleware)->toContain('auth', 'verified', 'can:access-admin');
        if ($route->getName() !== 'admin.panel') {
            expect(array_intersect($middleware, ['can:manage-league', 'can:manage-content', 'can:delete-content']))->not->toBeEmpty();
        }
    }
    expect($count)->toBeGreaterThan(30);
});

test('staff creation prompts for a password and stores a hash', function(): void {
    $this->artisan('staff:create', ['--role' => 'editor', '--verified' => true])
        ->expectsQuestion('Name', 'Editor')
        ->expectsQuestion('Email', 'EDITOR@example.test')
        ->expectsQuestion('Password (12+ characters, upper/lowercase, number and symbol)', 'TestPassword123!')
        ->expectsQuestion('Confirm password', 'TestPassword123!')
        ->assertSuccessful();
    $user = User::where('email', 'editor@example.test')->firstOrFail();
    expect($user->role)->toBe(StaffRole::Editor)->and($user->is_active)->toBeTrue()
        ->and($user->hasVerifiedEmail())->toBeTrue()
        ->and(Hash::check('TestPassword123!', $user->password))->toBeTrue()
        ->and($user->password)->not->toBe('TestPassword123!');
});

test('staff creation does not silently replace an existing account', function(): void {
    $user = User::factory()->admin()->create(['email' => 'owner@example.test']);
    $oldPassword = $user->password;
    $this->artisan('staff:create')->expectsQuestion('Name', 'Different')
        ->expectsQuestion('Email', $user->email)->assertFailed();
    expect($user->fresh()->password)->toBe($oldPassword);
    $this->assertDatabaseCount('users', 1);
});

test('staff creation rejects weak passwords', function(): void {
    $this->artisan('staff:create')->expectsQuestion('Name', 'Owner')
        ->expectsQuestion('Email', 'owner@example.test')
        ->expectsQuestion('Password (12+ characters, upper/lowercase, number and symbol)', 'password')
        ->expectsQuestion('Confirm password', 'password')->assertFailed();
    $this->assertDatabaseCount('users', 0);
});

test('granting an existing account is explicit and does not change its password', function(): void {
    $user = User::factory()->create();
    $hash = $user->password;
    $this->artisan('staff:access', ['email' => $user->email, '--role' => 'admin', '--verified' => true])->assertSuccessful();
    expect($user->fresh()->isAdministrator())->toBeTrue()->and($user->fresh()->password)->toBe($hash);
});

test('the last active administrator cannot be disabled or demoted', function(?StaffRole $role): void {
    $admin = User::factory()->admin()->create();
    expect(fn() => app(StaffAccounts::class)->changeAccess($admin->email, $role))->toThrow(ValidationException::class);
    expect($admin->fresh()->isAdministrator())->toBeTrue();
})->with([null, StaffRole::Editor]);

test('revoking access rotates remembered login tokens and removes database sessions', function(): void {
    config(['session.driver' => 'database']);
    $user = User::factory()->editor()->create(['remember_token' => 'old-remember-token']);
    DB::table('sessions')->insert(['id' => 'test-session', 'user_id' => $user->id, 'payload' => '', 'last_activity' => time()]);
    app(StaffAccounts::class)->changeAccess($user->email, null);
    expect($user->fresh()->is_active)->toBeFalse()->and($user->fresh()->remember_token)->not->toBe('old-remember-token');
    $this->assertDatabaseMissing('sessions', ['user_id' => $user->id]);
});

test('a second administrator allows one to be demoted', function(): void {
    $first = User::factory()->admin()->create();
    User::factory()->admin()->create();
    app(StaffAccounts::class)->changeAccess($first->email, StaffRole::Editor);
    expect($first->fresh()->role)->toBe(StaffRole::Editor);
});

test('private password reset hashes the replacement and revokes old sessions', function(): void {
    config(['session.driver' => 'database']);
    $user = User::factory()->admin()->create(['remember_token' => 'old-token']);
    DB::table('sessions')->insert(['id' => 'old-session', 'user_id' => $user->id, 'payload' => '', 'last_activity' => time()]);
    $this->artisan('staff:password', ['email' => $user->email])
        ->expectsQuestion('Password (12+ characters, upper/lowercase, number and symbol)', 'NewPassword456!')
        ->expectsQuestion('Confirm password', 'NewPassword456!')->assertSuccessful();
    expect(Hash::check('NewPassword456!', $user->fresh()->password))->toBeTrue()
        ->and($user->fresh()->remember_token)->not->toBe('old-token');
    $this->assertDatabaseMissing('sessions', ['user_id' => $user->id]);
});
