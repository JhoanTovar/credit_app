<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    public function credit(){
        //Esta observacion pertenece a una instancia de la clase Credit
        return $this->belongsTo(Credit::class);
    }
}
