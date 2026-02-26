<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

     protected $fillable = [
        'season_id',
        'home_team_id',
        'away_team_id',
        'game_date',
        'round_number',
        'home_score',
        'away_score',
        'status'
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function playerStats()
    {
        return $this->hasMany(PlayerGameStat::class);
    }
}
