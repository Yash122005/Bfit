import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trainer from '@/models/Trainer';

const DUMMY_TRAINERS = [
    {
        name: 'Alex Sterling',
        email: 'alex.sterling@example.com',
        photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=1887',
        specialization: ['Fat Loss', 'Muscle Gain'],
        experience: 8,
        bio: 'Elite personal trainer with a focus on sustainable fat loss and muscle building. I help clients transform their bodies and mindsets.',
        certifications: ['NASM CPT', 'Precision Nutrition L1'],
        rating: 4.8,
        price: 1500, // Monthly in local currency or USD
        status: 'Verified',
        socials: { instagram: 'alexfit' }
    },
    {
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1887',
        specialization: ['Yoga / Mobility', 'Strength Training'],
        experience: 6,
        bio: 'Yoga instructor and strength coach dedicated to improving mobility and functional strength.',
        certifications: ['RYT 500', 'CSCS'],
        rating: 4.9,
        price: 1200,
        status: 'Verified',
        socials: { instagram: 'sarah_yoga' }
    },
    {
        name: 'Marcus "The Titan" Johnson',
        email: 'marcus.titan@example.com',
        photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1770',
        specialization: ['Bodybuilding', 'Muscle Gain'],
        experience: 12,
        bio: 'Professional bodybuilder and coach. Specializing in hypertrophy and stage prep.',
        certifications: ['IFBB Pro', 'ISSA Bodybuilding Specialist'],
        rating: 5.0,
        price: 2500,
        status: 'Verified',
        socials: { instagram: 'marcus_titan' }
    },
    {
        name: 'Elena Rodriguez',
        email: 'elena.r@example.com',
        photo: 'https://images.unsplash.com/photo-1616279967983-ec413476e824?auto=format&fit=crop&q=80&w=1782',
        specialization: ['HIIT', 'Fat Loss'],
        experience: 5,
        bio: 'High energy HIIT trainer. I make sweating fun and effective.',
        certifications: ['ACE CPT', 'TRX Qualified'],
        rating: 4.7,
        price: 1000,
        status: 'Verified',
        socials: { instagram: 'elena_hiit' }
    },
    {
        name: 'David Kim',
        email: 'david.kim@example.com',
        photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1770',
        specialization: ['Calisthenics', 'Strength Training'],
        experience: 7,
        bio: 'Master your bodyweight. Calisthenics expert focusing on functional strength and control.',
        certifications: ['PCC', 'NASM PES'],
        rating: 4.9,
        price: 1800,
        status: 'Verified',
        socials: { instagram: 'david_calisthenics' }
    },
    {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1770',
        specialization: ['Pilates', 'Rehabilitation'],
        experience: 10,
        bio: 'Pilates instructor with a background in physical therapy support. Focus on core strength and injury prevention.',
        certifications: ['Stott Pilates', 'Rehab Specialist'],
        rating: 4.8,
        price: 2000,
        status: 'Verified',
        socials: { instagram: 'emily_pilates' }
    },
];

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Check query params for filtering
        const { searchParams } = new URL(req.url);
        const specialization = searchParams.get('specialization');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const experience = searchParams.get('experience');

        // Seed if empty
        const count = await Trainer.countDocuments();
        if (count === 0) {
            await Trainer.insertMany(DUMMY_TRAINERS);
            console.log('Seeded dummy trainers');
        }

        // Build query
        const query: any = { status: 'Verified' };

        if (specialization && specialization !== 'All') {
            query.specialization = { $in: [specialization] };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (experience) {
            if (experience === 'Beginner') query.experience = { $lte: 3 };
            if (experience === 'Intermediate') query.experience = { $gt: 3, $lte: 7 };
            if (experience === 'Expert') query.experience = { $gt: 7 };
        }

        const trainers = await Trainer.find(query).sort({ rating: -1 });

        return NextResponse.json({ success: true, data: trainers });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
