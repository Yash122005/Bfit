import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Workout from '@/models/Workout';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const user = getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const workouts = await Workout.find({ user: user.id }).sort({ date: -1 });

        return NextResponse.json({ success: true, data: workouts });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const user = getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const body = await req.json();
        const workout = await Workout.create({ ...body, user: user.id });

        return NextResponse.json({ success: true, data: workout }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
