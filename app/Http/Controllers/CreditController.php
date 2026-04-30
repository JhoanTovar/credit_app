<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Credit;
use App\Models\Observation;

class CreditController extends Controller
{
    //Store
    public function store(Request $request){

        //Valido los datos ingresados
        $request->validate([
            'nombre_cliente' => 'required|string',
            'cedula' => 'required|string',
            'valor_credito' => 'required|numeric'
        ]);

        //Creo el credito
        $credit = Credit::create([
            'numero_credito' => uniqid(),
            'nombre_cliente' => $request->nombre_cliente,
            'cedula' => $request->cedula,
            'estado' => 'PENDIENTE',
            'valor_credito' => $request->valor_credito
        ]);

        //creo respuesta
        return response()->json($credit,201);
    }

    public function index(){
        $credits = Credit::all();
        return response()->json($credits);
    }

    public function showSpecificCredit($id){
        $credit = Credit::find($id);

        //Break point por si no existe el credito
        if($credit == null){
            return response()->json([
                'message' => 'El credito consultado no ha sido encontrado.'
            ], 404);
        }

        return response()->json($credit);

    }

    public function updateStatus(Request $request, $id){
        $credit = Credit::find($id);

        if($credit == null){
            return response()->json([
                'message' => 'El credito consultado no ha sido encontrado.'
            ], 404);
        }

        //Validar estado del credito protegiendo el enum con in:
        //tratando de evitar valores invalidos

        $request->validate([
            'estado' => 'required|in:PENDIENTE,EN_REVISION,APROBADO,NEGADO'
        ]);

        //Actualizar el estado del credito
        $credit->estado = $request->estado;
        $credit->save();

        //Respuesta
        return response()->json([
            'message' => 'Estado del credito ha sido actualizado correctamente.',
            'data'=>$credit
        ]);
    }
}
