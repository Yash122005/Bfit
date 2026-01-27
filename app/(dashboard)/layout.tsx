"use client";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="flex h-screen items-center justify-center bg-gray-950 text-white">Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center p-4 border-b border-gray-800 bg-gray-900">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white mr-4">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">BFIT</span>
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black/20">
                    {children}
                </main>
            </div>
        </div>
    );
}
