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
        Schema::create('bookings', function (Blueprint $table) {
             $table->id();

            // MEMBER (nullable kalau guest)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // GUEST BOOKING (WAJIB untuk input manual)
            $table->string('nama_user')->nullable();

            // PS UNIT
            $table->foreignId('ps_id')
                ->constrained('ps_units')
                ->cascadeOnDelete();

            // WAKTU BOOKING
            $table->date('tanggal');
            $table->time('jam_mulai');
            $table->time('jam_selesai');

            // STATUS FLOW SISTEM
            $table->enum('status', [
                'pending',      // baru booking
                'confirmed',    // disetujui admin
                'checked_in',   // mulai main
                'selesai',      // selesai main
                'batal',        // dibatalkan
                'gagal'         // error / tidak valid
            ])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
