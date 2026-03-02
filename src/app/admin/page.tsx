'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Users,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Activity,
    UserPlus,
    ChevronRight,
    Search,
    CreditCard,
    Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeToday: 0,
        tempRevenue: 0,
        tempApiCalls: 0
    })
    const [recentUsers, setRecentUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            // Fetch total users
            const { count, error } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // Fetch recent 5 users
            const { data: recent } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            setStats({
                totalUsers: count || 0,
                activeToday: Math.floor((count || 0) * 0.1), // Mock 10% activity
                tempRevenue: 0,
                tempApiCalls: 0
            })
            setRecentUsers(recent || [])
            setLoading(false)
        }

        fetchDashboardData()
    }, [])

    return (
        <div className="space-y-10">
            {/* PAGE HEADER */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Overview Dashboard</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Real-time platform performance and user growth</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers.toString()}
                    icon={Users}
                    trend="+12%"
                    up={true}
                    color="text-blue-500"
                    bgColor="bg-blue-500/10"
                />
                <StatCard
                    title="Active Today"
                    value={stats.activeToday.toString()}
                    icon={Zap}
                    trend="+5%"
                    up={true}
                    color="text-yellow-500"
                    bgColor="bg-yellow-500/10"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={`$${stats.tempRevenue}`}
                    icon={DollarSign}
                    trend="0%"
                    up={true}
                    color="text-emerald-500"
                    bgColor="bg-emerald-500/10"
                />
                <StatCard
                    title="API Calls"
                    value={stats.tempApiCalls.toString()}
                    icon={Activity}
                    trend="-2%"
                    up={false}
                    color="text-red-500"
                    bgColor="bg-red-500/10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RECENT SIGNUPS TABLE */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-black text-white italic uppercase tracking-widest">Recent Signups</h2>
                        <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">View All Users</button>
                    </div>

                    <div className="bg-[#1A1740]/50 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Plan</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    [1, 2, 3, 4, 5].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-16 px-6" /></tr>)
                                ) : recentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-red-600/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">{user.email}</span>
                                                <span className="text-[10px] text-slate-500 font-medium">ID: {user.id.slice(0, 8)}...</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                user.plan === 'pro' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-500'
                                            )}>
                                                {user.plan || 'free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                {user.user_type || 'unselected'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="space-y-6">
                    <h2 className="text-sm font-black text-white italic uppercase tracking-widest">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <QuickAction icon={UserPlus} label="Manage Users" href="/admin/users" />
                        <QuickAction icon={Activity} label="API Health" href="/admin/api-health" />
                        <QuickAction icon={CreditCard} label="Payment Logs" href="/admin/payments" />
                        <QuickAction icon={Settings} label="Platform Settings" href="/admin/settings" />
                    </div>

                    <div className="bg-gradient-to-br from-red-600/10 to-red-900/10 border border-red-500/20 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <Zap className="w-5 h-5 text-red-500" />
                            <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">System Status</h3>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
                            All platform services are operational. Cache level is optimal.
                        </p>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Live Monitoring Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, trend, up, color, bgColor }: any) {
    return (
        <div className="bg-[#1A1740]/50 border border-white/5 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
                <div className={cn("p-3 rounded-2xl", bgColor)}>
                    <Icon className={cn("w-5 h-5", color)} />
                </div>
                <div className={cn("flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest", up ? "text-emerald-500" : "text-red-500")}>
                    {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{trend}</span>
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{value}</h3>
            </div>
        </div>
    )
}

function QuickAction({ icon: Icon, label, href }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-red-600/5 hover:border-red-500/20 transition-all group">
            <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-red-500 transition-colors" />
        </button>
    )
}
