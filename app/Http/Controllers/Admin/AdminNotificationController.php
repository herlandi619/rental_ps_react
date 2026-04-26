<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    // public function index()
    // {
    //     $bookingBaru = Booking::with('user','psUnit')
    //     ->where('status', 'pending')
    //     ->latest()
    //     ->get();

    //     return response()->json([
    //         'data' => $bookingBaru,
    //         'count' => $bookingBaru->count()
    //     ]);
    // }

    public function index()
{
    $bookingBaru = Booking::with('user', 'psUnit')
        ->whereIn('status', ['pending', 'batal']) // 👈 TAMBAHAN DISINI
        ->latest()
        ->get();

    return response()->json([
        'data' => $bookingBaru,
        'count' => $bookingBaru->where('status', 'pending')->count()
    ]);
}

    

    
}
