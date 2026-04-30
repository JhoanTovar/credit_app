<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Credit;

class Observation extends Model
{
    protected $fillable = [
        'credit_id',
        'usuario',
        'area',
        'comentario'
    ];

    public function credit()
    {
        return $this->belongsTo(Credit::class);
    }
}
