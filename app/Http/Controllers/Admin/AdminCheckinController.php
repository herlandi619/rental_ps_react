<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCheckinController extends Controller
{
    // 🔍 HALAMAN CHECK-IN
    public function index(Request $request)
    {
        $search = $request->search;

        $bookings = Booking::with(['user','psUnit'])
            ->where('status','pending') // hanya yg bisa checkin
            ->when($search, function($q) use ($search){
                $q->whereHas('user', function($q2) use ($search){
                    $q2->where('name','like',"%$search%");
                })
                ->orWhereHas('psUnit', function($q2) use ($search){
                    $q2->where('nama_ps','like',"%$search%");
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Checkin/Index', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

        public function process($id)
    {
        $booking = Booking::findOrFail($id);

        if($booking->status != 'pending'){
            return back()->with('error','Booking tidak bisa check-in');
        }

        $booking->update([
            'status' => 'confirmed'
        ]);

        return back()->with('success','User berhasil check-in');
    }

    public function batal($id)
    {
        $booking = Booking::findOrFail($id);

        if($booking->status != 'confirmed'){
            return back()->with('error','Booking tidak bisa dibatalkan');
        }

        $booking->update([
            'status' => 'batal'
        ]);

        return back()->with('success','Booking dibatalkan');
    }

     public function gagalkan($id)
    {
        $booking = Booking::findOrFail($id);

        // hanya boleh kalau masih pending
        if ($booking->status !== 'pending') {
            return back()->with('error', 'Booking tidak bisa dibatalkan');
        }

        $booking->status = 'gagal';
        $booking->save();

        return back()->with('success', 'Booking berhasil dibatalkan');
    }
    
}
 