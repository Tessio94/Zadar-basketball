<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamSeason extends Model
{
    protected $fillable = [
        'team_id',
        'season_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function players()
    {
        return $this->belongsToMany(
            Player::class,
            'team_season_players'
        )
            ->withPivot('jersey_number')
            ->withTimestamps();;
    }
}
