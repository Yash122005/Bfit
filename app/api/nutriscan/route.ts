import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

const FOOD_DB: Record<string, any> = {
    "apple": { calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
    "banana": { calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 },
    "chicken breast": { calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    "rice": { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
    "egg": { calories: 155, protein: 13, carbs: 1.1, fats: 11 },
    "pizza": { calories: 266, protein: 11, carbs: 33, fats: 10 },
    "salad": { calories: 33, protein: 1, carbs: 7, fats: 0 },
};

export async function POST(req: Request) {
    try {
        const user = getUserFromRequest(req);
        // NutriScan can be public? probably not.
        if (!user) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: 'Please provide a food name' }, { status: 400 });
        }

        const lowerQuery = query.toLowerCase();

        // Simple mock search
        let result = FOOD_DB[lowerQuery];

        // Fuzzy search or fallback
        if (!result) {
            const key = Object.keys(FOOD_DB).find(k => lowerQuery.includes(k));
            if (key) result = FOOD_DB[key];
        }

        if (!result) {
            // Random realistic estimation for unknown food
            result = {
                calories: Math.floor(Math.random() * 300) + 50,
                protein: Math.floor(Math.random() * 20),
                carbs: Math.floor(Math.random() * 40),
                fats: Math.floor(Math.random() * 15),
                isEstimate: true
            };
        }

        return NextResponse.json({ success: true, data: { name: query, ...result } });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
