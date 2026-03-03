'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
    Settings,
    Shield,
    Zap,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    LayoutGrid,
    BarChart3,
    Eye,
    Check,
    X,
    Loader2,
    AlertCircle,
    ArrowRight
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { cn } from '../../../lib/utils'
import { useRouter } from 'next/navigation'

// --- Constants & Data ---

const TOOLS_DATA = [
    // PHASE 1 — RESEARCH (17 tools)
    { id: 1, name: 'AI Website Generator', phase: 1 },
    { id: 2, name: 'Local SEO Structure Enforcer', phase: 1 },
    { id: 3, name: 'Niche Research Dashboard', phase: 1 },
    { id: 4, name: 'Competitor Analysis Tool', phase: 1 },
    { id: 5, name: 'Service Area Mapper', phase: 1 },
    { id: 6, name: 'Local Keyword Planner', phase: 1 },
    { id: 7, name: 'Google Trends Analyzer', phase: 1 },
    { id: 8, name: 'Seasonality Tracker', phase: 1 },
    { id: 9, name: 'Micro-Niche Finder', phase: 1 },
    { id: 10, name: 'Search Volume Estimator', phase: 1 },
    { id: 11, name: 'CPC & Competition Checker', phase: 1 },
    { id: 12, name: 'AI Local Content Writer', phase: 1 },
    { id: 13, name: 'City Page Generator', phase: 1 },
    { id: 14, name: 'Service Page Builder', phase: 1 },
    { id: 15, name: 'FAQ Generator', phase: 1 },
    { id: 16, name: 'Schema Markup Generator', phase: 1 },
    { id: 17, name: 'Business Name Generator', phase: 1 },

    // PHASE 2 — BUILD (26 tools)
    { id: 18, name: 'WordPress Auto-Installer', phase: 2 },
    { id: 19, name: 'Theme Selector AI', phase: 2 },
    { id: 20, name: 'Plugin Manager', phase: 2 },
    { id: 21, name: 'Page Builder AI', phase: 2 },
    { id: 22, name: 'Homepage Builder', phase: 2 },
    { id: 23, name: 'About Page Generator', phase: 2 },
    { id: 24, name: 'Contact Page Builder', phase: 2 },
    { id: 25, name: 'Service Pages Bulk Creator', phase: 2 },
    { id: 26, name: 'Blog Setup Wizard', phase: 2 },
    { id: 27, name: 'Image Optimizer', phase: 2 },
    { id: 28, name: 'Technical SEO Auditor', phase: 2 },
    { id: 29, name: 'Site Speed Optimizer', phase: 2 },
    { id: 30, name: 'Mobile Optimizer', phase: 2 },
    { id: 31, name: 'SSL Checker', phase: 2 },
    { id: 32, name: 'Robots.txt Generator', phase: 2 },
    { id: 33, name: 'Sitemap Generator', phase: 2 },
    { id: 34, name: 'Canonical Tags Manager', phase: 2 },
    { id: 35, name: 'Redirect Manager', phase: 2 },
    { id: 36, name: 'Broken Links Finder', phase: 2 },
    { id: 37, name: 'Core Web Vitals Checker', phase: 2 },
    { id: 38, name: 'Structured Data Tester', phase: 2 },
    { id: 39, name: 'Meta Tags Optimizer', phase: 2 },
    { id: 40, name: 'Header Tags Analyzer', phase: 2 },
    { id: 41, name: 'Internal Linking Engine', phase: 2 },
    { id: 42, name: 'Anchor Text Optimizer', phase: 2 },
    { id: 43, name: 'Content Gap Analyzer', phase: 2 },

    // PHASE 3 — DEPLOY (8 tools)
    { id: 44, name: 'One-Click Deploy', phase: 3 },
    { id: 45, name: 'Geo-Grid Rank Tracker', phase: 3 },
    { id: 46, name: 'Google Search Console Connect', phase: 3 },
    { id: 47, name: 'Google Analytics Connect', phase: 3 },
    { id: 48, name: 'Domain Manager', phase: 3 },
    { id: 49, name: 'DNS Configurator', phase: 3 },
    { id: 50, name: 'CDN Setup', phase: 3 },
    { id: 51, name: 'AI Niche Finder Tool', phase: 3 },

    // PHASE 4 — OPTIMIZE (19 tools)
    { id: 52, name: 'Keyword Rank Tracker', phase: 4 },
    { id: 53, name: 'Content Optimizer AI', phase: 4 },
    { id: 54, name: 'Keyword Difficulty Checker', phase: 4 },
    { id: 55, name: 'SERP Feature Optimizer', phase: 4 },
    { id: 56, name: 'Featured Snippet Tool', phase: 4 },
    { id: 57, name: 'Page Speed Optimizer', phase: 4 },
    { id: 58, name: 'Image ALT Text Generator', phase: 4 },
    { id: 59, name: 'Thin Content Detector', phase: 4 },
    { id: 60, name: 'Duplicate Content Finder', phase: 4 },
    { id: 61, name: 'Content Freshness Updater', phase: 4 },
    { id: 62, name: 'Backlink Opportunity Finder', phase: 4 },
    { id: 63, name: 'Guest Post Finder', phase: 4 },
    { id: 64, name: 'HARO Monitor', phase: 4 },
    { id: 65, name: 'Link Building Tracker', phase: 4 },
    { id: 66, name: 'Toxic Link Detector', phase: 4 },
    { id: 67, name: '1-Click Full Local SEO', phase: 4 },
    { id: 68, name: 'Competitive Gap Finder', phase: 4 },
    { id: 69, name: 'Search Intent Analyzer', phase: 4 },
    { id: 70, name: 'LSI Keywords Generator', phase: 4 },

    // PHASE 5 — LOCAL AUTHORITY (34 tools)
    { id: 71, name: 'GBP Audit Tool', phase: 5 },
    { id: 72, name: 'GBP Post Scheduler', phase: 5 },
    { id: 73, name: 'GBP Photo Optimizer', phase: 5 },
    { id: 74, name: 'GBP Q&A Manager', phase: 5 },
    { id: 75, name: 'Review Response AI', phase: 5 },
    { id: 76, name: 'Review Generation Tool', phase: 5 },
    { id: 77, name: 'Citation Builder', phase: 5 },
    { id: 78, name: 'NAP Consistency Checker', phase: 5 },
    { id: 79, name: 'Local Business Schema', phase: 5 },
    { id: 80, name: 'Local Link Builder', phase: 5 },
    { id: 81, name: 'Local PR Tool', phase: 5 },
    { id: 82, name: 'Community Engagement Tool', phase: 5 },
    { id: 83, name: 'Sponsorship Finder', phase: 5 },
    { id: 84, name: 'Local Event Creator', phase: 5 },
    { id: 85, name: 'Neighborhood Pages Creator', phase: 5 },
    { id: 86, name: 'Service Area Pages Builder', phase: 5 },
    { id: 87, name: 'Local FAQ Builder', phase: 5 },
    { id: 88, name: 'Hyper-Local Content AI', phase: 5 },
    { id: 89, name: 'Local News Monitor', phase: 5 },
    { id: 90, name: 'Competitor GBP Spy', phase: 5 },
    { id: 91, name: 'Map Pack Tracker', phase: 5 },
    { id: 92, name: 'Local Rank Dashboard', phase: 5 },
    { id: 93, name: 'Multi-Location Manager', phase: 5 },
    { id: 94, name: 'Bulk Page Generator', phase: 5 },
    { id: 95, name: 'White Label Report Builder', phase: 5 },
    { id: 96, name: 'Client Report Scheduler', phase: 5 },
    { id: 97, name: 'ROI Calculator', phase: 5 },
    { id: 98, name: 'Ranking Progress Tracker', phase: 5 },
    { id: 99, name: 'Conversion Tracker', phase: 5 },
    { id: 100, name: 'Call Tracking Setup', phase: 5 },
    { id: 101, name: 'Form Builder', phase: 5 },
    { id: 102, name: 'Lead Capture Widget', phase: 5 },
    { id: 103, name: 'Live Chat Integration', phase: 5 },
    { id: 104, name: 'Heatmap Analyzer', phase: 5 },

    // PHASE 6 — CONVERT (5 tools)
    { id: 105, name: 'Landing Page Optimizer', phase: 6 },
    { id: 106, name: 'A/B Test Manager', phase: 6 },
    { id: 107, name: 'CRO Analyzer', phase: 6 },
    { id: 108, name: 'AI Elementor Page Generator', phase: 6 },
    { id: 109, name: 'Proposal Generator', phase: 6 },

    // PHASE 7 — TRACK (9 tools)
    { id: 110, name: 'Rank Tracking Dashboard', phase: 7 },
    { id: 111, name: 'Traffic Analytics', phase: 7 },
    { id: 112, name: 'Conversion Analytics', phase: 7 },
    { id: 113, name: 'Revenue Tracker', phase: 7 },
    { id: 114, name: 'Client Dashboard', phase: 7 },
    { id: 115, name: 'Competitor Rank Monitor', phase: 7 },
    { id: 116, name: 'Alert System', phase: 7 },
    { id: 117, name: 'Weekly Report Generator', phase: 7 },
    { id: 118, name: 'Monthly Report AI', phase: 7 },

    // PHASE 8 — REPORTS (11 tools)
    { id: 119, name: 'White Label PDF Reports', phase: 8 },
    { id: 120, name: 'Executive Summary AI', phase: 8 },
    { id: 121, name: 'KPI Dashboard Builder', phase: 8 },
    { id: 122, name: 'Client Portal', phase: 8 },
    { id: 123, name: 'Automated Report Sender', phase: 8 },
    { id: 124, name: 'Custom Report Builder', phase: 8 },
    { id: 125, name: 'Comparison Report Tool', phase: 8 },
    { id: 126, name: 'ROI Report Generator', phase: 8 },
    { id: 127, name: 'Benchmark Report', phase: 8 },
    { id: 128, name: 'Progress Report AI', phase: 8 },
    { id: 129, name: 'Annual Review Generator', phase: 8 },

    // AUTOMATION (6 tools)
    { id: 130, name: 'Full SEO Automation Pipeline', phase: 9 },
    { id: 131, name: 'Bulk Site Generator', phase: 9 },
    { id: 132, name: 'Auto Content Publisher', phase: 9 },
    { id: 133, name: 'Auto Link Builder', phase: 9 },
    { id: 134, name: 'Auto Report Sender', phase: 9 },
    { id: 135, name: 'Campaign Manager', phase: 9 },

    // SYSTEM (1 tool)
    { id: 136, name: 'Platform Settings Manager', phase: 10 },
]

