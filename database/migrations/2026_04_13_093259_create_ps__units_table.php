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
        Schema::create('ps_units', function (Blueprint $table) {
            $table->id();
            $table->string('nama_ps');
            $table->enum('jenis_ps', ['PS3', 'PS4', 'PS5']);
            $table->integer('harga_per_jam');

            $table->enum('status', ['tersedia', 'digunakan'])
                  ->default('tersedia');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ps_units');
    }
};
