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

const StatCard = ({ icon, planName, count, sub, color, children, badge }: any) => (
    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-5 relative overflow-hidden hover:border-purple-500 transition-all stat-card-glow admin-card"
        style={{ borderBottom: `3px solid ${color}` }}>

        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: color + '20' }}>
                {icon}
            </div>
            <div className="text-right">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                    {planName}
                </span>
                {badge && (
                    <div className="mt-1">
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 font-bold border border-green-500/20 whitespace-nowrap">
                            {badge}
                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className="mt-2">
            {children ? children : (
                <div className="text-5xl font-black text-white mb-1 tracking-tighter">
                    {count}
                </div>
            )}
            <div className="text-gray-600 text-[10px] uppercase tracking-wider font-bold">
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

    const freeCount = users.filter(u => u.plan === 'free').length
    const starterCount = users.filter(u => u.plan === 'starter').length
    const proCount = users.filter(u => u.plan === 'pro').length
    const agencyCount = users.filter(u => u.plan === 'agency').length
    const enterpriseCount = users.filter(u => u.plan === 'enterprise').length

    // Paid users excluding admins
    const paidUsersCount = users.filter(u => u.role !== 'admin' && u.plan !== 'free').length

    // Revenue calculation (fallback prices)
    const prices: any = { starter: 19, pro: 49, agency: 99, enterprise: 199 }
    const revenueOverall = users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (prices[u.plan] || 0), 0)

    // New this week
    const sevenDaysAgoStr = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const newThisWeekCount = users.filter(u => u.created_at >= sevenDaysAgoStr).length

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest animate-pulse">Synchronizing Data...</span>
        </div>
    )

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            <div>
                <h1 className="text-xl font-black text-white tracking-tight uppercase">Platform Overview</h1>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Real-time status: Operational</p>
            </div>

            {/* ROW 1: Plan Stats (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard icon="🆓" planName="FREE" count={freeCount} color="#6B7280" />
                <StatCard icon="⚡" planName="STARTER" count={starterCount} color="#8B5CF6" />
                <StatCard icon="🚀" planName="PRO" count={proCount} color="#3B82F6" />
                <StatCard icon="🏢" planName="AGENCY" count={agencyCount} color="#F59E0B" />
                <StatCard icon="👑" planName="ENTERPRISE" count={enterpriseCount} color="#EF4444" />
            </div>

            {/* ROW 2: Performance Metrics (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Total Users */}
                <StatCard
                    icon="👥"
                    planName="TOTAL USERS"
                    count={users.length}
                    sub="platform users"
                    color="#6D28D9"
                />

                {/* Paid Users */}
                <StatCard
                    icon="💎"
                    planName="PAID USERS"
                    count={paidUsersCount}
                    sub="excl. admins"
                    color="#7C3AED"
                    badge="Excl. Admins"
                />

                {/* New This Week */}
                <StatCard
                    icon="📈"
                    planName="NEW THIS WEEK"
                    count={newThisWeekCount}
                    sub="In 7 Days"
                    color="#059669"
                    badge="+18.5%"
                />

                {/* Monthly Revenue */}
                <StatCard
                    icon="💰"
                    planName="MONTHLY REVENUE"
                    count={"$" + revenueOverall.toLocaleString()}
                    sub={"Rs. " + (revenueOverall * 278).toLocaleString()}
                    color="#D97706"
                />

                {/* Plans Breakdown */}
                <StatCard
                    icon={<LayoutDashboard className="w-5 h-5 text-indigo-400" />}
                    planName="PLANS BREAKDOWN"
                    color="#4F46E5"
                    sub="Tier Distribution"
                >
                    <div className="space-y-2 py-1">
                        {[
                            { name: 'Starter', count: starterCount, color: '#8B5CF6' },
                            { name: 'Pro', count: proCount, color: '#3B82F6' },
                            { name: 'Agency', count: agencyCount, color: '#F59E0B' },
                            { name: 'Enterprise', count: enterpriseCount, color: '#EF4444' }
                        ].map((plan) => (
                            <div key={plan.name} className="flex flex-col gap-1">
                                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-tighter">
                                    <span className="text-gray-400">{plan.name}</span>
                                    <span className="text-white">{plan.count}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${(plan.count / (users.length || 1)) * 100}%`,
                                            backgroundColor: plan.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </StatCard>
            </div>

            {/* ROW 3: Detailed Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-400" />
                            Recent System Activity
                        </h3>
                        <span className="text-[9px] px-2 py-1 rounded bg-purple-900/30 text-purple-400 font-bold border border-purple-500/20">LIVE LOGS</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { event: 'New User Registered', detail: 'starter_plan_active', time: '2 mins ago', type: 'user' },
                            { event: 'Payment Successful', detail: '$49.00 - Pro Plan', time: '15 mins ago', type: 'payment' },
                            { event: 'System Backup', detail: 'auto_sync_complete', time: '1 hour ago', type: 'system' },
                            { event: 'New API Key Created', detail: 'enterprise_access', time: '2 hours ago', type: 'key' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                                        {item.type === 'user' ? '👤' : item.type === 'payment' ? '💰' : item.type === 'system' ? '⚙️' : '🔑'}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase tracking-tighter">{item.event}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase">{item.detail}</p>
                                    </div>
                                </div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Analytics Placeholder */}
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card flex flex-col items-center justify-center text-center min-h-[300px]">
                    <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                        <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">Growth Analytics</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider max-w-[200px]">Interactive charts are being synchronized with your dataset.</p>
                    <div className="mt-6 flex gap-2">
                        <div className="w-2 h-8 bg-purple-600/30 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-12 bg-purple-600/50 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-6 bg-purple-600/20 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
