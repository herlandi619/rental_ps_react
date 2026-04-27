<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class AdminPaymentController extends Controller
{
     public function index(Request $request)
    {
        $search = $request->search;

        $transactions = Transaction::with('booking.user','booking.psUnit')
            ->when($search, function ($q) use ($search) {
                $q->whereHas('booking.user', fn($x) =>
                    $x->where('name','like',"%$search%")
                );
            }) 
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Pembayaran/Index', [
            'transactions' => $transactions,
            'filters' => $request->only('search')
        ]);
    }

    public function payCash($id)
    
    {
        $trx = Transaction::with('booking.psUnit')->findOrFail($id);

        $booking = $trx->booking;
        $psUnit = $booking->psUnit;

        // 🔥 gabung tanggal + jam (WAJIB)
        $start = Carbon::parse($booking->tanggal.' '.$booking->jam_mulai);
        $end   = Carbon::parse($booking->tanggal.' '.$booking->jam_selesai);

        // 🔥 handle lewat tengah malam
        if ($end->lessThan($start)) {
            $end->addDay();
        }

        // hitung durasi real
        $durasiJam = ceil($start->diffInMinutes($end) / 60);

        if ($durasiJam < 1) {
            $durasiJam = 1;
        }

        // 🔥 BULATKAN KE RIBUAN KE BAWAH
        $total = floor(($psUnit->harga_per_jam * $durasiJam) / 1000) * 1000;

        $trx->update([
            'metode_pembayaran' => 'cash',
            'status' => 'paid',
            'total_harga' => $total
        ]);

        return back()->with('success', 'Pembayaran CASH berhasil');
    }

    public function payQris($id)
    {
        $trx = Transaction::with('booking.psUnit')->findOrFail($id);

        $booking = $trx->booking;
        $psUnit = $booking->psUnit;

         // 🔥 WAJIB gabung tanggal + jam
    $start = Carbon::parse($booking->tanggal.' '.$booking->jam_mulai);
    $end   = Carbon::parse($booking->tanggal.' '.$booking->jam_selesai);

    // 🔥 HANDLE booking lewat tengah malam
    if ($end->lessThan($start)) {
        $end->addDay();
    }

    // 🔥 hitung durasi REAL (dibulatkan ke atas)
    $durasiJam = ceil($start->diffInMinutes($end) / 60);

    // 🔥 hitung total & bulatkan ke ribuan
    $total = floor(($psUnit->harga_per_jam * $durasiJam) / 1000) * 1000;

        $trx->update([
            'metode_pembayaran' => 'qris',
            'status' => 'paid',
            'total_harga' => $total
        ]);

        return back()->with('success', 'Pembayaran QRIS berhasil');
    }

    public function edit($id)
    {
        $trx = Transaction::with('booking.psUnit')->findOrFail($id);

        return inertia('Admin/Pembayaran/Edit', [
            'trx' => $trx
        ]);
    }

    public function update(Request $request, $id)
    {
        $trx = Transaction::findOrFail($id);

        $trx->update([
            'metode_pembayaran' => $request->metode_pembayaran,
            'status' => $request->status,
            'total_harga' => $request->total_harga,
        ]);

        return redirect()->route('admin.pembayaran')
            ->with('success', 'Transaksi berhasil diupdate');
    }

}
