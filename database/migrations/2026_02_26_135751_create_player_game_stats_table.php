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
        Schema::create('player_game_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained()->cascadeOnDelete();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_starter')->default(false);
            $table->integer('minutes_played')->default(0);
            $table->integer('points')->default(0);
            $table->integer('fg2_made')->default(0);
            $table->integer('fg2_attempted')->default(0);
            $table->integer('fg3_made')->default(0);
            $table->integer('fg3_attempted')->default(0);
            $table->integer('ft_made')->default(0);
            $table->integer('ft_attempted')->default(0);
            $table->integer('offensive_rebounds')->default(0);
            $table->integer('defensive_rebounds')->default(0);
            $table->integer('assists')->default(0);
            $table->integer('steals')->default(0);
            $table->integer('blocks')->default(0);
            $table->integer('turnovers')->default(0);
            $table->integer('fouls')->default(0);
            $table->integer('efficiency')->default(0);
            $table->integer('plus_minus')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_game_stats');
    }
};
