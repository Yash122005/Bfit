"use client";

import { useEffect, useState, use } from 'react';
import { BadgeCheck, Star, Calendar, ShieldCheck, MapPin, Instagram, Mail, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Trainer {
    _id: string;
    name: string;
    specialization: string[];
    experience: number;
    rating: number;
    price: number;
    photo: string;
    bio: string;
    certifications: string[];
    socials: { instagram: string; portfolio?: string };
}

export default function TrainerDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<'1' | '3' | '6'>('1');

    useEffect(() => {
        async function fetchTrainer() {
            try {
                const res = await fetch(`/api/trainers/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    setTrainer(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrainer();
    }, [params.id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">Loading...</div>;
    if (!trainer) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Trainer not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Header / Cover */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <img src={trainer.photo} alt={trainer.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                                    <BadgeCheck className="h-3 w-3" /> VERIFIED COACH
                                </span>
                                <span className="bg-zinc-800 text-zinc-400 text-xs font-bold px-3 py-1 rounded-full border border-zinc-700">
                                    {trainer.experience} YEARS EXP
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-2">{trainer.name}</h1>
                            <div className="flex flex-wrap gap-2 text-zinc-300 mb-4">
                                {trainer.specialization.map(s => (
                                    <span key={s} className="text-sm border-r border-zinc-600 pr-2 last:border-0">{s}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {trainer.rating} Rating</span>
                                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Background Checked</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {trainer.socials.instagram && (
                                <a href={`https://instagram.com/${trainer.socials.instagram}`} target="_blank" className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-700"><Instagram className="h-5 w-5" /></a>
                            )}
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">Contact</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
                {/* Left Col: Info */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Bio */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-8 bg-emerald-500 rounded-full"></span> About Me
                        </h2>
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 leading-relaxed text-zinc-300">
                            {trainer.bio}
                        </div>
                    </section>

                    {/* Certifications */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-8 bg-purple-500 rounded-full"></span> Certifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trainer.certifications.map((cert) => (
                                <div key={cert} className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                    <BadgeCheck className="h-6 w-6 text-purple-400" />
                                    <span className="font-medium text-zinc-200">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Gallery (Dummy) */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-8 bg-blue-500 rounded-full"></span> Transformations
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative group">
                                    <img src={`https://source.unsplash.com/random/400x400/?fitness,gym,sig=${i}`} alt="Transformation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-xs font-bold tracking-widest text-white">VIEW RESULT</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Col: Pricing */}
                <div className="relative">
                    <div className="sticky top-24 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                        <h3 className="text-xl font-bold mb-6">Start Training</h3>

                        <div className="space-y-3 mb-8">
                            <button
                                onClick={() => setSelectedPlan('1')}
                                className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${selectedPlan === '1' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'}`}
                            >
                                <span className="font-medium">1 Month</span>
                                <span className="font-bold text-lg">₹{trainer.price}</span>
                            </button>
                            <button
                                onClick={() => setSelectedPlan('3')}
                                className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${selectedPlan === '3' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'}`}
                            >
                                <span className="font-medium">3 Months <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded ml-2">SAVE 10%</span></span>
                                <span className="font-bold text-lg">₹{(trainer.price * 3 * 0.9).toFixed(0)}</span>
                            </button>
                            <button
                                onClick={() => setSelectedPlan('6')}
                                className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${selectedPlan === '6' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'}`}
                            >
                                <span className="font-medium">6 Months <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded ml-2">SAVE 20%</span></span>
                                <span className="font-bold text-lg">₹{(trainer.price * 6 * 0.8).toFixed(0)}</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <button disabled className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                                Hire Now
                                {/* Tooltip hint in UI text if needed, or simple disabled state */}
                            </button>
                            <p className="text-center text-xs text-zinc-500">Payments coming soon</p>

                            <div className="pt-4 border-t border-zinc-800">
                                <ul className="space-y-2 text-sm text-zinc-400">
                                    <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-500" /> Customized Workout Plan</li>
                                    <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-500" /> Diet & Macro Guidance</li>
                                    <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-500" /> 24/7 Chat Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
