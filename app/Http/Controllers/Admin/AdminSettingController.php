<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first(); // hanya 1 row

        return Inertia::render('Admin/Setting/Index', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'harga_default_per_jam' => 'required|numeric|min:1000',
            'batas_keterlambatan' => 'required|numeric|min:1|max:60',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
        ]);

        $setting = Setting::first();

        $setting->update($request->all());

        return back()->with('success','Pengaturan berhasil disimpan');
    }
}
