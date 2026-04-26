<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Ps_Unit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending','confirmed','checked_in','selesai','batal','gagal'];

        $users = User::pluck('id')->toArray();
        $psUnits = Ps_Unit::pluck('id')->toArray();

        for ($i=0; $i<10; $i++) {

            $tanggal = Carbon::today()->addDays(rand(0,5));

            $jamMulai = rand(10,20); // jam buka rental
            $durasi = rand(1,3);     // durasi main
            $jamSelesai = $jamMulai + $durasi;

            Booking::create([
                'user_id' => $users[array_rand($users)],
                'ps_id' => $psUnits[array_rand($psUnits)],
                'tanggal' => $tanggal,
                'jam_mulai' => sprintf("%02d:00:00",$jamMulai),
                'jam_selesai' => sprintf("%02d:00:00",$jamSelesai),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}
