<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $bookings = Booking::with(['user','psUnit'])
            ->when($search, function($q) use ($search){
                $q->whereHas('user', function($q) use ($search){
                        $q->where('name','like',"%$search%");
                    })
                  ->orWhereHas('psUnit', function($q) use ($search){
                        $q->where('nama_ps','like',"%$search%");
                    })
                  ->orWhere('status','like',"%$search%");
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only('search')
        ]);
    }

    public function confirm($id)
    {
        Booking::findOrFail($id)
            ->update(['status'=>'confirmed']);

        return back()->with('success','Booking dikonfirmasi');
    }

    public function reject($id)
    {
        Booking::findOrFail($id)
            ->update(['status'=>'batal']);

        return back()->with('success','Booking ditolak');
    }

    // Terlambat
    public function terlambat(Request $request)
    {
        $search = $request->search;

        $bookings = Booking::with(['user', 'psUnit'])
            ->where('status', 'gagal')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->whereHas('user', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%$search%");
                    })
                    ->orWhereHas('psUnit', function ($q2) use ($search) {
                        $q2->where('nama_ps', 'like', "%$search%");
                    });
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

            //  dd($bookings);

        return Inertia::render('Admin/Bookings/Terlambat', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $search
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }
}
