'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
    Search,
    Download,
    ArrowLeft,
    ChevronDown,
    Loader2
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
    api_key_openrouter?: string | null
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
    const [activeTab, setActiveTab] = useState<number>(0)

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

    const filterByDate = (data: ApiUsage[], range: string) => {
        const now = new Date()
        return data.filter(item => {
            const d = new Date(item.created_at)
            const rangeLower = range.toLowerCase()
            if (rangeLower.includes('today')) {
                return d.toDateString() === now.toDateString()
            }
            if (rangeLower.includes('week')) {
                const weekAgo = new Date()
                weekAgo.setDate(now.getDate() - 7)
                return d >= weekAgo
            }
            if (rangeLower.includes('month')) {
                return d.getMonth() === now.getMonth()
                    && d.getFullYear() === now.getFullYear()
            }
            return true // all time
        })
    }

    const filteredLogs = useMemo(() => {
        return filterByDate(usageData, timeFilter)
    }, [usageData, timeFilter])

    const combinedData = useMemo(() => {
        return profiles.map(p => {
            const userLogs = filteredLogs.filter(u => u.user_id === p.id)
            return {
                ...p,
                totalCalls: userLogs.length,
                platformCalls: userLogs.filter(u => u.api_used === 'platform').length,
                ownCalls: userLogs.filter(u => u.api_used === 'own').length,
                lastUsed: userLogs[0]?.created_at || null
            }
        }).sort((a, b) => b.totalCalls - a.totalCalls)
    }, [profiles, filteredLogs])

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
        const platformCallsTotal = filteredLogs.filter(u => u.api_used === 'platform').length
        return {
            total: filteredLogs.length,
            platform: platformCallsTotal,
            own: filteredLogs.filter(u => u.api_used === 'own').length,
            cost: platformCallsTotal * 0.002
        }
    }, [filteredLogs])

    const getToolStats = (name: string) => {
        const toolLogs = filteredLogs.filter(u => u.tool_name === name)
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
        <div className="admin-stat-card card-enter"
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
        <div className="glass-card shimmer-border p-5 transition-all hover:translate-y-[-2px] hover:border-purple-500/30">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg">{icon}</div>
                <span className="text-white text-[11px] font-black uppercase tracking-widest">{name}</span>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-[rgba(255,255,255,0.06)] pb-3">
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
                            API Usage <span className="gradient-text">Tracker</span>
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
                            style={{ colorScheme: 'dark' }}
                            className="appearance-none bg-[#1E1E1E] border border-[#333333] rounded-xl pl-4 pr-10 py-3 text-[11px] font-black text-white hover:border-purple-500/50 transition-all focus:outline-none uppercase tracking-widest cursor-pointer"
                        >
                            <option style={{ background: '#1E1E1E', color: 'white' }}>Today</option>
                            <option style={{ background: '#1E1E1E', color: 'white' }}>This Week</option>
                            <option style={{ background: '#1E1E1E', color: 'white' }}>This Month</option>
                            <option style={{ background: '#1E1E1E', color: 'white' }}>All Time</option>
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
                <StatCard icon="🏢" name="PLATFORM API" value={summary.platform.toLocaleString()} sub="PLATFORM API CALLS" color="#3B82F6" />
                <StatCard icon="🔑" name="OWN API KEYS" value={summary.own.toLocaleString()} sub="USER FUNDED" color="#059669" />
                <StatCard icon="💰" name="EST. COST" value={"$" + summary.cost.toFixed(2)} sub="DATAFORSEO ESTIMATE" color="#F59E0B" />
            </div>

            {/* SECTION 3: Filters bar */}
            <div className="glass-card shimmer-border p-5 flex flex-col lg:flex-row items-center gap-4">
                <div className="relative flex-1 w-full lg:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            colorScheme: 'dark',
                            backgroundColor: '#1E1E1E'
                        }}
                        className="w-full bg-[#1E1E1E] border border-[#333333] text-white pl-11 pr-10 py-2.5 rounded-xl placeholder-gray-600 focus:border-purple-500 focus:outline-none transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg leading-none transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <select
                        value={toolFilter}
                        onChange={(e) => setToolFilter(e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className="bg-[#1E1E1E] border border-[#333333] text-white text-sm px-3 py-2 rounded-xl hover:border-purple-500 focus:outline-none cursor-pointer"
                    >
                        <option style={{ background: '#1E1E1E', color: 'white' }}>All Tools</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Niche Finder</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Keywords</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>SERP</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Content AI</option>
                    </select>
                    <select
                        value={apiTypeFilter}
                        onChange={(e) => setApiTypeFilter(e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className="bg-[#1E1E1E] border border-[#333333] text-white text-sm px-3 py-2 rounded-xl hover:border-purple-500 focus:outline-none cursor-pointer"
                    >
                        <option style={{ background: '#1E1E1E', color: 'white' }}>All APIs</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Platform</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Own Key</option>
                    </select>
                    <select
                        value={providerFilter}
                        onChange={(e) => setProviderFilter(e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className="bg-[#1E1E1E] border border-[#333333] text-white text-sm px-3 py-2 rounded-xl hover:border-purple-500 focus:outline-none cursor-pointer"
                    >
                        <option style={{ background: '#1E1E1E', color: 'white' }}>All Providers</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>Gemini</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>DataForSEO</option>
                        <option style={{ background: '#1E1E1E', color: 'white' }}>OpenRouter</option>
                    </select>
                </div>
            </div>

            {/* SECTION 4: Per-User Usage Table */}
            <div className="glass-card shimmer-border p-8">
                <h3 className="text-white font-black text-sm uppercase tracking-widest pl-1 mb-8">User API Consumption</h3>
                <div className="overflow-x-auto">
                    <table className="data-table w-full text-left">
                        <thead className="border-b border-[rgba(255,255,255,0.06)]">
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
                                            user.plan === 'free' ? "bg-gray-800 text-gray-500 border-[rgba(255,255,255,0.06)]" : "bg-purple-900/20 text-purple-300 border-purple-500/10"
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
                                            <div className="w-full max-w-[120px] bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
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
                                            onClick={() => { setSelectedUser(user); setIsModalOpen(true); setActiveTab(0); }}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-xl border border-[rgba(255,255,255,0.06)] transition-all uppercase tracking-widest active:scale-95 translate-x-1"
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

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 
                  bg-black/70 z-50 
                  flex items-center justify-center
                  p-4">

                    <div className="inner-box border
                    border-[#333333] rounded-2xl
                    w-full max-w-lg
                    max-h-[85vh]
                    flex flex-col
                    overflow-hidden">

                        {/* Header — fixed */}
                        <div className="p-6 border-b 
                      border-[#333333] flex-shrink-0">

                            {/* Close button top-right */}
                            <div className="flex justify-between
                        items-start mb-4">
                                <div />
                                <button
                                    onClick={() => { setSelectedUser(null); setIsModalOpen(false); }}
                                    className="w-8 h-8 rounded-lg
                            bg-[#121212] border border-[#333333]
                            text-gray-400 hover:text-white
                            flex items-center justify-center
                            text-lg transition-all">
                                    ✕
                                </button>
                            </div>

                            {/* Avatar + email */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full
                          bg-purple-700 flex items-center
                          justify-center text-white 
                          font-bold text-xl flex-shrink-0">
                                    {selectedUser?.email?.[0]
                                        ?.toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-white font-bold
                            text-base truncate max-w-[280px]">
                                        {selectedUser?.email}
                                    </div>
                                    <div className="text-gray-500 
                            text-xs mt-1 truncate">
                                        ID: {selectedUser?.id}
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-1 mt-4">
                                {['Usage Summary',
                                    'Call History',
                                    'API Keys Status'].map((tab, i) => (
                                        <button key={i}
                                            onClick={() => setActiveTab(i)}
                                            className={`px-3 py-1.5 rounded-lg
                              text-xs font-medium transition-all
                              ${activeTab === i
                                                    ? 'bg-purple-700 text-white'
                                                    : 'text-gray-400 hover:text-white'
                                                }`}>
                                            {tab}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Content — scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">

                            {/* Tab 0: Usage Summary */}
                            {activeTab === 0 && (
                                <div className="space-y-3">
                                    {[
                                        ['This Month', '0 calls'],
                                        ['Platform API', '0 calls'],
                                        ['Own API', '0 calls'],
                                        ['Est. Cost', '$0.00'],
                                        ['Limit',
                                            selectedUser?.plan === 'free'
                                                ? '5/month'
                                                : 'Based on plan'],
                                    ].map(([label, value]) => (
                                        <div key={label}
                                            className="flex justify-between
                                bg-[#121212] rounded-lg 
                                px-4 py-3">
                                            <span className="text-gray-400 
                                text-sm">{label}</span>
                                            <span className="text-white 
                                text-sm font-medium">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tab 1: Call History */}
                            {activeTab === 1 && (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-3">
                                        📋
                                    </div>
                                    <div className="text-gray-400 
                            text-sm">
                                        No API calls recorded yet
                                    </div>
                                </div>
                            )}

                            {/* Tab 2: API Keys Status */}
                            {activeTab === 2 && (
                                <div className="space-y-3">
                                    {[
                                        {
                                            name: 'DataForSEO Login',
                                            sub: 'PROVIDER',
                                            key: 'api_key_dataforseo'
                                        },
                                        {
                                            name: 'Gemini AI Key',
                                            sub: 'GEMINI',
                                            key: 'api_key_gemini'
                                        },
                                        {
                                            name: 'OpenRouter',
                                            sub: 'MULTI-AI',
                                            key: 'api_key_openrouter'
                                        },
                                    ].map((item) => {
                                        const key = item.key as keyof Profile;
                                        const isSet = !!selectedUser?.[key];
                                        return (
                                            <div key={item.key}
                                                className="flex items-center
                                    justify-between
                                    bg-[#121212] rounded-xl
                                    px-4 py-3">
                                                <div className="flex 
                                    items-center gap-3">
                                                    <div className="w-8 h-8
                                      rounded-lg bg-[#1E1E1E]
                                      border border-[#333333]
                                      flex items-center 
                                      justify-center text-gray-500
                                      text-sm">
                                                        🔑
                                                    </div>
                                                    <div>
                                                        <div className="text-white
                                        text-sm font-medium">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-gray-600
                                        text-[10px]">
                                                            {item.sub}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`text-xs 
                                    font-bold
                                    ${isSet ? 'text-green-400' : 'text-gray-600'}`}>
                                                    {isSet ? '✓ SET' : 'NOT SET'}
                                                </span>
                                            </div>
                                        );
                                    })}

                                    <div className="mt-4 p-3 
                            bg-blue-900/20 border 
                            border-blue-800/40 rounded-xl">
                                        <p className="text-blue-300 
                                  text-xs text-center">
                                            ℹ️ This user is currently using
                                            the platform API keys for
                                            all tool executions.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t 
                      border-[#333333] flex-shrink-0">
                            <button
                                onClick={() => { setSelectedUser(null); setIsModalOpen(false); }}
                                className="w-full bg-purple-700
                          hover:bg-purple-600 text-white
                          rounded-xl py-2.5 text-sm 
                          font-bold transition-all">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus {
                    -webkit-box-shadow: 0 0 0px 1000px #1E1E1E inset !important;
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            ` }} />
        </div>
    )
}
