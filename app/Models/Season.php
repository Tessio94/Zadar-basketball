<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Season extends Model
{
    /** @use HasFactory<\Database\Factories\SeasonFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class)
            ->withPivot('jersey_number')
            ->withTimestamps();
    }
}
