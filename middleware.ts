import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    // Only run for /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = req.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        try {
            // Verify token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            console.error('Admin middleware auth error:', error);
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
