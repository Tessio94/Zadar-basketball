<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Notifications\VerifyEmail;

test('sends verification notification', function(): void {
    Notification::fake();

    $user = User::factory()->admin()->unverified()->create();

    $this->actingAs($user)
        ->post(route('verification.send'))
        ->assertRedirect(route('home'));

    Notification::assertSentTo($user, VerifyEmail::class);
});

test('does not send verification notification if email is verified', function(): void {
    Notification::fake();

    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->post(route('verification.send'))
        ->assertRedirect(route('admin.panel', absolute: false));

    Notification::assertNothingSent();
});
