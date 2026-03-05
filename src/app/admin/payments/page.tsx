'use client'

import React, { useState, useEffect } from 'react'
import {
    Users,
    CreditCard,
    DollarSign,
    TrendingUp,
    Zap,
    Rocket,
    Building2,
    Crown,
    CheckCircle2,
    Loader2,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    ExternalLink,
    HelpCircle,
    Plus
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { cn } from '../../../lib/utils'
import { useRouter } from 'next/navigation'

export default function AdminPaymentsPage() {
    const router = useRouter()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await supabase.from('profiles').select('*')
                setUsers(data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    // Data Derivation
    const freeCount = users.filter(u => u.plan === 'free').length
    const starterCount = users.filter(u => u.plan === 'starter' && u.role !== 'admin').length
    const proCount = users.filter(u => u.plan === 'pro' && u.role !== 'admin').length
    const agencyCount = users.filter(u => u.plan === 'agency' && u.role !== 'admin').length
    const enterpriseCount = users.filter(u => u.plan === 'enterprise' && u.role !== 'admin').length

    const paidUsers = users.filter(u => u.plan !== 'free' && u.role !== 'admin')
    const paidUsersCount = paidUsers.length

    const revenue = paidUsers.reduce((sum, u) => {
        const prices: any = { starter: 19, pro: 49, agency: 99, enterprise: 199 }
        return sum + (prices[u.plan] || 0)
    }, 0)

    // Time boundaries
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // This month paid users
    const thisMonthPaid = paidUsers.filter(u =>
        new Date(u.created_at) >= thisMonthStart
    ).length

    // Last month paid users  
    const lastMonthPaid = paidUsers.filter(u => {
        const d = new Date(u.created_at)
        return d >= lastMonthStart &&
            d <= lastMonthEnd
    }).length

    const avgPrice = paidUsersCount > 0 ? revenue / paidUsersCount : 0

    // Helper functions
    const calcGrowth = (current: number, previous: number) => {
        if (previous === 0 && current === 0)
            return { pct: 0, label: '0% vs last month', color: 'text-gray-500' }
        if (previous === 0 && current > 0)
            return { pct: 100, label: '+100% vs last month', color: 'text-green-400' }
        const pct = Math.round(((current - previous) / previous) * 100)
        return {
            pct,
            label: (pct >= 0 ? '+' : '') + pct + '% vs last month',
            color: pct > 0 ? 'text-green-400' : pct < 0 ? 'text-red-400' : 'text-gray-500'
        }
    }

    const getPlanGrowth = (planName: string) => {
        const thisMon = users.filter(u =>
            u.plan === planName &&
            u.role !== 'admin' &&
            new Date(u.created_at) >= thisMonthStart
        ).length

        const lastMon = users.filter(u =>
            u.plan === planName &&
            u.role !== 'admin' &&
            new Date(u.created_at) >= lastMonthStart &&
            new Date(u.created_at) <= lastMonthEnd
        ).length

        return calcGrowth(thisMon, lastMon)
    }

    const exportCSV = () => {
        const headers = ['Email', 'Plan', 'Amount', 'Joined', 'Status']
        const rows = paidUsers.map(u => [
            u.email,
            u.plan,
            '$' + (({ starter: 19, pro: 49, agency: 99, enterprise: 199 } as any)[u.plan] || 0),
            new Date(u.created_at).toLocaleDateString(),
            u.is_active ? 'Active' : 'Inactive'
        ])
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'payments_' + new Date().toISOString().split('T')[0] + '.csv'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const mrrGrowth = calcGrowth(thisMonthPaid * avgPrice, lastMonthPaid * avgPrice)
    const activeGrowth = calcGrowth(thisMonthPaid, lastMonthPaid)
    const freeGrowth = calcGrowth(
        users.filter(u => u.plan === 'free' && new Date(u.created_at) >= thisMonthStart).length,
        users.filter(u => u.plan === 'free' && new Date(u.created_at) >= lastMonthStart && new Date(u.created_at) <= lastMonthEnd).length
    )

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest animate-pulse">Calculating Revenue...</span>
        </div>
    )

    const StatCard = ({ icon, name, value, sub, color, growth }: any) => (
        <div className="admin-stat-card card-enter"
            style={{ borderBottom: `3px solid ${color}` }}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: color + '22' }}>
                    {icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        {name}
                    </span>
                </div>
            </div>
            <div className="text-4xl font-black text-white mb-1">
                {value}
            </div>
            {growth && (
                <div className={cn("text-[10px] font-bold mb-4", growth.color)}>
                    {growth.label}
                </div>
            )}
            <div className="flex items-center justify-between">
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    {sub || 'TOTAL REVENUE'}
                </div>
            </div>
        </div>
    )

    const PlanRevenueCard = ({ plan, icon, count, price, color, growth }: any) => (
        <div className="glass-card shimmer-border p-6 transition-all hover:border-purple-500/50"
            style={{ borderBottom: `3px solid ${color}` }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-white/5">
                    {icon}
                </div>
                <span className="text-white text-xs font-black uppercase tracking-widest">{plan} PLAN</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
                ${(count * price).toLocaleString()}
            </div>
            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                {count} users × ${price}
            </div>
            {growth && (
                <div className={cn("text-[10px] font-bold", growth.color)}>
                    {growth.label}
                </div>
            )}
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeIn pb-10">
            {/* SECTION 1: Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Payments & <span className="gradient-text">Revenue</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest">
                        Subscriptions, billing, and ARR tracking
                    </p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-95 uppercase tracking-widest"
                >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                </button>
            </div>

            {/* SECTION 2: 5 specialized stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard
                    icon="💰"
                    name="MRR"
                    value={"$" + revenue.toLocaleString()}
                    sub={"Rs. " + (revenue * 278).toLocaleString()}
                    color="#059669"
                    growth={mrrGrowth}
                />
                <StatCard
                    icon="⚡"
                    name="ACTIVE SUBS"
                    value={paidUsersCount}
                    sub="PAID ACCOUNTS"
                    color="#8B5CF6"
                    growth={activeGrowth}
                />
                <StatCard
                    icon="🆓"
                    name="FREE PLAN"
                    value={freeCount}
                    sub="BASIC USERS"
                    color="#6B7280"
                    growth={freeGrowth}
                />
                <StatCard
                    icon="📉"
                    name="CHURN RATE"
                    value="0%"
                    sub="LAST 30 DAYS"
                    color="#EF4444"
                    growth={{ label: 'No data yet', color: 'text-gray-500' }}
                />
                <StatCard
                    icon="📈"
                    name="ARR ESTIMATE"
                    value={"$" + (revenue * 12).toLocaleString()}
                    sub={"Rs. " + (revenue * 12 * 278).toLocaleString()}
                    color="#F59E0B"
                    growth={mrrGrowth}
                />
            </div>

            {/* SECTION 3: Revenue by Plan */}
            <div className="space-y-4">
                <h3 className="text-white font-black text-xs uppercase tracking-widest pl-1">Revenue by Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <PlanRevenueCard plan="Starter" icon="⚡" count={starterCount} price={19} color="#8B5CF6" growth={getPlanGrowth('starter')} />
                    <PlanRevenueCard plan="Pro" icon="🚀" count={proCount} price={49} color="#3B82F6" growth={getPlanGrowth('pro')} />
                    <PlanRevenueCard plan="Agency" icon="🏢" count={agencyCount} price={99} color="#F59E0B" growth={getPlanGrowth('agency')} />
                    <PlanRevenueCard plan="Enterprise" icon="👑" count={enterpriseCount} price={199} color="#EF4444" growth={getPlanGrowth('enterprise')} />
                </div>
            </div>

            {/* SECTION 4: Subscriptions Table */}
            <div className="glass-card shimmer-border p-6">
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Active Subscriptions</h3>

                {paidUsersCount > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="data-table w-full text-left">
                            <thead className="border-b border-[rgba(255,255,255,0.06)]">
                                <tr className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                                    <th className="pb-3 pr-4">User</th>
                                    <th className="pb-3 px-4">Plan</th>
                                    <th className="pb-3 px-4">Amount</th>
                                    <th className="pb-3 px-4">Since</th>
                                    <th className="pb-3 px-4">Status</th>
                                    <th className="pb-3 pl-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {paidUsers.map((user, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 pr-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                                                    {user.email?.[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-white text-xs font-bold truncate">{user.email}</p>
                                                    <p className="text-[9px] text-gray-500 font-medium uppercase truncate opacity-50">ID: {user.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={cn(
                                                "text-[9px] px-2.5 py-1 rounded-full font-bold uppercase border",
                                                user.plan === 'starter' && "bg-purple-900/20 text-purple-400 border-purple-500/20",
                                                user.plan === 'pro' && "bg-blue-900/20 text-blue-400 border-blue-500/20",
                                                user.plan === 'agency' && "bg-orange-900/20 text-orange-400 border-orange-500/20",
                                                user.plan === 'enterprise' && "bg-red-900/20 text-red-400 border-red-500/20"
                                            )}>{user.plan}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-white text-xs font-black">
                                                ${({ starter: 19, pro: 49, agency: 99, enterprise: 199 } as Record<string, number>)[user.plan] || 0}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-mono text-gray-400 text-[10px] uppercase">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                <span className="text-green-500 text-[9px] font-black uppercase tracking-widest">Active</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pl-4 text-right">
                                            <button className="text-[10px] px-3 py-1 rounded-lg bg-white/5 text-gray-400 font-bold uppercase hover:bg-red-500/10 hover:text-red-400 transition-all border border-[rgba(255,255,255,0.06)]">
                                                Downgrade
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <CreditCard className="w-8 h-8 text-gray-600" />
                        </div>
                        <h4 className="text-white font-black text-lg uppercase tracking-widest mb-2">No paid subscriptions yet</h4>
                        <p className="text-gray-500 text-xs max-w-xs mb-8 uppercase tracking-widest leading-relaxed">
                            Revenue will appear here once users upgrade their plans
                        </p>
                        <button
                            onClick={() => router.push('/admin/users')}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-95 uppercase tracking-widest"
                        >
                            Manage Users →
                        </button>
                    </div>
                )}
            </div>

            {/* SECTION 5: Stripe Integration Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-indigo-900/20 border border-purple-500/30 rounded-3xl p-8 glass-card shimmer-border">
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
                        <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 animate-pulse">
                            <CreditCard className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-white text-xl font-black uppercase tracking-tight mb-2">Connect Stripe for Real Payments</h3>
                            <p className="text-gray-400 text-xs font-medium max-w-lg uppercase tracking-widest leading-relaxed">
                                Currently showing manual plan data. Connect Stripe to process real payments, manage recurring subscriptions, and track churn automatically.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white text-indigo-950 text-[11px] font-black rounded-xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest">
                            Setup Stripe →
                        </a>
                        <a
                            href="https://stripe.com/docs/billing/subscriptions/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#333333] hover:border-purple-500 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                        >
                            View Docs ↗
                        </a>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] -ml-32 -mb-32" />
            </div>
        </div>
    )
}
