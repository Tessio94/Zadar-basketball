<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'date',
        'is_listed',
    ];

    protected $casts = [
        'date' => 'date',
        'is_listed' => 'boolean',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class)
            ->orderBy('sort_order');
    }
}
