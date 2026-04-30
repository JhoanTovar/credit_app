<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CreditController;

//Crear el POST
Route::post('/credits', [CreditController::class, 'store']);
Route::get('/credits', [CreditController::class, 'index']);
Route::get('/credits/{id}', [CreditController::class, 'showSpecificCredit']);
Route::patch('/credits/{id}/status', [CreditController::class, 'updateStatus']);