'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/dashboard');
                const data = await res.json();
                setStats(data.stats);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-white">Loading stats...</div>;
    }

    if (!stats) {
        return <div className="text-red-500">Failed to load stats</div>;
    }

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <div className={`p-3 rounded-lg w-fit mb-4 ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-neutral-400">{title}</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon={Users}
                    color="bg-blue-600"
                />
                <StatCard
                    title="Pending Verifications"
                    value={stats.pendingVerifications}
                    icon={UserPlus}
                    color="bg-yellow-600"
                />
                <StatCard
                    title="Verified Trainers"
                    value={stats.verifiedTrainers}
                    icon={UserCheck}
                    color="bg-emerald-600"
                />
                <StatCard
                    title="Rejected Trainers"
                    value={stats.rejectedTrainers}
                    icon={UserX}
                    color="bg-red-600"
                />
            </div>
        </div>
    );
}
