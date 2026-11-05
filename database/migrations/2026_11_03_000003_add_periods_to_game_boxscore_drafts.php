<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Null identifies a pre-migration draft; [] explicitly removes the breakdown.
        Schema::table('game_boxscore_drafts', fn(Blueprint $table) => $table->json('periods')->nullable());
    }

    public function down(): void
    {
        Schema::table('game_boxscore_drafts', fn(Blueprint $table) => $table->dropColumn('periods'));
    }
};
