'use client'

import React, { useState, useEffect } from 'react'
import {
    Users,
    Shield,
    BarChart3,
    CreditCard,
    LayoutDashboard,
    Activity,
    DollarSign,
    TrendingUp
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const StatCard = ({ icon, name, count, sub, color, children, badge }: any) => (
    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-purple-500 transition-all duration-300 stat-card-glow admin-card h-full min-h-[140px]"
        style={{ borderBottom: `3px solid ${color}` }}>

        {/* Top row: icon left, name right */}
        <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: color + '22' }}>
                {icon}
            </div>
            <div className="flex flex-col items-end">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest font-black">
                    {name}
                </span>
                {badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 font-bold border border-green-500/20 mt-1 whitespace-nowrap">
                        {badge}
                    </span>
                )}
            </div>
        </div>

        {/* Content area */}
        <div className="mt-4">
            {children ? children : (
                <div className="text-4xl font-black text-white mb-0.5 tracking-tighter">
                    {count}
                </div>
            )}
            <div className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                {sub || 'ACTIVE USERS'}
            </div>
        </div>
    </div>
)

export default function AdminPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                setUsers(data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const freeCount = users.filter(u => u.plan === 'free').length
    const starterCount = users.filter(u => u.plan === 'starter').length
    const proCount = users.filter(u => u.plan === 'pro').length
    const agencyCount = users.filter(u => u.plan === 'agency').length
    const enterpriseCount = users.filter(u => u.plan === 'enterprise').length

    const paidCount = users.filter(u => u.plan !== 'free' && u.role !== 'admin').length

    const revenue = users
        .filter(u => u.role !== 'admin')
        .reduce((sum, u) => {
            const planPrices: Record<string, number> = {
                starter: 19,
                pro: 49,
                agency: 99,
                enterprise: 199
            }
            return sum + (planPrices[u.plan] || 0)
        }, 0)

    const newThisWeek = users.filter(u => {
        const d = new Date(u.created_at)
        const week = new Date()
        week.setDate(week.getDate() - 7)
        return d > week
    }).length

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest animate-pulse">Synchronizing Data...</span>
        </div>
    )

    return (
        <div className="space-y-8 animate-fadeIn pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                    Admin Dashboard <span className="text-purple-400">Overview</span>
                </h1>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                    REAL-TIME PLATFORM METRICS AND USER ACTIVITY
                </p>
            </div>

            {/* ROW 1: Plan Stats (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard icon="🆓" name="FREE" count={freeCount} color="#6B7280" />
                <StatCard icon="⚡" name="STARTER" count={starterCount} color="#8B5CF6" />
                <StatCard icon="🚀" name="PRO" count={proCount} color="#3B82F6" />
                <StatCard icon="🏢" name="AGENCY" count={agencyCount} color="#F59E0B" />
                <StatCard icon="👑" name="ENTERPRISE" count={enterpriseCount} color="#EF4444" />
            </div>

            {/* ROW 2: Performance Metrics (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard
                    icon="👥"
                    name="TOTAL USERS"
                    count={users.length}
                    sub="PLATFORM USERS"
                    color="#6D28D9"
                />
                <StatCard
                    icon="💎"
                    name="PAID USERS"
                    count={paidCount}
                    sub="EXCL. ADMINS"
                    color="#7C3AED"
                    badge="Excl. Admins"
                />
                <StatCard
                    icon="📈"
                    name="NEW THIS WEEK"
                    count={newThisWeek}
                    sub="IN LAST 7 DAYS"
                    color="#059669"
                    badge="+18.5%"
                />
                <StatCard
                    icon="💰"
                    name="MONTHLY REVENUE"
                    count={"$" + revenue.toLocaleString()}
                    sub={"Rs. " + (revenue * 278).toLocaleString()}
                    color="#D97706"
                />
                <StatCard
                    icon="📊"
                    name="PLANS BREAKDOWN"
                    color="#4F46E5"
                    sub="Tier Distribution"
                >
                    <div className="space-y-2 py-1">
                        {[
                            { n: 'STARTER', c: starterCount, clr: '#8B5CF6' },
                            { n: 'PRO', c: proCount, clr: '#3B82F6' },
                            { n: 'AGENCY', c: agencyCount, clr: '#F59E0B' },
                            { n: 'ENTERPRISE', c: enterpriseCount, clr: '#EF4444' },
                        ].map(p => (
                            <div className="flex items-center gap-2" key={p.n}>
                                <span className="text-gray-500 text-[8px] font-bold w-14">{p.n}</span>
                                <div className="flex-1 bg-white/5 rounded-full h-1">
                                    <div className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: users.length > 0 ? (p.c / users.length * 100) + '%' : '2px',
                                            background: p.clr,
                                            minWidth: '2px'
                                        }} />
                                </div>
                                <span className="text-white text-[9px] font-bold">{p.c}</span>
                            </div>
                        ))}
                    </div>
                </StatCard>
            </div>
        </div>
    )
}
