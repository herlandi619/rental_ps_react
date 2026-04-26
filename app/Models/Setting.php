<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'harga_default_per_jam',
        'batas_keterlambatan',
        'jam_buka',
        'jam_tutup'
    ];
}
