import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
        }

        const ADMIN_EMAIL = 'admin@bfit.com';
        const ADMIN_PASSWORD = 'password';

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
        }

        // Sign token with a special admin flag or ID
        // For MVP, we'll use a specific admin ID convention or just a known ID
        // Since signToken expects an ID string, let's use a hardcoded dummy ID for admin
        const ADMIN_ID = 'admin-user-id';
        const token = signToken(ADMIN_ID);

        // You might want a different secret or payload for admin, but for MVP with shared middleware:
        // We'll trust that this token is valid. 
        // Ideally, we'd add { role: 'admin' } to the payload if signToken supported it.
        // Let's modify signToken or just check the ID in middleware if possible, 
        // OR better, since we can't easily change signToken everywhere without checking,
        // we'll stick to basic token for now and handle "admin-ness" by cookie name or separate logic?
        // Actually, the simplest MVP way: just issue a token. 
        // The Middleware needs to distinguish Admin vs User. 
        // Let's set a distinct cookie 'admin_token' instead of just 'token' if possible in the frontend?
        // But here we just return the token. The frontend will likely store it.

        const response = NextResponse.json({
            success: true,
            token,
            user: { email: ADMIN_EMAIL, role: 'admin' }
        });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
