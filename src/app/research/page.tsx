'use client'

import React, { useState } from 'react'
import {
    Search,
    BarChart2,
    Users,
    Key,
    ArrowRight,
    Target,
    Settings,
    CheckCircle2,
    Globe,
    Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tools = [
    {
        id: 'niche-finder',
        name: 'AI Niche Finder',
        description: 'Find profitable local niches using proven criteria',
        badge: 'Start Here',
        btnText: 'Open Tool →',
        active: true,
        icon: Target
    },
    {
        id: 'serp',
        name: 'SERP Analyzer',
        description: 'Analyze search results',
        btnText: 'Coming Soon',
        active: false,
        icon: BarChart2
    },
    {
        id: 'competitor',
        name: 'Competitor Research',
        description: 'Spy on competitors',
        btnText: 'Coming Soon',
        active: false,
        icon: Users
    },
    {
        id: 'keyword',
        name: 'Keyword Research',
        description: 'Find local keywords',
        btnText: 'Coming Soon',
        active: false,
        icon: Key
    },
]

const countries = ['USA', 'UK', 'Canada', 'Australia', 'Pakistan', 'UAE', 'Other']

export default function ResearchPage() {
    const [isProvenMode, setIsProvenMode] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [service, setService] = useState('')

    const handleFindNiches = () => {
        if (!service) return alert('Please enter a service first!')
        setShowResults(true)
    }

    const mockResults = [
        { city: 'Springfield, IL', niche: service || 'Plumber', pop: '150,000', sv: '320/mo', da: 12, dr: 8, bl: 95 },
        { city: 'Peoria, IL', niche: service || 'Plumber', pop: '110,000', sv: '280/mo', da: 14, dr: 10, bl: 120 },
        { city: 'Rockford, IL', niche: service || 'Plumber', pop: '145,000', sv: '310/mo', da: 11, dr: 7, bl: 85 },
    ]

    return (
        <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">

            {/* SECTION 1: Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
                    <Search className="mr-3 text-purple-500 w-8 h-8" />
                    Research Phase
                </h1>
                <p className="text-slate-400 font-medium">
                    Find your niche, analyze competitors, discover keywords
                </p>
            </div>

            {/* SECTION 2: Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className={cn(
                            "bg-[#1A1740] border p-5 rounded-2xl flex flex-col justify-between transition-all",
                            tool.active ? "border-purple-800" : "border-white/5 opacity-60"
                        )}
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-2 rounded-lg", tool.active ? "bg-purple-500/10 text-purple-400" : "bg-white/5 text-slate-500")}>
                                    <tool.icon className="w-5 h-5" />
                                </div>
                                {tool.badge && (
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded border border-emerald-500/20">
                                        {tool.badge}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-white font-bold mb-1">{tool.name}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">{tool.description}</p>
                        </div>
                        <button
                            disabled={!tool.active}
                            className={cn(
                                "mt-6 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                tool.active
                                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40"
                                    : "bg-white/5 text-slate-500 cursor-not-allowed"
                            )}
                        >
                            {tool.btnText}
                        </button>
                    </div>
                ))}
            </div>

            {/* SECTION 3: Niche Finder Tool */}
            <div className="bg-[#110E33] border border-purple-800/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 lg:p-10 space-y-8">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-500/20">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">AI Niche Finder Tool</h2>
                            <p className="text-slate-400 text-sm">Target profitable locations with scientific precision</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                        {/* INPUT FIELDS */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service / Niche</label>
                                <input
                                    type="text"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    placeholder="e.g. plumber, dentist, roofer, lawyer"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Country</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer">
                                        {countries.map(c => <option key={c} value={c} className="bg-[#110E33]">{c}</option>)}
                                    </select>
                                    <Globe className="absolute right-5 top-5 h-4 w-4 text-slate-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* CRITERIA MODE TOGGLE */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/5">
                                <button
                                    onClick={() => setIsProvenMode(true)}
                                    className={cn(
                                        "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all",
                                        isProvenMode ? "bg-purple-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Proven Criteria</span>
                                </button>
                                <button
                                    onClick={() => setIsProvenMode(false)}
                                    className={cn(
                                        "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all",
                                        !isProvenMode ? "bg-purple-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    <Settings className="w-3 h-3" />
                                    <span>Custom Criteria</span>
                                </button>
                            </div>

                            {isProvenMode ? (
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['🏙️ City Pop ≤ 200k', '🔍 Search Vol ≥ 200', '📊 DA ≤ 15', '💪 DR ≤ 10', '🔗 Backlinks ≤ 150', '📈 Traffic 50-100', '🚫 No Map/Image Traffic'].map((p, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg whitespace-nowrap">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium italic flex items-center">
                                        <Monitor className="w-3 h-3 mr-1" /> Our battle-tested criteria for Rank & Rent success
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {['Max City Pop', 'Min Search Vol', 'Max DA', 'Max DR', 'Max Backlinks', 'Min Traffic', 'Max Traffic'].map(f => (
                                        <div key={f} className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter ml-1">{f}</label>
                                            <input type="number" placeholder="Enter value" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleFindNiches}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm"
                    >
                        🔍 Find Niches
                    </button>
                </div>

                {/* RESULTS AREA */}
                <div className="border-t border-white/5 bg-black/20 p-8 lg:p-10">
                    {!showResults ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                <Target className="w-10 h-10 text-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-400 font-bold">Discover Your Opportunity</p>
                                <p className="text-slate-600 text-xs">Enter a service above to discover profitable niches</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center">
                                <div className="w-1 h-4 bg-emerald-500 mr-2 rounded-full"></div>
                                Suggested Opportunities Found
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {mockResults.map((res, i) => (
                                    <div key={i} className="bg-[#1A1740] border border-emerald-500/30 rounded-2xl p-6 space-y-4 hover:border-emerald-500/60 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-white font-black text-lg leading-tight">{res.city}</h4>
                                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-black rounded border border-emerald-500/30">
                                                SUCCESS!
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{res.niche}</div>

                                        <div className="grid grid-cols-2 gap-y-3 pt-2">
                                            <div className="text-[10px] text-slate-400">🏙️ Pop: <span className="text-white font-bold">{res.pop}</span></div>
                                            <div className="text-[10px] text-slate-400">🔍 SV: <span className="text-white font-bold">{res.sv}</span></div>
                                            <div className="text-[10px] text-slate-400">📊 DA: <span className="text-white font-bold">{res.da}</span></div>
                                            <div className="text-[10px] text-slate-400">💪 DR: <span className="text-white font-bold">{res.dr}</span></div>
                                            <div className="text-[10px] text-slate-400 col-span-2">🔗 BL: <span className="text-white font-bold">{res.bl}</span></div>
                                        </div>

                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Opportunity Found!</span>
                                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
