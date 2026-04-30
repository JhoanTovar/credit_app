<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Observation;

class ObservationController extends Controller
{
    //Agrego una observacion al credito
    public function storeObservation(Request $request){
        //Primero valido el request
        $request->validate([
            'credit_id'=>'required|exists:credits,id',
            'usuario' => 'required|string',
            'area'=> 'required|in:COMERCIAL,ANALISIS,TESORERIA,CARTERA',
            'comentario' => 'required|string'
        ]);

        //Crear la observacion

        $observation = Observation::create([
            'credit_id' => $request->credit_id,
            'usuario' => $request->usuario,
            'area' => $request->area,
            'comentario' => $request->comentario 
        ]);

        return response()->json([
            'message'=>'Observacion creada correctamente',
            'data' => $observation
        ], 201);
    }

    //Listar en orden cronologico
    public function listCreditObservations($creditId){
        $observations = Observation::where('credit_id', $creditId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($observations);
    }
}
