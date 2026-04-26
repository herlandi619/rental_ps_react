<?php

namespace App\Models;

use App\Models\Ps_Unit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;
    protected $guarded = [];
    // Booking milik 1 User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Booking milik 1 PS Unit
    public function psUnit()
    {
        return $this->belongsTo(Ps_Unit::class, 'ps_id');
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
