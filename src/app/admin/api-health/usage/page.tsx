'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
    Activity,
    Zap,
    Key,
    DollarSign,
    Search,
    Download,
    ArrowLeft,
    Clock,
    CheckCircle2,
    X,
    Filter,
    ChevronDown,
    Loader2,
    LayoutGrid,
    Target,
    BarChart3,
    Edit3,
    Info
} from 'lucide-react'
import { supabase } from '../../../../lib/supabase'
import { cn } from '../../../../lib/utils'
import { useRouter } from 'next/navigation'

// --- Types ---

interface Profile {
    id: string
    email: string
    plan: string
    role: string
    created_at: string
    api_key_dataforseo?: string | null
    api_key_gemini?: string | null
}

interface ApiUsage {
    id: string
    user_id: string
    tool_name: string
    api_used: 'platform' | 'own'
    provider: string
    created_at: string
    status: 'success' | 'error'
}

interface UserUsage extends Profile {
    totalCalls: number
    platformCalls: number
    ownCalls: number
    lastUsed: string | null
}

export default function ApiUsageTrackerPage() {
    const router = useRouter()
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [usageData, setUsageData] = useState<ApiUsage[]>([])
    const [loading, setLoading] = useState(true)
    const [exporting, setExporting] = useState(false)

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [toolFilter, setToolFilter] = useState('All Tools')
    const [apiTypeFilter, setApiTypeFilter] = useState('All APIs')
    const [providerFilter, setProviderFilter] = useState('All Providers')
    const [timeFilter, setTimeFilter] = useState('This Month')

    // Modal
    const [selectedUser, setSelectedUser] = useState<UserUsage | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'summary' | 'history' | 'keys'>('summary')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [pRes, uRes] = await Promise.all([
                supabase.from('profiles').select('*'),
                supabase.from('api_usage').select('*').order('created_at', { ascending: false })
            ])

            if (pRes.error) throw pRes.error
            // If api_usage doesn't exist yet, handle gracefully
            const logs = uRes.data || []

            setProfiles(pRes.data || [])
            setUsageData(logs)
        } catch (err) {
            console.error('Error fetching data:', err)
        } finally {
            setLoading(false)
        }
    }

    const combinedData = useMemo(() => {
        return profiles.map(p => {
            const userLogs = usageData.filter(u => u.user_id === p.id)
            return {
                ...p,
                totalCalls: userLogs.length,
                platformCalls: userLogs.filter(u => u.api_used === 'platform').length,
                ownCalls: userLogs.filter(u => u.api_used === 'own').length,
                lastUsed: userLogs[0]?.created_at || null
            }
        }).sort((a, b) => b.totalCalls - a.totalCalls)
    }, [profiles, usageData])

    const filteredUsers = useMemo(() => {
        return combinedData.filter(user => {
            const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesApiType = apiTypeFilter === 'All APIs' ||
                (apiTypeFilter === 'Platform' && user.platformCalls > 0) ||
                (apiTypeFilter === 'Own Key' && user.ownCalls > 0)

            // Add other filter matching logic if needed based on grouped data
            return matchesSearch && matchesApiType
        })
    }, [combinedData, searchQuery, apiTypeFilter])

    const summary = useMemo(() => {
        const platformCallsTotal = usageData.filter(u => u.api_used === 'platform').length
        return {
            total: usageData.length,
            platform: platformCallsTotal,
            own: usageData.filter(u => u.api_used === 'own').length,
            cost: platformCallsTotal * 0.002
        }
    }, [usageData])

    const getToolStats = (name: string) => {
        const toolLogs = usageData.filter(u => u.tool_name === name)
        const platform = toolLogs.filter(u => u.api_used === 'platform').length
        const own = toolLogs.length - platform

        // Find top user for this tool
        const userCounts: { [key: string]: number } = {}
        toolLogs.forEach(log => {
            userCounts[log.user_id] = (userCounts[log.user_id] || 0) + 1
        })
        const topUserId = Object.keys(userCounts).sort((a, b) => userCounts[b] - userCounts[a])[0]
        const topUserEmail = profiles.find(p => p.id === topUserId)?.email || 'None'

        return { total: toolLogs.length, platform, own, topUser: topUserEmail }
    }

    const handleExport = () => {
        setExporting(true)
        const headers = ['Email', 'Plan', 'Total Calls', 'Platform Calls', 'Own Calls', 'Last Used']
        const rows = filteredUsers.map(u => [
            u.email,
            u.plan,
            u.totalCalls,
            u.platformCalls,
            u.ownCalls,
            u.lastUsed ? new Date(u.lastUsed).toLocaleString() : 'Never'
        ])

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.setAttribute("download", `api_usage_report_${new Date().toISOString().split('T')[0]}.csv`)
        link.click()
        setExporting(false)
    }

    const StatCard = ({ icon, name, value, sub, color }: any) => (
        <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 stat-card-glow admin-card"
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

    const ToolCard = ({ icon, name, stats }: any) => (
        <div className="bg-[#1A1740] border border-[#2D2B55] p-5 rounded-2xl admin-card transition-all hover:translate-y-[-2px] hover:border-purple-500/30">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg">{icon}</div>
                <span className="text-white text-[11px] font-black uppercase tracking-widest">{name}</span>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                    <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Total Usage</span>
                    <span className="text-white text-xl font-black">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-900/20 text-blue-400 border border-blue-500/10 font-black tracking-widest">PLATFORM: {stats.platform}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-green-900/20 text-green-400 border border-green-500/10 font-black tracking-widest">OWN: {stats.own}</span>
                </div>
                <div className="pt-1">
                    <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest mb-1">Top Consumer</p>
                    <p className="text-purple-400 text-[10px] font-bold truncate">{stats.topUser}</p>
                </div>
            </div>
        </div>
    )

    const formatRelativeTime = (dateString: string | null) => {
        if (!dateString) return 'Never'
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

        if (diffHrs < 1) return 'Just now'
        if (diffHrs < 24) return `${diffHrs} hours ago`
        return `${Math.floor(diffHrs / 24)} days ago`
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest animate-pulse">Aggregating Consumption Data...</span>
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeIn pb-10">
            {/* SECTION 1: Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <button
                        onClick={() => router.push('/admin/api-health')}
                        className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-[10px] font-black uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        API Health
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                            API Usage <span className="text-purple-400">Tracker</span>
                        </h1>
                        <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest leading-relaxed">
                            Per-user API consumption and cost analysis
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="appearance-none bg-[#1A1740] border border-[#2D2B55] rounded-xl pl-4 pr-10 py-3 text-[11px] font-black text-white hover:border-purple-500/50 transition-all focus:outline-none uppercase tracking-widest"
                        >
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>All Time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest disabled:opacity-50"
                    >
                        {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Export CSV
                    </button>
                </div>
            </div>

            {/* SECTION 2: 4 summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="⚡" name="TOTAL CALLS" value={summary.total.toLocaleString()} sub="System wide consumption" color="#8B5CF6" />
                <StatCard icon="🏢" name="PLATFORM API" value={summary.platform.toLocaleString()} sub="MORIZZO FUNDED" color="#3B82F6" />
                <StatCard icon="🔑" name="OWN API KEYS" value={summary.own.toLocaleString()} sub="USER FUNDED" color="#059669" />
                <StatCard icon="💰" name="EST. COST" value={"$" + summary.cost.toFixed(2)} sub="DATAFORSEO ESTIMATE" color="#F59E0B" />
            </div>

            {/* SECTION 3: Filters bar */}
            <div className="bg-[#1A1740] border border-[#2D2B55] p-5 rounded-2xl flex flex-col lg:flex-row items-center gap-4 admin-card">
                <div className="relative flex-1 w-full lg:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-purple-500/30 transition-all"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <select
                        value={toolFilter}
                        onChange={(e) => setToolFilter(e.target.value)}
                        className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black text-gray-500 uppercase focus:outline-none focus:text-white transition-all"
                    >
                        <option>All Tools</option>
                        <option>Niche Finder</option>
                        <option>Keywords</option>
                        <option>SERP</option>
                        <option>Content AI</option>
                    </select>
                    <select
                        value={apiTypeFilter}
                        onChange={(e) => setApiTypeFilter(e.target.value)}
                        className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black text-gray-500 uppercase focus:outline-none focus:text-white transition-all"
                    >
                        <option>All APIs</option>
                        <option>Platform</option>
                        <option>Own Key</option>
                    </select>
                    <select
                        value={providerFilter}
                        onChange={(e) => setProviderFilter(e.target.value)}
                        className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black text-gray-500 uppercase focus:outline-none focus:text-white transition-all"
                    >
                        <option>All Providers</option>
                        <option>Gemini</option>
                        <option>DataForSEO</option>
                        <option>OpenRouter</option>
                    </select>
                </div>
            </div>

            {/* SECTION 4: Per-User Usage Table */}
            <div className="bg-[#1A1740] border border-[#2D2B55] rounded-3xl p-8 admin-card">
                <h3 className="text-white font-black text-sm uppercase tracking-widest pl-1 mb-8">User API Consumption</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/5">
                            <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                                <th className="pb-5">User Profile</th>
                                <th className="pb-5 text-center">Plan</th>
                                <th className="pb-5 text-center">Total Footprint</th>
                                <th className="pb-5 text-center">API Origin</th>
                                <th className="pb-5 text-center">Last Activity</th>
                                <th className="pb-5 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-white/5 transition-all">
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center text-purple-400 font-bold text-sm border border-purple-500/10">
                                                {user.email[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white text-xs font-bold truncate">{user.email}</p>
                                                    {user.role === 'admin' && (
                                                        <span className="bg-red-950/40 text-red-500 text-[8px] font-black px-1.5 py-0.5 rounded-lg border border-red-500/10 uppercase tracking-widest">ADMIN</span>
                                                    )}
                                                </div>
                                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest opacity-50">API Usage Tracking</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 text-center px-4">
                                        <span className={cn(
                                            "text-[9px] px-2.5 py-1 rounded-full font-black uppercase border",
                                            user.plan === 'free' ? "bg-gray-800 text-gray-500 border-white/5" : "bg-purple-900/20 text-purple-300 border-purple-500/10"
                                        )}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="py-5 text-center">
                                        <span className="text-white text-xl font-black">{user.totalCalls}</span>
                                        <p className="text-[9px] text-gray-600 font-bold tracking-tighter uppercase">calls logs</p>
                                    </td>
                                    <td className="py-5 text-center">
                                        <div className="flex flex-col items-center gap-1.5 px-4">
                                            <div className="w-full max-w-[120px] flex items-center justify-between text-[10px] font-bold">
                                                <span className="text-blue-400 px-2 py-0.5 rounded bg-blue-500/5">{user.platformCalls} P</span>
                                                <span className="text-green-400 px-2 py-0.5 rounded bg-green-500/5">{user.ownCalls} O</span>
                                            </div>
                                            <div className="w-full max-w-[120px] bg-[#2D2B55] h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500"
                                                    style={{ width: `${(user.platformCalls / (user.totalCalls || 1)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 text-center">
                                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
                                            {formatRelativeTime(user.lastUsed)}
                                        </span>
                                    </td>
                                    <td className="py-5 text-right">
                                        <button
                                            onClick={() => { setSelectedUser(user); setIsModalOpen(true); setActiveTab('summary'); }}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-xl border border-white/5 transition-all uppercase tracking-widest active:scale-95 translate-x-1"
                                        >
                                            Details
                                            <ArrowLeft className="w-3 h-3 rotate-180" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SECTION 5: Tool Usage Breakdown */}
            <div className="space-y-4">
                <h3 className="text-white font-black text-xs uppercase tracking-widest pl-1">Usage by Tool</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ToolCard icon="🎯" name="Niche Finder" stats={getToolStats('Niche Finder')} />
                    <ToolCard icon="🔑" name="Keywords" stats={getToolStats('Keywords')} />
                    <ToolCard icon="📊" name="SERP Tracking" stats={getToolStats('SERP Tracking')} />
                    <ToolCard icon="✍️" name="Content AI" stats={getToolStats('Content AI')} />
                </div>
            </div>

            {/* SECTION 6: User Detail Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col scale-in">
                        {/* Modal Header */}
                        <div className="relative p-8 border-b border-white/5 bg-gradient-to-r from-purple-900/20 to-transparent">
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center text-4xl border border-purple-500/20">
                                        {selectedUser.email[0].toUpperCase()}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-3xl font-black text-white">{selectedUser.email}</h2>
                                            <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-purple-400/20">{selectedUser.plan}</span>
                                        </div>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">User ID: <span className="font-mono text-[10px]">{selectedUser.id}</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white flex items-center justify-center transition-all border border-white/5 active:scale-95"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-full bg-purple-500/10 blur-[100px] pointer-events-none" />
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex px-8 gap-8 border-b border-white/5 overflow-x-auto no-scrollbar">
                            {[
                                { id: 'summary', label: 'Usage Summary', icon: BarChart3 },
                                { id: 'history', label: 'Call History', icon: Clock },
                                { id: 'keys', label: 'API Keys Status', icon: LayoutGrid }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "flex items-center gap-2 py-5 text-[11px] font-black uppercase tracking-widest relative transition-colors whitespace-nowrap",
                                        activeTab === tab.id ? "text-purple-400" : "text-gray-500 hover:text-white"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" />}
                                </button>
                            ))}
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                            {activeTab === 'summary' && (
                                <div className="space-y-8 animate-slideUp">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-[#0F0C29] p-6 rounded-2xl border border-white/5">
                                            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">Lifetime Calls</p>
                                            <p className="text-3xl font-black text-white">{selectedUser.totalCalls}</p>
                                        </div>
                                        <div className="bg-[#0F0C29] p-6 rounded-2xl border border-white/5">
                                            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">Platform Impact</p>
                                            <p className="text-3xl font-black text-blue-400">{selectedUser.platformCalls}</p>
                                        </div>
                                        <div className="bg-[#0F0C29] p-6 rounded-2xl border border-white/5">
                                            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">Est. Direct Cost</p>
                                            <p className="text-3xl font-black text-orange-400">${(selectedUser.platformCalls * 0.002).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-white font-black text-xs uppercase tracking-widest">Plan Usage Limits</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-[#0F0C29] p-6 rounded-2xl border border-white/5">
                                                <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                                                    <span className="text-gray-500">Searches / Mo</span>
                                                    <span className="text-white">{selectedUser.totalCalls}/50</span>
                                                </div>
                                                <div className="h-2 bg-[#1A1740] rounded-full overflow-hidden border border-white/5">
                                                    <div className="h-full bg-purple-500" style={{ width: '40%' }} />
                                                </div>
                                            </div>
                                            <div className="bg-[#0F0C29] p-6 rounded-2xl border border-white/5 opacity-50">
                                                <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-gray-700">
                                                    <span className="grayscale">Content Credits</span>
                                                    <span>0/20</span>
                                                </div>
                                                <div className="h-2 bg-gray-900 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="animate-slideUp">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                                                <th className="pb-4">Tool</th>
                                                <th className="pb-4">API Origin</th>
                                                <th className="pb-4">Timestamp</th>
                                                <th className="pb-4 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {usageData.filter(u => u.user_id === selectedUser.id).slice(0, 20).map((log, i) => (
                                                <tr key={log.id} className="text-xs">
                                                    <td className="py-4 font-bold text-white">{log.tool_name}</td>
                                                    <td className="py-4">
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                                                            log.api_used === 'platform' ? "bg-blue-900/20 text-blue-400 border-blue-500/10" : "bg-green-900/20 text-green-400 border-green-500/10"
                                                        )}>{log.api_used}</span>
                                                    </td>
                                                    <td className="py-4 text-gray-500 font-mono text-[10px]">{new Date(log.created_at).toLocaleString()}</td>
                                                    <td className="py-4 text-right">
                                                        <span className="text-green-500 font-black tracking-tighter uppercase">{log.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {usageData.filter(u => u.user_id === selectedUser.id).length === 0 && (
                                                <tr><td colSpan={4} className="py-20 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">No logs found for this user</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'keys' && (
                                <div className="space-y-6 animate-slideUp">
                                    <div className="bg-[#0F0C29] p-8 rounded-3xl border border-white/5 space-y-8">
                                        {[
                                            { name: 'DataForSEO Login', configured: !!selectedUser.api_key_dataforseo, provider: 'PROVIDER' },
                                            { name: 'Gemini AI Key', configured: !!selectedUser.api_key_gemini, provider: 'GEMINI' },
                                            { name: 'OpenRouter Integration', configured: false, provider: 'MULTI-AI' }
                                        ].map((key, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-white/5 last:border-0 pb-6 last:pb-0">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl",
                                                        key.configured ? "bg-green-900/20 text-green-400 border border-green-500/10" : "bg-gray-800 text-gray-600 border border-white/5"
                                                    )}>
                                                        <Key className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-sm">{key.name}</p>
                                                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{key.provider}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {key.configured ? (
                                                        <div className="flex items-center gap-1.5 text-green-400 font-black text-[10px] uppercase">
                                                            <CheckCircle2 size={12} /> Configured
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-700 font-bold text-[10px] uppercase">Not set</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 p-6 bg-purple-600/5 border border-purple-500/10 rounded-2xl">
                                        <Info className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed">
                                            {selectedUser.api_key_dataforseo || selectedUser.api_key_gemini
                                                ? "This user is using their own API keys for some services, reducing cost to the platform."
                                                : "This user is currently using the platform's root API keys for all tool executions."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
