'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Search,
    Wrench,
    Rocket,
    PenTool,
    MapPin,
    Phone,
    TrendingUp,
    ClipboardList,
    ArrowRight,
    ShieldCheck,
    Zap,
    LayoutGrid,
    TrendingDown,
    BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const phases = [
    { id: 1, name: 'Research', icon: Search, count: 17, href: '/research', color: 'bg-blue-500/10 text-blue-400' },
    { id: 2, name: 'Build', icon: Wrench, count: 26, href: '/build', color: 'bg-indigo-500/10 text-indigo-400' },
    { id: 3, name: 'Deploy', icon: Rocket, count: 8, href: '/deploy', color: 'bg-purple-500/10 text-purple-400' },
    { id: 4, name: 'Optimize', icon: PenTool, count: 19, href: '/optimize', color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 5, name: 'Local Authority', icon: MapPin, count: 34, href: '/authority', color: 'bg-amber-500/10 text-amber-400' },
    { id: 6, name: 'Convert', icon: Phone, count: 5, href: '/convert', color: 'bg-rose-500/10 text-rose-400' },
    { id: 7, name: 'Track', icon: TrendingUp, count: 9, href: '/track', color: 'bg-cyan-500/10 text-cyan-400' },
    { id: 8, name: 'Reports', icon: ClipboardList, count: 11, href: '/reports', color: 'bg-slate-500/10 text-slate-400' },
]

const stats = [
    { label: 'Total Tools', value: '136', icon: LayoutGrid },
    { label: 'Phase 1 Tools (Free)', value: '78', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Phase 2 Tools (Paid)', value: '58', icon: Zap, color: 'text-amber-400' },
    { label: 'Your Progress', value: '0%', icon: BarChart3, color: 'text-purple-400' },
]

export default function DashboardPage() {
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

    return (
        <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">

            {/* SECTION 1: Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/20 to-transparent border border-white/5 p-8 lg:p-12">
                <div className="relative z-10 space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Welcome back! 👋
                    </h1>
                    <div className="flex items-center space-x-3">
                        <span className="text-slate-400 text-lg font-medium">You are building as:</span>
                        <span className="px-4 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                            {userType || 'Awaiting Selection...'}
                        </span>
                    </div>
                </div>
                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"></div>
            </div>

            {/* SECTION 2: Journey Progress Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center">
                        <div className="w-2 h-6 bg-purple-600 rounded-full mr-3"></div>
                        Growth Journey
                    </h2>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">8 Phases to Profit</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {phases.map((phase) => (
                        <Link
                            key={phase.id}
                            href={phase.href}
                            className="group relative bg-[#0F0C29]/50 border border-white/5 p-6 rounded-2xl hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", phase.color)}>
                                    <phase.icon className="w-6 h-6" />
                                </div>
                                <div className="text-[10px] font-black uppercase text-purple-400/70 tracking-widest bg-purple-400/5 px-2 py-0.5 rounded">
                                    Phase {phase.id}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                                    {phase.name}
                                </h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider italic">
                                    {phase.count} Tools Available
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Status: Pending</span>
                                <span className="flex items-center text-xs font-black text-purple-400 group-hover:translate-x-1 transition-transform">
                                    START <ArrowRight className="ml-1 w-3 h-3" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* SECTION 3: Quick Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center space-x-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                            <stat.icon className={cn("w-5 h-5", stat.color || "text-slate-400")} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-white tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* SECTION 4: Quick Start Banner */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/20 overflow-hidden group">
                <div className="relative h-full w-full bg-[#0F0C29] rounded-[22px] px-8 py-10 lg:px-12 lg:py-14 flex flex-col md:flex-row items-center justify-between overflow-hidden">
                    {/* Background FX */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10 space-y-2 text-center md:text-left">
                        <p className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px]">Step 1: Intelligence</p>
                        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Ready to find your niche?</h3>
                        <p className="text-slate-400 max-w-md">Start your research phase to identify high-traffic, low-competition opportunities in your area.</p>
                    </div>

                    <Link
                        href="/research"
                        className="relative z-10 mt-8 md:mt-0 flex items-center px-10 py-5 bg-white text-purple-900 font-black rounded-2xl hover:bg-purple-50 shadow-xl transition-all hover:scale-105 active:scale-95 group-hover:rotate-1"
                    >
                        START RESEARCH <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>

        </div>
    )
}
