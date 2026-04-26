<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardLaporanController extends Controller
{ 
    public function index(Request $request)
    {
        $filter = $request->filter ?? 'harian';
        $search = $request->search;

        // 📅 FILTER TANGGAL
        if($filter == 'harian'){
            $start = Carbon::today();
        }else{
            $start = Carbon::now()->startOfMonth();
        }

        // 💰 TOTAL PENDAPATAN
        $totalPendapatan = Transaction::where('status','paid')
            ->whereDate('created_at','>=',$start)
            ->sum('total_harga');

        // 📦 TOTAL BOOKING
        $totalBooking = Booking::whereDate('created_at','>=',$start)->count();

        // 🎮 BOOKING SELESAI (dipakai statistik PS)
        $bookingSelesai = Booking::where('status','selesai')
            ->whereDate('updated_at','>=',$start)
            ->count();

        // 💳 CASH vs QRIS
        $cash = Transaction::where('status','paid')
            ->where('metode_pembayaran','cash')
            ->whereDate('updated_at','>=',$start)
            ->count();

        $qris = Transaction::where('status','paid')
            ->where('metode_pembayaran','qris')
            ->whereDate('updated_at','>=',$start)
            ->count();

        // 📋 TABEL TRANSAKSI
        $transactions = Transaction::with('booking.user','booking.psUnit')
            ->when($search,function($q) use ($search){
                $q->whereHas('booking.user',fn($u)=>$u->where('name','like',"%$search%"));
            })
            ->where('status','paid')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/DashboardLaporan/Index',[
            'stats'=>[
                'pendapatan'=>$totalPendapatan,
                'booking'=>$totalBooking,
                'selesai'=>$bookingSelesai,
                'cash'=>$cash,
                'qris'=>$qris,
            ],
            'transactions'=>$transactions,
            'filters'=>$request->only('search','filter')
        ]);
    }
}
