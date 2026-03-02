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
    Clock,
    Menu,
    Shield,
    Sun,
    Moon
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [currentTime, setCurrentTime] = useState('')
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

        // Clock Update Logic
        const updateTime = () => {
            const now = new Date()
            let hours = now.getHours()
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const ampm = hours >= 12 ? 'PM' : 'AM'
            hours = hours % 12 || 12
            const h = hours.toString().padStart(2, '0')
            setCurrentTime(`${h}:${minutes} ${ampm}`)
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)

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
            <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                    <p className="text-purple-500/50 text-[10px] font-bold uppercase tracking-widest animate-pulse">Verifying Admin Access</p>
                </div>
            </div>
        )
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
        { icon: Activity, label: 'API Health', path: '/admin/api-health' },
        { icon: Wrench, label: 'Tools', path: '/admin/tools' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ]

    const formatTime = () => currentTime
    const toggleTheme = () => setIsDarkMode(!isDarkMode)
    const shortEmail = user?.email?.split('@')[0] || 'Admin'
    const firstLetter = user?.email?.[0]?.toUpperCase() || 'A'

    return (
        <div className={cn("flex flex-col min-h-screen admin-layout", isDarkMode ? "dark-mode" : "light-mode")}>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Layout Wrapper */}
            <div className="flex flex-1 relative z-10 overflow-hidden">
                {/* Sidebar */}
                <aside className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out admin-sidebar animate-slideInLeft flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    isDarkMode ? "bg-[#0F0C29] border-r border-[#2D2B55]" : "bg-white border-r border-gray-200"
                )}>
                    {/* Sidebar Header - One Line Logo */}
                    <div className="h-16 flex items-center px-4 border-b border-[#2D2B55]">
                        <div className="w-9 h-9 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                            S
                        </div>
                        <span className="text-white font-bold text-sm tracking-wider whitespace-nowrap uppercase">
                            SEO AI PLATFORM
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                    pathname === item.path
                                        ? "sidebar-active-glow bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5",
                                    pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-purple-400 transition-colors"
                                )} />
                                <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                {pathname === item.path && (
                                    <div className="absolute left-0 w-1 h-6 bg-white rounded-full translate-x-1" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="flex flex-col gap-0">
                        {/* Super Admin Box */}
                        <div className="px-3 pb-2">
                            <div className="bg-[#1A1740] border border-[#2D2B55] rounded-xl p-3">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-full bg-purple-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                                        {firstLetter}
                                    </div>
                                    {/* Text — perfectly centered vertically */}
                                    <div className="flex flex-col justify-center">
                                        <span className="text-white text-xs font-semibold leading-tight">
                                            {shortEmail}
                                        </span>
                                        <span className="text-red-400 text-[10px] font-bold leading-tight mt-0.5">
                                            ⚡ SUPER ADMIN
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HIGH SECURITY Box */}
                        <div className="px-3 pb-4">
                            <div className="security-badge bg-[#1A0000] border border-red-900 rounded-xl p-3">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="lock-icon text-base leading-none">🔒</span>
                                    <div className="flex flex-col justify-center">
                                        <span className="security-title text-red-400 text-[10px] font-bold tracking-wider leading-tight">
                                            HIGH SECURITY
                                        </span>
                                        <span className="security-sub text-red-800 text-[9px] leading-tight mt-0.5">
                                            Admin Access Only
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
                    {/* Topbar */}
                    <header className="admin-topbar h-16 flex-shrink-0 flex items-center relative px-6 bg-[#0F0C29]/80 backdrop-blur-md border-b border-[#2D2B55] z-30">
                        {/* LEFT SECTION */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 active:scale-90 transition-transform"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg shadow-lg shadow-red-600/20">
                                <Shield className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black tracking-widest uppercase">Admin Panel</span>
                            </div>
                        </div>

                        {/* CENTER SECTION - Absolute Center Clock */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 text-sm font-mono font-black tracking-widest bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                {currentTime}
                            </span>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="ml-auto flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all topbar-btn-outline"
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 group topbar-btn">
                                <LayoutDashboard className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                                VIEW AS USER
                            </Link>

                            <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-black rounded-xl transition-all border border-red-600/20 active:scale-95 group topbar-btn">
                                <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                SIGN OUT
                            </button>
                        </div>
                    </header>

                    {/* MAIN CONTENT — scrollable */}
                    <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                        {children}
                    </main>
                </div>
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
