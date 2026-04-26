<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ps_Unit;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
 
class AdminMonitoringController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $bookings = Booking::with(['user','psUnit'])
            ->whereIn('status',['confirmed'])
            ->when($search, function($q) use ($search){
                $q->whereHas('user', fn($u)=>$u->where('name','like',"%$search%"))
                  ->orWhereHas('psUnit', fn($p)=>$p->where('nama_ps','like',"%$search%"));
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Monitoring/Index',[
            'bookings'=>$bookings,
            'filters'=>$request->only('search')
        ]);
    }

    // tombol main
    public function main($id)
    {
            DB::beginTransaction();

        try {
            $booking = Booking::with('psUnit')->findOrFail($id);

            // 1. update booking
            $booking->update([
                'status' => 'selesai'
            ]);

            // 2. ambil harga (sesuaikan field kamu)
            $harga = $booking->psUnit->harga ?? 0;

            // 3. create transaction (WAJIB lengkap)
            Transaction::create([
                'booking_id' => $booking->id,
                'total_harga' => $harga,
                'metode_pembayaran' => null, // boleh null
                'status' => 'unpaid', // WAJIB sesuai enum
            ]);

            DB::commit();

            return back()->with('success', 'Transaksi berhasil dibuat');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', $e->getMessage());
        }
    }

    // optional (kalau pakai page create)
    public function create()
    {
        return inertia('Admin/Monitoring/Create', [
            'users' => User::all(),
            'psUnits' => Ps_Unit::all()
        ]);
    }

   
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'nama_user'   => 'required|string',
    //         'ps_id'       => 'required|exists:ps_units,id',
    //         'jam_mulai'   => 'required',
    //         'jam_selesai' => 'required',
    //     ]);

    //     $user = User::where('name', $request->nama_user)->first();

    //     Booking::create([
    //         'user_id' => $user?->id,
    //         'nama_user' => $request->nama_user,
    //         'ps_id' => $request->ps_id,

    //         // 🔥 AUTO TANGGAL HARI INI
    //         'tanggal' => now()->toDateString(),

    //         'jam_mulai' => $request->jam_mulai,
    //         'jam_selesai' => $request->jam_selesai,

    //         'status' => 'confirmed',
    //     ]);

    //     return redirect()->route('admin.monitoring')
    //         ->with('success', 'Booking berhasil dibuat');
    // }


    public function store(Request $request)
    {
        $request->validate([
            'nama_user' => 'required|string',
            'ps_id'     => 'required|exists:ps_units,id',
            'jam_mulai' => 'required',
            'durasi'    => 'required|integer|min:1|max:12'
        ]);

        // cari user jika ada
        $user = User::where('name', $request->nama_user)->first();

        // ⏰ waktu mulai hari ini
        $durasi = (int) $request->durasi;
        $start  = Carbon::parse(now()->toDateString().' '.$request->jam_mulai);
        $end    = $start->copy()->addHours($durasi);

        $jamMulai   = $start->format('H:i:s');
        $jamSelesai = $end->format('H:i:s');

        // 🔥 CEK BENTROK JADWAL
        $bentrok = Booking::where('ps_id',$request->ps_id)
            ->where('tanggal', now()->toDateString())
            ->whereIn('status',['pending','confirmed','checked_in'])
            ->where(function ($q) use ($jamMulai,$jamSelesai) {
                $q->where('jam_mulai','<',$jamSelesai)
                ->where('jam_selesai','>',$jamMulai);
            })
            ->exists();

        if($bentrok){
            return back()->with('error','Jadwal bentrok!');
        }

        // ✅ SIMPAN BOOKING MANUAL
        Booking::create([
            'user_id'   => $user?->id,
            'nama_user' => $request->nama_user,
            'ps_id'     => $request->ps_id,
            'tanggal'   => now()->toDateString(),
            'jam_mulai' => $jamMulai,
            'jam_selesai'=> $jamSelesai,
            'status'    => 'confirmed', // langsung confirmed karena admin input
        ]);

        return redirect()->route('admin.monitoring')
            ->with('success','Booking berhasil dibuat');
    }

    // DESTROY
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->delete();

        return back()->with('success', 'Booking berhasil dihapus');
    }

}
