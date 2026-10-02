<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playoff extends Model
{
    /** @use HasFactory<\Database\Factories\PlayoffFactory> */
    use HasFactory;

    protected $fillable = [
        'season_id',
        'name'
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
