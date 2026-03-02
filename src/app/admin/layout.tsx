'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, getUserRole, signOut } from '@/lib/auth'
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Activity,
    Wrench,
    BarChart3,
    Settings,
    LogOut,
    Eye,
    ShieldAlert,
    Loader2,
    Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [currentTime, setCurrentTime] = useState('')
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        // Auth check
        const checkAdmin = async () => {
            const currentUser = await getCurrentUser()
            if (!currentUser) {
                router.push('/login')
                return
            }

            const role = await getUserRole(currentUser.id)
            if (role?.toLowerCase() !== 'admin') {
                router.push('/dashboard')
                return
            }

            setUser(currentUser)
            setLoading(false)
        }

        checkAdmin()

        // Clock
        const formatTime = () => {
            const now = new Date()
            let hours = now.getHours()
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const seconds = now.getSeconds().toString().padStart(2, '0')
            const ampm = hours >= 12 ? 'PM' : 'AM'
            hours = hours % 12 || 12
            const h = hours.toString().padStart(2, '0')
            return `${h}:${minutes}:${seconds} ${ampm}`
        }

        const timer = setInterval(() => {
            setCurrentTime(formatTime())
        }, 1000)
        setCurrentTime(formatTime())

        return () => clearInterval(timer)
    }, [router])

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    const handleViewAsUser = () => {
        sessionStorage.setItem('admin_viewing', 'true')
        router.push('/dashboard')
    }

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle('light-mode')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                    <p className="text-purple-500/50 text-[10px] font-bold uppercase tracking-widest animate-pulse">Verifying Admin Access</p>
                </div>
            </div>
        )
    }

    const navItems = [
        { icon: '📊', label: 'Overview', href: '/admin' },
        { icon: '👥', label: 'Users', href: '/admin/users' },
        { icon: '💰', label: 'Payments', href: '/admin/payments' },
        { icon: '🔌', label: 'API Health', href: '/admin/api-health' },
        { icon: '🛠️', label: 'Tools', href: '/admin/tools' },
        { icon: '📈', label: 'Analytics', href: '/admin/analytics' },
        { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
    ]

    return (
        <div className="flex h-screen overflow-hidden bg-[#0F0C29] text-white font-sans selection:bg-purple-500/30 admin-layout">

            {/* SIDEBAR — fixed, never moves */}
            <aside className="w-64 h-screen flex-shrink-0 bg-[#0F0C29] border-r border-[#2D2B55] flex flex-col overflow-hidden admin-sidebar">
                {/* Logo */}
                <div className="h-16 flex-shrink-0 flex items-center px-5 border-b border-[#2D2B55]">
                    <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                        S
                    </div>
                    <span className="text-white font-bold text-sm tracking-wider uppercase">
                        SEO AI PLATFORM
                    </span>
                </div>

                {/* Nav items — scrollable if needed */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                                    isActive
                                        ? "bg-purple-700 text-white border border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                                        : "text-gray-300 hover:bg-purple-900/30 hover:text-white"
                                )}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="font-semibold tracking-tight">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom security badge */}
                <div className="p-3 border-t border-[#2D2B55]">
                    <div className="bg-red-950 border border-red-800 rounded-xl p-3">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <span className="text-xl">🔒</span>
                            <span className="text-red-400 text-xs font-bold tracking-wider">
                                HIGH SECURITY
                            </span>
                            <span className="text-red-700 text-[10px] text-center font-medium">
                                Admin Access Only
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* RIGHT SIDE — topbar + content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* TOPBAR */}
                <header className="h-14 flex-shrink-0 bg-[#0F0C29] border-b border-[#2D2B55] flex items-center justify-between px-6 z-40 admin-topbar">
                    <div className="flex items-center gap-3">
                        <span className="bg-[#C53030] text-white text-[10px] font-black px-2 py-1 rounded tracking-widest shadow-lg shadow-red-900/20">
                            ⚡ ADMIN PANEL
                        </span>
                    </div>

                    {/* Live clock - Center */}
                    <div className="absolute left-1/2 -translate-x-1/2 text-purple-400 text-sm font-mono font-bold tracking-[0.2em]">
                        {currentTime}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none"
                                style={{ backgroundColor: isDark ? '#6B21A8' : '#D1D5DB' }}
                            >
                                <div
                                    className={cn(
                                        "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center text-[8px]",
                                        isDark ? "translate-x-5.5" : "translate-x-0.5"
                                    )}
                                >
                                    {isDark ? '🌙' : '☀️'}
                                </div>
                            </button>

                            <button
                                onClick={handleViewAsUser}
                                className="border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg transition-all tracking-widest"
                            >
                                <Eye className="w-3 h-3 inline mr-1.5" />
                                View as User
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="bg-[#C53030] hover:bg-[#9B2C2C] text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg transition-all tracking-widest shadow-lg shadow-purple-900/20"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT — scrollable */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                    {children}
                </main>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2D2B55;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6B21A8;
                }
            ` }} />
        </div>
    )
}
