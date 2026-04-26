<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ps_Unit;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistik sederhana
        $totalPs = Ps_Unit::count();
        $totalUser = User::where('role', 'user')->count();
        $totalBooking = Booking::count();
        $totalPendapatan = Transaction::where('status', 'paid')->sum('total_harga');

        return Inertia::render('Admin/Dashboard/Index', [
            'totalPs' => $totalPs,
            'totalUser' => $totalUser,
            'totalBooking' => $totalBooking,
            'totalPendapatan' => $totalPendapatan,
        ]);
    }
}
