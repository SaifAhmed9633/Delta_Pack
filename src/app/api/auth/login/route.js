import { NextResponse } from 'next/server';

export async function POST(request) {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
        const response = NextResponse.json({ success: true });

        // Set a cookie
        response.cookies.set('admin_token', 'secure_admin_session', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
