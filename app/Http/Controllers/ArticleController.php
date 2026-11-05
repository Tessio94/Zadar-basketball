<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Models\Article;
use App\Support\ArticleHtml;
use App\Services\ArticleGameSummary;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mainArticles = Article::whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        $additionalArticles = Article::whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->skip(5)
            ->limit(4)
            ->get();

        return Inertia::render('news', [
                'mainArticles' => $mainArticles,
                'additionalArticles' => $additionalArticles,
            ]);
    }

    public function archive()
    {
        $articles = Article::whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(10);

        return Inertia::render('archive', [
            'articles' => $articles,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article, ArticleHtml $html, ArticleGameSummary $summary)
    {
        //
        abort_unless($article->status === 'published' && $article->published_at?->isPast(), 404);
        $article->load('gallery.images');
        // Sanitize legacy content on output without rewriting stored articles.
        $article->content = $html->sanitize($article->content);
        $embeddedGames = Game::query()->whereIn('id', $html->gameIds($article->content))
            ->with(['homeTeam', 'awayTeam', 'season', 'periodScores', 'playerStats.player'])
            ->get()->map(fn(Game $game): array => $summary->make($game))->values();

        $lastArticles = Article::where('status', 'published')->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('article', [
            'lastArticles' => $lastArticles,
            'article' => $article,
            'embeddedGames' => $embeddedGames,
        ]);
    }
}
