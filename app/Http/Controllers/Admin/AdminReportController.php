<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    // 📊 HALAMAN LAPORAN + SEARCH + PAGINATION
    public function index(Request $request)
    {
        $search = $request->search;

        $transactions = Transaction::with('booking.user','booking.psUnit')
            ->where('status','paid')
            ->when($search, function($q) use ($search){
                $q->whereHas('booking.user', function($qq) use ($search){
                    $qq->where('name','like',"%$search%");
                });
            }) 
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Report/Index', [
            'transactions' => $transactions,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    // 📄 DOWNLOAD PDF BY DATE
   

    public function download(Request $request)
        {
            $request->validate([
                'start' => 'required|date',
                'end'   => 'required|date'
            ]);

            // 🔥 INI YANG PENTING
            $start = Carbon::parse($request->start)->startOfDay();
            $end   = Carbon::parse($request->end)->endOfDay();

            $transactions = Transaction::with('booking.user','booking.psUnit')
                ->where('status','paid')
                ->whereBetween('created_at', [$start, $end])
                ->get();

            if($transactions->count() == 0){
                return back()->with('error','Tidak ada data pada tanggal tersebut');
            }

            $total = $transactions->sum('total_harga');

            $pdf = Pdf::loadView('pdf.laporan', [
                'transactions' => $transactions,
                'total' => $total,
                'start' => $start,
                'end' => $end
            ]);

            return $pdf->download('laporan-transaksi.pdf');
        }
}
