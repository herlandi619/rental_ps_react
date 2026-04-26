<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ps_Unit;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $totalBooking = Booking::where('user_id', $userId)->count();

        $bookingAktif = Booking::where('user_id', $userId)
            ->whereIn('status', ['confirmed','checked_in'])
            ->count();

        $bookingSelesai = Booking::where('user_id', $userId)
            ->where('status', 'selesai')
            ->count();

        // 🔥 TOTAL JAM MAIN (dari booking selesai)
        $totalJamMain = Booking::where('user_id', $userId)
            ->where('status','selesai')
            ->get()
            ->sum(function ($b) {
                $mulai = Carbon::parse($b->jam_mulai);
                $selesai = Carbon::parse($b->jam_selesai);
                return $selesai->diffInHours($mulai);
            });

        $bookingTerbaru = Booking::with('psUnit')
            ->where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();

         $bookingBatal = Booking::where('user_id', $userId)
        ->where('status', 'batal')
        ->count();

        return Inertia::render('User/Dashboard/Index', [
            'totalBooking' => $totalBooking,
            'bookingAktif' => $bookingAktif,
            'bookingSelesai' => $bookingSelesai,
            'totalJamMain' => $totalJamMain,
            'bookingTerbaru' => $bookingTerbaru,
            'bookingBatal' => $bookingBatal,
        ]);
    }
}
