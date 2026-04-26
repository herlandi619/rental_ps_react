<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $users = User::where('role','user') // admin tidak ikut tampil
            ->when($search, function($q) use ($search){
                $q->where('name','like',"%$search%")
                  ->orWhere('email','like',"%$search%");
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    // DELETE USER
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return back()->with('success','User berhasil dihapus');
    }

    // BLOCK USER (NONAKTIFKAN)
    public function block($id)
    {
        $user = User::findOrFail($id);
        $user->is_active = 0;
        $user->save();

        return back()->with('success','User berhasil dinonaktifkan');
    }

    // UNBLOCK USER (AKTIFKAN)
    public function unblock($id)
    {
        $user = User::findOrFail($id);
        $user->is_active = 1;
        $user->save();

        return back()->with('success','User berhasil diaktifkan');
    }
}
