import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trainer from '@/models/Trainer';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await dbConnect();

        const trainer = await Trainer.findById(params.id);

        if (!trainer) {
            return NextResponse.json({ success: false, error: 'Trainer not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: trainer });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
