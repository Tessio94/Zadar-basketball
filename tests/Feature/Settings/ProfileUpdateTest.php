<?php

declare(strict_types=1);

use App\Models\User;

test('profile page is displayed', function(): void {
    $user = User::factory()->admin()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('profile.edit'));

    $response->assertOk();
});

test('profile information can be updated', function(): void {
    $user = User::factory()->admin()->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    $user->refresh();

    expect($user->name)->toBe('Test User');
    expect($user->email)->toBe('test@example.com');
    expect($user->email_verified_at)->toBeNull();
});

test('email verification status is unchanged when the email address is unchanged', function(): void {
    $user = User::factory()->admin()->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test('staff accounts cannot delete themselves through profile settings', function(): void {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->delete('/settings/profile', [
        'password' => 'password',
    ])->assertStatus(405);

    expect($user->fresh())->not->toBeNull();
});
