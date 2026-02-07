import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrainerApplication from '@/models/TrainerApplication';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const trainers = await TrainerApplication.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ trainers });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, status } = await req.json();

        if (!id || !['Verified', 'Rejected'].includes(status)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const trainer = await TrainerApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!trainer) {
            return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, trainer });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
