<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Enums\StaffRole;
use App\Services\StaffAccounts;
use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;

class ChangeStaffAccess extends Command
{
    protected $signature = 'staff:access {email} {--role= : admin or editor} {--disable : Revoke staff access} {--verified : The operator has independently verified this email}';

    protected $description = 'Grant or revoke access for one existing account; preserves the last active administrator';

    public function handle(StaffAccounts $accounts): int
    {
        $disable = (bool) $this->option('disable');
        $role = StaffRole::tryFrom((string) $this->option('role'));

        if (($disable && ($this->option('role') !== null || $this->option('verified'))) || (! $disable && ! $role)) {
            $this->error('Choose --role=admin, --role=editor, or --disable.');

            return self::FAILURE;
        }

        try {
            $accounts->changeAccess((string) $this->argument('email'), $disable ? null : $role, (bool) $this->option('verified'));
        } catch (ValidationException $exception) {
            foreach ($exception->validator->errors()->all() as $message) {
                $this->error($message);
            }

            return self::FAILURE;
        }

        $this->info($disable ? 'Staff access disabled.' : 'Staff access updated.');
        $this->comment('Remembered login tokens were rotated. Database-backed sessions were revoked.');

        return self::SUCCESS;
    }
}
