"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Dumbbell, Calendar, Clock, Flame } from 'lucide-react';

export default function WorkoutsPage() {
    const { token } = useAuth();
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        name: '',
        type: 'Strength',
        duration: '',
        caloriesBurned: ''
    });

    const fetchWorkouts = async () => {
        try {
            const res = await fetch('/api/workouts', { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.success) {
                setWorkouts(data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchWorkouts();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newWorkout)
            });
            if (res.ok) {
                setShowModal(false);
                setNewWorkout({ name: '', type: 'Strength', duration: '', caloriesBurned: '' });
                fetchWorkouts();
            }
        } catch (e) {
            alert("Error adding workout");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Your Workouts</h1>
                    <p className="text-gray-400">Track your training sessions.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Log Workout</span>
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {workouts.length === 0 ? <p className="text-gray-500">No workouts recorded yet.</p> : null}
                    {workouts.map((workout) => (
                        <div key={workout._id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center hover:border-blue-500/50 transition-colors gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <Dumbbell size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{workout.name}</h3>
                                    <p className="text-sm text-gray-400">{workout.type}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 md:space-x-6 text-sm text-gray-400 w-full md:w-auto mt-2 md:mt-0">
                                <div className="flex items-center space-x-1">
                                    <Clock size={16} />
                                    <span>{workout.duration} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Flame size={16} />
                                    <span>{workout.caloriesBurned} kcal</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar size={16} />
                                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Log Workout</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Workout Name</label>
                                <input
                                    required
                                    className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                    value={newWorkout.name}
                                    onChange={e => setNewWorkout({ ...newWorkout, name: e.target.value })}
                                    placeholder="e.g. Morning 5k Run"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Type</label>
                                <select
                                    className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                    value={newWorkout.type}
                                    onChange={e => setNewWorkout({ ...newWorkout, type: e.target.value })}
                                >
                                    <option>Cardio</option>
                                    <option>Strength</option>
                                    <option>Flexibility</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Duration (min)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newWorkout.duration}
                                        onChange={e => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Calories</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2"
                                        value={newWorkout.caloriesBurned}
                                        onChange={e => setNewWorkout({ ...newWorkout, caloriesBurned: e.target.value })}
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
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
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
