import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    if (
        path.includes('.') ||
        path.startsWith('/_next') ||
        path.startsWith('/api')
    ) {
        return NextResponse.next();
    }

    // Redirect /login → /admin/login
    if (path === '/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Protect /admin routes (except login)
    if (path.startsWith('/admin')) {
        if (path === '/admin/login') return NextResponse.next();

        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/admin/:path*'],
};
