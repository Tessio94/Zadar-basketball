<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Game;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Season;
use App\Support\ArticleHtml;
use Illuminate\Http\Request;
use App\Services\ArticleGameSummary;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publishedArticles = Article::query()
        ->with([
            'tags' => fn ($query) => $query
                ->select('tags.id', 'tags.name')
                ->orderBy('tags.name'),
        ])
        ->where('status', 'published')
        ->where('published_at', '<=', now())
        ->orderByDesc('published_at')
        ->orderByDesc('id');

    $mainArticles = (clone $publishedArticles)
        ->limit(5)
        ->get();

    $additionalArticles = (clone $publishedArticles)
        ->skip(5)
        ->limit(4)
        ->get();

    return Inertia::render('news', [
        'mainArticles' => $mainArticles,
        'additionalArticles' => $additionalArticles,
    ]);

    }

    public function archive(Request $request)
    {
        $filters = $request->validate(['tag' => ['nullable', 'integer', 'min:1']]);
        $activeTag = isset($filters['tag']) ? Tag::findOrFail($filters['tag'], ['id', 'name']) : null;
        $articles = Article::where('status', 'published')->where('published_at', '<=', now())
            ->with([
            'tags' => fn ($query) => $query
                ->select('tags.id', 'tags.name')
                ->orderBy('tags.name'),
            ])
            ->when($activeTag, fn($query) => $query->whereHas('tags', fn($tags) => $tags->where('tags.id', $activeTag->id)))
            ->latest('published_at')->orderByDesc('id')
            ->paginate(10)->withQueryString();

        return Inertia::render('archive', [
            'articles' => $articles,
            'activeTag' => $activeTag,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Article $article, ArticleHtml $html, ArticleGameSummary $summary)
    {
        //

        abort_unless($article->status === 'published' && $article->published_at?->isPast(), 404);
        $article->load(['gallery.images', 'tags']);
        // Sanitize legacy content on output without rewriting stored articles.
        $article->content = $html->sanitize($article->content);

        $season = $request->filled('season')
                ? Season::findOrFail($request->integer('season'))
                : Season::where('is_active', true)->first();

        $embeddedGames = Game::query()->whereIn('id', $html->gameIds($article->content))
            ->with(['homeTeam', 'awayTeam', 'season', 'periodScores', 'playerStats.player'])
            ->get()->map(fn(Game $game): array => $summary->make($game))->values();

        $lastArticles = Article::query()
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->where('id', '!=', $article->getKey())
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('article', [
            'lastArticles' => $lastArticles,
            'article' => $article,
            'embeddedGames' => $embeddedGames,
            'season' => $season?->name
        ]);
    }
}
