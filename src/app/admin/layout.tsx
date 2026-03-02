'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
    Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
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
            <div className="min-h-screen bg-[#0A0818] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
                    <p className="text-red-500/50 text-[10px] font-black uppercase tracking-widest italic animate-pulse">Verifying Admin Access</p>
                </div>
            </div>
        )
    }

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
        { icon: Users, label: 'Users', href: '/admin/users' },
        { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
        { icon: Activity, label: 'API Health', href: '/admin/api-health' },
        { icon: Wrench, label: 'Tools', href: '/admin/tools' },
        { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ]

    return (
        <div className="min-h-screen bg-[#0A0818] text-white flex flex-col font-sans selection:bg-red-500/30">

            {/* ADMIN TOPBAR */}
            <header className="h-16 bg-[#0D0B1F] border-b border-red-900/30 flex items-center justify-between px-6 sticky top-0 z-[60] backdrop-blur-md">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-red-900/20">
                            S
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">⚡ Admin Panel</span>
                            <span className="text-xs font-black text-white uppercase tracking-tighter">SEO AI Platform</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Logged in as</span>
                        <span className="text-xs font-bold text-slate-300">{user?.email}</span>
                    </div>

                    <div className="h-8 w-px bg-white/5 mx-2" />

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleViewAsUser}
                            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">View as User</span>
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* ADMIN SIDEBAR */}
                <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#080617] border-r border-red-900/10 p-6 hidden lg:flex flex-col z-50">
                    <nav className="space-y-1.5 flex-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => router.push(item.href)}
                                    className={cn(
                                        "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                        isActive
                                            ? "bg-red-600/10 text-red-500 border border-red-500/10"
                                            : "text-slate-500 hover:text-white hover:bg-red-600/5"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4", isActive ? "text-red-500" : "group-hover:text-red-400")} />
                                    <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                                    {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />}
                                </button>
                            )
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-red-900/10">
                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex items-center space-x-3">
                            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">High Security</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Admin Access Restricted</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 lg:ml-64 p-6 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    )
}
