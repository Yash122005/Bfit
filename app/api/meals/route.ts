import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Meal from '@/models/Meal';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const user = getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const meals = await Meal.find({ user: user.id }).sort({ date: -1 });

        return NextResponse.json({ success: true, data: meals });
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
        // body should have name, items, totalCalories, etc.
        // Calculate totals if not provided? Assuming frontend sends totals for MVP.
        // But better to validate totals match items if complex. 
        // For MVP, trust frontend or minimal validation.

        const meal = await Meal.create({ ...body, user: user.id });

        return NextResponse.json({ success: true, data: meal }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
