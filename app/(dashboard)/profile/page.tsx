"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Save, Edit2, X } from 'lucide-react';

export default function ProfilePage() {
    const { user, token, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        fitnessGoal: 'Maintenance'
    });

    // Initialize form data when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                height: user.height || '',
                weight: user.weight || '',
                fitnessGoal: user.fitnessGoal || 'Maintenance'
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    age: Number(formData.age),
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    fitnessGoal: formData.fitnessGoal
                }),
            });
            const data = await res.json();

            if (res.ok) {
                // Update local context with new user data
                // We reuse login method to update user state without changing token
                if (token) login(token, data.user);
                setIsEditing(false);
            } else {
                alert(data.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form to current user values
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                height: user.height || '',
                weight: user.weight || '',
                fitnessGoal: user.fitnessGoal || 'Maintenance'
            });
        }
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Edit2 size={16} />
                        <span>Edit Profile</span>
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-red-400"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            <Save size={16} />
                            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl md:text-2xl font-bold relative group">
                        {user?.name?.[0]?.toUpperCase()}
                        {/* Placeholder for avatar upload if we had it */}
                    </div>
                    <div>
                        {isEditing ? (
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-lg font-bold w-full mb-1"
                                placeholder="Name"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold">{user?.name}</h2>
                        )}
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-4 bg-gray-800 rounded-xl relative group">
                        <span className="block text-sm text-gray-400 mb-1">Fitness Goal</span>
                        {isEditing ? (
                            <select
                                name="fitnessGoal"
                                value={formData.fitnessGoal}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                            >
                                <option value="Maintenance">Maintenance</option>
                                <option value="Fat Loss">Fat Loss</option>
                                <option value="Muscle Gain">Muscle Gain</option>
                            </select>
                        ) : (
                            <span className="text-lg font-bold text-blue-400">{user?.fitnessGoal}</span>
                        )}
                    </div>

                    <div className="p-4 bg-gray-800 rounded-xl">
                        <span className="block text-sm text-gray-400 mb-1">Weight (kg)</span>
                        {isEditing ? (
                            <input
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                            />
                        ) : (
                            <span className="text-lg font-bold text-white">{user?.weight || '-'} kg</span>
                        )}
                    </div>

                    <div className="p-4 bg-gray-800 rounded-xl">
                        <span className="block text-sm text-gray-400 mb-1">Height (cm)</span>
                        {isEditing ? (
                            <input
                                name="height"
                                type="number"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                            />
                        ) : (
                            <span className="text-lg font-bold text-white">{user?.height || '-'} cm</span>
                        )}
                    </div>

                    <div className="p-4 bg-gray-800 rounded-xl">
                        <span className="block text-sm text-gray-400 mb-1">Age</span>
                        {isEditing ? (
                            <input
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                            />
                        ) : (
                            <span className="text-lg font-bold text-white">{user?.age || '-'}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
