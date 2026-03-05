'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
import { CheckCircle2, ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

// ── Card hover handlers (FIX 12: visible purple border by default) ──────────
const cardBase: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0D1B2E, #0A1628)',
  border: '1px solid rgba(168,85,247,0.2)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
}
const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.border = '1px solid rgba(168,85,247,0.6)'
  e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.25), 0 0 80px rgba(59,130,246,0.1)'
  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
}
const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.border = '1px solid rgba(168,85,247,0.2)'
  e.currentTarget.style.boxShadow = 'none'
  e.currentTarget.style.transform = 'translateY(0) scale(1)'
}

// ── Footer link hover ────────────────────────────────────────────────────────
const FooterLink = ({ label }: { label: string }) => (
  <span
    style={{ color: '#64748B', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'inline-block', marginBottom: '8px' }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg,#A855F7,#3B82F6)'
      e.currentTarget.style.webkitBackgroundClip = 'text'
        ; (e.currentTarget.style as any).WebkitTextFillColor = 'transparent'
      e.currentTarget.style.backgroundClip = 'text'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'none'
        ; (e.currentTarget.style as any).WebkitTextFillColor = '#64748B'
      e.currentTarget.style.backgroundClip = 'unset'
    }}>
    {label}
  </span>
)

// ── Social SVG icons (FIX 11) ───────────────────────────────────────────────
const socialIcons = [
  { label: 'Twitter/X', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { label: 'LinkedIn', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { label: 'Facebook', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { label: 'Instagram', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg> },
  { label: 'WhatsApp', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg> },
]

const SocialIcon = ({ icon }: { icon: typeof socialIcons[0] }) => (
  <div
    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer', transition: 'all 0.2s ease' }}
    title={icon.label}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.2))'
      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
      e.currentTarget.style.color = '#A855F7'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
      e.currentTarget.style.color = '#64748B'
      e.currentTarget.style.transform = 'translateY(0)'
    }}>
    {icon.svg}
  </div>
)

// ── GradientH2 ───────────────────────────────────────────────────────────────
const GradH2 = ({ first, second }: { first: string; second: string }) => (
  <h2 className="text-4xl md:text-5xl font-black tracking-tight">
    <span className="text-white">{first}</span>
    <br />
    <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{second}</span>
  </h2>
)

