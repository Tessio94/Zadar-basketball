<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\PlayerGameStatController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/**
 *  Navigation menu pages
 */

// naslovnica
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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
Route::get('o-nama', function () {
    return Inertia::render('about');
})->name('about');

// arhiva
Route::get('arhiva', [ArticleController::class, 'archive'])->name('archive');

// galerija listing
Route::get('galerija', function () {
    return Inertia::render('galleries');
})->name('galleries');

// galerija show
Route::get('galerija/1', function () {
    return Inertia::render('gallery');
})->name('gallery');


/**
 *  admin panel pages
 */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin-panel', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.panel');


    Route::resource('novosti', AdminArticleController::class);
});




require __DIR__.'/settings.php';
