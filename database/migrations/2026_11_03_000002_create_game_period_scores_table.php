<?php

declare(strict_types=1);

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_period_scores', function(Blueprint $table): void {
            $table->id();
            $table->foreignId('game_id')->constrained()->cascadeOnDelete();
            // 1–4 are quarters; 5, 6, ... are OT1, OT2, ... . Never cumulative scores.
            $table->unsignedSmallInteger('period_number');
            $table->unsignedSmallInteger('home_score');
            $table->unsignedSmallInteger('away_score');
            $table->timestamps();
            $table->unique(['game_id', 'period_number']);
        });

        // PostgreSQL does not implement unsigned integer columns.
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE game_period_scores ADD CONSTRAINT game_period_scores_positive CHECK (period_number >= 1 AND home_score >= 0 AND away_score >= 0)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('game_period_scores');
    }
};
