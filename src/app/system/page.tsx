'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, User, RefreshCw, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SystemPage() {
    const router = useRouter()
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
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
                    <Settings className="mr-3 text-purple-500 w-8 h-8" />
                    System Settings
                </h1>
                <p className="text-slate-400 font-medium">Manage your profile and platform preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Profile Section */}
                <div className="bg-[#1A1740] border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Your Profile</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-5 bg-black/20 rounded-2xl border border-white/5">
                            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Current User Type</span>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white bg-purple-600/20 px-4 py-1.5 rounded-full border border-purple-500/30">
                                    {userType || 'Not Selected'}
                                </span>
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                Need to change how you use the platform? You can reset your onboarding and re-select your user type anytime.
                            </p>
                            <button
                                onClick={handleResetUserType}
                                className="w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/10 transition-all text-xs uppercase tracking-widest active:scale-[0.98]"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Change User Type</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Placeholder for other settings */}
                <div className="bg-[#1A1740] border border-white/5 rounded-3xl p-8 opacity-40 grayscale flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-white/5 rounded-full mb-4">
                        <Settings className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-400">Advanced Settings</h3>
                    <p className="text-xs text-slate-500 mt-2">Coming Soon</p>
                </div>
            </div>
        </div>
    )
}
