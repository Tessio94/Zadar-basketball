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
use App\Http\Controllers\Admin\PlayerController as AdminPlayerController;
use App\Http\Controllers\Admin\SeasonController as AdminSeasonController;
use App\Http\Controllers\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\GalleryController;

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
// Utakmice listing
Route::get('utakmice', [GameController::class, 'index'])->name('games');

// Utakmice show
Route::get('utakmice/{game}', [GameController::class, 'show'])->name('game');

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
Route::get('galerija', [GalleryController::class, 'index'])->name('galleries');

// galerija show
Route::get('galerija/{gallery:slug}', [GalleryController::class, 'show'])->name('gallery');

/**
 *  admin panel pages
 */
Route::middleware(['auth', 'verified'])->prefix('admin-panel')->group(function(): void {

    Route::get('/', [DashboardController::class, 'index'])->name('admin.panel');

    Route::resource('novosti', AdminArticleController::class)
        ->parameters(['novosti' => 'article']);

    Route::post('novosti/upload-image', [AdminArticleController::class, 'uploadImage']);

    Route::resource('ekipe', AdminTeamController::class)
        ->parameters(['ekipe' => 'team']);

    Route::resource('sezone', AdminSeasonController::class)
        ->parameters(['sezone' => 'season']);

    Route::resource('igraci', AdminPlayerController::class)
        ->parameters(['igraci' => 'player']);

    Route::resource('galerije', AdminGalleryController::class)
            ->except(['show'])
            ->parameters(['galerije' => 'gallery']);

    Route::delete(
        'galerije/{gallery}/images/{image}',
        [AdminGalleryController::class, 'destroyImage']
    )->name('galerije.images.destroy');

    Route::patch(
        'galerije/{gallery}/images/reorder',
        [AdminGalleryController::class, 'reorderImages']
    )->name('galerije.images.reorder');

    Route::patch(
        'galerije/{gallery}/images/{image}',
        [AdminGalleryController::class, 'updateImage']
    )
        ->whereNumber('image')
        ->name('galerije.images.update');


});

require __DIR__ . '/settings.php';
