import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, UserCheck, Settings, LogOut } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BFIT Admin',
    description: 'Admin Dashboard for BFIT',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // We can't use hooks like useRouter or usePathname in Server Components for active state relying on path 
    // without turning this into a Client Component. 
    // For simplicity, let's make the sidebar static or use a client component wrapper if needed.
    // Or just make the nav links standard and let the browser verify active state visually?
    // Let's make this a server component layout and maybe use a client component for the sidebar if we want active states.
    // For MVP, simple links are fine.

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-800 flex flex-col">
                <div className="p-6 border-b border-neutral-800">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        BFIT ADMIN
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/trainers"
                        className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <UserCheck size={20} />
                        <span>Verifications</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-neutral-800">
                    <Link
                        href="/" // In real app, this might start a logout flow
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-neutral-900">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
