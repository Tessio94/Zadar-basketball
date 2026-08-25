<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::latest()->paginate(10);

        return Inertia::render('admin/novosti/news', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/novosti/createArticle');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'status' => 'nullable|in:published,draft',
            'main_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
        ]);

        $validated['status'] = $validated['status'] ?? 'draft';

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        } else {
            $validated['published_at'] = null;
        }

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('articles', 'public');
            $validated['main_image'] = $path;
        }

        $validated['meta_title'] = $validated['title'];
        $validated['meta_description'] = Str::limit(strip_tags($validated['content']), 160);

        Article::create($validated);

        return redirect()
            ->route('novosti.index')
            ->with('success', 'Članak uspješno kreiran!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $article->published_at = $article->published_at?->format('Y-m-d');

        return Inertia::render('admin/novosti/editArticle', [
            'article' => $article,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,  slug,' . $article->id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:published,draft',
            'published_at' => 'nullable|date',
            'main_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
        ]);

        if ($validated['status'] === 'draft') {
            $validated['published_at'] = null;
        } elseif ($article->status === 'draft') {

            $validated['published_at'] = now();
        }

        if ($request->hasFile('main_image')) {
            if ($article->main_image) {
                Storage::disk('public')->delete($article->main_image);
            }

            $path = $request->file('main_image')->store('articles', 'public');
            $validated['main_image'] = $path;
        }

        $article->update($validated);

        return redirect()->route('novosti.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article): RedirectResponse
    {
        if ($article->main_image) {
            Storage::disk('public')->delete($article->main_image);
        }

        $article->delete();

        return redirect()->back();
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('editor-images', 'public');

            return response()->json([
                'location' => asset('storage/' . $path),
            ]);
        }

        return response()->json([
            'error' => 'No file uploaded',
        ], 400);
    }
}
