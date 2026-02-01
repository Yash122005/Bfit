import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
        }

        // Explicitly select password since it might be excluded in schema default (if configured)
        // but here we didn't exclude it in schema, so it's fine.
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken(user._id.toString());

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            fitnessGoal: user.fitnessGoal,
            age: user.age,
            height: user.height,
            weight: user.weight,
        };

        return NextResponse.json({
            success: true,
            token,
            user: userResponse,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
