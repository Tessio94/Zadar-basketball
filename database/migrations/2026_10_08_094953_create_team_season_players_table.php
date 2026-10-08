<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('team_season_players', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('team_season_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('player_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->integer('jersey_number')->nullable();

            $table->timestamps();

            $table->unique(['team_season_id', 'player_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
