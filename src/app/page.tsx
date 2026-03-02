'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem('user_type')
    if (type) setUserType(type)
  }, [])

  const handleGetStarted = () => {
    if (userType) {
      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0C29] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Logo */}
        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center font-black text-white italic text-4xl shadow-2xl shadow-purple-500/20 mb-8 border-4 border-white/5">
          S
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          SEO AI Platform
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 leading-relaxed">
          The complete Local SEO toolkit for freelancers, agencies and Rank & Rent builders
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            '136 Tools',
            'Free to Start',
            'No Credit Card'
          ].map(pill => (
            <div key={pill} className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-slate-300">{pill}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleGetStarted}
          className="group relative px-8 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center space-x-3"
        >
          <span>🚀 Get Started Free</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button className="mt-6 text-slate-500 hover:text-white text-sm font-bold transition-colors">
          Already have an account? <span className="text-purple-400 underline underline-offset-4">Sign in →</span>
        </button>
      </div>

      {/* Bottom Stats Grid */}
      <div className="absolute bottom-12 w-full max-w-4xl px-6">
        <div className="grid grid-cols-3 gap-8 py-8 border-t border-white/5">
          {[
            { label: 'Tools', val: '136', icon: '📦' },
            { label: 'User Types', val: '5', icon: '👤' },
            { label: 'Phases', val: '8', icon: '🚀' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-xl font-black text-white tracking-tight">{stat.val} {stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
