<?php

use Illuminate\Support\Facades\Route;

// Todas las rutas del frontend son manejadas por Vue

Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');