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
    ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
]

const phasesNav = [
    { name: 'Research', href: '/research', icon: Search },
    { name: 'Build', href: '/build', icon: Wrench },
    { name: 'Deploy', href: '/deploy', icon: Rocket },
    { name: 'Optimize', href: '/optimize', icon: PenTool },
    { name: 'Local Authority', href: '/authority', icon: MapPin },
    { name: 'Convert', href: '/convert', icon: Phone },
    { name: 'Track', href: '/track', icon: TrendingUp },
    { name: 'Reports', href: '/reports', icon: ClipboardList },
]

const extraNav = [
    { name: 'Automation', href: '/automation', icon: Zap },
]

const systemNav = [
    { name: 'System', href: '/system', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

    const currentPhaseIndex = phasesNav.findIndex(p => p.href === pathname) + 1

    return (
        <>
            {/* Mobile Toggle */}
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo & Header */}
                <div className="p-6">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-lg mr-2 flex items-center justify-center text-white text-xs font-black italic">SAI</div>
                        SEO AI
                    </h1>

                    {userType && (
                        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">User Type</span>
                                <span className="text-sm font-semibold text-slate-700">{userType}</span>
                            </div>

                            {currentPhaseIndex > 0 && (
                                <div className="mt-3 space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span className="text-slate-500 uppercase">Phase Progress</span>
                                        <span className="text-primary">{currentPhaseIndex} of 8</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500 ease-out"
                                            style={{ width: `${(currentPhaseIndex / 8) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* Main Section */}
                    <div>
                        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</div>
                        <div className="space-y-1">
                            {mainNav.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/20 hover:scale-[1.02]"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Phases Section */}
                    <div>
                        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Phases</div>
                        <div className="space-y-1">
                            {phasesNav.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-xl transition-all group",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/20 hover:scale-[1.02]"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                            {item.name}
                                        </div>
                                        <ChevronRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5", isActive ? "text-white/70" : "text-slate-300")} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Extra Section */}
                    <div>
                        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</div>
                        <div className="space-y-1">
                            {extraNav.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/20 hover:scale-[1.02]"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </nav>

                {/* System Section at Bottom */}
                <div className="p-4 bg-slate-50 border-t">
                    {systemNav.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all",
                                    isActive
                                        ? "bg-primary text-white shadow-sm shadow-primary/10"
                                        : "text-slate-600 hover:bg-white hover:text-primary"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                {item.name}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
