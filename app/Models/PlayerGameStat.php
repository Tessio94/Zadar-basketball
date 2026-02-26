<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerGameStat extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerGameStatFactory> */
    use HasFactory;

    protected $fillable = [
        'game_id',
        'player_id',
        'team_id',
        'minutes_played',
        'points',
        'fg2_made',
        'fg2_attempted',
        'fg3_made',
        'fg3_attempted',
        'ft_made',
        'ft_attempted',
        'offensive_rebounds',
        'defensive_rebounds',
        'assists',
        'steals',
        'blocks',
        'turnovers',
        'fouls',
        'efficiency'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
