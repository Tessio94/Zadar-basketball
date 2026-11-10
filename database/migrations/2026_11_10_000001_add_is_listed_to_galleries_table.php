<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('galleries', function (Blueprint $table): void {
            // Preserve existing public galleries. Editors can unlist them individually.
            $table->boolean('is_listed')->default(true)->index();
        });
    }

    public function down(): void
    {
        Schema::table('galleries', function (Blueprint $table): void {
            $table->dropIndex(['is_listed']);
            $table->dropColumn('is_listed');
        });
    }
};
