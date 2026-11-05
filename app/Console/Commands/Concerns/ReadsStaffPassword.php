<?php

declare(strict_types=1);

namespace App\Console\Commands\Concerns;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

trait ReadsStaffPassword
{
    private function readStaffPassword(): ?string
    {
        // No command-line password argument and no visible-input fallback.
        $password = $this->secret('Password (12+ characters, upper/lowercase, number and symbol)', false);
        $confirmation = $this->secret('Confirm password', false);
        $validator = Validator::make([
            'password' => $password,
            'password_confirmation' => $confirmation,
        ], [
            'password' => ['required', 'confirmed', Password::min(12)->mixedCase()->numbers()->symbols()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $message) {
                $this->error($message);
            }

            return null;
        }

        return $password;
    }
}