// ── FAQItem ──────────────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/5 py-5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold text-sm pr-4">{question}</h3>
        <span className={`text-purple-400 text-xl transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </div>
      {open && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{answer}</p>}
    </div>
  )
}

// ── useInView ────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView] as const
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const router = useRouter()
  const badges = ["🏆 #1 Local SEO Platform", "🚀 136 AI-Powered Tools", "📍 Rank & Rent Automation", "💰 Free To Start", "🤖 AI-Powered SEO"]
  const [badgeIndex, setBadgeIndex] = useState(0)
  useEffect(() => {
    const t = localStorage.getItem('user_type')
    const iv = setInterval(() => setBadgeIndex(i => (i + 1) % badges.length), 2000)
    return () => clearInterval(iv)
  }, [])

  const handleGetStarted = () => router.push('/signup')
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const [r1, v1] = useInView(), [r2, v2] = useInView(), [r3, v3] = useInView()
  const [r4, v4] = useInView(), [r5, v5] = useInView(), [r6, v6] = useInView()
  const [r7, v7] = useInView(), [r8, v8] = useInView(), [r9, v9] = useInView(), [r10, v10] = useInView()

  const anim = (v: boolean): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
  })

  const testimonials = [
    { name: 'Ahmad K.', role: 'Rank & Rent Builder', avatar: 'A', color: '#7C3AED', text: 'Built 12 local sites in one week. 3 are already ranking page 1. Niche finder alone is worth it.' },
    { name: 'Sarah M.', role: 'Local SEO Agency', avatar: 'S', color: '#2563EB', text: 'Managing 20+ clients automated. White-label reports go out every week. Clients love it.' },
    { name: 'Marcus T.', role: 'SEO Freelancer', avatar: 'M', color: '#059669', text: 'AI content writer produces better copy than most humans. Sites rank fast with schema generator.' },
    { name: 'Priya R.', role: 'Digital Marketer', avatar: 'P', color: '#D97706', text: '0 to 5 paying clients in 2 months using Rank & Rent automation. ROI calculator is genius.' },
    { name: 'James L.', role: 'SEO Consultant', avatar: 'J', color: '#DB2777', text: 'Built for local SEO specifically. GBP management alone saves me 10 hours a week.' },
    { name: 'Zara A.', role: 'Agency Owner', avatar: 'Z', color: '#CA8A04', text: 'Scaled from 5 to 30 clients without hiring. Bulk automation changed everything.' },
    { name: 'Omar S.', role: 'Freelance SEO', avatar: 'O', color: '#DC2626', text: 'Phase system is brilliant. Follow it step by step and you cannot fail at local SEO.' },
    { name: 'Lisa K.', role: 'Rank & Rent Pro', avatar: 'L', color: '#4F46E5', text: 'Deploy to Vercel in one click. Sites load in under 1 second. Google loves them.' },
  ]

  return (
    <div className={poppins.className}>
      <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', position: 'relative' }}>

        {/* Dot grid bg */}
        <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.12) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none', zIndex: 0, animation: 'dotPulse 4s ease-in-out infinite' }} />

        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        {/* FIX 2: #0D1B2E navbar bg */}
        <nav style={{ background: '#0D1B2E', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)' }} className="h-16 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic">S</div>
            <span className="text-sm font-bold uppercase tracking-widest hidden sm:block">SEO AI Platform</span>
          </div>

          {/* FIX 3: Nav links gradient hover with underline */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Phases', 'Pricing', 'Contact'].map(link => (
              <span key={link} className="relative group cursor-pointer" onClick={() => scrollTo(link.toLowerCase())}>
                <span className="text-gray-400 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-200 text-sm font-medium">{link}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* FIX 4: Sign In button */}
            <button onClick={() => router.push('/login')}
              className="text-gray-300 text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 bg-transparent hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:border-purple-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300">
              Sign In
            </button>
            <button onClick={handleGetStarted}
              className="text-white text-sm font-black px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95"
              style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
              Get Started Free
            </button>
          </div>
        </nav>

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section ref={r1 as React.RefObject<HTMLElement>} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex flex-col items-center text-center px-6" style={anim(v1)}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)', animation: 'pulse 4s ease-in-out infinite' }} />
          <div className="relative z-10 max-w-5xl">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '300px', background: 'radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
              <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
                <span className="text-purple-300 text-xs font-medium" key={badgeIndex}>{badges[badgeIndex]}</span>
              </div>
              <p className="text-gray-400 text-lg mb-2 font-medium">The Complete Local SEO Platform</p>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight flex flex-col items-center relative z-10">
                <span className="block text-white">Dominate Your</span>
                <span className="block mt-2" style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Local SEO Journey</span>
                <span className="block text-white mt-2">At Scale</span>
              </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-6 py-6">
              {['136 AI-Powered Tools', 'Rank & Rent Automation', 'No Credit Card Required'].map(p => (
                <div key={p} className="flex items-center space-x-2 text-sm font-bold text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>{p}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2"><div className="flex">{[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div><span className="text-gray-400 text-xs">Rated 4.9/5</span></div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2"><div className="flex">{[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div><span className="text-gray-400 text-xs">5,000+ Professionals</span></div>
            </div>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mt-6">Find niches, build websites, rank on Google Maps, automate everything — all in one platform.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button onClick={handleGetStarted} className="w-full sm:w-auto px-8 py-4 text-white font-black rounded-2xl transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:scale-105" style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}>
                <span>🚀 Get Started Free</span><ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-sm">
                <Play className="w-4 h-4 fill-white" /><span>Watch Demo</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── DASHBOARD ──────────────────────────────────────────── */}
        <section ref={r2 as React.RefObject<HTMLElement>} className="py-16 px-4" style={anim(v2)}>
          <div className="text-center mb-12">
            <GradH2 first="Powerful dashboard." second="Zero learning curve." />
          </div>
          <div className="w-full max-w-6xl mx-auto" style={{ width: '100%' }}>
            <div className="relative group" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div style={{ background: '#0D1B2E', borderRadius: '16px', border: '1px solid #4C1D95', overflow: 'hidden', boxShadow: '0 0 80px rgba(139,92,246,0.25)' }}>
                <div className="flex flex-col uppercase italic">
                  <div className="h-12 flex items-center px-4 justify-between" style={{ background: '#050C1A', borderBottom: '1px solid #1A2D4D' }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 bg-purple-600 rounded flex items-center justify-center text-[10px] font-black italic text-white">S</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">SEO AI Platform</span>
                    </div>
                    <div className="text-[10px] font-black tracking-[0.3em] text-purple-400">DASHBOARD</div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500 text-sm">🔔</span>
                      <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center text-[10px] font-black text-white border border-purple-500/30">L</div>
                    </div>
                  </div>
                  <div className="flex flex-1 overflow-hidden">
                    <div className="w-36 border-r p-3 hidden sm:flex flex-col" style={{ background: '#030A14', borderColor: '#0D1B2E', height: '320px' }}>
                      <div className="space-y-1.5 flex-1">
                        {[{ icon: '🏠', n: 'Dashboard', a: true }, { icon: '🔍', n: 'Research' }, { icon: '🏗️', n: 'Build' }, { icon: '🚀', n: 'Deploy' }, { icon: '📝', n: 'Optimize' }, { icon: '📍', n: 'Authority' }, { icon: '📞', n: 'Convert' }, { icon: '📈', n: 'Track' }, { icon: '📋', n: 'Reports' }, { icon: '⚡', n: 'Automation' }].map((item, i) => (
                          <div key={i} className={cn("flex items-center space-x-2 py-1.5 px-2 rounded text-[9px] font-black transition-colors", (item as any).a ? "bg-purple-700/40 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white")}>
                            <span>{item.icon}</span><span className="tracking-tighter capitalize">{item.n.toLowerCase()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden flex flex-col" style={{ background: '#070F1D' }}>
                      <div className="flex items-center">
                        <h4 className="text-sm font-semibold text-white italic tracking-widest">Welcome back 👋</h4>
                        <span className="ml-2 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[8px] font-black text-purple-400 uppercase tracking-widest">Local SEO Newbie</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                        {[{ i: '🔍', n: 'Research', t: '17 tools' }, { i: '🏗️', n: 'Build', t: '26 tools' }, { i: '🚀', n: 'Deploy', t: '8 tools' }, { i: '📝', n: 'Optimize', t: '19 tools' }, { i: '📍', n: 'Authority', t: '34 tools' }, { i: '📞', n: 'Convert', t: '5 tools' }, { i: '📈', n: 'Track', t: '9 tools' }, { i: '📋', n: 'Reports', t: '11 tools' }].map((p, i) => (
                          <div key={i} style={{ background: '#0D1B2E', border: '1px solid #1A2D4D', borderRadius: '8px' }} className="p-2 flex items-center gap-2 transition-colors hover:border-purple-500/50">
                            <span className="text-lg">{p.i}</span>
                            <div className="flex flex-col"><span className="text-white text-[11px] font-semibold">{p.n}</span><span className="text-purple-400 text-[9px]">{p.t}</span></div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {[{ v: '136', l: '📦 Total Tools' }, { v: '78', l: '✅ Free Tools' }, { v: '58', l: '💰 Paid Tools' }, { v: '0%', l: '📈 Progress' }].map((s, i) => (
                          <div key={i} style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }} className="p-2 text-center">
                            <div className="text-purple-400 text-xs font-black tracking-tighter mb-0.5">{s.v}</div>
                            <div className="text-gray-400 text-[8px] font-semibold leading-none">{s.l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto rounded-lg p-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.15))', border: '1px solid rgba(168,85,247,0.2)' }}>
                        <span className="text-white text-[10px] font-black italic tracking-tighter uppercase">Ready to find your niche? 🎯</span>
                        <button className="border border-white text-white bg-transparent hover:bg-white/10 text-[10px] px-3 py-1 rounded-full transition-all">Start Research →</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <StatsSection />

        {/* ── WHO IS IT FOR ──────────────────────────────────────── */}
        <section ref={r3 as React.RefObject<HTMLElement>} id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20" style={anim(v3)}>
          <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3 text-center">WHO IS IT FOR</p>
          {/* FIX 5: clean heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-white">Built for every type of</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Local SEO Professional</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[{ icon: '🆕', title: 'Local SEO Newbie', desc: 'Step-by-step guidance from niche research to first ranking' }, { icon: '💼', title: 'Client SEO Pro', desc: 'Manage multiple clients with automated reports and audits' }, { icon: '🏠', title: 'Rank & Rent', desc: 'Build, rank and monetize local sites at scale' }, { icon: '🏢', title: 'Agency', desc: 'White-label reports, team access, bulk automation' }, { icon: '🤖', title: 'Automation', desc: '1-click full SEO campaigns running on autopilot' }].map((card, i) => (
              <div key={i} className="group cursor-pointer p-6" style={cardBase} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8 PHASES ───────────────────────────────────────────── */}
        <section ref={r4 as React.RefObject<HTMLElement>} id="phases" className="py-24 scroll-mt-20" style={{ ...anim(v4), background: 'transparent' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">THE JOURNEY</p>
              <GradH2 first="Your complete SEO journey" second="In 8 Phases" />
              <p className="text-slate-500 text-xs tracking-widest uppercase mt-4">136 tools at your fingertips</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{ icon: '🔍', num: '1', title: 'Research', tools: '17', desc: 'Find niches, analyze competitors, discover winning keywords' }, { icon: '🏗️', num: '2', title: 'Build', tools: '26', desc: 'AI website generator, content writer, Elementor templates' }, { icon: '🚀', num: '3', title: 'Deploy', tools: '8', desc: 'One-click deploy to Vercel, Netlify or WordPress' }, { icon: '📝', num: '4', title: 'Optimize', tools: '19', desc: 'On-page SEO, schema markup, technical audit' }, { icon: '📍', num: '5', title: 'Authority', tools: '34', desc: 'GBP management, citations, review automation' }, { icon: '📞', num: '6', title: 'Convert', tools: '5', desc: 'Click-to-call, WhatsApp CTA, booking widgets' }, { icon: '📈', num: '7', title: 'Track', tools: '9', desc: 'Geo-grid ranking, SERP tracker, analytics' }, { icon: '📋', num: '8', title: 'Reports', tools: '11', desc: 'PDF reports, white-label, client dashboard' }].map((p, i) => (
                <div key={i} className="group cursor-pointer p-6" style={cardBase} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(168,85,247,0.15)', color: '#C084FC' }}>{p.tools} tools</span>
                  </div>
                  <div className="text-gray-600 text-xs font-bold mb-1">{p.num}.</div>
                  <h3 className="text-white font-bold mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ───────────────────────────────────────────── */}
        <section ref={r5 as React.RefObject<HTMLElement>} className="py-24 px-6 max-w-7xl mx-auto" style={anim(v5)}>
          <div className="text-center mb-10">
            <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">FEATURES</p>
            <GradH2 first="Everything you need." second="Nothing you don't." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ icon: '🏠', color: '#A855F7', title: 'Rank & Rent Automation', desc: 'Bulk generate 5,000 pages in 10 minutes. Auto internal linking. Auto deploy. The system that changed everything.' }, { icon: '🎯', color: '#3B82F6', title: 'AI Niche Finder', desc: 'Our proven criteria finds low-competition niches: City ≤200k • SV ≥200 • DA ≤15 • DR ≤10 • BL ≤150' }, { icon: '🔑', color: '#10B981', title: 'Bring Your Own API Key', desc: 'Add your DataForSEO or SerpApi key for unlimited searches. Or use our platform credits. Your choice.' }, { icon: '📊', color: '#F59E0B', title: 'SERP Tracking', desc: 'Track keyword rankings daily with geo-grid maps. See exactly where you rank in every city block.' }, { icon: '🤖', color: '#EF4444', title: 'AI Content Writer', desc: 'Generate complete websites, blog posts, service pages and meta tags optimized for local search intent.' }, { icon: '📋', color: '#8B5CF6', title: 'White Label Reports', desc: 'Send branded PDF reports to clients automatically. Custom logo, colors and domain. Agency-ready.' }].map((f, i) => (
              <div key={i} className="group cursor-pointer p-6" style={cardBase} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: f.color + '20', border: '1px solid ' + f.color + '30' }}>{f.icon}</div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VIDEO DEMO ─────────────────────────────────────────── */}
        <section ref={r6 as React.RefObject<HTMLElement>} className="py-20 px-6" style={anim(v6)}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">SEE IT IN ACTION</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">How To Build & Rank Local Sites</span><br />
              <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With SEO AI Platform</span>
            </h2>
            <p className="text-gray-400 mb-10">Watch our complete dashboard walkthrough and see how easy it is to generate, rank and monetize local sites in minutes.</p>
            <div className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer group transition-all" style={{ border: '1px solid rgba(168,85,247,0.2)', background: '#0D1B2E' }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))' }} />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all shadow-lg shadow-purple-600/50"><span className="text-white text-3xl ml-1">▶</span></div>
                <div><p className="text-white font-black text-xl">Complete Walkthrough</p><p className="text-gray-400 text-sm">Building Local Sites FAST!</p></div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">8:45</div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[{ icon: '⚡', title: 'Quick Setup', desc: 'Get started in under 5 minutes' }, { icon: '🤖', title: 'AI-Powered', desc: 'Watch AI generate complete SEO content' }, { icon: '🚀', title: 'One-Click Deploy', desc: 'Deploy your site instantly to cloud' }].map(item => (
                <div key={item.title} className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ────────────────────────────────────────────── */}
        <section ref={r7 as React.RefObject<HTMLElement>} id="pricing" className="py-24 px-6 scroll-mt-20" style={anim(v7)}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">PRICING</p>
              <GradH2 first="Start free." second="Scale when ready." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Free', price: '$0', period: '/mo', color: '#6B7280', features: ['5 niche searches/mo', '1 website deployment', 'Basic Phase 1 tools', 'Community support', 'CSV export'], btn: 'Start Free', popular: false },
                { name: 'Starter', price: '$19', period: '/mo', color: '#3B82F6', features: ['50 niche searches/mo', '3 website deployments', 'All Phase 1-2 tools', 'Email support', 'Basic automation', 'API key support'], btn: 'Get Started', popular: false },
                { name: 'Pro', price: '$49', period: '/mo', color: '#A855F7', features: ['200 searches/mo', '10 websites', 'All 136 tools', 'Full automation suite', 'Priority support', 'White-label reports', 'Team access (3 seats)'], btn: 'Get Pro', popular: true },
                { name: 'Agency', price: '$99', period: '/mo', color: '#10B981', features: ['500 searches/mo', '50 websites', 'All 136 tools', 'Unlimited automation', '24/7 priority support', 'Full white-label', 'Team access (10 seats)', 'Custom integrations'], btn: 'Get Agency', popular: false },
              ].map((plan, i) => (
                <div key={i} className="group cursor-pointer p-6 relative min-h-[420px] flex flex-col justify-between"
                  style={{ ...cardBase, borderColor: plan.popular ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.2)' }}
                  onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-full">MOST POPULAR</div>}
                  <div>
                    <div className="mb-4">
                      <div className="text-sm font-bold mb-1" style={{ color: plan.color }}>{plan.name}</div>
                      <div className="flex items-end gap-1"><span className="text-4xl font-black text-white">{plan.price}</span><span className="text-gray-500 text-sm mb-1">{plan.period}</span></div>
                    </div>
                    <div className="space-y-2 mb-6">
                      {plan.features.map((f, j) => <div key={j} className="flex items-center gap-2 text-gray-400 text-sm"><span style={{ color: plan.color }}>✓</span>{f}</div>)}
                    </div>
                  </div>
                  <button onClick={handleGetStarted} className="w-full py-2.5 rounded-xl text-sm font-bold transition-all text-white" style={{ background: `linear-gradient(135deg, ${plan.color}99, ${plan.color}66)`, border: `1px solid ${plan.color}50` }}>{plan.btn}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS (FIX 8: inline marquee) ──────────────── */}
        <section ref={r8 as React.RefObject<HTMLElement>} className="py-20 px-6" style={anim(v8)}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">TESTIMONIALS</p>
              <GradH2 first="Trusted by SEO" second="Professionals Everywhere" />
            </div>
            {/* FIX 8 */}
            <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #0A1628, transparent)', zIndex: 10, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #0A1628, transparent)', zIndex: 10, pointerEvents: 'none' }} />
              <div
                style={{ display: 'flex', gap: '24px', animation: 'marquee 35s linear infinite', width: 'max-content' }}
                onMouseEnter={e => { e.currentTarget.style.animationPlayState = 'paused' }}
                onMouseLeave={e => { e.currentTarget.style.animationPlayState = 'running' }}>
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} style={{ flexShrink: 0, width: '300px', background: 'linear-gradient(135deg,#0D1B2E,#0A1628)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>{t.avatar}</div>
                      <div>
                        <div style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{t.name}</div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>{t.role}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', color: '#FBBF24', fontSize: '12px' }}>★★★★★</div>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: 1.6 }}>&ldquo;{t.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section ref={r9 as React.RefObject<HTMLElement>} className="py-20 px-6" style={anim(v9)}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">FAQ</p>
              <GradH2 first="Frequently Asked" second="Questions" />
              <p className="text-gray-400 mt-3">Quick answers to common questions</p>
            </div>
            {[
              { q: 'How fast can I start ranking?', a: 'Most users see results within 30-60 days. Our AI generates complete SEO-optimized content and our tools handle everything from research to deployment.' },
              { q: 'Do I need my own API keys?', a: 'No! Platform API keys are included. But you can add your own DataForSEO or Gemini keys for unlimited usage beyond your plan limits.' },
              { q: 'What is Rank & Rent?', a: 'Build local business websites, rank them on Google, then rent the leads to local businesses. Our automation tools make this scalable at any level.' },
              { q: 'Can I use this for client SEO?', a: 'Absolutely! Agency plan includes white-label reports, bulk automation, and multi-client management tools.' },
              { q: 'Is there a free plan?', a: 'Yes! Free plan includes 5 niche searches, 1 website, and access to basic Phase 1 tools. No credit card required to start.' },
              { q: 'What happens to my sites if I cancel?', a: 'Your deployed sites remain live forever. We never take down sites you have already published.' },
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </section>

        {/* ── CTA (FIX 9) ────────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg,#0D1B2E,#0A1628)', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
              <span style={{ color: 'white' }}>Ready to dominate</span><br />
              <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>local search?</span>
            </h2>
            <p style={{ color: '#64748B', marginBottom: '40px', fontSize: '16px' }}>No credit card required • Cancel anytime • 136 tools ready to use</p>
            <button
              onClick={() => { const ut = localStorage.getItem('user_type'); router.push(ut ? '/dashboard' : '/onboarding') }}
              style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '16px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 40px rgba(168,85,247,0.4)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(168,85,247,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.4)' }}>
              🚀 Start For Free Today
            </button>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        {/* FIX 2: #0D1B2E footer bg */}
        <footer ref={r10 as React.RefObject<HTMLElement>} style={{ background: '#0D1B2E', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px' }} {...(v10 ? {} : {})}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                  <span className="text-white font-bold">SEO AI Platform</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">The complete Local SEO toolkit for freelancers, agencies and Rank & Rent builders.</p>
                {/* FIX 11: SVG social icons */}
                <div className="flex gap-3">
                  {socialIcons.map(icon => <SocialIcon key={icon.label} icon={icon} />)}
                </div>
              </div>
              {/* FIX 10: Footer links */}
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Platform</h4>
                <div className="flex flex-col">{['Dashboard', 'Research Phase', 'Build Phase', 'Rank & Rent Tools', 'Pricing'].map(l => <FooterLink key={l} label={l} />)}</div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Resources</h4>
                <div className="flex flex-col">{['Documentation', 'API Keys Setup', 'DataForSEO Guide', 'Video Tutorials', 'Blog', 'Changelog'].map(l => <FooterLink key={l} label={l} />)}</div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
                <div className="flex flex-col">{['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Become an Affiliate'].map(l => <FooterLink key={l} label={l} />)}</div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <FooterLink label="© 2025 SEO AI Platform. All rights reserved." />
              <div className="flex gap-6">{['Privacy Policy', 'Terms of Service', 'Contact'].map(l => <FooterLink key={l} label={l} />)}</div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

function StatsSection() {
  const [counts, setCounts] = useState({ tools: 0, users: 0, phases: 0, cost: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); animate() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])
  const animate = () => {
    const dur = 2000, start = performance.now()
    const upd = (now: number) => {
      const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3)
      setCounts({ tools: Math.floor(e * 136), users: Math.floor(e * 5), phases: Math.floor(e * 8), cost: 0 })
      if (p < 1) requestAnimationFrame(upd)
    }
    requestAnimationFrame(upd)
  }
  return (
    <section ref={ref} className="border-y border-white/5 py-12 md:py-16" style={{ background: '#0D1B2E' }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[{ val: counts.tools, label: 'Total Tools', icon: '📦' }, { val: counts.users, label: 'User Types', icon: '👤' }, { val: counts.phases, label: 'Phases', icon: '🚀' }, { val: `$${counts.cost}`, label: 'To Start', icon: '💰' }].map((s, i) => (
          <div key={i} className="flex flex-col items-center border-white/5 last:border-0 md:border-r">
            <div className="flex items-center space-x-3 mb-1"><span className="text-2xl">{s.icon}</span><span className="text-3xl font-black text-white tracking-tighter">{s.val}</span></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
