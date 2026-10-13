<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->withCount('images')
            ->with([
                'images' => fn ($query) => $query
                    ->orderBy('sort_order')
                    ->limit(1),
            ])
            ->orderByDesc('date')
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('galleries', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery): Response
    {
        $gallery->load('images');

        return Inertia::render('gallery', [
            'gallery' => $gallery,
        ]);
    }
}
