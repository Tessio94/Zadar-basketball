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

// statistika
Route::get('statistika', function () {
    return Inertia::render('statistics', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('stats');

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

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
