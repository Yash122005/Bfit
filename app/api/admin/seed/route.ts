import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrainerApplication from '@/models/TrainerApplication';
import AdminSettings from '@/models/AdminSettings';

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Clear existing (optional, maybe not for production but this is a seed route)
        // await TrainerApplication.deleteMany({});

        const dummyTrainers = [
            {
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                phoneNumber: '555-123-4567',
                gender: 'Male',
                experience: 5,
                specialization: ['Weight Loss', 'Strength Training'],
                certifications: 'ACE Certified Personal Trainer',
                bio: 'Passionate about helping people achieve their potential.',
                reason: 'I want to reach more clients.',
                status: 'Pending'
            },
            {
                fullName: 'Jane Smith',
                email: 'jane.smith@example.com',
                phoneNumber: '555-987-6543',
                gender: 'Female',
                experience: 8,
                specialization: ['Yoga', 'Pilates'],
                certifications: 'RYT 200 Yoga Alliance',
                bio: 'Yoga instructor with 8 years of experience.',
                reason: 'Looking to expand my online presence.',
                status: 'Verified'
            },
            {
                fullName: 'Mike Johnson',
                email: 'mike.j@example.com',
                phoneNumber: '555-456-7890',
                gender: 'Male',
                experience: 2,
                specialization: ['CrossFit'],
                certifications: 'L1 CrossFit',
                bio: 'High intensity training expert.',
                reason: 'Love the community here.',
                status: 'Rejected'
            },
            {
                fullName: 'Sarah Connor',
                email: 'sarah.c@example.com',
                phoneNumber: '555-000-1111',
                gender: 'Female',
                experience: 10,
                specialization: ['Self Defense', 'Cardio'],
                certifications: 'Standard military training',
                bio: 'Prepare for the future.',
                reason: 'Need to train soldiers.',
                status: 'Pending'
            }
        ];

        for (const trainer of dummyTrainers) {
            await TrainerApplication.findOneAndUpdate(
                { email: trainer.email },
                trainer,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        // Seed Admin Settings
        await AdminSettings.findOneAndUpdate(
            {},
            {
                verificationEmail: 'verify@bfit.com',
                verificationPhone: '+1-800-BFIT-ADMIN',
                verificationAddress: '101 Muscle Beach, Venice, CA'
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: 'Seeding complete' });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}
