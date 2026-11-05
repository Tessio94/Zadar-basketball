<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function(Blueprint $table): void {
            // Existing accounts are deliberately not promoted automatically.
            $table->string('role', 20)->nullable();
            $table->boolean('is_active')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('users', function(Blueprint $table): void {
            $table->dropColumn(['role', 'is_active']);
        });
    }
};
