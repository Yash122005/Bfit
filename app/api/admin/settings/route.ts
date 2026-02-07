import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AdminSettings from '@/models/AdminSettings';

export async function GET(req: Request) {
    try {
        await dbConnect();
        let settings = await AdminSettings.findOne();

        if (!settings) {
            settings = await AdminSettings.create({}); // Create default if none
        }

        return NextResponse.json({ settings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        // Update the first document found (since we only have one settings doc)
        // upsert: true helps if it doesn't exist mainly, but findOneAndUpdate is safer for single doc
        const settings = await AdminSettings.findOneAndUpdate(
            {},
            data,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, settings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
