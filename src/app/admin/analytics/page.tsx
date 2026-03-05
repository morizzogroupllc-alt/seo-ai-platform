'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
    BarChart3,
    Users,
    Activity,
    Clock,
    Zap,
    TrendingUp,
    DollarSign,
    Target,
    LayoutGrid,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Calendar,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ArrowRight
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { cn } from '../../../lib/utils'

// --- Types ---

interface Profile {
    id: string
    email: string
    plan: string
    role: string
    created_at: string
    user_type?: string
}

interface ApiUsage {
    id: string
    tool_name: string
    created_at: string
}

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<Profile[]>([])
    const [usageData, setUsageData] = useState<ApiUsage[]>([])
    const [dateRange, setDateRange] = useState('7 Days')

    useEffect(() => {
        fetchAnalyticsData()
    }, [])

    const fetchAnalyticsData = async () => {
        setLoading(true)
        try {
            const [uRes, aRes] = await Promise.all([
                supabase.from('profiles').select('*').order('created_at', { ascending: false }),
                supabase.from('api_usage').select('id, tool_name, created_at')
            ])

            if (uRes.error) throw uRes.error
            setUsers(uRes.data || [])
            setUsageData(aRes.data || [])
        } catch (err) {
            console.error('Error fetching analytics:', err)
        } finally {
            setLoading(false)
        }
    }

    // --- Derived Stats ---

    const stats = useMemo(() => {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        const newThisWeek = users.filter(u => new Date(u.created_at) > weekAgo).length
        const activeToday = Array.from(new Set(usageData.filter(u => new Date(u.created_at) > dayAgo).map(u => u.id))).length // Proxied as unique call IDs or could be user_ids if available
        const totalApiCalls = usageData.filter(u => new Date(u.created_at) > dayAgo).length

        const paidCount = users.filter(u => u.plan !== 'free' && u.role !== 'admin').length
        const revenue = users.reduce((acc, u) => {
            if (u.role === 'admin') return acc
            const prices: any = { starter: 19, pro: 49, agency: 99, enterprise: 199 }
            return acc + (prices[u.plan.toLowerCase()] || 0)
        }, 0)

        return {
            totalUsers: users.length,
            newThisWeek,
            activeToday: activeToday || 0,
            totalApiCalls,
            convRate: users.length > 0 ? Math.round((paidCount / users.length) * 100) : 0,
            revenue
        }
    }, [users, usageData])

    const chartData = useMemo(() => {
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - (29 - i))
            d.setHours(0, 0, 0, 0)
            return d
        })

        const mapped = days.map(d => {
            const count = users.filter(u => {
                const ud = new Date(u.created_at)
                ud.setHours(0, 0, 0, 0)
                return ud.getTime() === d.getTime()
            }).length
            return {
                date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count
            }
        })

        const max = Math.max(...mapped.map(d => d.count), 1)
        return { data: mapped, max }
    }, [users])

    const userTypeDistribution = useMemo(() => {
        const types = ['Local SEO Newbie', 'Client SEO Pro', 'Rank & Rent', 'Agency', 'Automation / Scale']
        return types.map(type => {
            const count = users.filter(u => u.user_type === type).length
            return { type, count, percentage: users.length > 0 ? (count / users.length) * 100 : 0 }
        })
    }, [users])

    const planDistribution = useMemo(() => {
        const plans = [
            { name: 'Free', color: 'bg-gray-500', key: 'free' },
            { name: 'Starter', color: 'bg-purple-500', key: 'starter' },
            { name: 'Pro', color: 'bg-blue-500', key: 'pro' },
            { name: 'Agency', color: 'bg-yellow-500', key: 'agency' },
            { name: 'Enterprise', color: 'bg-red-500', key: 'enterprise' }
        ]
        return plans.map(p => {
            const count = users.filter(u => u.plan.toLowerCase() === p.key).length
            return { ...p, count, percentage: users.length > 0 ? (count / users.length) * 100 : 0 }
        })
    }, [users])

    const topTools = useMemo(() => {
        const toolCounts: { [key: string]: number } = {}
        usageData.forEach(u => {
            toolCounts[u.tool_name] = (toolCounts[u.tool_name] || 0) + 1
        })

        const sorted = Object.entries(toolCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }))

        if (sorted.length === 0) {
            return [
                { name: 'Niche Finder', count: 0 },
                { name: 'Keywords', count: 0 },
                { name: 'SERP Tracking', count: 0 },
                { name: 'Content AI', count: 0 },
                { name: 'Website Builder', count: 0 }
            ]
        }
        return sorted
    }, [usageData])

    const timeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime()
        const mins = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)
        if (mins < 60) return mins + 'm ago'
        if (hours < 24) return hours + 'h ago'
        return days + 'd ago'
    }

    // --- Components ---

    const StatCard = ({ icon, name, value, sub, color }: any) => (
        <div className="admin-stat-card card-enter"
            style={{ borderBottom: `3px solid ${color}` }}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
                    style={{ background: color + '22' }}>
                    {icon}
                </div>
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{name}</span>
            </div>
            <div className="text-4xl font-black text-white mb-1">{value}</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{sub}</div>
        </div>
    )

    const DistributionRow = ({ label, count, percentage, colorClass }: any) => (
        <div className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest truncate group-hover:text-white transition-colors">
                    {label}
                </span>
                <span className="text-white text-[10px] font-black">{count}</span>
            </div>
            <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-1000", colorClass || "bg-purple-600")}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest animate-pulse">Calculating Growth Metrics...</span>
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeIn pb-20">
            {/* SECTION 1: Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                        Platform <span className="gradient-text">Analytics</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest leading-relaxed">
                        User engagement, growth, and insights
                    </p>
                </div>
                <div className="flex items-center bg-[#1E1E1E] border border-[#333333] p-1 rounded-xl">
                    {['Today', '7 Days', '30 Days', 'All Time'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setDateRange(r)}
                            className={cn(
                                "px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                dateRange === r ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40" : "text-gray-500 hover:text-white"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* SECTION 2: 6 Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Users size={20} />} name="TOTAL USERS" value={stats.totalUsers.toLocaleString()} sub={`+${stats.newThisWeek} THIS WEEK`} color="#6D28D9" />
                <StatCard icon={<Activity size={20} />} name="ACTIVE TODAY" value={stats.activeToday.toLocaleString()} sub="UNIQUE SESSIONS" color="#059669" />
                <StatCard icon={<Clock size={20} />} name="AVG SESSION" value="0m" sub="DATA COLLECTING..." color="#3B82F6" />

                <StatCard icon={<Zap size={20} />} name="API CALLS TODAY" value={stats.totalApiCalls.toLocaleString()} sub="ACROSS ALL TOOLS" color="#8B5CF6" />
                <StatCard icon={<Target size={20} />} name="CONVERSION RATE" value={stats.convRate + "%"} sub="FREE TO PAID" color="#F59E0B" />
                <StatCard icon={<DollarSign size={20} />} name="MRR" value={"$" + stats.revenue.toLocaleString()} sub={`RS. ${(stats.revenue * 278).toLocaleString()}`} color="#EF4444" />
            </div>

            {/* SECTION 3: User Growth Chart */}
            <div className="glass-card shimmer-border p-8">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">User Growth</h3>
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Daily new registrations trend</p>
                    </div>
                    <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
                        Last 30 Days
                    </span>
                </div>

                <div className="flex items-end gap-1.5 h-48 px-1 mt-4">
                    {chartData.data.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#121212] px-2.5 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl z-10 whitespace-nowrap border-2 border-purple-500">
                                {d.count} Users
                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-l-6 border-r-6 border-t-6 border-transparent border-t-white" />
                            </div>

                            <div
                                className={cn(
                                    "w-full rounded-t-lg transition-all duration-500 cursor-pointer relative",
                                    d.count > 0 ? "bg-gradient-to-t from-purple-900 to-purple-500 hover:to-purple-400" : "bg-white/5 opacity-50"
                                )}
                                style={{
                                    height: d.count > 0
                                        ? Math.max((d.count / chartData.max) * 100, 10).toString() + '%'
                                        : '4px',
                                }}
                            >
                                {d.count > 0 && <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full" />}
                            </div>

                            {i % 5 === 0 && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 -rotate-45 whitespace-nowrap">
                                    <span className="text-[8px] text-gray-600 font-black uppercase tracking-tighter">
                                        {d.date}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.06)] flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest">
                    <span>JAN 10</span>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> Registrations</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/5" /> No Activity</div>
                    </div>
                    <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
                </div>
            </div>

            {/* SECTION 4: Distributions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Users by Type */}
                <div className="glass-card shimmer-border p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                            <PieChart size={18} />
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">Users by Type</h3>
                    </div>
                    <div className="space-y-6 inner-box p-6 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                        {userTypeDistribution.map((item, idx) => (
                            <DistributionRow
                                key={idx}
                                label={item.type || 'Undefined'}
                                count={item.count}
                                percentage={item.percentage}
                            />
                        ))}
                    </div>
                </div>

                {/* Users by Plan */}
                <div className="glass-card shimmer-border p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                            <LayoutGrid size={18} />
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">Users by Plan</h3>
                    </div>
                    <div className="space-y-6 inner-box p-6 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                        {planDistribution.map((item, idx) => (
                            <DistributionRow
                                key={idx}
                                label={item.name}
                                count={item.count}
                                percentage={item.percentage}
                                colorClass={item.color}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 5: Usage & Signups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Tools */}
                <div className="glass-card shimmer-border p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <Zap size={18} />
                            </div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Most Used Tools</h3>
                        </div>
                        <button className="text-[9px] font-black text-purple-400 uppercase border-b border-purple-500/30 hover:border-purple-500 transition-all">
                            Export Usage Report
                        </button>
                    </div>
                    <div className="space-y-3">
                        {topTools.map((tool, idx) => (
                            <div key={idx} className="flex items-center gap-4 inner-box px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.06)] group hover:border-purple-500/30 transition-all">
                                <span className="text-purple-500 font-black text-xs w-6 opacity-40 group-hover:opacity-100 transition-opacity">#{idx + 1}</span>
                                <div className="flex-1">
                                    <p className="text-white text-xs font-black uppercase tracking-widest">{tool.name}</p>
                                    <div className="mt-1.5 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                                            style={{ width: usageData.length > 0 ? `${(tool.count / usageData.length) * 100 * 5}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-xs font-black">{tool.count}</p>
                                    <p className="text-[8px] text-gray-600 font-bold uppercase">CALLS</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card shimmer-border p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <TrendingUp size={18} />
                            </div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Recent Signups</h3>
                        </div>
                        <span className="flex items-center gap-1.5 text-[9px] font-black text-green-400 uppercase">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Now
                        </span>
                    </div>
                    <div className="space-y-4">
                        {users.slice(0, 5).map((u, i) => (
                            <div key={u.id} className="flex items-center justify-between p-4 inner-box rounded-2xl border border-[rgba(255,255,255,0.06)] hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center text-purple-400 font-bold text-sm border border-purple-500/10 shadow-lg">
                                        {u.email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-white text-xs font-bold truncate max-w-[150px]">{u.email}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={cn(
                                                "text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-tighter border",
                                                u.plan === 'free' ? "bg-gray-800 text-gray-500 border-[rgba(255,255,255,0.06)]" : "bg-purple-900/40 text-purple-400 border-purple-500/20"
                                            )}>
                                                {u.plan}
                                            </span>
                                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">• {timeAgo(u.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white rounded-xl transition-all border border-[rgba(255,255,255,0.06)]">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white text-[10px] font-black rounded-2xl border border-[rgba(255,255,255,0.06)] transition-all uppercase tracking-widest active:scale-[0.98]">
                        Full User Audit Log
                    </button>
                </div>
            </div>
        </div>
    )
}