type ToolStatus = 'active' | 'soon' | 'disabled'

interface ToolItem {
    id: number
    name: string
    phase: number
    status: ToolStatus
    usage: number
}

export default function ToolsManagerPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [toolsList, setToolsList] = useState<ToolItem[]>([])
    const [selectedTools, setSelectedTools] = useState<number[]>([])

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [phaseFilter, setPhaseFilter] = useState('All Phases')
    const [statusFilter, setStatusFilter] = useState('All Status')
    const [configModal, setConfigModal] = useState<any>(null)
    const [previewModal, setPreviewModal] = useState<any>(null)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20

    useEffect(() => {
        fetchToolsData()
    }, [])

    const fetchToolsData = async () => {
        setLoading(true)
        try {
            // Fetch usage counts from api_usage table
            const { data: usageData, error: usageError } = await supabase
                .from('api_usage')
                .select('tool_name')

            if (usageError) throw usageError

            const usageMap: { [key: string]: number } = {}
            usageData?.forEach(log => {
                usageMap[log.tool_name] = (usageMap[log.tool_name] || 0) + 1
            })

            // Combine tools with local storage status and usage
            const initializedTools = TOOLS_DATA.map(tool => {
                const savedStatus = localStorage.getItem(`tool_status_${tool.id}`)
                let status: ToolStatus = (savedStatus as ToolStatus) || (tool.phase === 1 ? 'active' : 'soon')

                return {
                    ...tool,
                    status,
                    usage: usageMap[tool.name] || 0
                }
            })

            setToolsList(initializedTools)
        } catch (err) {
            console.error('Error fetching tool stats:', err)
        } finally {
            setLoading(false)
        }
    }

    const updateToolStatus = (id: number, newStatus: ToolStatus) => {
        setToolsList(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
        localStorage.setItem(`tool_status_${id}`, newStatus)
    }

    const cycleStatus = (id: number, current: ToolStatus) => {
        const next: ToolStatus = current === 'active' ? 'soon' : current === 'soon' ? 'disabled' : 'active'
        updateToolStatus(id, next)
    }

    const handleBulkStatusUpdate = (newStatus: ToolStatus) => {
        setToolsList(prev => prev.map(t => selectedTools.includes(t.id) ? { ...t, status: newStatus } : t))
        selectedTools.forEach(id => localStorage.setItem(`tool_status_${id}`, newStatus))
        setSelectedTools([])
    }

    const handleEnableAll = () => {
        if (!confirm('Enable all 136 tools?')) return
        setToolsList(prev => prev.map(t => ({ ...t, status: 'active' })))
        TOOLS_DATA.forEach(t => localStorage.setItem(`tool_status_${t.id}`, 'active'))
    }

    const handleDisableAll = () => {
        if (!confirm('Disable all 136 tools?')) return
        setToolsList(prev => prev.map(t => ({ ...t, status: 'disabled' })))
        TOOLS_DATA.forEach(t => localStorage.setItem(`tool_status_${t.id}`, 'disabled'))
    }

    // Derived Data
    const filteredTools = useMemo(() => {
        return toolsList.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toString() === searchQuery
            const matchesPhase = phaseFilter === 'All Phases' || phaseFilter === `Phase ${t.phase}`
            const matchesStatus = statusFilter === 'All Status' || statusFilter.toLowerCase() === t.status
            return matchesSearch && matchesPhase && matchesStatus
        })
    }, [toolsList, searchQuery, phaseFilter, statusFilter])

    const pagedTools = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return filteredTools.slice(start, start + pageSize)
    }, [filteredTools, currentPage])

    const totalPages = Math.ceil(filteredTools.length / pageSize)

    const stats = useMemo(() => {
        return {
            total: toolsList.length,
            active: toolsList.filter(t => t.status === 'active').length,
            soon: toolsList.filter(t => t.status === 'soon').length,
            disabled: toolsList.filter(t => t.status === 'disabled').length
        }
    }, [toolsList])

    // Components
    const StatCard = ({ icon, name, value, color }: any) => (
        <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 admin-card stat-card-glow"
            style={{ borderBottom: `3px solid ${color}` }}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
                    style={{ background: color + '22' }}>
                    {icon}
                </div>
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{name}</span>
            </div>
            <div className="text-4xl font-black text-white mb-1">{value}</div>
        </div>
    )

    const StatusBadge = ({ status, onClick }: { status: ToolStatus, onClick: () => void }) => {
        const config = {
            active: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Active', icon: '🟢' },
            soon: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Coming Soon', icon: '🟡' },
            disabled: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Disabled', icon: '🔴' }
        }[status]

        return (
            <button
                onClick={onClick}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                    config.bg, config.color, config.border
                )}
            >
                <span className="text-[8px]">{config.icon}</span>
                {config.label}
            </button>
        )
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest animate-pulse">Synchronizing Tool Registry...</span>
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeIn pb-20">
            {/* SECTION 1: Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                        Tools <span className="text-purple-400">Manager</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest leading-relaxed">
                        Control {stats.total} AI SEO tools across all development phases
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleEnableAll}
                        className="px-5 py-3 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest active:scale-95"
                    >
                        ✅ Enable All
                    </button>
                    <button
                        onClick={handleDisableAll}
                        className="px-5 py-3 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest active:scale-95"
                    >
                        ❌ Disable All
                    </button>
                    <button
                        onClick={() => router.push('/admin/api-health/usage')}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                    >
                        <BarChart3 className="w-4 h-4" />
                        View Usage →
                    </button>
                </div>
            </div>

            {/* SECTION 2: Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="🛠️" name="TOTAL TOOLS" value={stats.total} color="#8B5CF6" />
                <StatCard icon="✅" name="ACTIVE TOOLS" value={stats.active} color="#059669" />
                <StatCard icon="⏳" name="COMING SOON" value={stats.soon} color="#F59E0B" />
                <StatCard icon="❌" name="DISABLED" value={stats.disabled} color="#EF4444" />
            </div>

            {/* SECTION 3: Filters */}
            <div className="bg-[#1A1740] border border-[#2D2B55] p-5 rounded-2xl flex flex-col lg:flex-row items-center gap-4 admin-card">
                <div className="relative flex-1 w-full lg:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search tool by name or ID..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-black/20 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-purple-500/30 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <select
                        value={phaseFilter}
                        onChange={(e) => { setPhaseFilter(e.target.value); setCurrentPage(1); }}
                        className="bg-[#1A1740] border border-[#2D2B55] text-white text-sm px-4 py-2 rounded-xl hover:border-purple-500 focus:border-purple-400 focus:outline-none cursor-pointer"
                        style={{ colorScheme: 'dark', backgroundColor: '#1A1740', color: 'white' }}
                    >
                        <option style={{ backgroundColor: '#1A1740', color: 'white' }}>All Phases</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p => (
                            <option key={p} style={{ backgroundColor: '#1A1740', color: 'white' }}>Phase {p}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className="bg-[#1A1740] border border-[#2D2B55] text-white text-sm px-4 py-2 rounded-xl hover:border-purple-500 focus:border-purple-400 focus:outline-none cursor-pointer"
                        style={{ colorScheme: 'dark', backgroundColor: '#1A1740', color: 'white' }}
                    >
                        <option style={{ backgroundColor: '#1A1740', color: 'white' }}>All Status</option>
                        <option style={{ backgroundColor: '#1A1740', color: 'white' }}>Active</option>
                        <option style={{ backgroundColor: '#1A1740', color: 'white' }}>Coming Soon</option>
                        <option style={{ backgroundColor: '#1A1740', color: 'white' }}>Disabled</option>
                    </select>
                </div>
            </div>

            {/* SECTION 4: Tools Table */}
            <div className="bg-[#1A1740] border border-[#2D2B55] rounded-3xl overflow-hidden admin-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 border-b border-white/5">
                            <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                                <th className="px-6 py-5 w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedTools.length === pagedTools.length && pagedTools.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedTools(pagedTools.map(t => t.id))
                                            else setSelectedTools([])
                                        }}
                                        className="w-4 h-4 rounded border-gray-700 bg-black/40 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                                    />
                                </th>
                                <th className="px-6 py-5">Tool</th>
                                <th className="px-6 py-5 text-center">Development Phase</th>
                                <th className="px-6 py-5 text-center">Operational Status</th>
                                <th className="px-6 py-5 text-center">Total Usage</th>
                                <th className="px-6 py-5 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pagedTools.map((tool) => (
                                <tr key={tool.id} className={cn(
                                    "group transition-all hover:bg-white/5",
                                    selectedTools.includes(tool.id) ? "bg-purple-900/10" : ""
                                )}>
                                    <td className="px-6 py-5">
                                        <input
                                            type="checkbox"
                                            checked={selectedTools.includes(tool.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedTools([...selectedTools, tool.id])
                                                else setSelectedTools(selectedTools.filter(id => id !== tool.id))
                                            }}
                                            className="w-4 h-4 rounded border-gray-700 bg-black/40 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-xl bg-purple-900/20 flex items-center justify-center text-purple-400 font-black text-xs border border-purple-500/10 shadow-lg group-hover:scale-110 transition-transform">
                                                {tool.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-white text-xs font-black uppercase tracking-widest group-hover:text-purple-400 transition-colors">{tool.name}</p>
                                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest opacity-50">#{tool.id} Tool Identity</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="px-2.5 py-1 bg-white/5 text-gray-400 text-[9px] font-black rounded-lg border border-white/5 uppercase tracking-widest">
                                            Phase {tool.phase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center">
                                            <StatusBadge status={tool.status} onClick={() => cycleStatus(tool.id, tool.status)} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-white text-xs font-black">{tool.usage.toLocaleString()}</span>
                                            <span className="text-[8px] text-gray-600 font-bold uppercase tracking-tighter">CALLS RECORDED</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 text-sm">
                                            <button
                                                onClick={() => setConfigModal(tool)}
                                                className="w-8 h-8 bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                                ⚙️
                                            </button>

                                            <button
                                                onClick={() => setPreviewModal(tool)}
                                                className="w-8 h-8 bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredTools.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <AlertCircle size={40} className="text-gray-800" />
                                            <p className="text-gray-600 text-xs font-black uppercase tracking-widest">No tools matching your filters</p>
                                            <button
                                                onClick={() => { setSearchQuery(''); setPhaseFilter('All Phases'); setStatusFilter('All Status'); }}
                                                className="text-purple-500 text-[10px] font-black border-b border-purple-500/30 hover:border-purple-500"
                                            >
                                                CLEAR ALL FILTERS
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="px-8 py-6 border-t border-white/5 bg-black/10 flex items-center justify-between">
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                            Showing <span className="text-white">{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredTools.length)}</span> of <span className="text-white">{filteredTools.length}</span> tools
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-30 transition-all border border-white/5"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={cn(
                                            "w-8 h-8 rounded-lg text-[10px] font-black transition-all border",
                                            currentPage === i + 1
                                                ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/40"
                                                : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-30 transition-all border border-white/5"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SECTION 5: Bulk Actions bar */}
            {selectedTools.length > 0 && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-slideUp">
                    <div className="bg-[#1A1740] border border-purple-500/30 px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 backdrop-blur-xl ring-1 ring-purple-500/10">
                        <div className="flex items-center gap-3 border-r border-white/10 pr-8">
                            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-sm">
                                {selectedTools.length}
                            </div>
                            <div className="text-[10px] font-black text-white uppercase tracking-widest">
                                Tools <br /> Selected
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleBulkStatusUpdate('active')}
                                className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest flex items-center gap-2"
                            >
                                <Check size={14} /> Enable
                            </button>
                            <button
                                onClick={() => handleBulkStatusUpdate('soon')}
                                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest flex items-center gap-2"
                            >
                                <Clock size={14} /> Soon
                            </button>
                            <button
                                onClick={() => handleBulkStatusUpdate('disabled')}
                                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest flex items-center gap-2"
                            >
                                <X size={14} /> Disable
                            </button>
                            <button
                                onClick={() => setSelectedTools([])}
                                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-black rounded-xl transition-all border border-white/5 uppercase tracking-widest ml-2"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODALS */}
            {configModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setConfigModal(null)}>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                        onClick={e => e.stopPropagation()}>

                        <h3 className="text-white font-black text-lg mb-6 uppercase tracking-tight flex items-center gap-2">
                            <span>⚙️</span> {configModal?.name}
                        </h3>

                        <div className="mb-6">
                            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2 block">
                                DEVELOPMENT PHASE
                            </label>
                            <div className="text-white text-xs font-bold bg-[#0F0C29] border border-[#2D2B55] rounded-xl px-4 py-3">
                                Phase {configModal?.phase}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2 block">
                                OPERATIONAL STATUS
                            </label>
                            <select
                                value={configModal?.status}
                                onChange={e => setConfigModal((prev: any) => ({ ...prev, status: e.target.value }))}
                                className="w-full bg-[#0F0C29] border border-[#2D2B55] text-white text-xs font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                                style={{ colorScheme: 'dark' }}>
                                <option value="active" style={{ background: '#1A1740' }}>🟢 Active</option>
                                <option value="soon" style={{ background: '#1A1740' }}>🟡 Coming Soon</option>
                                <option value="disabled" style={{ background: '#1A1740' }}>🔴 Disabled</option>
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const key = 'tool_status_' + configModal.id
                                    localStorage.setItem(key, configModal.status)
                                    setToolsList(prev => prev.map(t =>
                                        t.id === configModal.id ? { ...t, status: configModal.status } : t
                                    ))
                                    setConfigModal(null)
                                }}
                                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                Save Changes
                            </button>
                            <button
                                onClick={() => setConfigModal(null)}
                                className="px-6 bg-[#0F0C29] border border-[#2D2B55] text-gray-500 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all hover:text-white hover:border-purple-500 active:scale-95">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {previewModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setPreviewModal(null)}>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
                        onClick={e => e.stopPropagation()}>

                        {/* Decorative background glass */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] -mr-16 -mt-16" />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <h3 className="text-white font-black text-xl uppercase tracking-tight mb-1">
                                    {previewModal?.name}
                                </h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest opacity-70">
                                    ID #{previewModal?.id} • Phase {previewModal?.phase}
                                </p>
                            </div>
                            <button
                                onClick={() => setPreviewModal(null)}
                                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white rounded-full transition-all active:scale-90">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center bg-[#0F0C29] border border-[#2D2B55] rounded-2xl px-5 py-4">
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Status</span>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                                    previewModal?.status === 'active' ? 'text-green-400' :
                                        previewModal?.status === 'soon' ? 'text-orange-400' : 'text-red-400'
                                )}>
                                    {previewModal?.status === 'active' ? '🟢 Active' :
                                        previewModal?.status === 'soon' ? '🟡 Coming Soon' : '🔴 Disabled'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0F0C29] border border-[#2D2B55] rounded-2xl px-5 py-4">
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Phase</span>
                                <span className="text-white text-xs font-black uppercase tracking-widest">
                                    {previewModal?.phase}
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0F0C29] border border-[#2D2B55] rounded-2xl px-5 py-4">
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Usage</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-white text-xs font-black">{previewModal?.usage || 0}</span>
                                    <span className="text-[8px] text-gray-600 font-bold uppercase tracking-tighter">CALLS RECORDED</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-[#0F0C29] border border-[#2D2B55] rounded-2xl px-5 py-4">
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Available For</span>
                                <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">
                                    All Plans
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setPreviewModal(null)}
                            className="w-full mt-8 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 relative z-10">
                            Close Preview
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
