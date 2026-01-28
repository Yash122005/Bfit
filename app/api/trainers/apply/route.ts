import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrainerApplication from '@/models/TrainerApplication';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const application = await TrainerApplication.create(body);

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (error: any) {
        // Check for duplicate email error (MongoDB code 11000)
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'An application with this email already exists.' }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
