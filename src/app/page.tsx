'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/5 py-5 cursor-pointer"
      onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold text-sm pr-4">{question}</h3>
        <span className={`text-purple-400 text-xl transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </div>
      {open && (
        <p className="text-gray-400 text-sm mt-3 leading-relaxed animate-fadeIn">
          {answer}
        </p>
      )}
    </div>
  )
}

const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView] as const
}

export default function LandingPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem('user_type')
    if (type) setUserType(type)
  }, [])

  const badges = [
    "🏆 #1 Local SEO Platform",
    "🚀 136 AI-Powered Tools",
    "📍 Rank & Rent Automation",
    "💰 Free To Start",
    "🤖 AI-Powered SEO"
  ]
  const [badgeIndex, setBadgeIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIndex(i => (i + 1) % badges.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    router.push('/signup')
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // useInView refs for section animations
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()
  const [ref4, inView4] = useInView()
  const [ref5, inView5] = useInView()
  const [ref6, inView6] = useInView()
  const [ref7, inView7] = useInView()
  const [ref8, inView8] = useInView()
  const [ref9, inView9] = useInView()
  const [ref10, inView10] = useInView()

  const sectionAnim = (inView: boolean) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
    boxShadow: inView ? '0 0 80px rgba(168,85,247,0.05) inset' : 'none'
  })

  return (
    <div className={poppins.className}>
      <div className="min-h-screen text-white selection:bg-purple-500/30" style={{ background: '#0F0C29', position: 'relative' }}>

        {/* Animated dot grid background */}
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'dotPulse 4s ease-in-out infinite'
        }} />

        {/* SECTION 1: NAVBAR */}
        <nav className="sticky top-0 w-full z-50 backdrop-blur-md border-b border-[#2D2B55] h-16 flex items-center justify-between px-6 md:px-12" style={{ background: 'rgba(15,12,41,0.95)' }}>
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
            <button
              onClick={() => router.push('/login')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-purple-900/20"
            >
              Get Started Free
            </button>
          </div>
        </nav>

        {/* SECTION 2: HERO */}
        <section ref={ref1 as React.RefObject<HTMLElement>} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex flex-col items-center text-center px-6" style={sectionAnim(inView1)}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            top: '20%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'pulse 4s ease-in-out infinite'
          }} />

          <div className="relative z-10 max-w-5xl">
            {/* Heading Section */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0ms', position: 'relative' }}>
              {/* Purple glow behind H1 */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '800px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              {/* Cycling Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
                <span className="text-purple-300 text-xs font-medium animate-fadeIn" key={badgeIndex}>
                  {badges[badgeIndex]}
                </span>
              </div>
              <p className="text-gray-400 text-lg mb-2 font-medium">
                The Complete Local SEO Platform
              </p>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight flex flex-col items-center relative z-10">
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

            {/* STAR RATINGS TRUST BAR */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs">Rated 4.9/5</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs">5,000+ Professionals</span>
              </div>
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
        <section ref={ref2 as React.RefObject<HTMLElement>} className="py-16 px-8 max-w-6xl mx-auto" style={sectionAnim(inView2)}>
          <div className="text-center space-y-4 mb-12 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <h2 className="text-white text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Powerful dashboard. <br /><span className="text-purple-500">Zero learning curve.</span></h2>
          </div>

          {/* FAKE DASHBOARD MOCKUP — FIX 8: max-w-5xl w-full mx-auto */}
          <div className="relative group max-w-5xl mx-auto w-full" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-[#1A1740] rounded-2xl border border-[#4C1D95] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.25)]">
              <div className="flex flex-col h-full uppercase italic">
                {/* ━━━ TOPBAR (h-12) ━━━ */}
                <div className="h-12 bg-[#0D0B1F] border-b border-[#2D2B55] flex items-center px-4 justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-purple-600 rounded flex items-center justify-center text-[10px] font-black italic text-white shadow-lg">S</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">SEO AI Platform</span>
                  </div>
                  <div className="text-[10px] font-black tracking-[0.3em] text-purple-400">DASHBOARD</div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm">🔔</span>
                    <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center text-[10px] font-black text-white border border-purple-500/30">L</div>
                  </div>
                </div>

                {/* ━━━ MAIN AREA (flex) ━━━ */}
                <div className="flex flex-1 overflow-hidden">
                  {/* LEFT SIDEBAR (w-36) */}
                  <div className="w-36 bg-[#080617] border-r border-[#1A1740] p-3 h-[320px] hidden sm:flex flex-col">
                    <div className="space-y-1.5 flex-1">
                      {[
                        { icon: '🏠', n: 'Dashboard', active: true },
                        { icon: '🔍', n: 'Research' },
                        { icon: '🏗️', n: 'Build' },
                        { icon: '🚀', n: 'Deploy' },
                        { icon: '📝', n: 'Optimize' },
                        { icon: '📍', n: 'Authority' },
                        { icon: '📞', n: 'Convert' },
                        { icon: '📈', n: 'Track' },
                        { icon: '📋', n: 'Reports' },
                        { icon: '⚡', n: 'Automation' }
                      ].map((item, i) => (
                        <div key={i} className={cn(
                          "flex items-center space-x-2 py-1.5 px-2 rounded text-[9px] font-black transition-colors",
                          item.active ? "bg-purple-700/40 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}>
                          <span>{item.icon}</span>
                          <span className="tracking-tighter capitalize">{item.n.toLowerCase()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex items-center space-x-2 py-1.5 px-2 rounded text-[9px] font-black text-gray-400">
                        <span>⚙️</span>
                        <span className="tracking-tighter">System</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CONTENT (flex-1) */}
                  <div className="flex-1 bg-[#0F0C1F] p-4 overflow-hidden flex flex-col">
                    {/* Row 1 — Welcome bar */}
                    <div className="flex items-center">
                      <h4 className="text-sm font-semibold text-white italic tracking-widest">Welcome back 👋</h4>
                      <span className="ml-2 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[8px] font-black text-purple-400 uppercase tracking-widest">Local SEO Newbie</span>
                    </div>

                    {/* Row 2 — 8 Phase cards (grid 4×2) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                      {[
                        { i: '🔍', n: 'Research', t: '17 tools' },
                        { i: '🏗️', n: 'Build', t: '26 tools' },
                        { i: '🚀', n: 'Deploy', t: '8 tools' },
                        { i: '📝', n: 'Optimize', t: '19 tools' },
                        { i: '📍', n: 'Authority', t: '34 tools' },
                        { i: '📞', n: 'Convert', t: '5 tools' },
                        { i: '📈', n: 'Track', t: '9 tools' },
                        { i: '📋', n: 'Reports', t: '11 tools' }
                      ].map((p, i) => (
                        <div key={i} className="bg-[#1A1740] border border-[#2D2B55] rounded-lg p-2 flex items-center gap-2 relative overflow-hidden group/mcard transition-colors hover:border-purple-500/50">
                          <span className="text-lg">{p.i}</span>
                          <div className="flex flex-col">
                            <span className="text-white text-[11px] font-semibold">{p.n}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-purple-400 text-[9px]">{p.t}</span>
                              <span className="text-purple-300 text-[9px]">Start →</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Row 3 — Stats (grid 4 cols) */}
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {[
                        { v: '136', l: '📦 Total Tools' },
                        { v: '78', l: '✅ Free Tools' },
                        { v: '58', l: '💰 Paid Tools' },
                        { v: '0%', l: '📈 Progress' }
                      ].map((s, i) => (
                        <div key={i} className="bg-[#1A1740] rounded-lg p-2 text-center border border-white/5">
                          <div className="text-purple-400 text-xs font-black tracking-tighter mb-0.5">{s.v}</div>
                          <div className="text-gray-400 text-[8px] font-semibold leading-none">{s.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* Row 4 — CTA Banner */}
                    <div className="mt-auto bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-[10px] font-black italic tracking-tighter uppercase">Ready to find your niche? 🎯</span>
                      </div>
                      <button className="border border-white text-white bg-transparent hover:bg-white/10 text-[10px] px-3 py-1 rounded-full transition-all">
                        Start Research →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Points */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/15 blur-3xl pointer-events-none" />
          </div>
        </section>

        {/* SECTION 4: STATS BAR WITH COUNT UP */}
        <StatsSection />

        {/* SECTION 5: WHO IS IT FOR */}
        <section ref={ref3 as React.RefObject<HTMLElement>} id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden" style={sectionAnim(inView3)}>
          <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3 text-center">WHO IS IT FOR</p>
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-4 tracking-tight uppercase">Built for every type of<br /><span className="text-purple-400">Local SEO professional</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            {[
              { icon: '🆕', title: 'Local SEO Newbie', desc: 'Step-by-step guidance from niche research to first ranking' },
              { icon: '💼', title: 'Client SEO Pro', desc: 'Manage multiple clients with automated reports and audits' },
              { icon: '🏠', title: 'Rank & Rent', desc: 'Build, rank and monetize local sites at scale' },
              { icon: '🏢', title: 'Agency', desc: 'White-label reports, team access, bulk automation' },
              { icon: '🤖', title: 'Automation', desc: '1-click full SEO campaigns running on autopilot' },
            ].map((card, i) => (
              <div key={i}
                className="bg-[#1A1740] border border-white/5 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: 8 PHASES SHOWCASE — FIX 1 */}
        <section ref={ref4 as React.RefObject<HTMLElement>} id="phases" className="py-24 bg-black/20 scroll-mt-20 overflow-hidden" style={sectionAnim(inView4)}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">THE JOURNEY</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Your complete SEO journey<br />in 8 phases</h2>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Follow the journey or jump to any phase — 136 tools at your fingertips</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { icon: '🔍', num: '1', title: 'Research', tools: '17', desc: 'Find niches, analyze competitors, discover winning keywords' },
                { icon: '🏗️', num: '2', title: 'Build', tools: '26', desc: 'AI website generator, content writer, Elementor templates' },
                { icon: '🚀', num: '3', title: 'Deploy', tools: '8', desc: 'One-click deploy to Vercel, Netlify or WordPress' },
                { icon: '📝', num: '4', title: 'Optimize', tools: '19', desc: 'On-page SEO, schema markup, technical audit' },
                { icon: '📍', num: '5', title: 'Authority', tools: '34', desc: 'GBP management, citations, review automation' },
                { icon: '📞', num: '6', title: 'Convert', tools: '5', desc: 'Click-to-call, WhatsApp CTA, booking widgets' },
                { icon: '📈', num: '7', title: 'Track', tools: '9', desc: 'Geo-grid ranking, SERP tracker, analytics' },
                { icon: '📋', num: '8', title: 'Reports', tools: '11', desc: 'PDF reports, white-label, client dashboard' },
              ].map((phase, i) => (
                <div key={i}
                  className="bg-[#1A1740] border border-white/5 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: i * 0.1 + 's' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{phase.icon}</span>
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                      {phase.tools} tools
                    </span>
                  </div>
                  <div className="text-gray-600 text-xs font-bold mb-1">{phase.num}.</div>
                  <h3 className="text-white font-bold mb-2">{phase.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FEATURES — FIX 2: 6 cards */}
        <section ref={ref5 as React.RefObject<HTMLElement>} className="py-24 px-6 max-w-7xl mx-auto overflow-hidden" style={sectionAnim(inView5)}>
          <div className="text-center mb-16">
            <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Everything you need.<br />Nothing you don&apos;t.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { icon: '🏠', color: '#A855F7', title: 'Rank & Rent Automation', desc: 'Bulk generate 5,000 pages in 10 minutes. Auto internal linking. Auto deploy. The system that changed everything.' },
              { icon: '🎯', color: '#3B82F6', title: 'AI Niche Finder', desc: 'Our proven criteria finds low-competition niches: City ≤200k • SV ≥200 • DA ≤15 • DR ≤10 • BL ≤150' },
              { icon: '🔑', color: '#10B981', title: 'Bring Your Own API Key', desc: 'Add your DataForSEO or SerpApi key for unlimited searches. Or use our platform credits. Your choice.' },
              { icon: '📊', color: '#F59E0B', title: 'SERP Tracking', desc: 'Track keyword rankings daily with geo-grid maps. See exactly where you rank in every city block.' },
              { icon: '🤖', color: '#EF4444', title: 'AI Content Writer', desc: 'Generate complete websites, blog posts, service pages and meta tags optimized for local search intent.' },
              { icon: '📋', color: '#8B5CF6', title: 'White Label Reports', desc: 'Send branded PDF reports to clients automatically. Custom logo, colors and domain. Agency-ready.' },
            ].map((f, i) => (
              <div key={i}
                className="bg-[#1A1740] border border-white/5 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                style={{ boxShadow: 'none' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{
                    background: f.color + '20',
                    border: '1px solid ' + f.color + '30'
                  }}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO DEMO SECTION */}
        <section ref={ref6 as React.RefObject<HTMLElement>} className="py-20 px-6" style={sectionAnim(inView6)}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">
              SEE IT IN ACTION
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              How To Build & Rank Local Sites
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                With SEO AI Platform
              </span>
            </h2>
            <p className="text-gray-400 mb-10">
              Watch our complete dashboard walkthrough and see how easy it is
              to generate, rank and monetize local sites in minutes.
            </p>

            {/* Video placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-[#1A1740] aspect-video flex items-center justify-center cursor-pointer group hover:border-purple-500/40 transition-all">
              {/* Thumbnail bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all shadow-lg shadow-purple-600/50">
                  <span className="text-white text-3xl ml-1">▶</span>
                </div>
                <div>
                  <p className="text-white font-black text-xl">Complete Walkthrough</p>
                  <p className="text-gray-400 text-sm">Building Local Sites FAST!</p>
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                8:45
              </div>
            </div>

            {/* 3 points below video */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { icon: '⚡', title: 'Quick Setup', desc: 'Get started in under 5 minutes' },
                { icon: '🤖', title: 'AI-Powered', desc: 'Watch AI generate complete SEO content' },
                { icon: '🚀', title: 'One-Click Deploy', desc: 'Deploy your site instantly to cloud' },
              ].map(item => (
                <div key={item.title} className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: PRICING — FIX 3 */}
        <section ref={ref7 as React.RefObject<HTMLElement>} id="pricing" className="py-24 px-6 bg-black/20 scroll-mt-20" style={sectionAnim(inView7)}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">PRICING</p>
              <h2 className="text-3xl md:text-4xl font-black text-center text-white tracking-tight uppercase">Start free. Scale when ready.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {[
                {
                  name: 'Free', price: '$0', period: '/mo', color: '#6B7280',
                  features: ['5 niche searches', '1 website', 'Basic tools'],
                  btn: 'Start Free',
                  btnStyle: 'border border-white/10 text-white hover:bg-white/5'
                },
                {
                  name: 'Starter', price: '$19', period: '/mo', color: '#3B82F6',
                  features: ['50 niche searches', '3 websites', 'All Phase 1 tools'],
                  btn: 'Get Started',
                  btnStyle: 'border border-blue-500/50 text-blue-400 hover:bg-blue-500/10'
                },
                {
                  name: 'Pro', price: '$49', period: '/mo', color: '#A855F7',
                  popular: true,
                  features: ['200 searches', '10 websites', 'All tools + automation'],
                  btn: 'Get Pro',
                  btnStyle: 'bg-purple-600 hover:bg-purple-500 text-white'
                },
                {
                  name: 'Agency', price: '$99', period: '/mo', color: '#10B981',
                  features: ['500 searches', '50 websites', 'White-label reports'],
                  btn: 'Get Agency',
                  btnStyle: 'border border-green-500/50 text-green-400 hover:bg-green-500/10'
                },
              ].map((plan, i) => (
                <div key={i}
                  className="bg-[#1A1740] border border-white/5 rounded-2xl p-6 relative hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  style={{
                    borderColor: plan.popular ? plan.color + '40' : ''
                  }}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm font-bold mb-1" style={{ color: plan.color }}>
                      {plan.name}
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span style={{ color: plan.color }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleGetStarted}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${plan.btnStyle}`}>
                    {plan.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIX 4: TESTIMONIALS BEFORE FAQ — FIX 5: Marquee slider */}
        <section ref={ref8 as React.RefObject<HTMLElement>} className="py-20 px-6" style={sectionAnim(inView8)}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">TESTIMONIALS</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Trusted by SEO Professionals
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Everywhere
                </span>
              </h2>
            </div>

            <div className="overflow-hidden relative mt-10">
              <div className="flex gap-6 animate-marquee">
                {[...[
                  { name: 'Ahmad K.', role: 'Rank & Rent Builder', avatar: 'A', color: 'bg-purple-600', text: 'Built 12 local sites in one week. 3 are already ranking page 1. Niche finder alone is worth it.' },
                  { name: 'Sarah M.', role: 'Local SEO Agency', avatar: 'S', color: 'bg-blue-600', text: 'Managing 20+ clients automated. White-label reports go out every week. Clients love it.' },
                  { name: 'Marcus T.', role: 'SEO Freelancer', avatar: 'M', color: 'bg-green-600', text: 'AI content writer produces better copy than most humans. Sites rank fast with schema generator.' },
                  { name: 'Priya R.', role: 'Digital Marketer', avatar: 'P', color: 'bg-orange-600', text: '0 to 5 paying clients in 2 months using Rank & Rent automation. ROI calculator is genius.' },
                  { name: 'James L.', role: 'SEO Consultant', avatar: 'J', color: 'bg-pink-600', text: 'Built for local SEO specifically. GBP management alone saves me 10 hours a week.' },
                  { name: 'Zara A.', role: 'Agency Owner', avatar: 'Z', color: 'bg-yellow-600', text: 'Scaled from 5 to 30 clients without hiring. Bulk automation changed everything.' },
                  { name: 'Omar S.', role: 'Freelance SEO', avatar: 'O', color: 'bg-red-600', text: 'Phase system is brilliant. Follow it step by step and you cannot fail at local SEO.' },
                  { name: 'Lisa K.', role: 'Rank & Rent Pro', avatar: 'L', color: 'bg-indigo-600', text: 'Deploy to Vercel in one click. Sites load in under 1 second. Google loves them.' },
                ], ...[
                  { name: 'Ahmad K.', role: 'Rank & Rent Builder', avatar: 'A', color: 'bg-purple-600', text: 'Built 12 local sites in one week. 3 are already ranking page 1. Niche finder alone is worth it.' },
                  { name: 'Sarah M.', role: 'Local SEO Agency', avatar: 'S', color: 'bg-blue-600', text: 'Managing 20+ clients automated. White-label reports go out every week. Clients love it.' },
                  { name: 'Marcus T.', role: 'SEO Freelancer', avatar: 'M', color: 'bg-green-600', text: 'AI content writer produces better copy than most humans. Sites rank fast with schema generator.' },
                  { name: 'Priya R.', role: 'Digital Marketer', avatar: 'P', color: 'bg-orange-600', text: '0 to 5 paying clients in 2 months using Rank & Rent automation. ROI calculator is genius.' },
                  { name: 'James L.', role: 'SEO Consultant', avatar: 'J', color: 'bg-pink-600', text: 'Built for local SEO specifically. GBP management alone saves me 10 hours a week.' },
                  { name: 'Zara A.', role: 'Agency Owner', avatar: 'Z', color: 'bg-yellow-600', text: 'Scaled from 5 to 30 clients without hiring. Bulk automation changed everything.' },
                  { name: 'Omar S.', role: 'Freelance SEO', avatar: 'O', color: 'bg-red-600', text: 'Phase system is brilliant. Follow it step by step and you cannot fail at local SEO.' },
                  { name: 'Lisa K.', role: 'Rank & Rent Pro', avatar: 'L', color: 'bg-indigo-600', text: 'Deploy to Vercel in one click. Sites load in under 1 second. Google loves them.' },
                ]].map((t, i) => (
                  <div key={i}
                    className="flex-shrink-0 w-72 bg-[#1A1740] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{t.name}</div>
                        <div className="text-gray-500 text-xs">{t.role}</div>
                      </div>
                      <div className="ml-auto flex">
                        {'★★★★★'.split('').map((s, j) => (
                          <span key={j} className="text-yellow-400 text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section ref={ref9 as React.RefObject<HTMLElement>} className="py-20 px-6 bg-[#0a0918]" style={sectionAnim(inView9)}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 mt-3">
                Quick answers to common questions
              </p>
            </div>

            {/* FAQ Items */}
            {[
              {
                q: 'How fast can I start ranking?',
                a: 'Most users see results within 30-60 days. Our AI generates complete SEO-optimized content and our tools handle everything from research to deployment.'
              },
              {
                q: 'Do I need my own API keys?',
                a: 'No! Platform API keys are included. But you can add your own DataForSEO or Gemini keys for unlimited usage beyond your plan limits.'
              },
              {
                q: 'What is Rank & Rent?',
                a: 'Build local business websites, rank them on Google, then rent the leads to local businesses. Our automation tools make this scalable at any level.'
              },
              {
                q: 'Can I use this for client SEO?',
                a: 'Absolutely! Agency plan includes white-label reports, bulk automation, and multi-client management tools.'
              },
              {
                q: 'Is there a free plan?',
                a: 'Yes! Free plan includes 5 niche searches, 1 website, and access to basic Phase 1 tools. No credit card required to start.'
              },
              {
                q: 'What happens to my sites if I cancel?',
                a: 'Your deployed sites remain live forever. We never take down sites you have already published.'
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* FOOTER — FIX 6: social icons */}
        <footer ref={ref10 as React.RefObject<HTMLElement>} className="bg-[#050410] border-t border-white/5 py-16 px-6" style={sectionAnim(inView10)}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              {/* Col 1: Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                  <span className="text-white font-bold">SEO AI Platform</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  The complete Local SEO toolkit for freelancers, agencies and Rank & Rent builders.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: '𝕏', label: 'Twitter' },
                    { icon: 'in', label: 'LinkedIn' },
                    { icon: 'f', label: 'Facebook' },
                    { icon: '📸', label: 'Instagram' },
                  ].map(s => (
                    <div key={s.label}
                      className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 cursor-pointer transition-all text-sm"
                      title={s.label}>
                      {s.icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2: Platform */}
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Platform</h4>
                {['Dashboard', 'Research Phase', 'Build Phase', 'Rank & Rent Tools', 'Pricing'].map(l => (
                  <div key={l}
                    className="text-gray-500 text-sm mb-2 hover:text-purple-400 cursor-pointer transition-colors">
                    {l}
                  </div>
                ))}
              </div>

              {/* Col 3: Resources */}
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Resources</h4>
                {['Documentation', 'API Keys Setup', 'DataForSEO Guide', 'Video Tutorials', 'Blog', 'Changelog'].map(l => (
                  <div key={l}
                    className="text-gray-500 text-sm mb-2 hover:text-purple-400 cursor-pointer transition-colors">
                    {l}
                  </div>
                ))}
              </div>

              {/* Col 4: Company */}
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Become an Affiliate'].map(l => (
                  <div key={l}
                    className="text-gray-500 text-sm mb-2 hover:text-purple-400 cursor-pointer transition-colors">
                    {l}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                © 2025 SEO AI Platform. All rights reserved.
              </p>
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                  <span key={l}
                    className="text-gray-600 text-xs hover:text-gray-400 cursor-pointer transition-colors">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
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
