"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserCheck, Settings, LogOut, X } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth(); // Assuming useAuth is available and has logout

    const links = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Verifications', href: '/admin/trainers', icon: UserCheck },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div className={clsx(
                "flex flex-col h-screen w-64 bg-neutral-950 text-white border-r border-neutral-800 transition-transform duration-300 z-50",
                "fixed md:relative inset-y-0 left-0",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        BFIT ADMIN
                    </h1>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-neutral-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-neutral-800 text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                )}
                            >
                                <Icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-800">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Exit Admin</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
