'use client'

import React, { useEffect, useState, useRef } from 'react'
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
  Home,
  Twitter,
  Linkedin,
  Bell,
  User,
  ShieldCheck,
  LayoutDashboard
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0A0818] text-white selection:bg-purple-500/30 font-sans">

      {/* SECTION 1: NAVBAR */}
      <nav className="sticky top-0 w-full z-50 bg-[#0A0818]/95 backdrop-blur-md border-b border-[#2D2B55] h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-purple-900/20">
            S
          </div>
          <span className="text-sm font-bold uppercase tracking-widest hidden sm:block">SEO AI Platform</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Features', 'Phases', 'Pricing', 'Contact'].map(link => (
            <button
              key={link}
              onClick={() => scrollToSection(link.toLowerCase())}
              className="text-sm font-medium text-gray-400 hover:text-white transition-all"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
          <button
            onClick={handleGetStarted}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-purple-900/20"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* SECTION 2: HERO */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex flex-col items-center text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          {/* Heading Section */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0ms' }}>
            <p className="text-gray-400 text-lg mb-2 font-medium">
              The Complete Local SEO Platform
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight flex flex-col items-center">
              <span className="block text-white">Dominate Your</span>
              <span className="block bg-gradient-to-br from-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent mt-2">Local SEO Journey</span>
              <span className="block text-white mt-2">At Scale</span>
            </h1>
          </div>

          {/* Feature Pills Row */}
          <div className="flex flex-wrap justify-center gap-6 py-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            {['136 AI-Powered Tools', 'Rank & Rent Automation', 'No Credit Card Required'].map(p => (
              <div key={p} className="flex items-center space-x-2 text-sm font-bold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            Find niches, build websites, rank on Google Maps, automate everything — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
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
        </div>
      </section>

      {/* SECTION 3: DASHBOARD PREVIEW */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <h2 className="text-white text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Powerful dashboard. <br /><span className="text-purple-500">Zero learning curve.</span></h2>
        </div>

        {/* FAKE DASHBOARD MOCKUP */}
        <div className="relative group animate-float" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-[#1A1740] rounded-2xl border border-[#4C1D95] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)] aspect-video md:aspect-[21/9]">
            <div className="flex flex-col h-full">
              {/* Mock Topbar */}
              <div className="h-10 bg-[#0F0C29] border-b border-white/5 flex items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center text-[8px] font-black italic text-white">S</div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-slate-300">SEO AI DASHBOARD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Bell className="w-3 h-3 text-slate-500" />
                  <div className="w-5 h-5 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                    <User className="w-2.5 h-2.5 text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 overflow-hidden">
                {/* Mock Sidebar */}
                <div className="w-24 bg-[#0F0C29]/50 border-r border-white/5 p-2 space-y-2 hidden sm:block">
                  {[1, 1, 1, 1, 1].map((_, i) => (
                    <div key={i} className="h-2 w-full bg-white/5 rounded" />
                  ))}
                </div>
                {/* Mock Main Content */}
                <div className="flex-1 p-4 md:p-6 space-y-6 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-white italic uppercase tracking-widest">Welcome back 👋</h4>
                    <div className="text-[8px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded">MARCH 2025</div>
                  </div>

                  {/* Phase Cards */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { l: 'R', v: '17', c: 'purple' },
                      { l: 'B', v: '26', c: 'blue' },
                      { l: 'D', v: '8', c: 'emerald' },
                      { l: 'O', v: '19', c: 'amber' }
                    ].map((p, i) => (
                      <div key={i} className="bg-black/20 border border-white/5 rounded-lg p-3 space-y-2 relative overflow-hidden group/card">
                        <div className={`absolute top-0 right-0 w-12 h-12 bg-${p.c}-500/5 blur-xl`} />
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-black text-${p.c}-400`}>{p.l}</span>
                          <TrendingUp className="w-2 h-2 text-slate-600" />
                        </div>
                        <div className="text-sm font-black text-white">{p.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {[
                      { v: '136', l: 'Tools' },
                      { v: '78', l: 'Sites' },
                      { v: '58', l: 'Ranks' },
                      { v: '0%', l: 'Churn' }
                    ].map((s, i) => (
                      <div key={i} className="text-center space-y-1">
                        <div className="text-[10px] font-black text-white">{s.v}</div>
                        <div className="text-[7px] font-black text-slate-600 uppercase tracking-tighter">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-4 flex flex-col items-center text-center space-y-2 mt-4">
                    <p className="text-[10px] font-black text-white italic tracking-tighter uppercase">Ready to find your niche?</p>
                    <button className="px-4 py-1.5 bg-purple-600 rounded-md text-[8px] font-black uppercase tracking-widest text-white shadow-lg shadow-purple-900/40">
                      Start Research →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Points */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECTION 4: STATS BAR WITH COUNT UP */}
      <StatsSection />

      {/* SECTION 5: WHO IS IT FOR / FEATURE BLOCKS */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white italic mb-16 tracking-tight uppercase animate-fadeInUp">Built for every type of<br /><span className="text-purple-400">Local SEO professional</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
          {[
            { id: 'newbie', icon: '🆕', title: 'Local SEO Newbie', desc: 'Step-by-step guidance from niche research to first ranking' },
            { id: 'pro', icon: '💼', title: 'Client SEO Pro', desc: 'Manage multiple clients with automated reports and audits' },
            { id: 'rank', icon: '🏠', title: 'Rank & Rent', desc: 'Build sites, rank them, rent them. Bulk page generator.' },
            { id: 'agency', icon: '🏢', title: 'Agency', desc: 'White-label reports, team access and bulk site generation' },
            { id: 'auto', icon: '🤖', title: 'Automation', desc: '1-click full SEO campaigns running on autopilot' },
          ].map((card, i) => (
            <div
              key={card.id}
              className="bg-[#1A1740] border border-white/5 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group flex flex-col min-h-[220px] animate-fadeInUp opacity-0"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <span className="text-4xl block mb-6 transition-transform group-hover:scale-110 duration-300">{card.icon}</span>
              <h3 className="text-white font-black text-sm leading-tight mb-3 italic uppercase tracking-wider">{card.title}</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mt-auto">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: 8 PHASES SHOWCASE */}
      <section id="phases" className="py-24 bg-black/20 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight uppercase">Your complete SEO journey<br />in 8 phases</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Follow the journey or jump to any phase — 136 tools at your fingertips</p>
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
              <div
                key={i}
                className="bg-[#1A1740] border border-white/5 p-6 rounded-2xl space-y-4 hover:bg-purple-600/5 transition-colors animate-fadeInUp opacity-0"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><phase.i size={20} /></div>
                  <span className="text-[10px] font-black text-slate-500 bg-white/5 px-2 py-1 rounded-full uppercase tracking-widest">{phase.c}</span>
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase tracking-wider text-xs">{i + 1}. {phase.n}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed mt-1 font-medium">{phase.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: EVERYTHING YOU NEED/FEATURE BLOCKS ALIGNMENT */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight uppercase">Everything you need.<br />Nothing you don't.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="bg-[#120F2D] border border-[#2D2B55] rounded-3xl p-8 flex flex-col min-h-[280px] animate-fadeInLeft">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">Rank & Rent Automation</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Bulk generate 5,000 pages in 10 minutes. Auto internal linking. Auto deploy. The system that changed everything.</p>
          </div>

          <div className="bg-[#120F2D] border border-purple-600 rounded-3xl p-8 flex flex-col min-h-[280px] animate-fadeInUp">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">AI Niche Finder</h3>
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed font-medium">Our proven criteria finds low-competition niches:</p>
              <div className="flex flex-wrap gap-2">
                {['City ≤200k', 'SV ≥200', 'DA ≤15', 'DR ≤10', 'BL ≤150'].map(p => (
                  <span key={p} className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#120F2D] border border-[#2D2B55] rounded-3xl p-8 flex flex-col min-h-[280px] animate-fadeInRight">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">Bring Your Own API Key</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Add your DataForSEO or SerpApi key for unlimited searches. Or use our platform credits. Your choice.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING section */}
      <section id="pricing" className="py-24 px-6 bg-black/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-5xl font-black text-center text-white italic tracking-tight uppercase animate-fadeInUp">Start free. Scale when ready.</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {[
              { name: 'Free', price: '$0', features: ['5 niche searches', '1 website', 'Basic tools'], btn: 'Start Free' },
              { name: 'Starter', price: '$19', features: ['50 niche searches', '3 websites', 'All Phase 1 tools'], btn: 'Get Started' },
              { name: 'Pro', price: '$49', features: ['200 searches', '10 websites', 'All tools + automation'], btn: 'Get Pro', popular: true },
              { name: 'Agency', price: '$99', features: ['500 searches', '50 websites', 'White-label reports'], btn: 'Get Agency' },
            ].map((tier, i) => (
              <div
                key={tier.name}
                className={cn(
                  "bg-[#1A1740] rounded-3xl p-6 border flex flex-col justify-between transition-all animate-fadeInUp opacity-0",
                  tier.popular ? "border-purple-500 ring-2 ring-purple-500/20 md:scale-105 z-10" : "border-white/5"
                )}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{tier.name}</span>
                    {tier.popular && <span className="bg-purple-600 text-white px-2 py-1 rounded-full">Most Popular</span>}
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-slate-500 font-bold">/mo</span>
                  </div>
                  <div className="space-y-3 pt-4">
                    {tier.features.map(f => (
                      <div key={f} className="flex items-start space-x-2 text-xs font-bold text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
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

      {/* SECTION 9: FOOTER — Professional */}
      <footer id="contact" className="bg-[#080617] border-t border-[#1A1740] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* Col 1: Brand */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white italic text-lg shadow-lg">S</div>
              <span className="text-base font-black uppercase tracking-widest">SEO AI Platform</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              The complete Local SEO toolkit for professionals worldwide. Build, rank and rent like a pro.
            </p>
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-xl bg-[#1A1740] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-900 transition-colors">
                <Twitter className="w-5 h-5 fill-current" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#1A1740] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-900 transition-colors">
                <Linkedin className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Platform</h4>
            <div className="flex flex-col space-y-4">
              {['Dashboard', 'Research Phase', 'Build Phase', 'Rank & Rent Tools', 'Pricing'].map(item => (
                <button key={item} className="text-left text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Resources</h4>
            <div className="flex flex-col space-y-4">
              {['Documentation', 'API Keys Setup', 'DataForSEO Guide', 'Video Tutorials', 'Blog'].map(item => (
                <button key={item} className="text-left text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Company</h4>
            <div className="flex flex-col space-y-4">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Changelog'].map(item => (
                <button key={item} className="text-left text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-[#1A1740] pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic tracking-tighter">
            © 2025 SEO AI Platform. All rights reserved.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center space-x-8">
            <TrustBadgeSmall icon={ShieldCheck} label="SSL Secured" />
            <TrustBadgeSmall icon={Zap} label="99.9% Uptime" />
            <TrustBadgeSmall icon={LayoutDashboard} label="Global CDN" />
          </div>

          <div className="flex items-center space-x-6 text-gray-600 text-[10px] font-black uppercase tracking-widest italic tracking-tighter">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </footer>

    </div>
  )
}

function TrustBadgeSmall({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <Icon className="w-3 h-3" />
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
  )
}

function StatsSection() {
  const [counts, setCounts] = useState({ tools: 0, users: 0, phases: 0, cost: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
        animateCounts()
      }
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  const animateCounts = () => {
    const duration = 2000
    const start = performance.now()

    const update = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts({
        tools: Math.floor(easeOut * 136),
        users: Math.floor(easeOut * 5),
        phases: Math.floor(easeOut * 8),
        cost: 0
      })

      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }

  return (
    <section ref={sectionRef} className="bg-[#1A1740] border-y border-white/5 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { val: counts.tools, label: 'Total Tools', icon: '📦' },
          { val: counts.users, label: 'User Types', icon: '👤' },
          { val: counts.phases, label: 'Phases', icon: '🚀' },
          { val: `$${counts.cost}`, label: 'To Start', icon: '💰' },
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
  )
}
