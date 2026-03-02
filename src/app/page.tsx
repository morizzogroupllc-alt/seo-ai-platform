'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2,
  ArrowRight,
  Play,
  Search,
  Wrench,
  Rocket,
  PenTool,
  MapPin,
  Phone,
  TrendingUp,
  ClipboardList,
  Zap,
  Target,
  Key,
  ShieldCheck,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="min-h-screen bg-[#0F0C29] text-white selection:bg-purple-500/30">

      {/* SECTION 1: NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0F0C29]/80 backdrop-blur-md border-b border-purple-500/10 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg">
            S
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">SEO AI Platform</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</button>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-purple-900/20 uppercase tracking-widest"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* SECTION 2: HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">🚀 136 Tools • 8 Phases • Free to Start</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            The Complete<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent italic">Local SEO</span> Platform
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Find niches, build websites, rank on Google Maps, automate everything — all in one platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 py-4">
            {['136 AI-Powered Tools', 'Rank & Rent Automation', 'No Credit Card Required'].map(p => (
              <div key={p} className="flex items-center space-x-2 text-sm font-bold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3"
            >
              <span>🚀 Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-sm">
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="pt-12 flex flex-col items-center space-y-4">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">5,000+ SEO professionals trust us</p>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F0C29] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] font-black shadow-lg">
                  {['JD', 'SK', 'AL', 'MR', 'TK'][i - 1]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS BAR */}
      <section className="bg-[#1A1740] border-y border-white/5 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '136', label: 'Total Tools', icon: '📦' },
            { val: '5', label: 'User Types', icon: '👤' },
            { val: '8', label: 'Phases', icon: '🚀' },
            { val: '$0', label: 'To Start', icon: '💰' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center border-white/5 last:border-0 md:border-r">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-3xl font-black text-white tracking-tighter">{stat.val}</span>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WHO IS IT FOR */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white italic mb-16 tracking-tight">Built for every type of<br /><span className="text-purple-400">Local SEO professional</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { id: 'newbie', icon: '🆕', title: 'Local SEO Newbie', desc: 'Step-by-step guidance from niche research to first ranking' },
            { id: 'pro', icon: '💼', title: 'Client SEO Pro', desc: 'Manage multiple clients with automated reports and audits' },
            { id: 'rank', icon: '🏠', title: 'Rank & Rent', desc: 'Build, rank and monetize local sites at scale' },
            { id: 'agency', icon: '🏢', title: 'Agency', desc: 'White-label reports, team access, bulk automation' },
            { id: 'auto', icon: '🤖', title: 'Automation', desc: '1-click full SEO campaigns running on autopilot' },
          ].map(card => (
            <div key={card.id} className="bg-[#1A1740] border border-white/5 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group">
              <span className="text-4xl block mb-6 transition-transform group-hover:scale-110 duration-300">{card.icon}</span>
              <h3 className="text-white font-black text-lg leading-tight mb-3 italic">{card.title}</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: 8 PHASES SHOWCASE */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight uppercase">Your complete SEO journey<br />in 8 phases</h2>
            <p className="text-slate-500 font-bold">Follow the journey or jump to any phase — 136 tools at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: Search, n: 'Research', c: '17 tools', d: 'Find niches, analyze competitors, discover winning keywords' },
              { i: Wrench, n: 'Build', c: '26 tools', d: 'AI website generator, content writer, Elementor templates' },
              { i: Rocket, n: 'Deploy', c: '8 tools', d: 'One-click deploy to Vercel, Netlify or WordPress' },
              { i: PenTool, n: 'Optimize', c: '19 tools', d: 'On-page SEO, schema markup, technical audit' },
              { i: MapPin, n: 'Authority', c: '34 tools', d: 'GBP management, citations, review automation' },
              { i: Phone, n: 'Convert', c: '5 tools', d: 'Click-to-call, WhatsApp CTA, booking widgets' },
              { i: TrendingUp, n: 'Track', c: '9 tools', d: 'Geo-grid ranking, SERP tracker, analytics' },
              { i: ClipboardList, n: 'Reports', c: '11 tools', d: 'PDF reports, white-label, client dashboard' },
            ].map((phase, i) => (
              <div key={i} className="bg-[#1A1740] border border-white/5 p-6 rounded-2xl space-y-4 hover:bg-purple-600/5 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><phase.i size={20} /></div>
                  <span className="text-[10px] font-black text-slate-500 bg-white/5 px-2 py-1 rounded-full uppercase tracking-widest">{phase.c}</span>
                </div>
                <div>
                  <h4 className="text-white font-black italic">{i + 1}. {phase.n}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed mt-1 font-medium">{phase.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight uppercase">Everything you need.<br />Nothing you don't.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1A1740] border border-white/5 rounded-3xl p-10 space-y-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic">Rank & Rent Automation</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Bulk generate 5,000 pages in 10 minutes. Auto internal linking. Auto deploy. The system that changed everything.</p>
          </div>
          <div className="bg-[#1A1740] border border-purple-500/30 rounded-3xl p-10 space-y-6 shadow-2xl shadow-purple-900/10 transform md:-translate-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic">AI Niche Finder</h3>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm leading-relaxed font-medium">Our proven criteria finds low-competition niches:</p>
              <div className="flex flex-wrap gap-2">
                {['City ≤200k', 'SV ≥200', 'DA ≤15', 'DR ≤10', 'BL ≤150'].map(p => (
                  <span key={p} className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{p}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#1A1740] border border-white/5 rounded-3xl p-10 space-y-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic">Bring Your Own API Key</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Add your DataForSEO or SerpApi key for unlimited searches. Or use our platform credits. Your choice.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING PREVIEW */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-5xl font-black text-center text-white italic tracking-tight uppercase">Start free. Scale when ready.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Free', price: '$0', features: ['5 niche searches', '1 website', 'Basic tools'], btn: 'Start Free' },
              { name: 'Starter', price: '$19', features: ['50 niche searches', '3 websites', 'All Phase 1 tools'], btn: 'Get Started' },
              { name: 'Pro', price: '$49', features: ['200 searches', '10 websites', 'All tools + automation'], btn: 'Get Pro', popular: true },
              { name: 'Agency', price: '$99', features: ['500 searches', '50 websites', 'White-label reports'], btn: 'Get Agency' },
            ].map(tier => (
              <div key={tier.name} className={cn(
                "bg-[#1A1740] rounded-3xl p-8 border flex flex-col justify-between transition-all",
                tier.popular ? "border-purple-500 ring-2 ring-purple-500/20 scale-105 z-10" : "border-white/5"
              )}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-500">{tier.name}</span>
                    {tier.popular && <span className="bg-purple-600 text-white px-3 py-1 rounded-full">Most Popular</span>}
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-slate-500 font-bold">/mo</span>
                  </div>
                  <div className="space-y-3 pt-4">
                    {tier.features.map(f => (
                      <div key={f} className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleGetStarted}
                  className={cn(
                    "mt-10 w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    tier.popular ? "bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-500/20" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  )}
                >
                  {tier.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 p-12 md:p-20 text-center space-y-8 relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-5 pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tight">Ready to dominate<br />local search?</h2>
          <button
            onClick={handleGetStarted}
            className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm"
          >
            🚀 Start For Free Today
          </button>
          <div className="space-y-2">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No credit card • Cancel anytime</p>
            <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest">136 tools ready to use</p>
          </div>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-black/40 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic text-xs">S</div>
              <span className="text-sm font-bold uppercase tracking-widest">SEO AI Platform</span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold">© 2025 All rights reserved</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {['Dashboard', 'Research', 'Build', 'Optimize', 'Pricing', 'Contact'].map(link => (
              <button key={link} className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors tracking-widest">{link}</button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
