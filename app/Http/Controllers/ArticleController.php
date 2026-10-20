<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;

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
    public function show(Article $article)
    {
        //
        abort_if($article->published_at === null, 404);

        $lastArticles = Article::whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('article', [
            'lastArticles' => $lastArticles,
            'article' => $article
        ]);
    }
}
