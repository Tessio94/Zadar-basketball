<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->withCount('images')
            ->orderByDesc('date')
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('admin/galerije/galleries', [
            'galleries' => $galleries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/galerije/createGallery');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:galleries,slug'],
            'date' => ['nullable', 'date'],

            'images' => ['nullable', 'array'],
            'images.*' => [
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:5120',
            ],

            'alts' => ['nullable', 'array'],
            'alts.*' => ['nullable', 'string', 'max:255'],

            'captions' => ['nullable', 'array'],
            'captions.*' => ['nullable', 'string', 'max:255'],
        ]);

        DB::transaction(function () use ($request, $validated) {
            $gallery = Gallery::create([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'date' => $validated['date'] ?? null,
            ]);

            $this->storeImages($gallery, $request);
        });

        return redirect()
            ->route('galerije.index')
            ->with('success', 'Galerija uspješno kreirana!');
    }

    public function show()
    {
        //
    }

    public function edit(Gallery $gallery): Response
    {
        $gallery->load('images');

        return Inertia::render('admin/galerije/editGallery', [
            'gallery' => $gallery,
        ]);
    }

    public function update(
        Request $request,
        Gallery $gallery
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:galleries,slug,' . $gallery->id,
            ],
            'date' => ['nullable', 'date'],

            'images' => ['nullable', 'array'],
            'images.*' => [
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:5120',
            ],

            'alts' => ['nullable', 'array'],
            'alts.*' => ['nullable', 'string', 'max:255'],

            'captions' => ['nullable', 'array'],
            'captions.*' => ['nullable', 'string', 'max:255'],
        ]);

        DB::transaction(function () use ($request, $validated, $gallery) {
            $gallery->update([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'date' => $validated['date'] ?? null,
            ]);

            $this->storeImages($gallery, $request);
        });

        return redirect()
            ->route('galerije.edit', $gallery)
            ->with('success', 'Galerija uspješno ažurirana!');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        foreach ($gallery->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $gallery->delete();

        return redirect()
            ->route('galerije.index')
            ->with('success', 'Galerija uspješno obrisana!');
    }

    public function destroyImage(
        Gallery $gallery,
        GalleryImage $image
    ): RedirectResponse {
        abort_unless($image->gallery_id === $gallery->id, 404);

        Storage::disk('public')->delete($image->path);

        $image->delete();

        return back()->with(
            'success',
            'Slika uspješno obrisana!'
        );
    }

    public function reorderImages(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['integer', 'exists:gallery_images,id'],
        ]);

        foreach ($validated['images'] as $index => $imageId) {
            GalleryImage::where('id', $imageId)
                ->where('gallery_id', $gallery->id)
                ->update([
                    'sort_order' => $index,
                ]);
        }

        return back();
    }

    private function storeImages(
        Gallery $gallery,
        Request $request
    ): void {
        if (!$request->hasFile('images')) {
            return;
        }

        $currentMaxOrder = $gallery->images()->max('sort_order') ?? -1;

        foreach ($request->file('images') as $index => $file) {
            $path = $file->store('galleries', 'public');

            $gallery->images()->create([
                'path' => $path,
                'alt' => $request->input("alts.$index"),
                'caption' => $request->input("captions.$index"),
                'sort_order' => $currentMaxOrder + $index + 1,
            ]);
        }
    }
}
