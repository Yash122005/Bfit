"use client";

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-neutral-900 w-full relative">
                {/* Mobile Header */}
                <header className="md:hidden p-4 border-b border-neutral-800 flex items-center bg-neutral-950 sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-neutral-400 hover:text-white rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-3 font-bold text-lg">BFIT Admin</span>
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
