<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\PlayerGameStatController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

////////////////////////////menu//////////////////////////////
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// novosti listing
Route::get('/novosti', [ArticleController::class, 'index'])->name('news');

// novosti show
// Route::get('novosti/1', function () {
//     return Inertia::render('article', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('article');
Route::get('/novosti/{article}', [ArticleController::class, 'show'])->name('article');



// Tablica
Route::get('/tablica', [ResultController::class, 'index'])->name('table');
// Route::get('/tablica', [StandingsController::class, 'index'])->name('table');

// statistika
Route::get('statistika', [PlayerGameStatController::class, 'index'])->name('stats.index');

////////////////////////////van menua//////////////////////////////
// Utakmice
Route::get('utakmice/{game}', [GameController::class, 'show'])->name('games');

// Ekipe
// Ekipe listing
Route::get('ekipe', [TeamController::class, 'index'])->name('teams.index');

// Ekipe show
Route::get('ekipe/{team}', [TeamController::class, 'show'])->name('teams.show');

// igrač show
Route::get('igrac/{player}', [PlayerController::class, 'show'])->name('player.show');

////////////////////////////gornji menu//////////////////////////////
// o nama
Route::get('o-nama', function () {
    return Inertia::render('about', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('about');

// arhiva
// Route::get('arhiva', function () {
//     return Inertia::render('archive', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('archive');
Route::get('/arhiva', [ArticleController::class, 'archive'])->name('archive');

// galerija listing
Route::get('galerija', function () {
    return Inertia::render('galleries', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('galleries');


// galerija show
Route::get('galerija/1', function () {
    return Inertia::render('gallery', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('gallery');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
