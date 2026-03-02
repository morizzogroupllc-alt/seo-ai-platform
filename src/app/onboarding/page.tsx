'use client'

import React, { useState } from 'react'
import {
    UserPlus,
    Briefcase,
    Home,
    Building2,
    Zap,
    ChevronRight,
    Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

const userTypes = [
    {
        id: 'newbie',
        title: 'Local SEO Newbie',
        description: "Perfect if you're just starting out. We'll guide you step by step from finding your first niche to ranking.",
        icon: UserPlus,
        color: 'text-purple-400',
        bgColor: 'bg-purple-900/50',
        tag: '✓ Guided journey included',
        tagColor: 'text-purple-400',
        delay: 'delay-0'
    },
    {
        id: 'pro',
        title: 'Client SEO Pro',
        description: "You manage SEO for clients. Get audit tools, reports and content automation.",
        icon: Briefcase,
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/50',
        tag: '✓ Client reporting tools',
        tagColor: 'text-blue-400',
        delay: 'delay-75'
    },
    {
        id: 'rank-rent',
        title: 'Rank & Rent',
        description: "Build sites, rank them, rent them. Bulk page generator, auto internal linking, programmatic SEO.",
        icon: Home,
        color: 'text-green-400',
        bgColor: 'bg-green-900/50',
        tag: '✓ Bulk automation included',
        tagColor: 'text-green-400',
        delay: 'delay-150'
    },
    {
        id: 'agency',
        title: 'Agency',
        description: "Manage multiple clients at scale. White-label reports, team access and bulk site generation.",
        icon: Building2,
        color: 'text-orange-400',
        bgColor: 'bg-orange-900/50',
        tag: '✓ White-label included',
        tagColor: 'text-orange-400',
        delay: 'delay-225'
    },
    {
        id: 'automation',
        title: 'Automation / Scale',
        description: "1-click full SEO campaigns. Set it up once, let AI handle research, content and deployment.",
        icon: Zap,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/50',
        tag: '✓ 1-click automation',
        tagColor: 'text-yellow-400',
        delay: 'delay-300'
    },
]

export default function OnboardingPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null)

    const handleContinue = () => {
        if (!selectedType) return
        localStorage.setItem('user_type', selectedType)
        window.location.href = '/login'
    }

    return (
        <div className="min-h-screen bg-[#0A0818] relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

            {/* NAVBAR */}
            <nav className="relative z-10 w-full px-6 md:px-12 py-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-black text-white italic text-xl shadow-lg shadow-purple-900/20">
                        S
                    </div>
                    <span className="text-white font-black uppercase tracking-widest text-sm">SEO AI Platform</span>
                </div>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center space-x-2"
                >
                    <span>Already have account? Sign in</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 pt-4 pb-12 flex flex-col items-center min-h-[calc(100vh-80px)] justify-center">
                {/* HERO TEXT */}
                <div className="text-center space-y-4 mb-10 animate-fadeInUp">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-1">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center">
                            <Zap className="w-3 h-3 mr-1.5 fill-purple-400" />
                            Setup takes 10 seconds
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent italic uppercase">
                            Choose Your Path
                        </span>
                    </h1>
                    <p className="max-w-xl mx-auto text-slate-400 text-base font-medium leading-relaxed">
                        We'll customize your entire experience based on who you are.
                    </p>
                </div>

                {/* CARDS GRID - FIX: 5 cards in ONE single row */}
                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
                    {userTypes.map((type) => (
                        <OnboardingCard
                            key={type.id}
                            {...type}
                            isSelected={selectedType === type.title}
                            onSelect={() => setSelectedType(type.title)}
                        />
                    ))}
                </div>

                {/* ACTION AREA */}
                <div className="mt-12 flex flex-col items-center space-y-4 animate-fadeInUp delay-500">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedType}
                        className={cn(
                            "group relative w-64 h-12 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center space-x-3",
                            selectedType
                                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-2xl shadow-purple-900/40 active:scale-[0.98]"
                                : "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed"
                        )}
                    >
                        <span>Continue</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", selectedType && "group-hover:translate-x-1")} />
                    </button>
                    <p className="text-[#4B4863] text-[10px] font-black uppercase tracking-widest">
                        You can change this anytime in Settings
                    </p>
                </div>

                {/* TRUST BADGES */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 animate-fadeInUp delay-700">
                    <TrustBadge label="No Credit Card" icon={<Check className="w-3 h-3" />} />
                    <TrustBadge label="136 Tools Ready" icon={<Zap className="w-3 h-3 fill-slate-500" />} />
                    <TrustBadge label="Personalized Journey" icon={<Home className="w-3 h-3" />} />
                </div>
            </main>
        </div>
    )
}

function OnboardingCard({ title, description, icon: Icon, color, bgColor, tag, tagColor, delay, isSelected, onSelect }: any) {
    return (
        <button
            onClick={onSelect}
            className={cn(
                "group relative w-full h-full p-6 rounded-[20px] border transition-all duration-500 text-left flex flex-col opacity-0 animate-fadeInUp min-w-0",
                delay,
                isSelected
                    ? "bg-[#1E1A5E] border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.1)] scale-[1.02] z-10"
                    : "bg-[#120F2D] border-[#2D2B55] hover:border-purple-500/50 hover:bg-[#1A1650] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            )}
            style={{ animationFillMode: 'forwards' }}
        >
            {/* Selected Indicator */}
            <div className={cn(
                "absolute top-4 right-4 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center transition-all duration-300 transform",
                isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}>
                <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>

            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 shadow-inner",
                bgColor,
                color,
                "group-hover:scale-110 shadow-lg"
            )}>
                <Icon className="w-5 h-5" />
            </div>

            <h3 className="text-white font-black text-base mb-2 tracking-tight italic uppercase leading-tight">
                {title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                {description}
            </p>

            <div className={cn(
                "mt-auto inline-flex items-center text-[9px] font-black uppercase tracking-widest",
                tagColor
            )}>
                {tag}
            </div>
        </button>
    )
}

function TrustBadge({ label, icon }: { label: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center space-x-2 text-slate-500">
            <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </div>
    )
}
