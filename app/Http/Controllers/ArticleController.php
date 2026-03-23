<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mainArticles = Article::orderBy('created_at', 'desc')->limit(5)->get();

        $additionalArticles = Article::orderBy('created_at', 'desc')
            ->skip(5)
            ->limit(4)
            ->get();

        return Inertia::render('news',
            ['mainArticles' => $mainArticles,
            'additionalArticles' => $additionalArticles
        ]);
    }

    public function archive()
    {
        $articles = Article::latest()->paginate(10);

        return Inertia::render('archive', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
        return Inertia::render('article', ['article' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
