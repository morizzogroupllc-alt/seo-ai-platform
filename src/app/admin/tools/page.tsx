'use client'

import React, { useState } from 'react'
import {
    Wrench,
    Search,
    Filter,
    Zap,
    Eye,
    EyeOff,
    Clock,
    CheckCircle2,
    XCircle,
    BarChart3,
    ArrowUpDown,
    MoreVertical,
    CheckSquare,
    Square,
    Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminTools() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPhase, setFilterPhase] = useState('all')
    const [selectedTools, setSelectedTools] = useState<number[]>([])

    // Mock data for the 136 tools (representative sample)
    const mockTools = [
        { id: 1, name: 'AI Website Generator', phase: 1, status: 'active', usage: 1240 },
        { id: 2, name: 'Local SEO Structure Enforcer', phase: 1, status: 'active', usage: 890 },
        { id: 12, name: 'AI Local Content Writer', phase: 1, status: 'active', usage: 2105 },
        { id: 51, name: 'AI Niche Finder Tool', phase: 1, status: 'active', usage: 342 },
        { id: 67, name: '1-Click Full Local SEO Automation', phase: 2, status: 'coming-soon', usage: 0 },
        { id: 45, name: 'Geo-Grid Rank Tracker', phase: 2, status: 'active', usage: 1560 },
        { id: 108, name: 'AI Elementor Auto Page Generator', phase: 1, status: 'disabled', usage: 45 },
    ]

    const toggleToolSelection = (id: number) => {
        if (selectedTools.includes(id)) {
            setSelectedTools(selectedTools.filter(tid => tid !== id))
        } else {
            setSelectedTools([...selectedTools, id])
        }
    }

    return (
        <div className="space-y-8">
            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Tools Manager</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Configure, monitoring, and control 136 AI SEO tools</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-900/20 transition-all active:scale-[0.98]">
                        Disable Phase 2
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]">
                        Enable All Tools
                    </button>
                </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tool by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1A1740] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500/50 transition-all"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={filterPhase}
                        onChange={(e) => setFilterPhase(e.target.value)}
                        className="bg-[#1A1740] border border-white/5 rounded-2xl px-6 py-4 text-xs font-black text-white uppercase tracking-widest focus:outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer min-w-[160px]"
                    >
                        <option value="all">All Phases</option>
                        <option value="1">Phase 1</option>
                        <option value="2">Phase 2</option>
                        <option value="3">Phase 3</option>
                    </select>
                </div>
            </div>

            {/* TOOLS TABLE */}
            <div className="bg-[#1A1740]/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-5 w-12">
                                    <button onClick={() => setSelectedTools(selectedTools.length === mockTools.length ? [] : mockTools.map(t => t.id))}>
                                        {selectedTools.length === mockTools.length ? <CheckSquare className="w-4 h-4 text-red-500" /> : <Square className="w-4 h-4 text-slate-700" />}
                                    </button>
                                </th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Tool Info</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Phase</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Usage</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest italic text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockTools.map((tool) => (
                                <tr key={tool.id} className={cn(
                                    "hover:bg-red-600/5 transition-all group",
                                    selectedTools.includes(tool.id) && "bg-red-600/5"
                                )}>
                                    <td className="px-6 py-5">
                                        <button onClick={() => toggleToolSelection(tool.id)}>
                                            {selectedTools.includes(tool.id) ? <CheckSquare className="w-4 h-4 text-red-500" /> : <Square className="w-4 h-4 text-slate-700" />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                                                <Zap className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-white italic tracking-tight uppercase group-hover:text-red-400 transition-colors">{tool.name}</span>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">ID #{tool.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                            Phase {tool.phase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-2">
                                            <BarChart3 className="w-3 h-3 text-slate-600" />
                                            <span className="text-[11px] font-bold text-slate-400">{tool.usage.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={tool.status} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/5">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/5">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'active':
            return (
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-shadow">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Active</span>
                </div>
            )
        case 'disabled':
            return (
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border bg-red-500/10 border-red-500/20 text-red-500">
                    <XCircle className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Disabled</span>
                </div>
            )
        case 'coming-soon':
            return (
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border bg-amber-500/10 border-amber-500/20 text-amber-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Soon</span>
                </div>
            )
        default:
            return null
    }
}
