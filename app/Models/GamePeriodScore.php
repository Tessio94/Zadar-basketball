<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GamePeriodScore extends Model
{
    protected $fillable = ['period_number', 'home_score', 'away_score'];

    protected function casts(): array
    {
        return ['period_number' => 'integer', 'home_score' => 'integer', 'away_score' => 'integer'];
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
