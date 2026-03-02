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
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour12: false }))
        }, 1000)
        setCurrentTime(new Date().toLocaleTimeString([], { hour12: false }))

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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0808] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
                    <p className="text-red-500/50 text-[10px] font-black uppercase tracking-widest italic animate-pulse">Verifying Admin Access</p>
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
        <div className="flex h-screen overflow-hidden bg-[#0A0808] text-white font-sans selection:bg-red-500/30">

            {/* SIDEBAR — fixed, never moves */}
            <aside className="w-56 h-screen flex-shrink-0 bg-[#0D0000] border-r border-[#2D1515] flex flex-col overflow-hidden">
                {/* Logo */}
                <div className="h-16 flex-shrink-0 flex items-center px-4 border-b border-[#2D1515]">
                    <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                        S
                    </div>
                    <div className="flex flex-col">
                        <div className="text-red-500 text-[10px] font-black tracking-[0.2em]">⚡ ADMIN</div>
                        <div className="text-white text-xs font-semibold leading-none">SEO AI Platform</div>
                    </div>
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
                                        ? "bg-red-900/60 text-white border border-red-800"
                                        : "text-gray-400 hover:bg-red-950/40 hover:text-white"
                                )}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="font-bold tracking-tight">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom security badge */}
                <div className="p-3 border-t border-[#2D1515]">
                    <div className="bg-red-950/50 border border-red-800/30 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center text-red-400 text-[10px] font-black uppercase tracking-widest gap-2">
                            <ShieldAlert className="w-3 h-3" />
                            🔒 HIGH SECURITY
                        </div>
                        <div className="text-red-600 text-[9px] font-bold uppercase tracking-tighter mt-1">
                            Admin Access Only
                        </div>
                    </div>
                </div>
            </aside>

            {/* RIGHT SIDE — topbar + content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* TOPBAR */}
                <header className="h-14 flex-shrink-0 bg-[#0D0000] border-b border-[#2D1515] flex items-center justify-between px-6 z-40">
                    <div className="flex items-center gap-3">
                        <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded tracking-widest">
                            ⚡ ADMIN PANEL
                        </span>
                        <span className="text-white/90 font-black text-xs uppercase tracking-widest hidden sm:inline">
                            SEO AI Platform
                        </span>
                    </div>

                    {/* Live clock */}
                    <div className="text-red-400 text-sm font-mono font-bold tracking-[0.2em]">
                        {currentTime}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hidden lg:inline">
                            {user?.email}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleViewAsUser}
                                className="border border-red-800/50 text-red-500 hover:bg-red-900/20 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all tracking-widest"
                            >
                                <Eye className="w-3 h-3 inline mr-1.5" />
                                👁️ View as User
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-700 hover:bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all tracking-widest shadow-lg shadow-red-900/20"
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

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2D1515;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #DC2626;
                }
            `}</style>
        </div>
    )
}
