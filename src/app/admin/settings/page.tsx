'use client'

import React, { useState, useEffect } from 'react'
import {
    Settings,
    Shield,
    Save,
    Trash2,
    Database,
    Zap,
    Mail,
    Globe,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Download,
    RefreshCw,
    LogOut,
    Bell,
    Layers,
    Info,
    Check,
    AlertTriangle,
    X,
    ChevronRight
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { cn } from '../../../lib/utils'

// --- Types ---

interface PlanLimit {
    plan: string
    niche: number
    keywords: number
    serp: number
    content: number
    websites: number
    price: string
}

interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'warning'
}

export default function PlatformSettingsPage() {
    const [loading, setLoading] = useState(false)
    const [toasts, setToasts] = useState<Toast[]>([])

    // General Settings State
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        platformName: 'SEO AI Platform',
        supportEmail: 'support@seoaiplatform.com',
        platformUrl: 'https://seo-ai-platform.vercel.app',
        showPricing: true,
        allowSignups: true,
        demoMode: true,
        apiKeyOption: true,
        maintenanceBanner: false,
    })

    // Plan Limits State
    const [planLimits, setPlanLimits] = useState<PlanLimit[]>([
        { plan: 'Free', niche: 5, keywords: 10, serp: 5, content: 5, websites: 1, price: '$0' },
        { plan: 'Starter', niche: 50, keywords: 100, serp: 50, content: 50, websites: 3, price: '$19' },
        { plan: 'Pro', niche: 200, keywords: 500, serp: 300, content: 300, websites: 10, price: '$49' },
        { plan: 'Agency', niche: 500, keywords: 2000, serp: 1000, content: 1000, websites: 50, price: '$99' },
        { plan: 'Enterprise', niche: 2000, keywords: 10000, serp: 5000, content: 5000, websites: 999, price: '$199' },
    ])

    // Banner State
    const [banner, setBanner] = useState({
        enabled: false,
        type: 'info' as 'info' | 'warning' | 'success',
        text: 'Welcome to the platform! We are currently optimizing our keyword engine for better results.'
    })

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('platform_settings')
        const savedLimits = localStorage.getItem('plan_limits')
        const savedBanner = localStorage.getItem('announcement_banner')

        if (savedSettings) setSettings(JSON.parse(savedSettings))
        if (savedLimits) setPlanLimits(JSON.parse(savedLimits))
        if (savedBanner) setBanner(JSON.parse(savedBanner))
    }, [])

    const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }

    const saveAllSettings = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            localStorage.setItem('platform_settings', JSON.stringify(settings))
            localStorage.setItem('plan_limits', JSON.stringify(planLimits))
            localStorage.setItem('announcement_banner', JSON.stringify(banner))

            showToast('All changes saved successfully!', 'success')
        } catch (err) {
            showToast('Failed to save settings', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleLimitChange = (index: number, field: keyof PlanLimit, value: string) => {
        const newLimits = [...planLimits]
        if (field === 'price' || field === 'plan') {
            (newLimits[index] as any)[field] = value
        } else {
            (newLimits[index] as any)[field] = parseInt(value) || 0
        }
        setPlanLimits(newLimits)
    }

    // Danger Zone Actions
    const resetUsage = async () => {
        if (!confirm('⚠️ CRITICAL: Reset ALL user usage counters? This cannot be undone.')) return
        setLoading(true)
        try {
            const { error } = await supabase.from('profiles').update({
                usage_niche_finder: 0,
                usage_keywords: 0,
                usage_serp: 0,
                usage_content: 0,
            }).neq('id', '00000000-0000-0000-0000-000000000000') // Placeholder to bypass restriction

            if (error) throw error
            showToast('All usage counters reset successfully!', 'warning')
        } catch (err: any) {
            showToast(err.message || 'Reset failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    const clearLogs = async () => {
        if (!confirm('⚠️ CRITICAL: Delete all API usage history logs? This is irreversible.')) return
        setLoading(true)
        try {
            const { error } = await supabase.from('api_usage').delete().neq('id', '00000000-0000-0000-0000-000000000000')
            if (error) throw error
            showToast('API logs cleared successfully!', 'warning')
        } catch (err: any) {
            showToast(err.message || 'Cleanup failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    const exportUsers = async () => {
        setLoading(true)
        try {
            const { data } = await supabase.from('profiles').select('*')
            if (!data) return

            const csv = data.map(u => `${u.email},${u.plan},${u.role},${u.created_at}`).join('\n')
            const blob = new Blob(['email,plan,role,joined\n' + csv], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`
            a.click()
            showToast('Database export started!', 'success')
        } catch (err) {
            showToast('Export failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    // Components
    const Toggle = ({ value, onToggle, label, sub }: any) => (
        <div className="flex items-center justify-between py-4 group">
            <div className="space-y-0.5">
                <p className="text-white text-xs font-black uppercase tracking-widest group-hover:text-purple-400 transition-colors">{label}</p>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-tighter">{sub}</p>
            </div>
            <button
                onClick={onToggle}
                className={cn(
                    "relative w-12 h-6 rounded-full transition-all duration-300 shadow-inner",
                    value ? 'bg-purple-600 shadow-purple-900/40' : 'bg-gray-800'
                )}
            >
                <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-md",
                    value ? 'left-7' : 'left-1'
                )} />
            </button>
        </div>
    )

    const InputField = ({ label, value, onChange, placeholder, type = "text" }: any) => (
        <div className="space-y-2">
            <label className="text-gray-600 text-[10px] font-black uppercase tracking-widest ml-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full inner-box border border-[#333333] rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
            />
        </div>
    )

    return (
        <div className="space-y-10 animate-fadeIn pb-20">
            {/* SECTION 1: Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                        Platform <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest leading-relaxed">
                        Global configuration and feature control
                    </p>
                </div>
                <button
                    onClick={saveAllSettings}
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 uppercase tracking-widest group disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                    Save All Changes
                </button>
            </div>

            {/* SECTION 2: Grid Config */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT: General Configuration */}
                <div className="glass-card shimmer-border p-8 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20">
                            <Layers className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">General Configuration</h3>
                    </div>

                    <div className="space-y-8">
                        <div className={cn(
                            "p-5 rounded-2xl transition-all border inner-box",
                            settings.maintenanceMode
                                ? "bg-red-950/20 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                                : "border-[rgba(255,255,255,0.06)]"
                        )}>
                            <Toggle
                                label="Maintenance Mode"
                                sub="Disable platform for all users"
                                value={settings.maintenanceMode}
                                onToggle={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            />
                            {settings.maintenanceMode && (
                                <div className="mt-4 flex items-center gap-2 text-red-400 text-[10px] font-black uppercase animate-pulse">
                                    <AlertTriangle size={14} />
                                    ⚠️ Platform is in maintenance mode
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <InputField
                                label="Platform Name"
                                value={settings.platformName}
                                onChange={(val: string) => setSettings({ ...settings, platformName: val })}
                            />
                            <InputField
                                label="Support Email"
                                value={settings.supportEmail}
                                onChange={(val: string) => setSettings({ ...settings, supportEmail: val })}
                            />
                            <InputField
                                label="Platform URL"
                                value={settings.platformUrl}
                                onChange={(val: string) => setSettings({ ...settings, platformUrl: val })}
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] -mr-16 -mt-16" />
                </div>

                {/* RIGHT: Feature Flags */}
                <div className="glass-card shimmer-border p-8 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20">
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">Feature Flags</h3>
                    </div>

                    <div className="divide-y divide-white/5 inner-box rounded-2xl border border-[rgba(255,255,255,0.06)] px-6">
                        <Toggle
                            label="Show Pricing Page"
                            sub="Display pricing on landing page"
                            value={settings.showPricing}
                            onToggle={() => setSettings({ ...settings, showPricing: !settings.showPricing })}
                        />
                        <Toggle
                            label="Allow New Signups"
                            sub="Let new users register accounts"
                            value={settings.allowSignups}
                            onToggle={() => setSettings({ ...settings, allowSignups: !settings.allowSignups })}
                        />
                        <Toggle
                            label="Enable Demo Mode"
                            sub="Show demo badges on toolkit tools"
                            value={settings.demoMode}
                            onToggle={() => setSettings({ ...settings, demoMode: !settings.demoMode })}
                        />
                        <Toggle
                            label="Show API Key Option"
                            sub="Let users add own API keys in settings"
                            value={settings.apiKeyOption}
                            onToggle={() => setSettings({ ...settings, apiKeyOption: !settings.apiKeyOption })}
                        />
                        <Toggle
                            label="Maintenance Banner"
                            sub="Show global site-wide announcement banner"
                            value={settings.maintenanceBanner}
                            onToggle={() => setSettings({ ...settings, maintenanceBanner: !settings.maintenanceBanner })}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-[80px] -ml-16 -mb-16" />
                </div>
            </div>

            {/* SECTION 3: Plan Limits */}
            <div className="glass-card shimmer-border p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">Default API Limits Per Plan</h3>
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1">Monthly search limits per subscription tier</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table w-full text-center">
                        <thead className="border-b border-[rgba(255,255,255,0.06)]">
                            <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                                <th className="pb-6 text-left pl-4 font-black">Subscription Plan</th>
                                <th className="pb-6 font-black">Niche Finder</th>
                                <th className="pb-6 font-black">Keywords</th>
                                <th className="pb-6 font-black">SERP Tracking</th>
                                <th className="pb-6 font-black">Content AI</th>
                                <th className="pb-6 font-black">Websites</th>
                                <th className="pb-6 font-black">Price / Mo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {planLimits.map((limit, idx) => (
                                <tr key={limit.plan} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-6 text-left pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-black text-purple-400 border border-[rgba(255,255,255,0.06)]">
                                                {limit.plan[0]}
                                            </div>
                                            <span className="text-white text-xs font-black uppercase tracking-widest">{limit.plan}</span>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={limit.niche}
                                            onChange={(e) => handleLimitChange(idx, 'niche', e.target.value)}
                                            className="w-20 inner-box border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={limit.keywords}
                                            onChange={(e) => handleLimitChange(idx, 'keywords', e.target.value)}
                                            className="w-20 inner-box border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={limit.serp}
                                            onChange={(e) => handleLimitChange(idx, 'serp', e.target.value)}
                                            className="w-20 inner-box border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={limit.content}
                                            onChange={(e) => handleLimitChange(idx, 'content', e.target.value)}
                                            className="w-20 inner-box border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="text"
                                            value={limit.websites === 999 ? '∞' : limit.websites}
                                            onChange={(e) => handleLimitChange(idx, 'websites', e.target.value === '∞' ? '999' : e.target.value)}
                                            className="w-16 bg-[#121212] border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="text"
                                            value={limit.price}
                                            onChange={(e) => handleLimitChange(idx, 'price', e.target.value)}
                                            className="w-20 bg-[#121212] border border-[#333333] rounded-xl px-3 py-2 text-white text-center text-xs font-bold hover:border-purple-500 focus:border-purple-400 focus:outline-none transition-all"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={saveAllSettings}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-xl border border-[rgba(255,255,255,0.06)] transition-all uppercase tracking-widest active:scale-95"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Update Limits Table
                    </button>
                </div>
            </div>

            {/* SECTION 4: Banner & Danger */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Announcement Banner */}
                <div className="glass-card shimmer-border p-8 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20">
                                <Bell className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Announcement Banner</h3>
                        </div>
                        <button
                            onClick={() => setBanner({ ...banner, enabled: !banner.enabled })}
                            className={cn(
                                "relative w-10 h-5 rounded-full transition-all duration-300",
                                banner.enabled ? 'bg-purple-600' : 'bg-gray-800'
                            )}
                        >
                            <div className={cn(
                                "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200",
                                banner.enabled ? 'left-5.5' : 'left-0.5'
                            )} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-2">
                            {['info', 'warning', 'success'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setBanner({ ...banner, type: t as any })}
                                    className={cn(
                                        "flex-1 py-2 text-[9px] font-black rounded-xl border uppercase tracking-widest transition-all",
                                        banner.type === t
                                            ? t === 'info' ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20" :
                                                t === 'warning' ? "bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-600/20" :
                                                    "bg-green-600 border-green-400 text-white shadow-lg shadow-green-600/20"
                                            : "bg-white/5 border-[rgba(255,255,255,0.06)] text-gray-500 hover:text-white"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-600 text-[9px] font-black uppercase tracking-widest ml-1">Banner Message</label>
                            <textarea
                                value={banner.text}
                                onChange={(e) => setBanner({ ...banner, text: e.target.value })}
                                rows={3}
                                className="w-full bg-[#121212] border border-[#333333] rounded-2xl px-5 py-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all font-medium leading-relaxed"
                                placeholder="Banner message text..."
                            />
                        </div>

                        <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                            <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Eye className="w-3 h-3" /> Live Preview
                            </p>
                            <div className={cn(
                                "p-4 rounded-xl border text-[11px] font-bold flex items-center gap-3 transition-all",
                                banner.type === 'info' ? "bg-blue-600/10 border-blue-500/20 text-blue-400" :
                                    banner.type === 'warning' ? "bg-orange-600/10 border-orange-500/20 text-orange-400" :
                                        "bg-green-600/10 border-green-500/20 text-green-400"
                            )}>
                                <div className="p-1.5 rounded-lg bg-current/10">
                                    {banner.type === 'info' ? <Info size={14} /> : banner.type === 'warning' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                                </div>
                                <span className="flex-1 leading-tight">{banner.text}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] -mr-16 -mt-16" />
                </div>

                {/* Danger Zone */}
                <div className="glass-card shimmer-border border-red-900/30 p-8 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-500/20">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-red-400 font-black text-sm uppercase tracking-widest">⚠️ Danger Zone</h3>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: 'Reset All Usage Counters', sub: 'Clear monthly usage for all users', icon: RefreshCw, action: resetUsage, color: 'text-red-400', btn: 'Reset', type: 'outline' },
                            { label: 'Export All User Data', sub: 'Download complete user database CSV', icon: Download, action: exportUsers, color: 'text-gray-400', btn: 'Export', type: 'gray' },
                            { label: 'Clear API Usage Logs', sub: 'Permanently delete all logs from api_usage', icon: Trash2, action: clearLogs, color: 'text-red-400', btn: 'Clear', type: 'outline' },
                            { label: 'Force Sign Out All Users', sub: 'Invalidate all sessions immediately', icon: LogOut, action: () => confirm('Force logout all users?'), color: 'text-red-600', btn: 'Force Logout', type: 'solid' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 inner-box rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-red-500/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-[rgba(255,255,255,0.06)] group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all">
                                        <item.icon className={cn("w-4 h-4", item.color)} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-white text-[11px] font-black uppercase tracking-widest">{item.label}</p>
                                        <p className="text-gray-600 text-[9px] font-bold uppercase tracking-tight">{item.sub}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={item.action}
                                    className={cn(
                                        "px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg",
                                        item.type === 'outline' ? "border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white" :
                                            item.type === 'gray' ? "bg-white/10 text-white hover:bg-white/20" :
                                                "bg-red-600 text-white hover:bg-red-500 shadow-red-900/40"
                                    )}
                                >
                                    {item.btn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TOAST SYSTEM (Localized) */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={cn(
                            "min-w-[320px] flex items-center gap-4 px-6 py-5 rounded-2xl shadow-2xl border pointer-events-auto animate-in slide-in-from-right-full duration-500 backdrop-blur-3xl",
                            toast.type === 'success' ? "bg-[#1E1E1E]/90 border-green-500/30 text-green-400" :
                                toast.type === 'warning' ? "bg-[#1E1E1E]/90 border-orange-500/30 text-orange-400" :
                                    "bg-[#1E1E1E]/90 border-red-500/30 text-red-400"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                            toast.type === 'success' ? "bg-green-500/10 animate-pulse" :
                                toast.type === 'warning' ? "bg-orange-500/10" :
                                    "bg-red-500/10"
                        )}>
                            {toast.type === 'success' ? <CheckCircle2 size={20} /> : toast.type === 'warning' ? <AlertCircle size={20} /> : <X size={20} />}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">{toast.type.toUpperCase()}</p>
                            <p className="text-xs font-bold text-white/90">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
