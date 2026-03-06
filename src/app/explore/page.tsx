'use client'
import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ChevronDown, ArrowRight, Check, X } from 'lucide-react'
import { toolsByPhase, phaseColors, userTypes, compareRows, pricingPlans } from '@/lib/exploreData'

const phases = Object.keys(toolsByPhase)
const allTools = phases.flatMap(p => toolsByPhase[p].map(t => ({ ...t, phase: p })))

export default function ExplorePage() {
    const router = useRouter()
    const [activePhase, setActivePhase] = useState('All')
    const filtered = useMemo(() => activePhase === 'All' ? allTools : allTools.filter(t => t.phase === activePhase), [activePhase])
    const [hoveredTool, setHoveredTool] = useState<number | null>(null)

    const sidebarItems = [
        { icon: '🏠', name: 'Dashboard' },
        { icon: '🔍', name: 'Research', count: 17 },
        { icon: '🏗️', name: 'Build', count: 33 },
        { icon: '🚀', name: 'Deploy', count: 8 },
        { icon: '📝', name: 'Optimize', count: 18 },
        { icon: '📍', name: 'Authority', count: 33 },
        { icon: '📞', name: 'Convert', count: 5 },
        { icon: '📈', name: 'Track', count: 9 },
        { icon: '📋', name: 'Reports', count: 11 },
        { icon: '⚡', name: 'Automation', count: 6 },
        { icon: '⚙️', name: 'System' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* ── NAVBAR ── */}
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', background: 'rgba(10,22,40,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontStyle: 'italic', fontSize: '14px' }}>S</div>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local SEO AI</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', padding: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Overview', 'Tools', 'User Types', 'Pricing'].map(s => (
                        <button key={s} onClick={() => document.getElementById(s.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: '6px 16px', borderRadius: '999px', background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(168,85,247,0.15)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent' }}
                        >{s}</button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button onClick={() => router.push('/login')} style={{ padding: '8px 18px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', background: 'transparent', color: '#94A3B8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign In</button>
                    <button onClick={() => router.push('/signup')} style={{ padding: '8px 18px', border: 'none', borderRadius: '10px', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>Start Free</button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section id="overview" style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-100px', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-50px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px' }}>
                        <span style={{ color: '#A855F7', fontSize: '12px', fontWeight: 700 }}>✦ 136 Tools · 8 Phases · 5 User Types</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px 0', background: 'linear-gradient(135deg, #ffffff 0%, #A855F7 50%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        The Complete Local SEO Platform
                    </h1>
                    <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
                        From niche research to automated rank & rent — everything in one place.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
                        {[{ val: '136', label: 'Tools' }, { val: '8', label: 'Phases' }, { val: '5', label: 'User Types' }, { val: '100%', label: 'Free Start' }].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '16px', padding: '20px 28px', minWidth: '130px' }}>
                                <div style={{ fontSize: '36px', fontWeight: 800, background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{s.val}</div>
                                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', marginTop: '6px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'bounce 2s ease-in-out infinite' }}>
                        <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Explore the platform</span>
                        <ChevronDown size={20} style={{ color: '#475569' }} />
                    </div>
                </div>
            </section>

            {/* ── PLATFORM LAYOUT PREVIEW ── */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>PLATFORM PREVIEW</p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: 0 }}>Your <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Command Center</span></h2>
                </div>
                <div style={{ border: '1px solid rgba(168,85,247,0.2)', borderRadius: '24px', overflow: 'hidden', maxHeight: '520px', position: 'relative', background: '#0D1B2E' }}>
                    <div style={{ display: 'flex', height: '520px' }}>
                        {/* Sidebar */}
                        <div style={{ width: '220px', background: '#050C1A', borderRight: '1px solid rgba(168,85,247,0.1)', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '0 8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: 'white' }}>S</div>
                                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'white' }}>SEO AI</span>
                            </div>
                            {sidebarItems.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', background: i === 0 ? 'rgba(168,85,247,0.15)' : 'transparent', cursor: 'pointer', position: 'relative' }}>
                                    <span style={{ fontSize: '14px' }}>{item.icon}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: i === 0 ? 'white' : '#64748B', flex: 1 }}>{item.name}</span>
                                    {item.count && <span style={{ fontSize: '9px', color: '#475569', fontWeight: 700 }}>{item.count}</span>}
                                    {i !== 0 && <Lock size={9} style={{ color: '#334155' }} />}
                                </div>
                            ))}
                            <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, marginBottom: '8px' }}>Sign up to get started</div>
                                <button onClick={() => router.push('/signup')} style={{ width: '100%', padding: '6px', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>Get Started Free</button>
                            </div>
                        </div>
                        {/* Main */}
                        <div style={{ flex: 1, padding: '24px', overflow: 'hidden', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>Welcome back! 👋</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                        <span style={{ fontSize: '10px', color: '#64748B' }}>Building as:</span>
                                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#A855F7', background: 'rgba(168,85,247,0.15)', padding: '2px 8px', borderRadius: '20px' }}>LOCAL SEO NEWBIE</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '16px' }}>
                                {[{ i: '🔍', n: 'Research', t: '17' }, { i: '🏗️', n: 'Build', t: '33' }, { i: '🚀', n: 'Deploy', t: '8' }, { i: '📝', n: 'Optimize', t: '18' }, { i: '📍', n: 'Authority', t: '33' }, { i: '📞', n: 'Convert', t: '5' }, { i: '📈', n: 'Track', t: '9' }, { i: '📋', n: 'Reports', t: '11' }].map((p, i) => (
                                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '18px' }}>{p.i}</span>
                                        <div><div style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>{p.n}</div><div style={{ fontSize: '9px', color: '#A855F7' }}>{p.t} tools</div></div>
                                    </div>
                                ))}
                            </div>
                            {/* Lock overlay */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, #0A1628 30%, transparent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '40px', gap: '16px' }}>
                                <Lock size={28} style={{ color: '#A855F7' }} />
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'white', textAlign: 'center' }}>Sign up to unlock full platform access</div>
                                <button onClick={() => router.push('/signup')} style={{ padding: '10px 32px', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 0 24px rgba(168,85,247,0.3)' }}>Get Started Free</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── USER TYPES ── */}
            <section id="user-types" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>USER TYPES</p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>Built for Every Local SEO <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Professional</span></h2>
                    <p style={{ color: '#64748B', fontSize: '15px' }}>Choose your path — the platform adapts to your workflow</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px' }}>
                    {userTypes.map((u, i) => (
                        <div key={i} style={{ minWidth: '220px', maxWidth: '220px', background: '#0D1B2E', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '20px', padding: '24px', flexShrink: 0, transition: 'all 0.3s ease', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = u.color + '60'; e.currentTarget.style.boxShadow = `0 12px 40px ${u.color}20` }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.15)'; e.currentTarget.style.boxShadow = 'none' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `radial-gradient(circle, ${u.color}30, ${u.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>{u.emoji}</div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{u.name}</div>
                            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px', minHeight: '54px' }}>{u.desc}</p>
                            <div style={{ display: 'inline-flex', background: `${u.color}15`, color: u.color, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', marginBottom: '14px' }}>{u.tools} tools included</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {u.steps.map((s, j) => (
                                    <div key={j} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                        <Check size={12} style={{ color: u.color, marginTop: '2px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.4 }}>{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TOOLS GRID ── */}
            <section id="tools" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>FULL TOOLKIT</p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: '0 0 8px 0' }}><span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>136</span> Powerful Tools</h2>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Every tool you need for complete local SEO dominance</p>
                </div>
                {/* Phase tabs */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
                    {['All', ...phases].map(p => (
                        <button key={p} onClick={() => setActivePhase(p)}
                            style={{ padding: '6px 16px', borderRadius: '999px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', background: activePhase === p ? 'linear-gradient(135deg,#A855F7,#3B82F6)' : 'rgba(255,255,255,0.04)', color: activePhase === p ? 'white' : '#94A3B8' }}>
                            {p} {p !== 'All' && `(${toolsByPhase[p].length})`}
                        </button>
                    ))}
                </div>
                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {filtered.map((tool, i) => {
                        const pc = phaseColors[tool.phase] || '#A855F7'
                        const isHovered = hoveredTool === i
                        return (
                            <div key={i} style={{ background: '#0D1B2E', border: `1px solid ${isHovered ? pc + '50' : 'rgba(168,85,247,0.12)'}`, borderRadius: '14px', padding: '16px', position: 'relative', transition: 'all 0.2s ease', cursor: 'default', overflow: 'hidden' }}
                                onMouseEnter={() => setHoveredTool(i)} onMouseLeave={() => setHoveredTool(null)}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pc }} />
                                        <span style={{ fontSize: '9px', fontWeight: 700, color: pc, textTransform: 'uppercase' }}>{tool.phase}</span>
                                    </div>
                                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: tool.free ? 'rgba(16,185,129,0.15)' : 'rgba(249,115,22,0.15)', color: tool.free ? '#10B981' : '#F97316' }}>{tool.free ? 'FREE' : 'PAID'}</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '6px', lineHeight: 1.3 }}>{tool.name}</div>
                                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.4, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as any}>{tool.desc}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', letterSpacing: '2px' }}>{tool.users}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#475569' }}><Lock size={10} /> Sign up</div>
                                </div>
                                {/* Hover overlay */}
                                {isHovered && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderRadius: '14px' }}>
                                        <Lock size={20} style={{ color: '#A855F7' }} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Sign up to use this tool</span>
                                        <button onClick={() => router.push('/signup')} style={{ padding: '6px 20px', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Get Started</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ── COMPETITOR COMPARISON ── */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>COMPARISON</p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: '0 0 8px 0' }}>How We <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Compare</span></h2>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>See why professionals choose Local SEO AI</p>
                </div>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.15)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ background: '#0D1B2E' }}>
                                <th style={{ padding: '14px 16px', textAlign: 'left', color: '#64748B', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Feature</th>
                                <th style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B', fontWeight: 600, fontSize: '11px' }}>BrightLocal</th>
                                <th style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B', fontWeight: 600, fontSize: '11px' }}>LocalDominator</th>
                                <th style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B', fontWeight: 600, fontSize: '11px' }}>LocalSites.pro</th>
                                <th style={{ padding: '14px 16px', textAlign: 'center', background: 'rgba(168,85,247,0.08)', borderLeft: '1px solid rgba(168,85,247,0.3)', borderRight: '1px solid rgba(168,85,247,0.3)' }}>
                                    <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, fontSize: '12px' }}>OUR PLATFORM</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {compareRows.map((r, i) => (
                                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                                    <td style={{ padding: '12px 16px', color: '#94A3B8', fontWeight: 500 }}>{r.feature}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#64748B' }}>{r.bl}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#64748B' }}>{r.ld}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#64748B' }}>{r.lsp}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', background: 'rgba(168,85,247,0.05)', borderLeft: '1px solid rgba(168,85,247,0.15)', borderRight: '1px solid rgba(168,85,247,0.15)', color: '#10B981', fontWeight: 700 }}>{r.us}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>PRICING</p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: '0 0 8px 0' }}>Simple, Transparent <span style={{ background: 'linear-gradient(135deg,#A855F7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pricing</span></h2>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Start free, scale as you grow</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                    {pricingPlans.map((plan, i) => (
                        <div key={i} style={{ background: '#0D1B2E', border: plan.popular ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.15)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: plan.popular ? '0 0 40px rgba(168,85,247,0.15)' : 'none', transition: 'all 0.3s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${plan.color}20` }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = plan.popular ? '0 0 40px rgba(168,85,247,0.15)' : 'none' }}>
                            {plan.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#A855F7', color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 14px', borderRadius: '20px' }}>MOST POPULAR ⭐</div>}
                            <div style={{ fontSize: '14px', fontWeight: 700, color: plan.color, marginBottom: '4px' }}>{plan.name}</div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '24px' }}>
                                <span style={{ fontSize: '40px', fontWeight: 800, color: 'white', lineHeight: 1 }}>{plan.price}</span>
                                <span style={{ color: '#475569', fontSize: '14px', marginBottom: '4px' }}>{plan.period}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                                {plan.features.map((f, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Check size={14} style={{ color: plan.color, flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: '#94A3B8' }}>{f}</span>
                                    </div>
                                ))}
                                {plan.excluded.map((f, j) => (
                                    <div key={`x${j}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <X size={14} style={{ color: '#334155', flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: '#334155' }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => router.push('/signup')} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', background: `linear-gradient(135deg, ${plan.color}99, ${plan.color}66)`, color: 'white' }}>{plan.cta}</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.08) 100%)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '32px', padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '400px', background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 16px 0', lineHeight: 1.2, background: 'linear-gradient(135deg, #ffffff, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Ready to Dominate Local Search?
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '16px', marginBottom: '36px' }}>Join thousands of local SEO professionals. Start free, no credit card required.</p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                            <button onClick={() => router.push('/signup')} style={{ padding: '16px 40px', background: 'linear-gradient(135deg,#A855F7,#3B82F6)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 0 40px rgba(168,85,247,0.4)', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(168,85,247,0.6)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.4)' }}>
                                Start Free Today <ArrowRight size={18} />
                            </button>
                            <button onClick={() => router.push('/login')} style={{ padding: '16px 32px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', color: '#94A3B8', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>Sign In</button>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '13px' }}>✓ No credit card required &nbsp; ✓ Free plan forever &nbsp; ✓ Upgrade anytime</p>
                    </div>
                </div>
            </section>

            {/* CSS animations */}
            <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}} html{scroll-behavior:smooth}`}</style>
        </div>
    )
}
