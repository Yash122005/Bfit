'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        verificationEmail: '',
        verificationPhone: '',
        verificationAddress: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                const data = await res.json();
                if (data.settings) {
                    setSettings({
                        verificationEmail: data.settings.verificationEmail || '',
                        verificationPhone: data.settings.verificationPhone || '',
                        verificationAddress: data.settings.verificationAddress || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage('Settings saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to save settings.');
            }
        } catch (error) {
            setMessage('Error saving settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white">Loading settings...</div>;

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-8">Platform Settings</h1>

            <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-neutral-800 pb-4">Verification Contact Details</h2>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {message}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Verification Email Address</label>
                        <input
                            type="email"
                            name="verificationEmail"
                            value={settings.verificationEmail}
                            onChange={handleChange}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="verification@bfit.com"
                        />
                        <p className="text-xs text-neutral-500 mt-1">Displayed to trainers during application.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Support Phone Number</label>
                        <input
                            type="text"
                            name="verificationPhone"
                            value={settings.verificationPhone}
                            onChange={handleChange}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Office / Verification Address</label>
                        <textarea
                            name="verificationAddress"
                            value={settings.verificationAddress}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                            placeholder="123 Fitness Blvd, Gym City, ST 12345"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save size={20} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
