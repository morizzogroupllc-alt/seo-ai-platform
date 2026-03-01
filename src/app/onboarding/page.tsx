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
    const router = useRouter()

    const handleSelect = (id: string) => {
        localStorage.setItem('user_type', id)
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Welcome to SEO AI Platform
                    </h1>
                    <p className="text-lg text-slate-600">
                        Tell us about yourself to customize your experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelect(type.title)}
                            className="group relative flex flex-col p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 text-left"
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                                type.bgColor,
                                type.color
                            )}>
                                <type.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {type.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                {type.description}
                            </p>
                            <div className="mt-auto flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                Get Started
                                <ChevronRight className="ml-1 w-4 h-4" />
                            </div>
                        </button>
                    ))}
                </div>

                <p className="text-center text-slate-400 text-sm">
                    You can change this anytime in your settings.
                </p>
            </div>
        </div>
    )
}
