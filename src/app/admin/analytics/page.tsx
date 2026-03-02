'use client'

import React from 'react'
import { BarChart3, TrendingUp, Users, Clock, Globe, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminAnalytics() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Platform Analytics</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Daily engagement, tool heatmap, and churn risk detection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard label="Daily Active Users" value="0" trend="+0%" color="text-red-500" icon={Users} />
                <AnalyticsCard label="Average Session" value="0m" trend="+0%" color="text-red-500" icon={Clock} />
                <AnalyticsCard label="New Signups" value="0" trend="+0%" color="text-red-500" icon={TrendingUp} />
                <AnalyticsCard label="Global Coverage" value="0 Cities" trend="+0%" color="text-red-500" icon={Globe} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1A1740]/30 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="p-6 bg-white/5 rounded-full">
                        <BarChart3 className="w-12 h-12 text-slate-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none">Engagement Heatmap</h3>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Analytics engine is collecting data. Detailed reports will be available soon.</p>
                    </div>
                </div>

                <div className="bg-[#1A1740]/30 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <TrendingUp className="w-10 h-10 text-slate-600" />
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Growth Funnel</h4>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Awaiting user journey data patterns.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AnalyticsCard({ label, value, trend, color, icon: Icon }: any) {
    return (
        <div className="bg-[#1A1740]/50 border border-white/5 p-6 rounded-[2rem] space-y-4">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 rounded-lg">
                    <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{value}</h3>
                <div className={cn("flex items-center space-x-1 text-[9px] font-black uppercase", color)}>
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{trend}</span>
                </div>
            </div>
        </div>
    )
}
