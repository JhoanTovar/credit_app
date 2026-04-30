<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\ObservationController;

// Rutas de Creditos
Route::post('/credits', [CreditController::class, 'store']);
Route::get('/credits', [CreditController::class, 'index']);
Route::get('/credits/{id}', [CreditController::class, 'showSpecificCredit']);
Route::patch('/credits/{id}/status', [CreditController::class, 'updateStatus']);

// Rutas de Observaciones
Route::post('/observations', [ObservationController::class, 'storeObservation']);
Route::get('/observations/credit/{id}', [ObservationController::class, 'listCreditObservations']);
Route::get('/observations/credit/{id}/{area}', [ObservationController::class, 'filterObservationsByArea']);