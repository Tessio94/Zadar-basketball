<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'height',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }

    public function teamSeasons()
    {
        return $this->belongsToMany(
            TeamSeason::class,
            'team_season_players'
        )
            ->withPivot('jersey_number')
            ->withTimestamps();
    }

    public function gameStats()
    {
        return $this->hasMany(PlayerGameStat::class);
    }
}
