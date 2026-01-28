"use client";

import Link from 'next/link';
import { BadgeCheck, Star, ShieldCheck } from 'lucide-react';

interface TrainerCardProps {
    id: string;
    name: string;
    specialization: string[];
    experience: number;
    rating: number;
    price: number;
    photo: string;
    isVerified?: boolean;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
    id,
    name,
    specialization,
    experience,
    rating,
    price,
    photo,
    isVerified = true,
}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10">
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src={photo}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-80" />

                {/* Verified Badge */}
                {isVerified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 backdrop-blur-md border border-emerald-500/30">
                        <BadgeCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-100">Verified</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 w-full p-4">
                {/* Name & Expert Info */}
                <div className="mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-zinc-400 flex flex-wrap gap-2 mt-1">
                        {specialization.map((spec, index) => (
                            <span key={index} className="bg-zinc-800/80 px-2 py-0.5 rounded text-xs text-zinc-300">
                                {spec}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-500">Experience</span>
                        <span className="text-sm font-medium text-white">{experience} Years</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-zinc-500">Rating</span>
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium text-white">{rating}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-zinc-500">Monthly</span>
                        <span className="text-sm font-bold text-emerald-400">₹{price}</span>
                    </div>
                </div>

                {/* Hover Action */}
                <div className="mt-4 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                        href={`/trainers/${id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Spacer to push content down initially, creating the hover reveal effect better */}
            <div className="h-12 group-hover:hidden" />
        </div>
    );
};

export default TrainerCard;
