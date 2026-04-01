<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::latest()->paginate(10);

        return Inertia::render('admin/novosti/news', [
            'articles' => $articles
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
            'published_at' => 'nullable|date',
            'main_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
        ]);

        $validated['status'] = $validated['status'] ?? 'draft';

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('articles', 'public');
            $validated['main_image'] = $path;
        }

        $validated['meta_title'] = $validated['title'];
        $validated['meta_description'] = Str::limit(strip_tags($validated['content']), 160);

        $article = Article::create($validated);

        return redirect()
            ->route('novosti.index')
            ->with('success', 'Članak uspješno kreiran!');
        }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return Inertia::render('admin/novosti/editArticle', [
            'article' => $article
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $article->update($request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug,' . $article->id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:published,draft',
            'published_at' => 'nullable|date',
            'main_image' => 'nullable|string',
        ]));

        return redirect()->route('novosti.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('editor-images', 'public');

            return response()->json([
                'location' => asset('storage/' . $path)
            ]);
        }

        return response()->json([
            'error' => 'No file uploaded'
        ], 400);
    }
}
