<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = ['name', 'normalized_name'];

    protected $hidden = ['normalized_name'];

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class);
    }
}
