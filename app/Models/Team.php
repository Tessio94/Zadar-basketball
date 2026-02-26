<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

       protected $fillable = [
        'name',
        'short_name',
        'logo',
        'city',
        'founded_year'
    ];

    public function players()
    {
        return $this->belongsToMany(Player::class)
            ->withPivot('season_id', 'jersey_number')
            ->withTimestamps();
    }

    public function homeGames()
    {
        return $this->hasMany(Game::class, 'home_team_id');
    }

    public function awayGames()
    {
        return $this->hasMany(Game::class, 'away_team_id');
    }
}
