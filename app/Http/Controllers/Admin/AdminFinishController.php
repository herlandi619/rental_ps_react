<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminFinishController extends Controller
{
     // halaman finish sesi
    public function index(Request $request)
    {
        $search = $request->search;

        $bookings = Booking::with(['user','psUnit'])
            ->where('status','checked_in') // hanya yang sedang main
            ->when($search, function($q) use ($search){
                $q->whereHas('user', fn($u)=>$u->where('name','like',"%$search%"))
                  ->orWhereHas('psUnit', fn($p)=>$p->where('nama_ps','like',"%$search%"));
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Finish/Index',[
            'bookings'=>$bookings,
            'filters'=>$request->only('search')
        ]);
    }

    // proses klik tombol selesai
    public function finish($id)
    {
        $booking = Booking::findOrFail($id);

        // 1️⃣ ubah status booking → selesai
        $booking->update([
            'status' => 'selesai'
        ]);

        // 2️⃣ hitung durasi bermain (jam)
        $jamMulai   = strtotime($booking->jam_mulai);
        $jamSelesai = strtotime($booking->jam_selesai);
        $durasiJam  = ($jamSelesai - $jamMulai) / 3600;

        // 3️⃣ ambil harga PS per jam
        // asumsi di tabel ps_units ada kolom harga_per_jam
        $hargaPerJam = $booking->psUnit->harga_per_jam ?? 10000;

        $totalHarga = $durasiJam * $hargaPerJam;

        // 4️⃣ buat transaksi otomatis (status unpaid)
        Transaction::create([
            'booking_id' => $booking->id,
            'total_harga' => $totalHarga,
            'status' => 'unpaid'
        ]);

        return back()->with('success','Sesi selesai & transaksi berhasil dibuat');
    }
}
