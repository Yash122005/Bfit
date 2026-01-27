import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Progress from '@/models/Progress';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const user = getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const history = await Progress.find({ user: user.id }).sort({ date: 1 }); // Ascending for chart

        return NextResponse.json({ success: true, data: history });
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

        const { weight, bodyFat } = await req.json();
        const progress = await Progress.create({
            user: user.id,
            weight,
            bodyFat
        });

        return NextResponse.json({ success: true, data: progress }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
