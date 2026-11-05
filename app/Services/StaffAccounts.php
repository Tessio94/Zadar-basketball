<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Enums\StaffRole;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StaffAccounts
{
    public function create(string $name, string $email, string $password, StaffRole $role, bool $verified): User
    {
        return User::forceCreate([
            'name' => $name,
            'email' => Str::lower(trim($email)),
            'password' => $password,
            'role' => $role,
            'is_active' => true,
            'email_verified_at' => $verified ? now() : null,
        ]);
    }

    public function changeAccess(string $email, ?StaffRole $role, bool $verified = false): User
    {
        $user = DB::transaction(function() use ($email, $role, $verified): User {
            // Lock in a consistent order so two commands cannot remove both admins.
            $users = User::query()->orderBy('id')->lockForUpdate()->get();
            $user = $users->firstWhere('email', Str::lower(trim($email)));

            if (! $user) {
                throw ValidationException::withMessages(['email' => 'No account exists for that email.']);
            }

            if ($user->isAdministrator() && $role !== StaffRole::Admin &&
                $users->filter(fn(User $candidate): bool => $candidate->isAdministrator())->count() <= 1) {
                throw ValidationException::withMessages(['role' => 'The last active administrator cannot be disabled or demoted.']);
            }

            $user->role = $role;
            $user->is_active = $role !== null;
            $user->remember_token = Str::random(60);

            if ($verified) {
                $user->email_verified_at = now();
            }

            $user->save();

            return $user;
        });

        $this->revokeDatabaseSessions($user);

        return $user;
    }

    public function resetPassword(string $email, string $password): User
    {
        $user = User::where('email', Str::lower(trim($email)))->firstOrFail();
        $user->password = $password;
        $user->remember_token = Str::random(60);
        $user->save();
        $this->revokeDatabaseSessions($user);

        return $user;
    }

    private function revokeDatabaseSessions(User $user): void
    {
        if (config('session.driver') === 'database') {
            DB::connection(config('session.connection'))
                ->table(config('session.table', 'sessions'))
                ->where('user_id', $user->getKey())->delete();
        }
    }
}
