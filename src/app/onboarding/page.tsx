'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
    UserPlus,
    Briefcase,
    Home,
    Building2,
    Zap,
    ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const userTypes = [
    {
        id: 'newbie',
        title: 'Local SEO Newbie',
        description: "I'm just starting with Local SEO",
        icon: UserPlus,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
    },
    {
        id: 'pro',
        title: 'Client SEO Professional',
        description: "I manage SEO for clients",
        icon: Briefcase,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50',
    },
    {
        id: 'rank-rent',
        title: 'Rank & Rent',
        description: "I build sites to rank and rent",
        icon: Home,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
    },
    {
        id: 'agency',
        title: 'Agency',
        description: "I run an SEO agency",
        icon: Building2,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
    },
    {
        id: 'automation',
        title: 'Automation / Scale',
        description: "I want to automate everything",
        icon: Zap,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
    },
]

export default function OnboardingPage() {
    const handleSelect = (title: string) => {
        localStorage.setItem('user_type', title)
        window.location.href = '/dashboard'
    }

    return (
        <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center p-6 text-white">
            <div className="max-w-4xl w-full space-y-12 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">
                        Welcome to <span className="text-purple-500">SEO AI Platform</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium">
                        Tell us about yourself to customize your experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelect(type.title)}
                            className="group relative flex flex-col p-8 bg-[#1A1740] rounded-3xl border border-white/5 shadow-xl hover:border-purple-500/50 transition-all duration-300 text-left"
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                                "bg-purple-500/10 text-purple-400"
                            )}>
                                <type.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 italic">
                                {type.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                {type.description}
                            </p>
                            <div className="mt-auto flex items-center text-purple-400 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Select Plan
                                <ChevronRight className="ml-1 w-4 h-4" />
                            </div>
                        </button>
                    ))}
                </div>

                <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                    You can change this anytime in your system settings.
                </p>
            </div>
        </div>
    )
}
