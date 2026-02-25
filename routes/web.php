<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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
Route::get('tablica', function () {
    return Inertia::render('table', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('table');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
