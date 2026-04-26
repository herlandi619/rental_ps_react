<?php

namespace Database\Seeders;

use App\Models\Ps_Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PsUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama_ps' => 'PS 1', 'jenis_ps' => 'PS4', 'harga_per_jam' => 10000],
            ['nama_ps' => 'PS 2', 'jenis_ps' => 'PS4', 'harga_per_jam' => 10000],
            ['nama_ps' => 'PS 3', 'jenis_ps' => 'PS5', 'harga_per_jam' => 15000],
            ['nama_ps' => 'PS 4', 'jenis_ps' => 'PS3', 'harga_per_jam' => 8000],
        ];

        foreach ($data as $ps) {
            Ps_Unit::create([
                'nama_ps' => $ps['nama_ps'],
                'jenis_ps' => $ps['jenis_ps'],
                'harga_per_jam' => $ps['harga_per_jam'],
                'status' => 'tersedia'
            ]);
        }
    }
}
