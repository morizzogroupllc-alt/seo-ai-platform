'use client'

import React, { useEffect, useState } from 'react'
import {
    Search,
    Sun,
    Moon,
    Bell,
    ChevronDown,
    Plus,
    Globe
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export default function TopBar() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [selectedProfile, setSelectedProfile] = useState<string>('No Website')
    const [isDark, setIsDark] = useState(true)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    useEffect(() => {
        fetchProfiles()

        // Check local storage for theme
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'light') {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }, [])

    async function fetchProfiles() {
        const { data } = await supabase
            .from('business_profiles')
            .select('*')
            .order('created_at', { ascending: false })

        if (data && data.length > 0) {
            setProfiles(data)
            const lastActive = localStorage.getItem('last_active_profile')
            if (lastActive) {
                const found = data.find(p => p.id.toString() === lastActive)
                if (found) setSelectedProfile(found.business_name)
            } else {
                setSelectedProfile(data[0].business_name)
            }
        }
    }

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        if (newTheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleProfileSelect = (p: any) => {
        setSelectedProfile(p.business_name)
        localStorage.setItem('last_active_profile', p.id.toString())
        setIsProfileOpen(false)
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('profile_changed', { detail: p }))
    }

    return (
        <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
            {/* Left side: Website Selector & Breadcrumbs */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-800 transition-all min-w-[160px]"
                    >
                        <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center">
                            <Globe size={12} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-200 truncate max-w-[100px]">{selectedProfile}</span>
                        <ChevronDown size={14} className={cn("text-slate-500 transition-transform", isProfileOpen && "rotate-180")} />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2 border-b border-slate-800">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 py-1">Switch Property</p>
                            </div>
                            <div className="max-h-60 overflow-y-auto scrollbar-hide">
                                {profiles.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => handleProfileSelect(p)}
                                        className={cn(
                                            "w-full text-left px-4 py-3 text-sm transition-all hover:bg-slate-800 flex items-center space-x-3",
                                            selectedProfile === p.business_name ? "text-indigo-400 bg-indigo-500/5" : "text-slate-400"
                                        )}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full", selectedProfile === p.business_name ? "bg-indigo-500" : "bg-slate-700")}></div>
                                        <span className="truncate">{p.business_name}</span>
                                    </button>
                                ))}
                                {profiles.length === 0 && (
                                    <p className="p-4 text-xs text-slate-600 italic">No properties found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button className="p-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                    <Plus size={16} />
                </button>

                <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <span>Local SEO</span>
                    <span className="text-slate-700">/</span>
                    <span className="text-indigo-400 font-bold">The Heart</span>
                </div>
            </div>

            {/* Right side: Search, Theme, Profile */}
            <div className="flex items-center space-x-6">
                {/* Search */}
                <div className="hidden lg:flex items-center relative group">
                    <Search size={16} className="absolute left-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tools..."
                        className="bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 w-64 transition-all"
                    />
                </div>

                {/* Action Icons */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>

                    <button className="px-3 py-1.5 bg-indigo-600/10 border border-indigo-600/30 text-indigo-500 text-xs font-bold rounded-lg hover:bg-indigo-600/20 transition-all uppercase tracking-tighter">
                        PRO PLAN
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
