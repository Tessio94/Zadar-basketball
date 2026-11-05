<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveStaffSession
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $pendingId = $request->session()->get('login.id');
        $pendingUser = $pendingId ? User::find($pendingId) : null;

        // Also stop a disabled account that is midway through a 2FA login.
        if (($user && ! $user->canAccessPanel()) ||
            ($pendingId && (! $pendingUser || ! $pendingUser->canAccessPanel()))) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            if ($request->expectsJson()) {
                abort(403, 'Pristup ovom računu je onemogućen.');
            }

            return redirect()->route('login')->withErrors([
                'email' => 'Pristup ovom računu je onemogućen.',
            ]);
        }

        return $next($request);
    }
}
