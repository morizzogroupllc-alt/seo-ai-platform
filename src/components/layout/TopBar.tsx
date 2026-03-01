'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TopBar() {
    const pathname = usePathname()
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

    // Map path to title
    const getPageTitle = (path: string) => {
        const segments = path.split('/').filter(Boolean)
        if (segments.length === 0) return 'Dashboard'

        const page = segments[0]
        switch (page) {
            case 'dashboard': return 'Dashboard'
            case 'research': return 'Research'
            case 'build': return 'Build'
            case 'deploy': return 'Deploy'
            case 'optimize': return 'Optimize'
            case 'authority': return 'Local Authority'
            case 'convert': return 'Convert'
            case 'track': return 'Track'
            case 'reports': return 'Reports'
            case 'automation': return 'Automation'
            case 'system': return 'System'
            default: return page.charAt(0).toUpperCase() + page.slice(1)
        }
    }

    const userInitial = userType ? userType.charAt(0).toUpperCase() : 'U'

    return (
        <header className="fixed top-0 right-0 left-0 h-14 bg-[#0F0C29] border-b border-white/5 z-30 flex items-center justify-between px-6">
            {/* Left: Page Title (Offset for sidebar on desktop) */}
            <div className="flex items-center md:ml-56">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">
                    {getPageTitle(pathname)}
                </h2>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full bg-white/5 border border-white/10 rounded-xl py-1.5 pl-10 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                        placeholder="Search tools..."
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
                {/* Plan Badge */}
                <div className="hidden sm:flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Free Plan</span>
                </div>

                {/* Notifications */}
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0F0C29]"></span>
                </button>

                {/* User Avatar */}
                <div className="flex items-center space-x-3 ml-2 border-l border-white/10 pl-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/20">
                        {userInitial}
                    </div>
                </div>
            </div>
        </header>
    )
}
