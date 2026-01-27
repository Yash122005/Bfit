"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
    const { token } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProgress = async () => {
        try {
            const res = await fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } });
            const resData = await res.json();
            if (resData.success) {
                // Format data for chart
                const chartData = resData.data.map((d: any) => ({
                    date: new Date(d.date).toLocaleDateString(),
                    weight: d.weight,
                    bodyFat: d.bodyFat
                }));
                setData(chartData);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProgress();
    }, [token]);

    // Handle add progress (weight)
    const addWeight = async (e: React.FormEvent) => {
        e.preventDefault();
        const weight = (e.currentTarget as any).weight.value;
        if (!weight) return;
        try {
            await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ weight: Number(weight) })
            });
            (e.target as HTMLFormElement).reset();
            fetchProgress();
        } catch (e) { }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Progress Tracking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-900 section p-6 rounded-2xl border border-gray-800 h-96">
                    <h3 className="text-xl font-bold mb-4">Weight History</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                            />
                            <Area type="monotone" dataKey="weight" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWeight)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-fit">
                    <h3 className="text-xl font-bold mb-4">Log Update</h3>
                    <form onSubmit={addWeight} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Current Weight (kg)</label>
                            <input
                                name="weight"
                                type="number"
                                step="0.1"
                                required
                                className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                            />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
                            Update Progress
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
