<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     return $next($request);
    // }

     public function handle(Request $request, Closure $next, ...$roles)
    {
        // jika belum login
        if (!auth()->check()) {
            return redirect('/login');
        }

        // ✅ kalau middleware dipanggil TANPA parameter role
        if (empty($roles)) {
            return $next($request);
        }

        // cek role user
        if (!in_array(auth()->user()->role, $roles)) {
            abort(403);
        }

        return $next($request);
    }


}
