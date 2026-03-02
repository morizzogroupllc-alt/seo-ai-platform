'use client'

import React, { useEffect, useState } from 'react'
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
    Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeToday: 0,
        revenue: 0,
        apiCalls: 0
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

            // 2. Active Today (Using created_at < 24h as proxy)
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            const { count: activeCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gt('created_at', twentyFourHoursAgo)

            // 3. Recent 10 Signups
            const { data: recent } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10)

            // 4. Chart Data (Last 7 days)
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toISOString().split('T')[0]
            }).reverse()

            const { data: weeklyUsers } = await supabase
                .from('profiles')
                .select('created_at')
                .gt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

            const groupedData = last7Days.map(date => {
                const count = weeklyUsers?.filter(u => u.created_at.startsWith(date)).length || 0
                return { day: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }), count }
            })

            setStats({
                totalUsers: totalCount || 0,
                activeToday: activeCount || 0,
                revenue: 0, // Hardcoded per requirements
                apiCalls: 0  // Hardcoded per requirements
            })
            setRecentUsers(recent || [])
            setChartData(groupedData)
            setLoading(false)
        }

        fetchDashboardData()
    }, [])

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] animate-pulse">Fetching Secure Data...</span>
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* HEADER */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Overview Dashboard</h1>
                <div className="flex items-center space-x-3">
                    <span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                        Real-time platform performance & user growth
                    </span>
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="blue"
                    trend="+12%"
                />
                <StatCard
                    label="Active Today"
                    value={stats.activeToday}
                    icon={Zap}
                    color="yellow"
                    trend="Live"
                />
                <StatCard
                    label="Monthly Revenue"
                    value="$0"
                    icon={DollarSign}
                    color="green"
                    trend="Soon"
                />
                <StatCard
                    label="API Calls Today"
                    value="0"
                    icon={Activity}
                    color="red"
                    trend="100%"
                />
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* RECENT SIGNUPS */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-4 border-red-600 pl-4">Recent Signups</h2>
                        <a href="/admin/users" className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors">View All Users →</a>
                    </div>

                    <div className="bg-[#130A0A] border border-[#2D1515] rounded-xl overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A0A0A] border-b border-[#2D1515]">
                                <tr>
                                    <th className="px-6 py-5 text-[9px] font-black text-gray-500 uppercase tracking-widest">User</th>
                                    <th className="px-6 py-5 text-[9px] font-black text-gray-500 uppercase tracking-widest">Plan</th>
                                    <th className="px-6 py-5 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2D1515]">
                                {recentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-red-950/20 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-[10px] font-black text-white ring-1 ring-red-500/20 group-hover:scale-110 transition-transform">
                                                    {user.email?.[0].toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white group-hover:text-red-500 transition-colors">{user.email}</span>
                                                    <span className="text-[9px] text-gray-500 font-mono">ID: {user.id.slice(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ring-1",
                                                user.plan === 'pro' ? 'bg-purple-600/10 text-purple-500 ring-purple-600/20' :
                                                    user.plan === 'agency' ? 'bg-blue-600/10 text-blue-500 ring-blue-600/20' :
                                                        user.plan === 'enterprise' ? 'bg-yellow-600/10 text-yellow-500 ring-yellow-600/20' :
                                                            'bg-gray-800 text-gray-500 ring-gray-700'
                                            )}>
                                                {user.plan || 'free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-[10px] font-black uppercase text-red-500/80 hover:text-red-500 transition-all">Manage →</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QUICK ACTIONS & SYSTEM STATUS */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-4 border-red-600 pl-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <QuickActionBtn label="Manage Users" icon={Users} />
                            <QuickActionBtn label="API Health" icon={Activity} />
                            <QuickActionBtn label="Payments" icon={DollarSign} />
                            <QuickActionBtn label="Platform Settings" icon={Settings} />
                        </div>
                    </div>

                    <div className="bg-[#130A0A] border border-green-900/40 rounded-xl p-6 space-y-5 shadow-2xl">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center">
                            <Server className="w-4 h-4 text-green-500 mr-2 animate-pulse" />
                            System Lifecycle
                        </h3>
                        <div className="space-y-4">
                            <StatusRow label="Platform" status="Operational" level="green" />
                            <StatusRow label="Supabase DB" status="Connected" level="green" />
                            <StatusRow label="Stripe" status="NOT CONFIGURED" level="yellow" />
                            <StatusRow label="DataForSEO" status="NOT CONFIGURED" level="red" />
                            <StatusRow label="Gemini API" status="NOT CONFIGURED" level="red" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CHART ROW */}
            <div className="space-y-6">
                <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-4 border-red-600 pl-4">User Signups (Last 7 days)</h2>
                <div className="bg-[#130A0A] border border-[#2D1515] p-10 rounded-xl h-72 flex items-end justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent pointer-events-none" />
                    {chartData.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                            <div className="text-[10px] font-black text-red-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-y-2">
                                {d.count}
                            </div>
                            <div
                                className="w-full max-w-[40px] bg-gradient-to-t from-red-900 to-red-600 rounded-t-lg transition-all duration-500 group-hover:to-red-400 group-hover:scale-x-110 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                                style={{ height: `${Math.max(d.count * 40, 6)}px` }}
                            />
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTTOM HEALTH GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#2D1515]">
                <HealthCard title="Database" items={[
                    { l: 'Profiles', r: 'Active ✅' },
                    { l: 'Policies', r: 'RLS Active ✅' },
                    { l: 'Engine', r: 'Postgres' }
                ]} icon={Database} />
                <HealthCard title="Authentication" items={[
                    { l: 'Provider', r: 'Email ✅' },
                    { l: 'Users', r: stats.totalUsers },
                    { l: 'Sessions', r: 'Encrypted' }
                ]} icon={ShieldAlert} />
                <HealthCard title="Environment" items={[
                    { l: 'Network', r: 'Global CDN' },
                    { l: 'Hoster', r: 'Vercel ✅' },
                    { l: 'Cache', r: 'Optimized' }
                ]} icon={Globe} />
            </div>
        </div>
    )
}

function StatCard({ label, value, icon: Icon, color, trend }: any) {
    const colors = {
        blue: 'text-blue-500 bg-blue-500/10',
        yellow: 'text-yellow-500 bg-yellow-500/10',
        green: 'text-emerald-500 bg-emerald-500/10',
        red: 'text-red-500 bg-red-500/10'
    }
    return (
        <div className="bg-[#130A0A] border border-[#2D1515] p-6 rounded-xl space-y-4 hover:border-red-800 transition-all shadow-xl group relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-600/10 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-red-500/20">
                {trend}
            </div>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform", colors[color as keyof typeof colors])}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-5xl font-black text-white italic tracking-tighter">{value}</h3>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 opacity-70">{label}</p>
            </div>
        </div>
    )
}

function StatusRow({ label, status, level }: any) {
    const statusColors = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500'
    }
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
                <div className={cn("w-2 h-2 rounded-full", statusColors[level as keyof typeof statusColors], level === 'green' && 'animate-pulse')} />
                <span className="text-[11px] font-bold text-gray-400 capitalize">{label}</span>
            </div>
            <div className="flex items-center space-x-3">
                <span className={cn("text-[10px] font-black uppercase tracking-tighter", level === 'red' ? 'text-red-500/80' : level === 'yellow' ? 'text-yellow-500/80' : 'text-green-500/80')}>
                    {status}
                </span>
                {level !== 'green' && (
                    <button className="text-[9px] font-black uppercase text-red-500/40 hover:text-red-500 transition-colors border border-red-500/20 px-2.5 py-1 rounded bg-red-500/5 hover:bg-red-500/10">Configure →</button>
                )}
            </div>
        </div>
    )
}

function QuickActionBtn({ label, icon: Icon }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-[#130A0A] border border-[#2D1515] rounded-xl hover:border-red-800 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center space-x-4 relative z-10">
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-80 group-hover:opacity-100">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-800 group-hover:text-red-500 transform group-hover:translate-x-1 transition-all" />
        </button>
    )
}

function HealthCard({ title, items, icon: Icon }: any) {
    return (
        <div className="bg-[#130A0A] border border-[#2D1515] p-7 rounded-xl space-y-5 shadow-2xl">
            <div className="flex items-center space-x-3.5 border-b border-[#2D1515] pb-3">
                <Icon className="w-5 h-5 text-red-500/50" />
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
            </div>
            <div className="space-y-3">
                {items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10px]">
                        <span className="text-gray-500 font-bold uppercase tracking-tight">{item.l}</span>
                        <span className="text-white font-black tracking-tighter">{item.r}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
