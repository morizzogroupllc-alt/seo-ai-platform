'use client'

import React, { useState } from 'react'
import {
    Settings,
    Shield,
    Bell,
    Lock,
    Globe,
    Mail,
    Zap,
    Eye,
    Save,
    AlertTriangle,
    CheckCircle2,
    ToggleLeft,
    ToggleRight,
    Palette
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminSettings() {
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    const [showPricing, setShowPricing] = useState(true)
    const [allowSignups, setAllowSignups] = useState(true)
    const [demoMode, setDemoMode] = useState(false)
    const [bannerEnabled, setBannerEnabled] = useState(true)
    const [bannerType, setBannerType] = useState('info')

    return (
        <div className="space-y-10 pb-20">
            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Platform Settings</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Central control for global features and limits</p>
                </div>
                <button className="flex items-center space-x-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all active:scale-[0.98]">
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* GENERAL SETTINGS */}
                <SettingsSection title="General Configuration" icon={Settings}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-red-600/5 border border-red-500/20 rounded-2xl">
                            <div className="space-y-1">
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Maintenance Mode</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Disable platform access for all users</p>
                            </div>
                            <button onClick={() => setMaintenanceMode(!maintenanceMode)}>
                                {maintenanceMode ? <ToggleRight className="w-8 h-8 text-red-500" /> : <ToggleLeft className="w-8 h-8 text-slate-700" />}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <InputGroup label="Platform Name" placeholder="SEO AI Platform" icon={Globe} />
                            <InputGroup label="Support Email" placeholder="support@morizzogroupllc.com" icon={Mail} />
                        </div>
                    </div>
                </SettingsSection>

                {/* FEATURE FLAGS */}
                <SettingsSection title="Feature Flags" icon={Zap}>
                    <div className="grid grid-cols-1 gap-4">
                        <ToggleItem
                            label="Show Pricing Page"
                            active={showPricing}
                            onClick={() => setShowPricing(!showPricing)}
                        />
                        <ToggleItem
                            label="Allow New Signups"
                            active={allowSignups}
                            onClick={() => setAllowSignups(!allowSignups)}
                        />
                        <ToggleItem
                            label="Enable Demo Mode"
                            active={demoMode}
                            onClick={() => setDemoMode(!demoMode)}
                        />
                    </div>
                </SettingsSection>

                {/* API LIMITS (Simplified) */}
                <SettingsSection title="Default Plan Limits" icon={Shield}>
                    <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                        <table className="w-full text-left text-[10px] uppercase font-black tracking-widest">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/5">
                                    <th className="px-4 py-3 text-slate-500 italic">Plan</th>
                                    <th className="px-4 py-3 text-slate-500 italic">Daily Limit</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { p: 'Free', l: '5 calls' },
                                    { p: 'Starter', l: '50 calls' },
                                    { p: 'Pro', l: '250 calls' },
                                    { p: 'Agency', l: 'Unlimited' }
                                ].map((item) => (
                                    <tr key={item.p}>
                                        <td className="px-4 py-3 text-white">{item.p}</td>
                                        <td className="px-4 py-3 text-slate-400">{item.l}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-red-500 hover:underline">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SettingsSection>

                {/* ANNOUNCEMENT BANNER */}
                <SettingsSection title="Announcement Banner" icon={Bell}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enable Status Banner</h4>
                            <button onClick={() => setBannerEnabled(!bannerEnabled)}>
                                {bannerEnabled ? <ToggleRight className="w-8 h-8 text-emerald-500" /> : <ToggleLeft className="w-8 h-8 text-slate-700" />}
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                {['info', 'warning', 'success'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setBannerType(t)}
                                        className={cn(
                                            "flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                                            bannerType === t ? "bg-red-600/10 border-red-500 text-red-500 shadow-lg shadow-red-900/20" : "bg-white/5 border-white/5 text-slate-600 hover:bg-white/10"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Banner message text..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-red-500/50 min-h-[80px]"
                            />
                        </div>
                    </div>
                </SettingsSection>
            </div>
        </div>
    )
}

function SettingsSection({ title, icon: Icon, children }: any) {
    return (
        <div className="bg-[#1A1740]/50 border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-600/10 rounded-2xl">
                    <Icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-sm font-black text-white italic uppercase tracking-widest">{title}</h3>
            </div>
            {children}
        </div>
    )
}

function InputGroup({ label, placeholder, icon: Icon }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600 group-focus-within:text-red-500 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-red-500/50 transition-all font-medium"
                />
            </div>
        </div>
    )
}

function ToggleItem({ label, active, onClick }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <button onClick={onClick}>
                {active ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-700" />}
            </button>
        </div>
    )
}
