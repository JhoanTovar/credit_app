<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            //Referencio al credito con el Id, constrained apunta directamente
            //onCascade define que si se borra el credito se borran las observaciones
            $table->foreignId('credit_id')->constrained()->onDelete('cascade');
            $table->string('usuario');
            $table->enum('area',['COMERCIAL', 'ANALISIS', 'TESORERIA', 'CARTERA']);
            $table->text('comentario');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
