<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
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
Route::get('novosti', function () {
    return Inertia::render('novosti', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('news');

// novosti show
Route::get('novosti/1', function () {
    return Inertia::render('article', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('article');

// tablica
// Route::get('tablica', function () {
//     return Inertia::render('table', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('table');
// Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');

// Tablica
Route::get('/tablica', [ResultController::class, 'index'])->name('table');
// Route::get('/tablica', [StandingsController::class, 'index'])->name('table');

// statistika
Route::get('statistika', function () {
    return Inertia::render('statistics', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('stats');

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
Route::get('arhiva', function () {
    return Inertia::render('archive', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('archive');

// galerija
Route::get('galerija', function () {
    return Inertia::render('gallery', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('gallery');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
