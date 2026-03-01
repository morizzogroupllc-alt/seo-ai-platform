'use client'

import React, { useEffect, useState } from 'react'
import {
    Search,
    Sun,
    Moon,
    Bell,
    ChevronDown,
    Plus,
    LayoutGrid
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export default function TopBar() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [selectedProfile, setSelectedProfile] = useState<string>('No Website')
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        fetchProfiles()
    }, [])

    async function fetchProfiles() {
        const { data } = await supabase
            .from('business_profiles')
            .select('*')
            .order('created_at', { ascending: false })

        if (data && data.length > 0) {
            setProfiles(data)
            setSelectedProfile(data[0].business_name)
        }
    }

    return (
        <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
            {/* Left side: Website Selector & Breadcrumbs */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-800 transition-all">
                    <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center">
                        <GlobeIcon size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{selectedProfile}</span>
                    <ChevronDown size={14} className="text-slate-500" />
                </div>

                <button className="p-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                    <Plus size={16} />
                </button>

                <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <span>Audit</span>
                    <span className="text-slate-700">/</span>
                    <span className="text-indigo-400 font-bold">EEAT Audit</span>
                </div>
            </div>

            {/* Right side: Search, Theme, Profile */}
            <div className="flex items-center space-x-6">
                {/* Search */}
                <div className="hidden lg:flex items-center relative group">
                    <Search size={16} className="absolute left-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search check points..."
                        className="bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 w-64 transition-all"
                    />
                </div>

                {/* Action Icons */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>

                    <button className="px-3 py-1.5 bg-orange-600/10 border border-orange-600/30 text-orange-500 text-xs font-bold rounded-lg hover:bg-orange-600/20 transition-all uppercase tracking-tighter">
                        Enterprise
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
                        RK
                    </div>
                </div>
            </div>
        </header>
    )
}

function GlobeIcon({ size, className }: { size: number, className: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}
