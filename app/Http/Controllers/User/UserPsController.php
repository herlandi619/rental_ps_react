<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Ps_Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $ps = Ps_Unit::when($search, function ($query, $search) {
                $query->where('nama_ps', 'like', "%{$search}%")
                      ->orWhere('jenis_ps', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('User/Ps/Index', [
            'psUnits' => $ps,
            'filters' => [
                'search' => $search
            ]
        ]);
    }
}
