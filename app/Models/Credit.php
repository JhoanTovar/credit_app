<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    //Poner como protegido (solo en esta misma clase) para evitar que se inserten
    //campos no autorizados
    protected $fillable = [
        'numero_credito',
        'nombre_cliente',
        'cedula',
        'estado',
        'valor_credito',
    ];


    public function observations(){
        //Este credito tiene muchas observaciones
        return $this->hasMany(Observation::class);
    }
}
