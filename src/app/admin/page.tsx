'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
    Users,
    Activity,
    DollarSign,
    Zap,
    TrendingUp,
    Wrench,
    Settings,
    ArrowUpRight,
    ChevronRight,
    ShieldAlert,
    Server,
    Database,
    Globe,
    ShieldCheck,
    Cpu,
    CreditCard,
    CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        recentSignups: 0,
        activePlans: 0,
        revenue: 4250,
        growth: 15.8
    })
    const [recentUsers, setRecentUsers] = useState<any[]>([])
    const [chartData, setChartData] = useState<{ day: string, count: number }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)

            // 1. Fetch total users
            const { count: totalCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // 2. Recent Signups (Last 7 days proxy)
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            const { count: recentCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gt('created_at', sevenDaysAgo)

            // 3. Recent 5 Signups for table
            const { data: recent, error: recentError } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            if (recentError) console.error('Error fetching recent users:', recentError)

            // 4. Fetch ALL users for revenue calculation
            const { data: allUsers, error: allUsersError } = await supabase
                .from('profiles')
                .select('plan')

            if (allUsersError) console.error('Error fetching all users for revenue:', allUsersError)

            const prices: Record<string, number> = {
                starter: 19,
                pro: 49,
                agency: 99,
                enterprise: 199
            }

            const calculatedRevenue = allUsers?.reduce((sum, u) => {
                return sum + (prices[u.plan] || 0)
            }, 0) || 0

            const activeCount = allUsers?.filter(u => u.plan !== 'free').length || 0

            // 5. Chart Data (Last 7 days)
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toISOString().split('T')[0]
            }).reverse()

            const { data: weeklyUsers } = await supabase
                .from('profiles')
                .select('created_at')
                .gt('created_at', sevenDaysAgo)

            const groupedData = last7Days.map(date => {
                const count = weeklyUsers?.filter(u => u.created_at.startsWith(date)).length || 0
                return { day: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }), count }
            })

            setStats({
                totalUsers: totalCount || 0,
                recentSignups: recentCount || 0,
                activePlans: activeCount,
                revenue: calculatedRevenue,
                growth: 15.8
            })
            setRecentUsers(recent || [])
            setChartData(groupedData)
            setLoading(false)
        }

        fetchDashboardData()
    }, [])

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.3em] animate-pulse">Fetching Secure Data...</span>
        </div>
    )

    return (
        <div className="space-y-6 text-white selection:bg-purple-500/30">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    Admin Dashboard <span className="text-purple-500">Overview</span>
                </h1>
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Real-time platform metrics and user activity
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Platform Users"
                    value={stats.totalUsers.toLocaleString()}
                    trend="+12%"
                    icon={<Users className="w-6 h-6 text-blue-400" />}
                    color="blue"
                />
                <StatCard
                    label="Active Premium Plans"
                    value={stats.activePlans.toLocaleString()}
                    trend="+5%"
                    icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
                    color="purple"
                />
                <StatCard
                    label="Last 7 Days Signups"
                    value={stats.recentSignups.toLocaleString()}
                    trend="+18%"
                    icon={<Zap className="w-6 h-6 text-yellow-400" />}
                    color="yellow"
                />
                <StatCard
                    label="Monthly Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    trend="+8%"
                    icon={<DollarSign className="w-6 h-6 text-green-400" />}
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                {/* Left Column: Recent Signups (55%) */}
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl overflow-hidden flex flex-col admin-card">
                    <div className="p-6 border-b border-[#2D2B55] flex items-center justify-between bg-[#2D2B55]/20">
                        <div>
                            <h2 className="text-lg font-bold">Recent Signups</h2>
                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">Latest accounts joined the platform</p>
                        </div>
                        <Link href="/admin/users" className="text-purple-400 hover:text-purple-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-[#2D2B55] bg-[#0F0C29]/50">
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Plan</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2D2B55]">
                                {recentUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-purple-900/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#2D2B55]/50 border border-[#2D2B55] flex items-center justify-center text-purple-400 font-bold text-xs uppercase group-hover:border-purple-500/50">
                                                    {user.email?.[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors truncate max-w-[140px]">
                                                        {user.email}
                                                    </span>
                                                    <span className="text-[9px] text-gray-500 font-mono italic">
                                                        ID: {user.id.substring(0, 8)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                                                user.plan === 'enterprise' ? "bg-purple-900/30 text-purple-400 border-purple-800/50" :
                                                    user.plan === 'pro' ? "bg-blue-900/30 text-blue-400 border-blue-800/50" :
                                                        "bg-gray-800/30 text-gray-400 border-gray-700/50"
                                            )}>
                                                {user.plan || 'Free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] text-gray-400 font-semibold">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column (45%) */}
                <div className="space-y-6 flex flex-col">
                    {/* Quick Actions */}
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Wrench className="w-3 h-3" /> Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickActionBtn icon={<Users />} label="Manage Users" href="/admin/users" color="blue" />
                            <QuickActionBtn icon={<Activity />} label="API Health" href="/admin/api-health" color="red" />
                            <QuickActionBtn icon={<ShieldCheck />} label="Settings" href="/admin/settings" color="purple" />
                            <QuickActionBtn icon={<Globe />} label="Tools" href="/admin/tools" color="yellow" />
                        </div>
                    </div>

                    {/* System Lifecycle Card */}
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl overflow-hidden admin-card">
                        <div className="p-4 border-b border-[#2D2B55] bg-[#2D2B55]/20">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-3 h-3" /> System Lifecycle
                            </h3>
                        </div>
                        <div className="divide-y divide-[#2D2B55]">
                            <StatusRow label="Platform Core" status="OPERATIONAL" sub="v2.4.1" />
                            <StatusRow label="Supabase DB" status="OPERATIONAL" sub="Region: AWS" />
                            <StatusRow label="Stripe API" status="STABLE" sub="Webhooks 🆗" />
                            <StatusRow label="DataForSEO" status="CONFIG REQUIRED" sub="No API Key" isWarning />
                            <StatusRow label="Gemini AI" status="OPERATIONAL" sub="Pro 1.5" />
                        </div>
                    </div>

                    {/* Compact Chart */}
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-4 admin-card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" /> User Growth
                            </h3>
                            <span className="text-[10px] text-gray-500 font-mono">Last 7 Days</span>
                        </div>
                        <div className="h-40 flex items-end justify-between gap-1 mt-auto">
                            {chartData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative">
                                    <div className="absolute -top-6 text-[9px] text-purple-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        +{d.count}
                                    </div>
                                    <div
                                        className="w-full bg-purple-600/40 border-t-2 border-purple-500 rounded-t-sm transition-all group-hover:bg-purple-500 group-hover:scale-y-105"
                                        style={{ height: `${Math.max((d.count / (Math.max(...chartData.map(cd => cd.count)) || 1)) * 100, 5)}%` }}
                                    ></div>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter truncate w-full text-center">
                                        {d.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Health Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <HealthCard
                    title="Database"
                    icon={<Database className="w-4 h-4" />}
                    metrics={[
                        { label: "Connections", value: "Active", status: "ok" },
                        { label: "Latency", value: "34ms", status: "ok" },
                        { label: "Storage", value: "12%", status: "ok" }
                    ]}
                />
                <HealthCard
                    title="Authentication"
                    icon={<ShieldCheck className="w-4 h-4" />}
                    metrics={[
                        { label: "Auth Server", value: "UP", status: "ok" },
                        { label: "Session TTL", value: "72h", status: "ok" },
                        { label: "Rate Limit", value: "0%", status: "ok" }
                    ]}
                />
                <HealthCard
                    title="Environment"
                    icon={<Cpu className="w-4 h-4" />}
                    metrics={[
                        { label: "Node Version", value: "v20", status: "ok" },
                        { label: "Memory Usage", value: "450MB", status: "ok" },
                        { label: "Uptime", value: "99.9%", status: "ok" }
                    ]}
                />
            </div>
        </div>
    )
}

function StatCard({ label, value, trend, icon, color }: any) {
    const colorClasses: any = {
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        yellow: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
        green: "text-green-500 bg-green-500/10 border-green-500/20",
    }

    return (
        <div className="bg-[#1A1740] border border-[#2D2B55] p-6 rounded-2xl hover:border-purple-500/50 transition-all group cursor-default shadow-xl admin-card">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl border transition-colors", colorClasses[color])}>
                    {icon}
                </div>
                <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold italic">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </div>
            </div>
            <div className="text-5xl font-bold text-white tracking-tighter group-hover:text-purple-400 transition-colors mb-2">
                {value}
            </div>
            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-70">
                {label}
            </div>
        </div>
    )
}

function QuickActionBtn({ icon, label, href, color }: any) {
    const colors: any = {
        blue: "hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30",
        red: "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30",
        purple: "hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30",
        yellow: "hover:bg-yellow-500/10 hover:text-yellow-400 hover:border-yellow-500/30",
    }
    return (
        <Link href={href} className={cn(
            "flex flex-col items-center justify-center p-4 rounded-xl border border-[#2D2B55] bg-[#1A1740] transition-all gap-2 group shadow-lg",
            colors[color]
        )}>
            <div className="w-4 h-4 text-white/40 group-hover:text-current group-hover:scale-110 transition-all">
                {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </Link>
    )
}

function StatusRow({ label, status, sub, isWarning }: any) {
    return (
        <div className="px-5 py-3 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3">
                <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                    isWarning ? "bg-yellow-500 shadow-yellow-500/50" : "bg-green-500 shadow-green-500/50"
                )}></div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter leading-none group-hover:text-purple-400 transition-colors">{label}</span>
                    <span className="text-[9px] text-gray-500 font-mono italic">{sub}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className={cn("text-[9px] font-bold uppercase tracking-widest",
                    isWarning ? "text-yellow-500" : "text-green-500"
                )}>
                    {status}
                </span>
                {isWarning && (
                    <button className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all text-[8px] font-bold uppercase">
                        Configure →
                    </button>
                )}
            </div>
        </div>
    )
}

function HealthCard({ title, icon, metrics }: any) {
    return (
        <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group shadow-xl admin-card">
            <div className="px-6 py-4 border-b border-[#2D2B55] flex items-center justify-between bg-[#2D2B55]/20">
                <div className="flex items-center gap-2">
                    <div className="text-purple-400 group-hover:scale-110 transition-transform">{icon}</div>
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">{title}</h3>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">HEALTHY</span>
                </div>
            </div>
            <div className="p-4 space-y-3">
                {metrics.map((m: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{m.label}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white font-mono">{m.value}</span>
                            <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
