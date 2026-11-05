<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Support\Str;
use App\Services\StaffAccounts;
use Illuminate\Console\Command;
use App\Console\Commands\Concerns\ReadsStaffPassword;

class ResetStaffPassword extends Command
{
    use ReadsStaffPassword;

    protected $signature = 'staff:password {email}';

    protected $description = 'Reset a staff password privately and revoke database-backed sessions';

    public function handle(StaffAccounts $accounts): int
    {
        if (! $this->input->isInteractive()) {
            $this->error('Run this command interactively in the application container.');

            return self::FAILURE;
        }

        $email = Str::lower(trim((string) $this->argument('email')));

        if (! User::where('email', $email)->exists()) {
            $this->error('No account exists for that email.');

            return self::FAILURE;
        }

        $password = $this->readStaffPassword();

        if ($password === null) {
            return self::FAILURE;
        }

        $accounts->resetPassword($email, $password);
        $this->info('Password changed. Remembered login tokens and database-backed sessions were revoked.');

        return self::SUCCESS;
    }
}
