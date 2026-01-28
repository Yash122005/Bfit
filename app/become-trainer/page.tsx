"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dumbbell, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function BecomeTrainerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: 'Male',
        experience: '',
        specialization: [] as string[],
        certifications: '',
        instagram: '',
        portfolio: '',
        bio: '',
        reason: '',
    });

    const SPECIALIZATIONS = [
        'Fat Loss', 'Muscle Gain', 'Strength Training', 'Yoga / Mobility',
        'HIIT', 'Calisthenics', 'Pilates', 'Rehabilitation'
    ];

    const handleSpecChange = (spec: string) => {
        setFormData(prev => ({
            ...prev,
            specialization: prev.specialization.includes(spec)
                ? prev.specialization.filter(s => s !== spec)
                : [...prev.specialization, spec]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/trainers/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                window.scrollTo(0, 0);
            } else {
                setError(data.error || 'Something went wrong.');
            }
        } catch (err) {
            setError('Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                    <p className="text-zinc-400 mb-8">
                        Your application to join BFIT as a verify trainer has been received. Our team will review your details and contact you shortly.
                    </p>
                    <button
                        onClick={() => router.push('/trainers')}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
                    >
                        Back to Trainers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="relative py-20 bg-zinc-900 border-b border-zinc-800">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Join the <span className="text-emerald-500">Elite</span></h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Become a BFIT Verified Trainer and grow your coaching business with our premium clientele.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="max-w-3xl mx-auto bg-black border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500">
                            <AlertCircle className="h-5 w-5" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-l-4 border-emerald-500 pl-3">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                                    <input required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                    <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                                    <input required value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} type="tel" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Gender</label>
                                    <select required value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Professional Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-l-4 border-purple-500 pl-3">Expertise</h3>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Years of Experience</label>
                                <input required value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} type="number" className="w-full md:w-1/3 bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-3">Specializations (Select all that apply)</label>
                                <div className="flex flex-wrap gap-2">
                                    {SPECIALIZATIONS.map(spec => (
                                        <button
                                            type="button"
                                            key={spec}
                                            onClick={() => handleSpecChange(spec)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all border ${formData.specialization.includes(spec)
                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                                                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                                                }`}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Certifications</label>
                                <input required placeholder="E.g. NASM CPT, ACE, ISSA..." value={formData.certifications} onChange={e => setFormData({ ...formData, certifications: e.target.value })} type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        {/* Bio & Socials */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">Profile</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Instagram Handle (Optional)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-zinc-500">@</span>
                                        <input value={formData.instagram} onChange={e => setFormData({ ...formData, instagram: e.target.value })} type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Portfolio Link (Optional)</label>
                                    <input value={formData.portfolio} onChange={e => setFormData({ ...formData, portfolio: e.target.value })} type="url" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Short Bio</label>
                                <textarea required rows={4} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors" placeholder="Tell us about your coaching style..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Why should BFIT verify you?</label>
                                <textarea required rows={3} value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition-colors"></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Apply for Verification'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
