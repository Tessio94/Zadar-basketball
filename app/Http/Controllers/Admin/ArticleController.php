<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Gallery;
use Illuminate\Support\Str;
use App\Support\ArticleHtml;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\ArticleTagService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\ArticleRequest;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'direction' => ['nullable', 'in:asc,desc'],
        ]);

        $search = $validated['search'] ?? null;
        $direction = $validated['direction'] ?? 'desc';

        $articles = Article::query()
            ->when($search, function($query, $search): void {
                $query->where('title', 'ilike', "%{$search}%");
            })
            ->orderBy('published_at', $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/novosti/news', [
            'articles' => $articles,
            'filters' => [
                'search' => $search,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/novosti/createArticle', ['galleries' => $this->galleries(), 'tagOptions' => $this->tagOptions()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request, ArticleHtml $html, ArticleTagService $tags)
    {

        $validated = $request->validated();
        $tagInput = $validated['tags_input'] ?? '';
        unset($validated['tags_input']);
        $validated['content'] = $html->sanitize($validated['content']);

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

        DB::transaction(function() use ($validated, $tags, $tagInput): void {
            $article = Article::create($validated);
            $tags->sync($article, $tagInput);
        });

        return redirect()
            ->route('novosti.index')
            ->with('success', 'Članak uspješno kreiran!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $article->load('tags');
        $article->published_at = $article->published_at?->format('Y-m-d');

        return Inertia::render('admin/novosti/editArticle', [
            'article' => $article,
            'galleries' => $this->galleries(),
            'tagOptions' => $this->tagOptions(),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article, ArticleHtml $html, ArticleTagService $tags)
    {

        $validated = $request->validated();
        $tagInput = $validated['tags_input'] ?? '';
        unset($validated['tags_input']);
        $validated['content'] = $html->sanitize($validated['content']);

        if ($validated['status'] === 'draft') {
            $validated['published_at'] = null;
        } elseif (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('main_image')) {
            if ($article->main_image) {
                Storage::disk('public')->delete($article->main_image);
            }

            $path = $request->file('main_image')->store('articles', 'public');
            $validated['main_image'] = $path;
        }

        // A null upload means keep the existing cover, not clear its storage path.
        if (! $request->hasFile('main_image')) {
            unset($validated['main_image']);
        }
        $validated['meta_title'] = $validated['title'];
        $validated['meta_description'] = Str::limit(strip_tags($validated['content']), 160);
        DB::transaction(function() use ($article, $validated, $request, $tags, $tagInput): void {
            $article->update($validated);
            // Omitted by older clients: preserve. Present but blank: detach all.
            if ($request->exists('tags_input')) {
                $tags->sync($article, $tagInput);
            }
        });

        return redirect()
                ->route('novosti.index')
                ->with('success', 'Članak uspješno izmijenjen!');
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

        return redirect()
                ->back()
                ->with('success', 'Članak uspješno izbrisan!');;
    }

    private function tagOptions()
    {
        return Tag::query()->orderBy('name')->get(['id', 'name']);
    }

    private function galleries()
    {
        return Gallery::query()->withCount('images')->orderByDesc('date')->orderByDesc('id')->get(['id', 'title', 'slug', 'is_listed']);
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['file' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120']]);
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
