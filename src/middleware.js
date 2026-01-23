import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Only protect /admin (dashboard)
    // We exclude /admin/login from this check automatically because the matcher matches /admin exactly or we can verify.
    // Actually, if matcher is '/admin', it only matches /admin. 
    // If we want to protect subpaths, we likely want '/admin/:path*'.
    // But we must NOT redirect /admin/login to itself.

    if (path.startsWith('/admin')) {
        // Allow access to login page
        if (path === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        // Check availability of token
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
