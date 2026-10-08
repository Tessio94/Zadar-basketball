<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
        'logo',
        'logo_color',
        'city',
        'founded_year',
    ];

    protected $casts = [
        'founded_year' => 'integer',
    ];

    public function teamSeasons()
    {
        return $this->hasMany(TeamSeason::class);
    }

    public function seasons()
    {
        return $this->belongsToMany(
            Season::class,
            'team_seasons'
        );
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
