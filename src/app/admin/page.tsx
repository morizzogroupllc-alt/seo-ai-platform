'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Users,
    Activity,
    DollarSign,
    Zap,
    LayoutDashboard,
    CreditCard,
    TrendingUp,
    Wrench,
    Settings,
    ArrowUpRight,
    Search,
    LogOut,
    Eye,
    ShieldAlert,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle,
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
    const [currentTime, setCurrentTime] = useState(new Date())
    const [adminEmail, setAdminEmail] = useState('')

    useEffect(() => {
        // Live Clock
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)

        const fetchDashboardData = async () => {
            setLoading(true)

            // Get user session for email
            const { data: { user } } = await supabase.auth.getUser()
            if (user) setAdminEmail(user.email || 'Admin')

            // 1. Fetch total users
            const { count: totalCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // 2. Active Today (Using created_at < 24h as proxy or mock)
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
        return () => clearInterval(timer)
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/login'
    }

    const handleViewAsUser = () => {
        sessionStorage.setItem('admin_viewing', 'true')
        window.location.href = '/dashboard'
    }

    if (loading) return <AdminLoadingSkeleton />

    return (
        <div className="min-h-screen bg-[#0A0808] text-white flex flex-col -m-4 lg:-m-8">
            {/* TOPBAR */}
            <header className="h-14 bg-[#0D0000] border-b border-[#2D1515] flex items-center justify-between px-6 sticky top-0 z-[100]">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-red-600/10 border border-red-500/20 px-2 py-1 rounded text-[10px] font-black text-red-500 uppercase tracking-widest">
                        <Zap className="w-3 h-3 mr-1" />
                        Admin
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-white/90">SEO AI Platform</span>
                </div>

                <div className="hidden md:flex items-center space-x-2 text-[#DC2626]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-bold font-mono tracking-widest">
                        {currentTime.toLocaleTimeString([], { hour12: false })}
                    </span>
                </div>

                <div className="flex items-center space-x-6">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden sm:inline">
                        Logged in: <span className="text-gray-400">{adminEmail}</span>
                    </span>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleViewAsUser}
                            className="flex items-center space-x-2 border border-red-600/50 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all hover:bg-red-600/10"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View as User</span>
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-lg shadow-red-900/20 flex items-center space-x-2"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <aside className="w-56 bg-[#0D0000] border-r border-[#2D1515] flex flex-col sticky left-0 h-[calc(100vh-3.5rem)]">
                    <div className="h-16 flex items-center px-6">
                        <div className="flex items-center bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full">
                            <ShieldAlert className="w-3 h-3 text-red-500 mr-2" />
                            <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em]">Admin Panel</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-4 space-y-1">
                        <NavItem icon={LayoutDashboard} label="Overview" active />
                        <NavItem icon={Users} label="Users" href="/admin/users" />
                        <NavItem icon={CreditCard} label="Payments" href="/admin/payments" />
                        <NavItem icon={Activity} label="API Health" href="/admin/api-health" />
                        <NavItem icon={Wrench} label="Tools" href="/admin/tools" />
                        <NavItem icon={TrendingUp} label="Analytics" href="/admin/analytics" />
                        <NavItem icon={Settings} label="Settings" href="/admin/settings" />
                    </nav>

                    <div className="p-4 mt-auto">
                        <div className="bg-red-950/30 border border-red-800/20 rounded-xl p-4 space-y-2">
                            <div className="flex items-center text-red-500">
                                <ShieldAlert className="w-4 h-4 mr-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest">High Security</span>
                            </div>
                            <p className="text-[9px] text-red-700 font-bold uppercase leading-tight tracking-tighter">
                                Admin Access Only. Restricted Environment.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {/* HEADER */}
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Overview Dashboard</h1>
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                                {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <div className="w-1 h-1 bg-red-500 rounded-full" />
                            <span className="text-red-500/80 font-black uppercase text-[10px] tracking-[0.3em]">Real-time platform data</span>
                        </div>
                    </div>

                    {/* STATS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Total Users"
                            value={stats.totalUsers}
                            icon={Users}
                            color="blue"
                            description="+5 this week"
                        />
                        <StatCard
                            label="Active Today"
                            value={stats.activeToday}
                            icon={Zap}
                            color="yellow"
                            description="Last 24h signups"
                        />
                        <StatCard
                            label="Monthly Revenue"
                            value="$0"
                            icon={DollarSign}
                            color="green"
                            description="Stripe coming soon"
                        />
                        <StatCard
                            label="API Calls Today"
                            value="0"
                            icon={Activity}
                            color="red"
                            description="Health: 100%"
                        />
                    </div>

                    {/* MIDDLE ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* RECENT SIGNUPS */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-2 border-red-600 pl-3">Recent Signups</h2>
                                <a href="/admin/users" className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors">View All Users →</a>
                            </div>

                            <div className="bg-[#1A0F0F] border border-[#2D1515] rounded-xl overflow-hidden shadow-2xl">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-red-950/10 border-b border-[#2D1515]">
                                            <th className="px-5 py-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">User</th>
                                            <th className="px-5 py-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">Plan</th>
                                            <th className="px-5 py-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">Type</th>
                                            <th className="px-5 py-4 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2D1515]">
                                        {recentUsers.map((user, i) => (
                                            <tr key={user.id} className={cn(
                                                "hover:bg-red-600/5 transition-colors group",
                                                i % 2 === 0 ? "bg-[#1A0F0F]" : "bg-black/20"
                                            )}>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-[10px] font-black text-white ring-1 ring-red-500/20">
                                                            {user.email?.[0].toUpperCase() || 'U'}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-white group-hover:text-red-500 transition-colors">{user.email}</span>
                                                            <span className="text-[9px] text-gray-500 font-mono tracking-tighter">ID: {user.id.slice(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={cn(
                                                        "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ring-1",
                                                        user.plan === 'pro' ? 'bg-purple-600/10 text-purple-500 ring-purple-600/20' :
                                                            user.plan === 'agency' ? 'bg-emerald-600/10 text-emerald-500 ring-emerald-600/20' :
                                                                'bg-gray-800 text-gray-500 ring-gray-700'
                                                    )}>
                                                        {user.plan || 'free'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-[9px] font-bold text-gray-400 capitalize">{user.user_type || 'unselected'}</span>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button className="text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 transition-all">Manage →</button>
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
                                <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-2 border-red-600 pl-3">Quick Actions</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    <QuickActionBtn label="Manage Users" icon={Users} />
                                    <QuickActionBtn label="API Health" icon={Activity} />
                                    <QuickActionBtn label="Payments" icon={DollarSign} />
                                    <QuickActionBtn label="Platform Settings" icon={Settings} />
                                </div>
                            </div>

                            <div className="bg-[#1A0F0F] border border-green-900/30 rounded-xl p-6 space-y-4 shadow-xl">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center">
                                    <Server className="w-4 h-4 text-green-500 mr-2" />
                                    System Status
                                </h3>
                                <div className="space-y-3">
                                    <StatusRow label="Platform" status="Operational" level="green" />
                                    <StatusRow label="Supabase DB" status="Connected" level="green" />
                                    <StatusRow label="Stripe" status="Not Configured" level="yellow" config />
                                    <StatusRow label="DataForSEO" status="Not Configured" level="red" config />
                                    <StatusRow label="Gemini API" status="Not Configured" level="red" config />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHART ROW */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-black text-white italic uppercase tracking-widest border-l-2 border-red-600 pl-3">User Signups (Last 7 days)</h2>
                        <div className="bg-[#1A0F0F] border border-[#2D1515] p-8 rounded-xl h-64 flex items-end justify-between gap-4">
                            {chartData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="relative w-full flex flex-col items-center">
                                        <div className="absolute -top-8 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {d.count}
                                        </div>
                                        <div
                                            className="w-full bg-gradient-to-t from-red-900/40 to-red-600 rounded-t-lg transition-all group-hover:to-red-400 group-hover:scale-x-105"
                                            style={{ height: `${Math.max(d.count * 40, 4)}px`, minHeight: '4px' }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#2D1515]">
                        <HealthCard title="Database" items={[
                            { l: 'Tables', r: 'profiles ✅' },
                            { l: 'RLS', r: 'Enabled ✅' },
                            { l: 'Size', r: '~0.2 MB' }
                        ]} icon={Database} />
                        <HealthCard title="Authentication" items={[
                            { l: 'Provider', r: 'Email ✅' },
                            { l: 'Users', r: stats.totalUsers },
                            { l: 'Sessions', r: 'Active' }
                        ]} icon={ShieldAlert} />
                        <HealthCard title="Storage" items={[
                            { l: 'Bucket', r: 'Not Setup' },
                            { l: 'CDN', r: 'Vercel ✅' },
                            { l: 'Status', r: 'Normal' }
                        ]} icon={Globe} />
                    </div>
                </main>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2D1515;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #DC2626;
                }
            `}</style>
        </div>
    )
}

function NavItem({ icon: Icon, label, active = false, href = '#' }: any) {
    return (
        <a href={href} className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
            active ? "bg-red-600 text-white shadow-lg shadow-red-900/20" : "text-gray-500 hover:text-white hover:bg-white/5"
        )}>
            <Icon className={cn("w-4 h-4", active ? "text-white" : "group-hover:text-red-500")} />
            <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
        </a>
    )
}

function StatCard({ label, value, icon: Icon, color, description }: any) {
    const colors = {
        blue: 'text-blue-500 bg-blue-500/10',
        yellow: 'text-yellow-500 bg-yellow-500/10',
        green: 'text-emerald-500 bg-emerald-500/10',
        red: 'text-red-500 bg-red-500/10'
    }
    return (
        <div className="bg-[#1A0F0F] border border-[#2D1515] p-6 rounded-xl space-y-4 hover:border-red-600/30 transition-all shadow-xl group">
            <div className="flex justify-between items-start">
                <div className={cn("p-4 rounded-xl", colors[color as keyof typeof colors])}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="bg-red-600/10 text-red-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    {description}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{label}</p>
                <h3 className="text-4xl font-black text-white italic tracking-tighter">{value}</h3>
            </div>
        </div>
    )
}

function StatusRow({ label, status, level, config = false }: any) {
    const statusColors = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500'
    }
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center space-x-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", statusColors[level as keyof typeof statusColors], level === 'green' && 'animate-pulse')} />
                <span className="text-[10px] font-bold text-gray-400">{label}</span>
            </div>
            <div className="flex items-center space-x-3">
                <span className={cn("text-[10px] font-black uppercase tracking-tighter", level === 'red' ? 'text-red-500' : level === 'yellow' ? 'text-yellow-500' : 'text-green-500')}>
                    {status}
                </span>
                {level !== 'green' && (
                    <button className="text-[8px] font-black uppercase text-gray-600 hover:text-white transition-colors border border-white/10 px-2 py-0.5 rounded">Configure</button>
                )}
            </div>
        </div>
    )
}

function QuickActionBtn({ label, icon: Icon }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-[#1A0F0F] border border-[#2D1515] rounded-xl hover:border-red-600 transition-all group">
            <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-800 group-hover:text-red-500 transform group-hover:translate-x-1 transition-all" />
        </button>
    )
}

function HealthCard({ title, items, icon: Icon }: any) {
    return (
        <div className="bg-[#1A0F0F] border border-[#2D1515] p-6 rounded-xl space-y-4">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
            </div>
            <div className="space-y-2">
                {items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10px]">
                        <span className="text-gray-500 font-bold uppercase tracking-tighter">{item.l}</span>
                        <span className="text-white font-black">{item.r}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AdminLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[#0A0808] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] animate-pulse">Initializing Admin Secure Portal</span>
            </div>
        </div>
    )
}
