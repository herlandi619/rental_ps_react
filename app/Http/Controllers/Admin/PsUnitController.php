<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ps_Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PsUnitController extends Controller
{
    
    public function index(Request $request)
    {
        $query = Ps_Unit::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_ps', 'like', '%' . $request->search . '%')
                ->orWhere('jenis_ps', 'like', '%' . $request->search . '%');
            });
        }

        $ps = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Ps/Index', [
            'ps' => $ps,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Ps/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_ps' => 'required',
            'jenis_ps' => 'required',
            'harga_per_jam' => 'required|numeric'
        ]);

        Ps_Unit::create([
            'nama_ps' => $request->nama_ps,
            'jenis_ps' => $request->jenis_ps,
            'harga_per_jam' => $request->harga_per_jam,
            'status' => 'tersedia'
        ]);

        return redirect()->route('ps.index')
            ->with('success', 'Data PS berhasil ditambahkan');
    }

    public function edit($id)
    {
        $ps = Ps_Unit::findOrFail($id);

        return Inertia::render('Admin/Ps/Edit', [
            'ps' => $ps
        ]);
    }

    public function update(Request $request, $id)
    {
        $ps = Ps_Unit::findOrFail($id);

        $ps->update([
            'nama_ps' => $request->nama_ps,
            'jenis_ps' => $request->jenis_ps,
            'harga_per_jam' => $request->harga_per_jam,
            'status' => $request->status
        ]);

        return redirect()->route('ps.index')
            ->with('success', 'Data PS berhasil diupdate');
    }

    public function destroy($id)
    {
        $ps = Ps_Unit::findOrFail($id);
        $ps->delete();

        return redirect()->route('ps.index')
            ->with('success', 'Data PS berhasil dihapus');
    }
}
