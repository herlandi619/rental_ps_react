<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserHistoryController extends Controller
{
    public function history(Request $request)
    {
        $search = $request->search; 

        $bookings = Booking::with('psUnit')
            ->where('user_id', auth()->id())
            ->whereIn('status', ['selesai','gagal','batal','pending','confirmed'])
            ->when($search, function($q) use ($search){
                $q->whereHas('psUnit', function($q2) use ($search){
                    $q2->where('nama_ps','like',"%$search%");
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();
        // dd($bookings->items()[0]->psUnit->toArray());
 
        return Inertia::render('User/History/Index', [
            'bookings' => $bookings,
            'filters' => $request->only('search'),
            'flash' => session()->get('flash')
        ]);
    }

    public function cancel(Booking $booking)
    {
        // 🔐 pastikan booking milik user
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        // ❗ hanya booking CONFIRMED yg boleh dibatalkan
        if ($booking->status !== 'confirmed') {
            return back()->with('error', 'Booking hanya bisa dibatalkan setelah dikonfirmasi admin');
        }

        // 🔄 ubah status → batal
        $booking->update([
            'status' => 'batal'
        ]);

        return back()->with('success', 'Booking berhasil dibatalkan');
    }

    public function fail(Booking $booking)
    {
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        if ($booking->status !== 'pending') {
            return back()->with('error', 'Booking tidak bisa digagalkan');
        }

        $booking->update([
            'status' => 'gagal'
        ]);

        return back()->with('success', 'Booking berhasil digagalkan');
    }

}
