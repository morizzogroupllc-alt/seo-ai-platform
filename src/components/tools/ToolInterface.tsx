'use client'

import React, { useState, useEffect } from 'react'
import { ToolConfig } from '@/lib/registry/tools'
import ToolForm from './ToolForm'
import OutputDisplay from './OutputDisplay'
import {
    Sparkles,
    ArrowLeft,
    FileText,
    Globe,
    MapPin,
    Search,
    Zap,
    LucideIcon,
    Palette,
    MessageSquare,
    ShieldCheck,
    RefreshCw,
    PenTool,
    Type,
    LinkIcon,
    Database,
    ImageIcon,
    Activity,
    Smartphone,
    Bug,
    Network,
    Bot,
    ClipboardCheck,
    MonitorCheck,
    FileCheck,
    ShieldAlert,
    MessageSquareQuote,
    Send,
    Tags,
    Eye,
    Copy,
    ClipboardList,
    BarChart3,
    Mail,
    MessageCircle,
    TrendingUp,
    Star,
    Shield,
    Navigation,
    Grid3X3,
    List,
    Users,
    PieChart,
    Map,
    Telescope,
    Key,
    Combine,
    BarChart,
    Link2,
    CheckCircle2,
    Locate,
    Upload,
    ExternalLink,
    Rocket,
    Layers,
    FileStack,
    Link,
    Network,
    Layout,
    ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { generateAIPrompt } from '@/lib/ai/engine'

// Icon Mapping for Client-side rendering
const IconMap: Record<string, LucideIcon> = {
    FileText,
    Globe,
    MapPin,
    Search,
    Zap,
    Palette,
    MessageSquare,
    ShieldCheck,
    RefreshCw,
    PenTool,
    Type,
    LinkIcon,
    Database,
    ImageIcon,
    Activity,
    Smartphone,
    Bug,
    Network,
    Bot,
    ClipboardCheck,
    MonitorCheck,
    FileCheck,
    ShieldAlert,
    MessageSquareQuote,
    Send,
    Tags,
    Eye,
    Copy,
    ClipboardList,
    BarChart3,
    Mail,
    MessageCircle,
    TrendingUp,
    Star,
    Shield,
    Navigation,
    Grid3X3,
    List,
    Users,
    PieChart,
    Map,
    Telescope,
    Key,
    Combine,
    BarChart,
    Link2,
    CheckCircle2,
    Locate,
    Upload,
    ExternalLink,
    Rocket,
    Layers,
    FileStack,
    Link,
    Network,
    Layout,
    ShieldCheck
}

interface ToolInterfaceProps {
    tool: ToolConfig
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
    const [loading, setLoading] = useState(false)
    const [output, setOutput] = useState('')
    const [profileId, setProfileId] = useState<string | null>(null)

    const ToolIcon = IconMap[tool.icon] || FileText

    useEffect(() => {
        const lastActive = localStorage.getItem('last_active_profile')
        if (lastActive) setProfileId(lastActive)

        const handleProfileChange = (e: any) => {
            setProfileId(e.detail.id.toString())
        }
        window.addEventListener('profile_changed', handleProfileChange)
        return () => window.removeEventListener('profile_changed', handleProfileChange)
    }, [])

    const handleGenerate = async (formData: any) => {
        setLoading(true)
        try {
            const prompt = await generateAIPrompt(tool.id, formData, profileId || undefined)
            await new Promise(r => setTimeout(r, 2000))
            setOutput(`[AI SIMULATION]\n\nPrompt Generated:\n${prompt}\n\nThis is where the real AI response from OpenAI/Claude will appear in the final module.`)
        } catch (err) {
            console.error(err)
            setOutput('Error generating content. Please check console.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 pb-32">
            <div className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-[#0f172a] to-[#020617] overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-indigo-400 shadow-xl backdrop-blur-xl">
                                <ToolIcon size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">{tool.name}</h1>
                                <p className="text-slate-400 text-lg font-medium">{tool.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full h-fit self-start md:self-center">
                        <Sparkles size={14} className="text-indigo-400 fill-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Powered by AI Engine v1</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm">
                    <ToolForm tool={tool} isLoading={loading} onSubmit={handleGenerate} />
                    {output && <OutputDisplay content={output} format={tool.outputFormat} />}
                </div>
            </div>
        </div>
    )
}
