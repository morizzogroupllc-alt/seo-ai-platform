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
    ChevronRight
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

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)

        // Auto-expand current phase section
        const currentPhase = phasesNav.find(p => pathname.startsWith(p.href))
        if (currentPhase) setExpandedPhase(currentPhase.id)
    }, [pathname])

    const currentPhaseIndex = phasesNav.findIndex(p => pathname === p.href) + 1

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
                "fixed inset-y-0 left-0 z-40 w-56 bg-[#0F0C29] border-r border-white/5 flex flex-col transition-transform duration-300",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Header Section */}
                <div className="p-6 space-y-4 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white italic shadow-lg shadow-purple-500/20">
                            S
                        </div>
                        <h1 className="text-sm font-bold text-white uppercase tracking-widest leading-none">
                            SEO AI Platform
                        </h1>
                    </div>

                    {userType && (
                        <div className="pt-2">
                            <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 group hover:border-purple-500/50 transition-colors">
                                <span className="block text-[9px] font-black text-purple-400 uppercase tracking-tighter mb-0.5 opacity-70">User Type</span>
                                <span className="text-xs font-bold text-slate-200 block truncate">{userType}</span>
                            </div>

                            {/* Progress Bar Component */}
                            {currentPhaseIndex > 0 && (
                                <div className="mt-4 px-1 space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-slate-500 uppercase">Current Progress</span>
                                        <span className="text-purple-400">Phase {currentPhaseIndex} of 8</span>
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

                {/* Navigation Section */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                    {/* Main Nav */}
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all group",
                            pathname === '/dashboard'
                                ? "bg-purple-700 text-white shadow-lg shadow-purple-900/40"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsOpen(false)}
                    >
                        <Home className={cn("mr-3 h-5 w-5", pathname === '/dashboard' ? "text-white" : "text-slate-500 group-hover:text-purple-400")} />
                        Dashboard
                    </Link>

                    {/* Growth Phases Section */}
                    <div className="space-y-2">
                        <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth Phases</h3>
                        <div className="space-y-1">
                            {phasesNav.map((phase) => {
                                const isActive = pathname === phase.href
                                const isExpanded = expandedPhase === phase.id

                                return (
                                    <div key={phase.id} className="space-y-1">
                                        <Link
                                            href={phase.href}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-2.5 text-sm font-bold rounded-lg transition-all group",
                                                isActive
                                                    ? "bg-purple-700 text-white"
                                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <phase.icon className={cn("mr-3 h-4 w-4", isActive ? "text-white" : "text-slate-500 group-hover:text-purple-400")} />
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
                                                            <div key={sub.name} className="flex items-center">
                                                                <Link
                                                                    href={sub.soon ? '#' : sub.href}
                                                                    className={cn(
                                                                        "flex-1 flex items-center justify-between pl-8 pr-4 py-1.5 text-xs font-medium transition-colors",
                                                                        sub.active ? "text-purple-400" : "text-gray-400 hover:text-white"
                                                                    )}
                                                                >
                                                                    <span>{sub.name}</span>
                                                                    {sub.soon && <span className="text-[8px] bg-white/5 px-1 rounded text-gray-600">Soon</span>}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-500 italic">
                                                        Tools coming soon...
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
                    <div className="space-y-2">
                        <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform</h3>
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
                <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
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
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-[#0F0C29]/80 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
