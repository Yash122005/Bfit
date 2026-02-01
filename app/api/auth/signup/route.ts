import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, password, age, height, weight, fitnessGoal } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            height,
            weight,
            fitnessGoal,
        });

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
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
