import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Skip middleware for static files and public resources
    if (
        path.includes('.') || // Static files (manifest.json, icons, etc.)
        path.startsWith('/_next') ||
        path.startsWith('/api')
    ) {
        return NextResponse.next();
    }

    // Only protect /admin routes (except login)
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
    matcher: [
        // Match admin routes but exclude static files
        '/admin/:path*',
    ],
};
