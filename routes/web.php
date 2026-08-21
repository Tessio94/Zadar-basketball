<?php

declare(strict_types=1);

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PlayerGameStatController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\DashboardController;

/**
 *  Navigation menu pages
 */

// naslovnica
Route::get('/', fn() => Inertia::render('welcome'))->name('home');

// novosti listing
Route::get('novosti', [ArticleController::class, 'index'])->name('news');

// novosti show
Route::get('novosti/{article}', [ArticleController::class, 'show'])->name('article');

// Tablica
Route::get('tablica', [ResultController::class, 'index'])->name('table');

// statistika
Route::get('statistika', [PlayerGameStatController::class, 'index'])->name('stats.index');

/**
 *  Non-menu pages
 */
// Utakmice
Route::get('utakmice/{game}', [GameController::class, 'show'])->name('games');

// Ekipe listing
Route::get('ekipe', [TeamController::class, 'index'])->name('teams.index');

// Ekipe show
Route::get('ekipe/{team}', [TeamController::class, 'show'])->name('teams.show');

// igrač show
Route::get('igrac/{player}', [PlayerController::class, 'show'])->name('player.show');

/**
 *  upper small menu pages
 */
// o nama
Route::get('o-nama', fn() => Inertia::render('about'))->name('about');

// arhiva
Route::get('arhiva', [ArticleController::class, 'archive'])->name('archive');

// galerija listing
Route::get('galerija', fn() => Inertia::render('galleries'))->name('galleries');

// galerija show
Route::get('galerija/1', fn() => Inertia::render('gallery'))->name('gallery');

/**
 *  admin panel pages
 */
Route::middleware(['auth', 'verified'])->prefix('admin-panel')->group(function(): void {
    // Route::get('/', fn() => Inertia::render('admin/dashboard'))->name('admin.panel');
    Route::get('/', [DashboardController::class, 'index'])->name('admin.panel');

    Route::resource('novosti', AdminArticleController::class)
        ->parameters(['novosti' => 'article']);

    Route::post('novosti/upload-image', [AdminArticleController::class, 'uploadImage']);
});

require __DIR__ . '/settings.php';
