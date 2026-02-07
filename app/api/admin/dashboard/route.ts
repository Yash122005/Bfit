import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrainerApplication from '@/models/TrainerApplication';

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Count stats
        const totalApplications = await TrainerApplication.countDocuments();
        const pendingVerifications = await TrainerApplication.countDocuments({ status: 'Pending' });
        const verifiedTrainers = await TrainerApplication.countDocuments({ status: 'Verified' });
        const rejectedTrainers = await TrainerApplication.countDocuments({ status: 'Rejected' });

        return NextResponse.json({
            stats: {
                totalApplications,
                pendingVerifications,
                verifiedTrainers,
                rejectedTrainers,
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
