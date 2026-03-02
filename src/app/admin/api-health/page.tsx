'use client'

import React, { useState } from 'react'
import {
    Activity,
    Wifi,
    WifiOff,
    Database,
    Zap,
    Search,
    Globe,
    Key,
    CheckCircle2,
    AlertCircle,
    RotateCw,
    BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ApiHealth() {
    const [isTesting, setIsTesting] = useState<string | null>(null)

    const testConnection = (id: string) => {
        setIsTesting(id)
        setTimeout(() => setIsTesting(null), 1500)
    }

    return (
        <div className="space-y-10">
            {/* PAGE HEADER */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">API Health Monitor</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Status, Usage, and Connectivity of Integrated Services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DATA FOR SEO */}
                <ApiCard
                    name="DataForSEO"
                    icon={Database}
                    status="Connected"
                    isOnline={true}
                    callsToday="1,248"
                    balance="$142.50"
                    apiKey="df_admin_********************"
                    onTest={() => testConnection('dataforseo')}
                    isTesting={isTesting === 'dataforseo'}
                />

                {/* GEMINI AI */}
                <ApiCard
                    name="Gemini API"
                    icon={Zap}
                    status="Online"
                    isOnline={true}
                    callsToday="852"
                    balance="Free Tier"
                    apiKey="gm_admin_********************"
                    onTest={() => testConnection('gemini')}
                    isTesting={isTesting === 'gemini'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* USAGE STATS */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-sm font-black text-white italic uppercase tracking-widest">Platform Usage Today</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <UsageMetric label="Niche Finder" value="342" sub="calls" />
                        <UsageMetric label="Keywords" value="891" sub="calls" />
                        <UsageMetric label="SERP Tracking" value="2,105" sub="calls" />
                        <UsageMetric label="Content AI" value="156" sub="calls" />
                    </div>

                    <div className="bg-[#1A1740]/30 border border-white/5 rounded-[2rem] p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Global API Latency</h3>
                            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Optimal Performance</span>
                        </div>
                        <div className="h-24 flex items-end justify-between px-2 gap-1">
                            {[40, 65, 30, 85, 45, 90, 55, 70, 40, 60, 30, 50].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-red-500/20 rounded-t-sm hover:bg-red-500/40 transition-all cursor-pointer relative group"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h}ms
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* USER API KEYS */}
                <div className="space-y-6">
                    <h2 className="text-sm font-black text-white italic uppercase tracking-widest">Custom API Keys</h2>
                    <div className="bg-[#1A1740]/50 border border-white/5 rounded-[2rem] p-6 space-y-4">
                        <div className="flex flex-col items-center text-center space-y-4 py-4">
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <Key className="w-8 h-8 text-slate-500" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none">0 Users Active</h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">No users currently using their own API keys.</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <button className="w-full bg-white/5 border border-white/5 rounded-xl py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-colors">
                                View Key Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ApiCard({ name, icon: Icon, status, isOnline, callsToday, balance, apiKey, onTest, isTesting }: any) {
    return (
        <div className="bg-[#1A1740] border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">{name}</h3>
                        <div className={cn(
                            "flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest",
                            isOnline ? "text-emerald-500" : "text-red-500"
                        )}>
                            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            <span>{status}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onTest}
                    disabled={isTesting}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-red-600/10 hover:border-red-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    <RotateCw className={cn("w-4 h-4", isTesting && "animate-spin")} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-2 border-t border-white/5">
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Today's Usage</span>
                    <p className="text-xl font-black text-white uppercase tracking-tighter italic">{callsToday}</p>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Balance / Tier</span>
                    <p className="text-xl font-black text-white uppercase tracking-tighter italic">{balance}</p>
                </div>
            </div>

            <div className="bg-black/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Primary API Key</span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">{apiKey}</span>
                </div>
                <div className="flex space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
                </div>
            </div>
        </div>
    )
}

function UsageMetric({ label, value, sub }: any) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-2 group hover:bg-red-600/5 transition-colors">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-red-500/50 transition-colors">{label}</span>
            <div className="flex flex-col">
                <span className="text-2xl font-black text-white italic tracking-tighter">{value}</span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest leading-none">{sub}</span>
            </div>
        </div>
    )
}
