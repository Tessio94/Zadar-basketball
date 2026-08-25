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

    public function teams()
    {
        return $this->belongsToMany(Team::class)
            ->withPivot('season_id', 'jersey_number')
            ->withTimestamps();
    }

    public function teamAssignments()
    {
        return $this->hasMany(PlayerTeam::class);
    }

    public function gameStats()
    {
        return $this->hasMany(PlayerGameStat::class);
    }
}
