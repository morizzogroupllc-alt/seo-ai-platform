'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    Search,
    Wrench,
    Rocket,
    PenTool,
    MapPin,
    Phone,
    TrendingUp,
    ClipboardList,
    Zap,
    Settings,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    ShieldAlert
} from 'lucide-react'
import { cn } from '@/lib/utils'

const phasesNav = [
    { id: 'research', name: 'Research', href: '/research', icon: Search },
    { id: 'build', name: 'Build', href: '/build', icon: Wrench },
    { id: 'deploy', name: 'Deploy', href: '/deploy', icon: Rocket },
    { id: 'optimize', name: 'Optimize', href: '/optimize', icon: PenTool },
    { id: 'authority', name: 'Local Authority', href: '/authority', icon: MapPin },
    { id: 'convert', name: 'Convert', href: '/convert', icon: Phone },
    { id: 'track', name: 'Track', href: '/track', icon: TrendingUp },
    { id: 'reports', name: 'Reports', href: '/reports', icon: ClipboardList },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userType, setUserType] = useState<string | null>(null)
    const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)

        const checkRole = async () => {
            const { getCurrentUser, getUserRole } = await import('@/lib/auth')
            const user = await getCurrentUser()
            if (user) {
                const role = await getUserRole(user.id)
                setIsAdmin(role?.toLowerCase() === 'admin')
            }
        }
        checkRole()

        // Auto-expand current phase section
        const currentPhase = phasesNav.find(p => pathname.startsWith(p.href))
        if (currentPhase) setExpandedPhase(currentPhase.id)
    }, [pathname])

    const currentPhaseIndex = phasesNav.findIndex(p => pathname.startsWith(p.href)) + 1

    const togglePhase = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setExpandedPhase(expandedPhase === id ? null : id)
    }

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                type="button"
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-purple-700/50 rounded-md backdrop-blur-sm border border-white/10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar Content */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-[#0F0C29] border-r border-white/5 flex flex-col transition-transform duration-300",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Header Section (h-16) */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg">
                            S
                        </div>
                        <h1 className="text-sm font-bold text-white uppercase tracking-widest leading-none">
                            SEO AI Platform
                        </h1>
                    </div>
                </div>

                {/* Status Section */}
                <div className="p-6 space-y-4">
                    {userType && (
                        <div className="space-y-4">
                            <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">User Type</span>
                                <span className="text-xs font-bold text-slate-200 block truncate">{userType}</span>
                            </div>

                            {/* Progress Component */}
                            {currentPhaseIndex > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-slate-500 uppercase">Progress</span>
                                        <span className="text-purple-400">Phase {currentPhaseIndex}/8</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full bg-purple-500 shadow-[0_0_10px_#A855F7] transition-all duration-700 ease-out"
                                            style={{ width: `${(currentPhaseIndex / 8) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="border-b border-white/5 mx-4 mb-4" />

                {/* Navigation Section */}
                <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 scrollbar-thin scrollbar-track-[#0F0C29] scrollbar-thumb-[#4C1D95] hover:scrollbar-thumb-[#7C3AED]">
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="flex items-center px-4 py-2.5 text-sm font-black rounded-xl transition-all group bg-red-600/10 text-red-500 border border-red-500/20 mb-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <ShieldAlert className="mr-3 h-5 w-5 text-red-500" />
                            Admin Panel
                        </Link>
                    )}

                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-all group",
                            pathname === '/dashboard'
                                ? "bg-purple-700 text-white"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsOpen(false)}
                    >
                        <LayoutDashboard className={cn("mr-3 h-5 w-5", pathname === '/dashboard' ? "text-white" : "text-slate-500 group-hover:text-purple-400")} />
                        Dashboard
                    </Link>

                    {/* Growth Phases Section */}
                    <div className="space-y-4">
                        <div className="flex items-center px-4">
                            <div className="h-[1px] flex-1 bg-white/5" />
                            <span className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Growth Phases</span>
                            <div className="h-[1px] flex-1 bg-white/5" />
                        </div>

                        <div className="space-y-1">
                            {phasesNav.map((phase) => {
                                const isActive = pathname.startsWith(phase.href)
                                const isExpanded = expandedPhase === phase.id

                                return (
                                    <div key={phase.id} className="space-y-1">
                                        <Link
                                            href={phase.href}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-2.5 text-sm font-bold rounded-lg transition-all group",
                                                isActive
                                                    ? "bg-purple-700/20 text-white border border-purple-500/20"
                                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <phase.icon className={cn("mr-3 h-4 w-4", isActive ? "text-purple-400" : "text-slate-500 group-hover:text-purple-400")} />
                                                {phase.name}
                                            </div>
                                            <div
                                                onClick={(e) => togglePhase(phase.id, e)}
                                                className="p-1 rounded-md hover:bg-white/10 transition-colors"
                                            >
                                                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                            </div>
                                        </Link>

                                        {isExpanded && (
                                            <div className="ml-4 py-1 space-y-1 border-l border-white/10">
                                                {phase.id === 'research' ? (
                                                    <div className="space-y-1">
                                                        {[
                                                            { name: 'Niche Finder', href: '/research', active: pathname === '/research' },
                                                            { name: 'SERP Analyzer', href: '/research/serp', soon: true },
                                                            { name: 'Competitor', href: '/research/competitor', soon: true },
                                                            { name: 'Keywords', href: '/research/keywords', soon: true },
                                                        ].map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.soon ? '#' : sub.href}
                                                                className={cn(
                                                                    "flex items-center justify-between pl-8 pr-4 py-1.5 text-xs font-medium transition-all group/sub",
                                                                    sub.active ? "text-purple-400" : "text-gray-400 hover:text-white"
                                                                )}
                                                            >
                                                                <span>{sub.name}</span>
                                                                {sub.soon && <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">Soon</span>}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-500 italic">
                                                        Coming Soon...
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Platform Section */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Platform</span>
                        </div>
                        <Link
                            href="/automation"
                            className={cn(
                                "flex items-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all group",
                                pathname === '/automation'
                                    ? "bg-purple-700 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            <Zap className={cn("mr-3 h-4 w-4", pathname === '/automation' ? "text-white" : "text-slate-500 group-hover:text-purple-400")} />
                            Automation
                        </Link>
                    </div>
                </nav>

                {/* Footer/System Section */}
                <div className="p-4 border-t border-white/5 bg-black/40">
                    <Link
                        href="/system"
                        className={cn(
                            "flex items-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all group",
                            pathname === '/system'
                                ? "bg-purple-700 text-white"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings className={cn("mr-3 h-4 w-4", pathname === '/system' ? "text-white" : "text-slate-500 group-hover:text-purple-400")} />
                        System
                    </Link>

                    <button
                        onClick={async () => {
                            const { signOut } = await import('@/lib/auth')
                            await signOut()
                            window.location.href = '/login'
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all group text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-2"
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
