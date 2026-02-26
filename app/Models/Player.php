<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'height',
        'position'
    ];

    public function teams()
    {
        return $this->belongsToMany(Team::class)
            ->withPivot('season_id', 'jersey_number')
            ->withTimestamps();
    }

    public function gameStats()
    {
        return $this->hasMany(PlayerGameStat::class);
    }
}
