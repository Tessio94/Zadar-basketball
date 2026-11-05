<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use LogicException;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (app()->isProduction()) {
            throw new LogicException('Demo seeding is disabled in production. Use staff:create for staff accounts.');
        }

        // Call league seeder
        $this->call(LeagueSeeder::class);
    }
}
