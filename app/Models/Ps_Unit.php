<?php

namespace App\Models;

use App\Models\Booking;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ps_Unit extends Model
{
    /** @use HasFactory<\Database\Factories\PsUnitFactory> */
    use HasFactory;

    protected $guarded = [];
    protected $table = 'ps_units';

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'ps_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ps()
    {
        return $this->belongsTo(Ps_Unit::class, 'ps_id');
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
