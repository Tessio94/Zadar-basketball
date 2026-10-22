<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table): void {
            $table->unsignedInteger('admin_revision')->default(0);
        });
        Schema::create('game_boxscore_drafts', function (Blueprint $table): void {
            $table->foreignId('game_id')->primary()->constrained()->cascadeOnDelete();
            $table->json('players');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_boxscore_drafts');
        Schema::table('games', fn (Blueprint $table) => $table->dropColumn('admin_revision'));
    }
};
