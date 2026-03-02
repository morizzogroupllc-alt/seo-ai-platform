'use client'

import React, { useEffect, useState } from 'react'
import { RefreshCw, ShieldCheck, Settings, User } from 'lucide-react'

export default function SystemPage() {
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

    const handleResetUserType = () => {
        localStorage.removeItem('user_type')
        window.location.href = '/onboarding'
    }

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-5xl">
            {/* FIX 2: SYSTEM PAGE - Change User Type (PROFILED SECTION AT TOP) */}
            <div className="bg-[#1A1740] border border-purple-900/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/10 mb-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <User className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Your Profile</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Role:</span>
                        <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-1.5 rounded-full border border-purple-500/30">
                            <ShieldCheck className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-black text-white italic">
                                {userType || 'Not Selected'}
                            </span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleResetUserType}
                            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/40 uppercase tracking-widest text-xs active:scale-[0.98]"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Change User Type</span>
                        </button>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-3">
                            This will reset your journey preferences and return you to onboarding
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center italic uppercase">
                    <Settings className="mr-3 text-purple-500 w-8 h-8" />
                    Platform Settings
                </h1>
                <p className="text-slate-400 font-medium uppercase text-xs tracking-widest">Manage your platform preferences and advanced options</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Advanced Settings Placeholder */}
                <div className="bg-[#1A1740] border border-white/5 rounded-3xl p-10 opacity-30 grayscale flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-white/5 rounded-full mb-4">
                        <Settings className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-400 italic">Advanced Configuration</h3>
                    <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-black">Coming Soon</p>
                </div>
            </div>
        </div>
    )
}
