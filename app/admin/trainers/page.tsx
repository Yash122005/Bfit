'use client';

import { useEffect, useState } from 'react';
import { Check, X, Search, Clock, ShieldCheck, Ban } from 'lucide-react';

export default function AdminTrainersPage() {
    const [trainers, setTrainers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const fetchTrainers = async () => {
        try {
            const res = await fetch('/api/admin/trainers');
            const data = await res.json();
            setTrainers(data.trainers || []);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        if (!confirm(`Are you sure you want to mark this trainer as ${newStatus}?`)) return;

        try {
            const res = await fetch('/api/admin/trainers', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                // Refresh list
                fetchTrainers();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredTrainers = trainers.filter(t => filter === 'All' || t.status === filter);

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: any = {
            Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
            Verified: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            Rejected: "bg-red-500/10 text-red-500 border-red-500/20"
        };
        const icons: any = {
            Pending: Clock,
            Verified: ShieldCheck,
            Rejected: Ban
        };
        const Icon = icons[status] || Clock;

        return (
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-neutral-800'}`}>
                <Icon size={12} />
                {status}
            </span>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Trainer Verification</h1>
                <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                    {['All', 'Pending', 'Verified', 'Rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === status
                                    ? 'bg-neutral-800 text-white shadow-sm'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-white">Loading trainers...</div>
            ) : (
                <div className="grid gap-4">
                    {filteredTrainers.map((trainer) => (
                        <div key={trainer._id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between transition-colors hover:border-neutral-700">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{trainer.fullName}</h3>
                                    <StatusBadge status={trainer.status} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-neutral-400">
                                    <p><span className="text-neutral-500">Email:</span> {trainer.email}</p>
                                    <p><span className="text-neutral-500">Exp:</span> {trainer.experience} Years</p>
                                    <p><span className="text-neutral-500">Specialization:</span> {trainer.specialization.join(', ')}</p>
                                    <p><span className="text-neutral-500">Submitted:</span> {new Date(trainer.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-3 text-sm text-neutral-300 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                                    <span className="text-neutral-500 block text-xs mb-1 uppercase tracking-wider">Reason for applying:</span>
                                    {trainer.reason}
                                </div>
                            </div>

                            {trainer.status === 'Pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleStatusUpdate(trainer._id, 'Verified')}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-lg border border-emerald-600/20 transition-all font-medium"
                                    >
                                        <Check size={18} />
                                        Verify
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(trainer._id, 'Rejected')}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg border border-red-600/20 transition-all font-medium"
                                    >
                                        <X size={18} />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {filteredTrainers.length === 0 && (
                        <div className="text-center py-12 text-neutral-500">
                            No trainers found with status "{filter}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
