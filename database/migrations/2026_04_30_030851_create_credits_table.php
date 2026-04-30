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
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            //Hago la abstraccion de la entidad Credito
            $table->string('numero_credito')->unique();
            $table->string('nombre_cliente');
            $table->string('cedula');
            $table->enum('estado',['PENDIENTE','EN_REVISION','APROBADO','NEGADO'])->default('PENDIENTE');
            $table->decimal('valor_credito',12,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};
