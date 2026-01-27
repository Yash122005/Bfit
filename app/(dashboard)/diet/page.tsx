"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Utensils, Calendar } from 'lucide-react';

export default function DietPage() {
    const { token } = useAuth();
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newMeal, setNewMeal] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    const fetchMeals = async () => {
        try {
            const res = await fetch('/api/meals', { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.success) {
                setMeals(data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchMeals();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Flatten structure for manual entry for simplicity in MVP
            const body = {
                name: newMeal.name,
                totalCalories: Number(newMeal.calories),
                protein: Number(newMeal.protein),
                carbs: Number(newMeal.carbs),
                fats: Number(newMeal.fats),
                items: [] // No individual items for manual quick add
            };

            const res = await fetch('/api/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                setShowModal(false);
                setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
                fetchMeals();
            }
        } catch (e) {
            alert("Error adding meal");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Diet Journal</h1>
                    <p className="text-gray-400">Track your nutrition.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Log Meal</span>
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {meals.length === 0 ? <p className="text-gray-500">No meals recorded yet.</p> : null}
                    {meals.map((meal) => (
                        <div key={meal._id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center hover:border-green-500/50 transition-colors gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                                    <Utensils size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{meal.name}</h3>
                                    <p className="text-sm text-gray-500">{new Date(meal.date).toLocaleDateString()} • {new Date(meal.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:flex gap-4 md:space-x-8 text-sm w-full md:w-auto">
                                <div className="text-center bg-gray-800/50 p-2 rounded-lg md:bg-transparent">
                                    <span className="block font-bold text-white text-lg">{meal.totalCalories}</span>
                                    <span className="text-gray-500 text-xs uppercase">Kcal</span>
                                </div>
                                <div className="text-center bg-gray-800/50 p-2 rounded-lg md:bg-transparent">
                                    <span className="block font-bold text-blue-400 text-lg">{meal.protein || 0}g</span>
                                    <span className="text-gray-500 text-xs uppercase">Prot</span>
                                </div>
                                <div className="text-center bg-gray-800/50 p-2 rounded-lg md:bg-transparent">
                                    <span className="block font-bold text-purple-400 text-lg">{meal.carbs || 0}g</span>
                                    <span className="text-gray-500 text-xs uppercase">Carb</span>
                                </div>
                                <div className="text-center bg-gray-800/50 p-2 rounded-lg md:bg-transparent">
                                    <span className="block font-bold text-yellow-400 text-lg">{meal.fats || 0}g</span>
                                    <span className="text-gray-500 text-xs uppercase">Fat</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Log Meal</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Meal Name</label>
                                <input
                                    required
                                    className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                    value={newMeal.name}
                                    onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                                    placeholder="e.g. Lunch"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Calories</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newMeal.calories}
                                        onChange={e => setNewMeal({ ...newMeal, calories: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Protein (g)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newMeal.protein}
                                        onChange={e => setNewMeal({ ...newMeal, protein: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Carbs (g)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newMeal.carbs}
                                        onChange={e => setNewMeal({ ...newMeal, carbs: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Fats (g)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newMeal.fats}
                                        onChange={e => setNewMeal({ ...newMeal, fats: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
