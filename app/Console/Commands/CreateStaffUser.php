<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Enums\StaffRole;
use Illuminate\Support\Str;
use App\Services\StaffAccounts;
use Illuminate\Console\Command;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Console\Commands\Concerns\ReadsStaffPassword;

class CreateStaffUser extends Command
{
    use ReadsStaffPassword;

    protected $signature = 'staff:create {--role=admin : admin or editor} {--verified : The operator has independently verified this email}';

    protected $description = 'Privately create a staff account using hidden password prompts';

    public function handle(StaffAccounts $accounts): int
    {
        if (! $this->input->isInteractive()) {
            $this->error('Run this command interactively in the application container.');

            return self::FAILURE;
        }

        $role = StaffRole::tryFrom((string) $this->option('role'));

        if (! $role) {
            $this->error('Role must be admin or editor.');

            return self::FAILURE;
        }

        $name = trim((string) $this->ask('Name'));
        $email = Str::lower(trim((string) $this->ask('Email')));
        $validator = Validator::make(compact('name', 'email'), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $message) {
                $this->error($message);
            }

            return self::FAILURE;
        }

        $password = $this->readStaffPassword();

        if ($password === null) {
            return self::FAILURE;
        }

        $accounts->create($name, $email, $password, $role, (bool) $this->option('verified'));
        $this->info('Staff account created.');

        if (! $this->option('verified')) {
            $this->comment('The user must verify their email after login. Configure production mail delivery first.');
        }

        return self::SUCCESS;
    }
}
