<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

test('registration routes are not exposed', function(): void {
    expect(Route::has('register'))->toBeFalse();
    expect(Route::has('register.store'))->toBeFalse();
    $this->get('/register')->assertNotFound();
    $this->post('/register', [
        'name' => 'Visitor',
        'email' => 'visitor@example.test',
        'password' => 'NotARealPassword123!',
        'password_confirmation' => 'NotARealPassword123!',
    ])->assertNotFound();
    $this->assertDatabaseCount('users', 0);
});
