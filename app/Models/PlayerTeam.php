<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerTeam extends Model
{
    protected $table = 'player_team';

    protected $fillable = [
        'player_id',
        'team_id',
        'season_id',
        'jersey_number',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }
}
