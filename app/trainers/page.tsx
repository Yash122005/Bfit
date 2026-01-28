"use client";

import { useState, useEffect } from 'react';
import TrainerCard from '@/components/TrainerCard';
import { Search, Filter, Dumbbell } from 'lucide-react';
import Link from 'next/link';

interface Trainer {
    _id: string;
    name: string;
    specialization: string[];
    experience: number;
    rating: number;
    price: number;
    photo: string;
    status: string;
}

const SPECIALIZATIONS = [
    'All',
    'Fat Loss',
    'Muscle Gain',
    'Strength Training',
    'Yoga / Mobility',
    'HIIT',
    'Calisthenics',
    'Pilates',
];

export default function TrainersPage() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterSpec, setFilterSpec] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchTrainers() {
            try {
                const res = await fetch('/api/trainers');
                const data = await res.json();
                if (data.success) {
                    setTrainers(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch trainers:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrainers();
    }, []);

    const filteredTrainers = trainers.filter((trainer) => {
        const matchesSpec =
            filterSpec === 'All' || trainer.specialization.includes(filterSpec);
        const matchesSearch =
            trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trainer.specialization.some((s) =>
                s.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesSpec && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-black/95 text-white pb-20">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-zinc-900/50 to-transparent" />

                <div className="container relative mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-emerald-400">Elite Coaching Available</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Find Your <span className="text-emerald-500">Perfect Coach</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Expert guidance for your fitness journey. Connect with certified personal
                        trainers who specialize in your goals.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        <Link
                            href="/become-trainer"
                            className="px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-all border border-zinc-700 hover:border-emerald-500/30 flex items-center gap-2"
                        >
                            <Dumbbell className="h-5 w-5 text-emerald-500" />
                            Become a Trainer
                        </Link>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search by name or goal..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                        </div>

                        {/* Spec Filter */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {SPECIALIZATIONS.map((spec) => (
                                <button
                                    key={spec}
                                    onClick={() => setFilterSpec(spec)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterSpec === spec
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                        }`}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-[400px] bg-zinc-900 rounded-2xl animate-pulse border border-zinc-800" />
                        ))}
                    </div>
                ) : filteredTrainers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredTrainers.map((trainer) => (
                            <TrainerCard
                                key={trainer._id}
                                id={trainer._id}
                                name={trainer.name}
                                specialization={trainer.specialization}
                                experience={trainer.experience}
                                rating={trainer.rating}
                                price={trainer.price}
                                photo={trainer.photo}
                                isVerified={trainer.status === 'Verified'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-zinc-900/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <Filter className="h-10 w-10 text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No trainers found</h3>
                        <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
