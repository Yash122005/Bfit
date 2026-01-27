"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Flame, Utensils, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({
        caloriesIn: 0,
        caloriesBurned: 0,
        workoutsCount: 0,
    });
    const [loading, setLoading] = useState(true);

    // Quick chart data (mock or calculated)
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                // Fetch meals and workouts to calculate today's stats
                const [mealsRes, workoutsRes] = await Promise.all([
                    fetch('/api/meals', { headers: { Authorization: `Bearer ${token}` } }),
                    fetch('/api/workouts', { headers: { Authorization: `Bearer ${token}` } })
                ]);

                const mealsData = await mealsRes.json();
                const workoutsData = await workoutsRes.json();

                // Filter for today
                const today = new Date().toDateString();

                const todayMeals = mealsData.data.filter((m: any) => new Date(m.date).toDateString() === today);
                const todayWorkouts = workoutsData.data.filter((w: any) => new Date(w.date).toDateString() === today);

                const calIn = todayMeals.reduce((acc: number, curr: any) => acc + (curr.totalCalories || 0), 0);
                const calBurn = todayWorkouts.reduce((acc: number, curr: any) => acc + (curr.caloriesBurned || 0), 0);

                setStats({
                    caloriesIn: calIn,
                    caloriesBurned: calBurn,
                    workoutsCount: todayWorkouts.length
                });

                // Prepare chart data (last 7 days activity?) - Simplification for MVP
                // Just showing dummy data for chart if real data is scarce
                setChartData([
                    { name: 'Mon', val: 2000 },
                    { name: 'Tue', val: 2200 },
                    { name: 'Wed', val: 1800 },
                    { name: 'Thu', val: 2400 },
                    { name: 'Fri', val: 2100 },
                    { name: 'Sat', val: 1900 },
                    { name: 'Sun', val: 2300 },
                ]);

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Hello, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
                <p className="text-gray-400">Here's your daily breakdown.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calories In Card */}
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                            <Utensils size={24} />
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Today</span>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">Calories Consumed</h3>
                    <p className="text-3xl font-bold mt-1">{loading ? '...' : stats.caloriesIn} <span className="text-sm text-gray-500 font-normal">kcal</span></p>
                </div>

                {/* Calories Out Card */}
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                            <Flame size={24} />
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Today</span>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">Calories Burned</h3>
                    <p className="text-3xl font-bold mt-1">{loading ? '...' : stats.caloriesBurned} <span className="text-sm text-gray-500 font-normal">kcal</span></p>
                </div>

                {/* Workouts Card */}
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">Workouts Completed</h3>
                    <p className="text-3xl font-bold mt-1">{loading ? '...' : stats.workoutsCount}</p>
                </div>
            </div>

            {/* Activity Chart Section */}
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
