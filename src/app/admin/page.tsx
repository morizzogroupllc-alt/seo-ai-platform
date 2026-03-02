'use client'

import React from 'react'
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
import { cn } from '@/lib/utils'

const StatCard = ({ icon: Icon, label, value, sub, color, children, badge, iconBg }: any) => (
    <div className="min-h-[130px] p-5 rounded-2xl bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500 transition-all duration-300 stat-card-glow admin-card flex flex-col justify-between relative overflow-hidden group">
        <div className="flex justify-between items-start">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", iconBg)}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="text-right">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
                {badge && (
                    <div className="mt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-900/40 text-green-400 font-bold border border-green-500/20 whitespace-nowrap">
                            {badge}
                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className="mt-3">
            {children ? children : (
                <div className="text-2xl font-black text-white tracking-tight">{value}</div>
            )}
            {sub && <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">{sub}</div>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: color }} />
    </div>
)

export default function AdminPage() {
    const stats = {
        totalUsers: 1248,
        paidUsers: 842,
        newThisWeek: 42,
        revenue: 199,
        breakdown: [
            { name: 'Starter', count: 450, color: '#3B82F6' },
            { name: 'Pro', count: 320, color: '#8B5CF6' },
            { name: 'Agency', count: 180, color: '#EC4899' },
            { name: 'Enterprise', count: 98, color: '#F59E0B' }
        ]
    }

    return (
        <div className="space-y-6 animate-fadeIn p-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-white tracking-tight uppercase">Admin Overview</h1>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Status: Operational</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-950/20 border border-green-900/30 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-[9px] font-black tracking-widest uppercase">Live Server</span>
                </div>
            </div>

            {/* ROW 1: Plan Stats (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.breakdown.map((plan, i) => (
                    <StatCard
                        key={i}
                        icon={CreditCard}
                        label={`${plan.name} Plan`}
                        value={plan.count}
                        sub="Active Subscribers"
                        color={plan.color}
                        iconBg="bg-indigo-900/20"
                    />
                ))}

                <StatCard
                    key="system-health"
                    icon={Activity}
                    label="System Health"
                    value="99.9%"
                    sub="API STATUS: OK"
                    color="#10B981"
                    iconBg="bg-green-900/20"
                    badge="Optimal"
                />
            </div>

            {/* ROW 2: Performance Metrics (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Card 6: Total Users */}
                <StatCard
                    icon={Users}
                    label="TOTAL USERS"
                    value={stats.totalUsers.toLocaleString()}
                    sub="platform users"
                    color="#6D28D9"
                    iconBg="bg-blue-900/30"
                />

                {/* Card 7: Paid Users */}
                <StatCard
                    icon={Shield}
                    label="PAID USERS"
                    value={stats.paidUsers.toLocaleString()}
                    sub="excl. admins"
                    badge="Excl. Admins"
                    color="#7C3AED"
                    iconBg="bg-purple-900/30"
                />

                {/* Card 8: New This Week */}
                <StatCard
                    icon={TrendingUp}
                    label="NEW THIS WEEK"
                    value={stats.newThisWeek}
                    sub="Last 7 Days"
                    badge="+18.5%"
                    color="#059669"
                    iconBg="bg-green-950/40"
                />

                {/* Card 9: Monthly Revenue */}
                <StatCard
                    icon={DollarSign}
                    label="MONTHLY REVENUE"
                    value={`$${stats.revenue}`}
                    sub={`Rs. ${(stats.revenue * 278).toLocaleString()}`}
                    color="#D97706"
                    iconBg="bg-yellow-900/30"
                />

                {/* Card 10: Plans Breakdown */}
                <StatCard
                    icon={LayoutDashboard}
                    label="PLANS BREAKDOWN"
                    color="#4F46E5"
                    iconBg="bg-indigo-900/30"
                >
                    <div className="space-y-1.5 py-0.5">
                        {stats.breakdown.map((plan) => (
                            <div key={plan.name} className="flex flex-col gap-0.5">
                                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-tighter">
                                    <span className="text-gray-400">{plan.name}</span>
                                    <span className="text-white">{plan.count}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${(plan.count / stats.totalUsers) * 100}%`,
                                            backgroundColor: plan.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </StatCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="lg:col-span-1 bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6">
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Recent System Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase tracking-tighter">Page Generated #{1200 + i}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase">Success • 1.2s</p>
                                    </div>
                                </div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-center">
                        <BarChart3 className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Growth Charts Data Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
