"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Scan, Search, Plus } from 'lucide-react';

export default function NutriScan() {
    const { token } = useAuth();
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/nutriscan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setResult(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToDiet = async () => {
        // Feature to add scanned item to diet directly
        // For MVP, just alerting or assume it's a separate step or implementing post to /api/meals
        // Let's implement adding it as a meal
        if (!result) return;
        try {
            const res = await fetch('/api/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: 'Scanned Meal - ' + result.name,
                    items: [result], // Adapting result to schema if needed
                    totalCalories: result.calories,
                    protein: result.protein,
                    carbs: result.carbs,
                    fats: result.fats
                }),
            });
            if (res.ok) {
                alert('Added to Diet!');
                setQuery('');
                setResult(null);
            }
        } catch (e) {
            alert('Failed to add');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">NutriScan AI</h1>
                <p className="text-gray-400">Analyze food content instantly.</p>
            </div>

            <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <form onSubmit={handleScan} className="relative z-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Food name (e.g., 'Chicken')"
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-28 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder:text-gray-600"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 rounded-lg transition-colors font-medium flex items-center text-sm md:text-base"
                        >
                            {loading ? 'Scanning...' : 'Scan'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-4 text-red-400 text-sm text-center">{error}</div>
                )}

                {result && (
                    <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700 animation-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                            <h3 className="text-2xl font-bold capitalize">{result.name}</h3>
                            {result.isEstimate && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">Approximate</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <span className="block text-3xl font-bold text-white">{result.calories}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Calories</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Protein</span>
                                    <span className="font-bold text-blue-400">{result.protein}g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Carbs</span>
                                    <span className="font-bold text-purple-400">{result.carbs}g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Fats</span>
                                    <span className="font-bold text-yellow-400">{result.fats}g</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={addToDiet}
                            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white flex items-center justify-center space-x-2 transition-colors"
                        >
                            <Plus size={20} />
                            <span>Add to Daily Log</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
