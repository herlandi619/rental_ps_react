<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    
   public function store(Request $request): RedirectResponse
{
    // 🔐 VALIDASI
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // 💾 SIMPAN USER
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // 🔔 EVENT REGISTER (email verification dll kalau nanti dipakai)
    event(new Registered($user));

    // ❌ HAPUS AUTO LOGIN (INI YANG PENTING)
    // Auth::login($user);  ← jangan ada lagi

    // 🔥 BALIK KE HALAMAN REGISTER + FLASH MESSAGE
    return redirect()
        ->route('register')
        ->with('success', 'Akun berhasil dibuat! Silakan login.');
}
}
