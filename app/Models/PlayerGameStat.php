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

    public function getFgTotalMadeAttribute()
    {
        return $this->fg2_made + $this->fg3_made;
    }

    public function getFgTotalAttemptedAttribute()
    {
        return $this->fg2_attempted + $this->fg3_attempted;
    }

    public function getFgPercentageAttribute()
    {
        if ($this->fg_total_attempted === 0) {
            return 0;
        }

        return round(
            ($this->fg_total_made / $this->fg_total_attempted) * 100
        );
    }

    public function getFg2PercentageAttribute()
    {
        if ($this->fg2_attempted === 0) {
            return 0;
        }

        return round(($this->fg2_made / $this->fg2_attempted) * 100);
    }

    public function getFg3PercentageAttribute()
    {
        if ($this->fg3_attempted === 0) {
            return 0;
        }

        return round(($this->fg3_made / $this->fg3_attempted) * 100);
    }

    public function getFtPercentageAttribute()
    {
        if ($this->ft_attempted === 0) {
            return 0;
        }

        return round(($this->ft_made / $this->ft_attempted) * 100);
    }
}
