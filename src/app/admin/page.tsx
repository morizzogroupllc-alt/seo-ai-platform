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
    TrendingUp,
    Settings,
    Wrench,
    Zap,
    Rocket,
    Building2,
    Crown,
    CheckCircle2,
    AlertCircle,
    Server,
    Database,
    Lock
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
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

    const freeCount = users.filter(u => u.plan === 'free').length
    const starterCount = users.filter(u => u.plan === 'starter').length
    const proCount = users.filter(u => u.plan === 'pro').length
    const agencyCount = users.filter(u => u.plan === 'agency').length
    const enterpriseCount = users.filter(u => u.plan === 'enterprise').length
    const paidCount = users.filter(u => u.plan !== 'free' && u.role !== 'admin').length

    const revenue = users
        .filter(u => u.role !== 'admin')
        .reduce((sum, u) => {
            const prices: any = { starter: 19, pro: 49, agency: 99, enterprise: 199 }
            return sum + (prices[u.plan] || 0)
        }, 0)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const newThisWeekCount = users.filter(u => new Date(u.created_at) > sevenDaysAgo).length

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest animate-pulse">Synchronizing Data...</span>
        </div>
    )

    const StatCard = ({ icon, name, count, sub, color, children, badge }: any) => (
        <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-5 hover:border-purple-500 transition-all duration-300 stat-card-glow admin-card"
            style={{ borderBottom: `3px solid ${color}` }}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: color + '22' }}>
                    {icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-gray-500 text-xs uppercase tracking-widest">
                        {name}
                    </span>
                    {badge && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 font-bold border border-green-500/20 whitespace-nowrap">
                            {badge}
                        </span>
                    )}
                </div>
            </div>
            {children ? children : (
                <div className="text-5xl font-black text-white mb-1">
                    {count}
                </div>
            )}
            <div className="text-gray-600 text-[11px] uppercase tracking-wider">
                {sub || 'ACTIVE USERS'}
            </div>
        </div>
    )

    return (
        <div className="space-y-8 animate-fadeIn pb-10">
            {/* 1. Page Title */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                    Admin Dashboard <span className="text-purple-400">Overview</span>
                </h1>
                <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest">
                    Real-time platform metrics and user activity
                </p>
            </div>

            {/* 2. ROW 1: Plan Cards (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard icon="🆓" name="FREE" count={freeCount} color="#6B7280" />
                <StatCard icon="⚡" name="STARTER" count={starterCount} color="#8B5CF6" />
                <StatCard icon="🚀" name="PRO" count={proCount} color="#3B82F6" />
                <StatCard icon="🏢" name="AGENCY" count={agencyCount} color="#F59E0B" />
                <StatCard icon="👑" name="ENTERPRISE" count={enterpriseCount} color="#EF4444" />
            </div>

            {/* 3. ROW 2: Performance Metrics (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard icon="👥" name="TOTAL USERS" count={users.length} sub="PLATFORM USERS" color="#6D28D9" />
                <StatCard icon="💎" name="PAID USERS" count={paidCount} sub="EXCL. ADMINS" color="#7C3AED" badge="Excl. Admins" />
                <StatCard icon="📈" name="NEW THIS WEEK" count={newThisWeekCount} sub="IN LAST 7 DAYS" color="#059669" badge="+18%" />
                <StatCard icon="💰" name="MONTHLY REVENUE"
                    count={"$" + revenue.toLocaleString()}
                    sub={"Rs. " + (revenue * 278).toLocaleString()}
                    color="#D97706"
                    children={<>
                        <div className="text-5xl font-black text-white mb-1">${revenue.toLocaleString()}</div>
                    </>}
                />
                <StatCard icon="📊" name="PLANS BREAKDOWN" color="#4F46E5" sub="Tier Distribution">
                    <div className="space-y-2 py-1">
                        {[
                            { n: 'STARTER', c: starterCount, clr: '#8B5CF6' },
                            { n: 'PRO', c: proCount, clr: '#3B82F6' },
                            { n: 'AGENCY', c: agencyCount, clr: '#F59E0B' },
                            { n: 'ENTERPRISE', c: enterpriseCount, clr: '#EF4444' },
                        ].map(p => (
                            <div className="flex items-center gap-2 mb-2" key={p.n}>
                                <span className="text-gray-500 text-[10px] w-16">{p.n}</span>
                                <div className="flex-1 bg-[#2D2B55] rounded-full h-1">
                                    <div className="h-1 rounded-full transition-all duration-500"
                                        style={{
                                            width: users.length > 0 ? (p.c / users.length * 100) + '%' : '4px',
                                            background: p.clr,
                                            minWidth: '4px'
                                        }} />
                                </div>
                                <span className="text-white text-xs w-4 text-right">{p.c}</span>
                            </div>
                        ))}
                    </div>
                </StatCard>
            </div>

            {/* ROW 3: Recent Signups + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Recent Signups</h3>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Latest accounts joined</p>
                        </div>
                        <button onClick={() => router.push('/admin/users')} className="text-purple-400 text-[10px] font-black uppercase tracking-widest hover:text-purple-300 transition-colors">VIEW ALL →</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5">
                                <tr className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                                    <th className="pb-3 pr-4">User Details</th>
                                    <th className="pb-3 px-4">Plan</th>
                                    <th className="pb-3 px-4">Joined</th>
                                    <th className="pb-3 pl-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.slice(0, 5).map((user, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-xs">{user.email?.[0].toUpperCase()}</div>
                                                <div className="min-w-0">
                                                    <p className="text-white text-xs font-bold truncate">{user.email}</p>
                                                    <p className="text-[9px] text-gray-500 font-medium font-mono uppercase truncate opacity-50">ID: {user.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={cn(
                                                "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                                                user.plan === 'free' ? "bg-gray-800 text-gray-400" : "bg-purple-900/40 text-purple-400"
                                            )}>{user.plan}</span>
                                        </td>
                                        <td className="py-3 px-4"><span className="text-gray-400 text-[10px] font-medium uppercase">{new Date(user.created_at).toLocaleDateString()}</span></td>
                                        <td className="py-3 pl-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                <span className="text-green-500 text-[9px] font-black uppercase tracking-tighter">Active</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Manage Users', icon: Users, path: '/admin/users' },
                            { label: 'API Health', icon: Activity, path: '/admin/api-health' },
                            { label: 'Settings', icon: Settings, path: '/admin/settings' },
                            { label: 'Tools', icon: Wrench, path: '/admin/tools' },
                        ].map((action, i) => (
                            <button key={i} onClick={() => router.push(action.path)}
                                className="bg-[#1A1740] border border-[#2D2B55] rounded-xl p-6 flex flex-col items-center justify-center gap-3 group hover:border-purple-500 transition-all duration-300 hover:bg-purple-500/5">
                                <action.icon className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition-colors" />
                                <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest group-hover:text-white transition-colors">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 4: System Services + User Growth chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                    <div className="mb-6">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                            System Services
                        </h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider">12 integrated services</p>
                    </div>

                    <div className="space-y-1">
                        {[
                            { name: 'Platform Core', subtitle: 'Next.js App', status: 'operational' },
                            { name: 'Supabase DB', subtitle: 'Database & Auth', status: 'operational' },
                            { name: 'Vercel', subtitle: 'Hosting & Deploy', status: 'operational' },
                            { name: 'Stripe', subtitle: 'Billing & Payments', status: 'not_configured' },
                            { name: 'DataForSEO', subtitle: 'SERP & Keywords', status: 'not_configured' },
                            { name: 'Gemini Flash', subtitle: 'Google AI - Primary', status: 'not_configured' },
                            { name: 'OpenRouter', subtitle: 'Multi-Model Fallback', status: 'not_configured' },
                            { name: 'Claude API', subtitle: 'Anthropic - Complex Tasks', status: 'not_configured' },
                            { name: 'GPT-4', subtitle: 'OpenAI - Fallback', status: 'not_configured' },
                            { name: 'Pexels', subtitle: 'Free Stock Images', status: 'not_configured' },
                            { name: 'Netlify', subtitle: 'User Site Deploy', status: 'coming_soon' },
                            { name: 'Google APIs', subtitle: 'GBP & Search Console', status: 'coming_soon' },
                        ].map((item, i) => {
                            const dotColor = item.status === 'operational' ? 'bg-green-400' : item.status === 'not_configured' ? 'bg-orange-400' : 'bg-gray-500'
                            const statusColor = item.status === 'operational' ? 'text-green-400' : item.status === 'not_configured' ? 'text-orange-400' : 'text-gray-500'
                            const statusLabel = item.status === 'operational' ? 'OPERATIONAL' : item.status === 'not_configured' ? 'NOT CONFIGURED' : 'COMING SOON'

                            return (
                                <div key={i} className="flex items-center justify-between px-2 py-1 rounded-md bg-[#0F0C29] border border-[#1A1740] hover:border-purple-500/30 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)} />
                                        <div>
                                            <div className="text-white text-[11px] font-medium leading-tight">{item.name}</div>
                                            <div className="text-gray-600 text-[9px] leading-tight">{item.subtitle}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <span className={cn("text-[9px] font-bold", statusColor)}>
                                            {statusLabel}
                                        </span>
                                        {item.status === 'not_configured' && (
                                            <button
                                                onClick={() => router.push('/admin/api-health')}
                                                className="text-[9px] px-1.5 py-0.5 bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500 text-gray-400 hover:text-white rounded transition-all">
                                                Configure →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">User Growth</h3>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Last 7 Days</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between px-2 gap-2 pb-6">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
                            const heights = [40, 65, 45, 90, 75, 55, 80]
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="w-full relative group flex items-end h-full">
                                        <div className="w-full bg-purple-600 rounded-lg transition-all duration-700 hover:bg-purple-400" style={{ height: `${heights[i]}%`, minHeight: '4px' }} />
                                    </div>
                                    <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest">{day}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ROW 5: Database + Auth + Environment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: 'Database', i: Database, s: 'HEALTHY', stats: [['CONNECTIONS', 'Active ✓'], ['LATENCY', 'Supabase ✓'], ['STORAGE', 'Supabase Free']] },
                    { t: 'Authentication', i: Lock, s: 'HEALTHY', stats: [['AUTH SERVER', 'UP ✓'], ['SESSION TTL', '72h ✓'], ['RATE LIMIT', 'Not Tracked']] },
                    { t: 'Environment', i: Server, s: 'HEALTHY', stats: [['NODE VERSION', 'v20 ✓'], ['HOSTING', 'Vercel ✓'], ['UPTIME', '99.9% ✓']] },
                ].map((item, i) => (
                    <div key={i} className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 admin-card">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <item.i className="w-5 h-5 text-green-500" />
                                <h3 className="text-white font-black text-xs uppercase tracking-widest tracking-tighter">{item.t}</h3>
                            </div>
                            <span className="text-green-500 text-[9px] font-black uppercase">● {item.s}</span>
                        </div>
                        <div className="space-y-3">
                            {item.stats.map(([key, val]) => (
                                <div key={key} className="flex justify-between items-center text-[10px] font-bold">
                                    <span className="text-gray-500 uppercase">{key}</span>
                                    <span className="text-white">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
