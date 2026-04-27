<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ps_Unit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserBookingController extends Controller
{ 
    public function index(Request $request)
    {
        $search = $request->search;

        $bookings = Booking::with('psUnit')
            ->where('user_id', auth()->id())
            ->when($search, function ($q) use ($search) {
                $q->whereHas('psUnit', function ($ps) use ($search) {
                    $ps->where('nama_ps','like',"%$search%");
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('User/Booking/Index',[
            'bookings' => $bookings,
            'filters' => ['search'=>$search]
        ]);
    }

        public function create(Ps_Unit $ps)
    {
        return Inertia::render('User/Booking/Create',[
            'ps' => $ps
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ps_id' => 'required',
            'tanggal' => 'required|date',
            'jam_mulai' => 'required',
            'durasi' => 'required|integer|min:1|max:12'
        ]);

        // ⏰ Gabung tanggal + jam mulai
        $start = Carbon::parse($request->tanggal.' '.$request->jam_mulai);

        // ❌ Tidak boleh booking masa lalu
        if($start < now()){
            return back()->with('error','Waktu booking sudah lewat!');
        }

        // 🧮 HITUNG JAM SELESAI OTOMATIS
        $durasi = (int) $request->durasi;
        $end = $start->copy()->addHours($durasi);

        $jamMulai   = $start->format('H:i:s');
        $jamSelesai = $end->format('H:i:s');

        // 🔥 VALIDASI BENTROK (LOGIKA YANG BENAR)
        $bentrok = Booking::where('ps_id',$request->ps_id)
            ->where('tanggal',$request->tanggal)
            ->whereIn('status',['pending','confirmed','checked_in'])
            ->where(function ($q) use ($jamMulai,$jamSelesai) {
                $q->where('jam_mulai','<',$jamSelesai)
                ->where('jam_selesai','>',$jamMulai);
            })
            ->exists();

        if($bentrok){
            return back()->with('error','Jadwal bentrok, pilih jam lain!');
        }

        // ✅ SIMPAN BOOKING
        Booking::create([
            'user_id'=>auth()->id(),
            'ps_id'=>$request->ps_id,
            'tanggal'=>$request->tanggal,
            'jam_mulai'=>$jamMulai,
            'jam_selesai'=>$jamSelesai,
            'status'=>'pending'
        ]);

        return redirect()->route('user.ps.index')
            ->with('success','Booking berhasil dibuat!');
    }


}


