'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Search, Wrench, Rocket, PenTool, MapPin, Phone,
    TrendingUp, ClipboardList, Zap, Settings as SettingsIcon,
    Menu, X, LayoutDashboard, ShieldAlert,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const allNav = [
    { id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
    { id: 'research', name: 'Research', href: '/research', icon: Search, accordion: true },
    { id: 'build', name: 'Build', href: '/build', icon: Wrench },
    { id: 'deploy', name: 'Deploy', href: '/deploy', icon: Rocket },
    { id: 'optimize', name: 'Optimize', href: '/optimize', icon: PenTool },
    { id: 'authority', name: 'Local Authority', href: '/authority', icon: MapPin },
    { id: 'convert', name: 'Convert', href: '/convert', icon: Phone },
    { id: 'track', name: 'Track', href: '/track', icon: TrendingUp },
    { id: 'reports', name: 'Reports', href: '/reports', icon: ClipboardList },
    { id: 'automation', name: 'Automation', href: '/automation', icon: Zap },
    { id: 'system', name: 'System', href: '/system', icon: SettingsIcon },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userType, setUserType] = useState<string | null>(null)
    const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)

        const checkRole = async () => {
            try {
                const { getCurrentUser, getUserRole } = await import('@/lib/auth')
                const user = await getCurrentUser()
                if (user) {
                    const role = await getUserRole(user.id)
                    setIsAdmin(role?.toLowerCase() === 'admin')
                }
            } catch (error) {
                console.error('Error checking role:', error)
            }
        }
        checkRole()

        const currentPhase = allNav.find(p => p.accordion && pathname.startsWith(p.href))
        if (currentPhase) setExpandedPhase(currentPhase.id)
    }, [pathname])

    const currentPhaseIndex = allNav.filter(n => n.accordion || ['build', 'deploy', 'optimize', 'authority', 'convert', 'track', 'reports'].includes(n.id))
        .findIndex(p => pathname.startsWith(p.href)) + 1

    const handleChangeRole = () => {
        localStorage.removeItem('user_type')
        window.location.href = '/onboarding'
    }

    const activeStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))',
        border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', color: '#E2E8F0',
        position: 'relative', display: 'flex', alignItems: 'center', gap: '10px',
        padding: '6px 10px', textDecoration: 'none', fontWeight: 600, fontSize: '12px',
    }
    const inactiveStyle: React.CSSProperties = {
        display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px',
        borderRadius: '8px', border: '1px solid transparent', color: '#64748B',
        textDecoration: 'none', fontWeight: 500, fontSize: '12px',
        transition: 'all 0.2s ease', cursor: 'pointer',
    }
    const compactCard: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.05))',
        border: '1px solid rgba(168,85,247,0.2)', borderRadius: '10px', padding: '8px 10px',
    }

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                type="button"
                className="md:hidden fixed top-3 left-3 z-50 p-2 text-white rounded-lg shadow-xl"
                style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 shadow-2xl",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
                style={{ background: '#0D1B2E', borderRight: '1px solid rgba(168,85,247,0.15)' }}
            >
                {/* LOGO — h-14 */}
                <div className="flex items-center px-4 shrink-0" style={{ height: '56px', borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white italic text-lg" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', boxShadow: '0 0 16px rgba(168,85,247,0.4)', flexShrink: 0 }}>S</div>
                        <span className="font-bold text-sm tracking-wider uppercase leading-none gradient-text">SEO AI Platform</span>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mx-3 py-2 mt-2">
                    <div className="flex justify-between items-center mb-1.5" style={{ fontSize: '9px', fontWeight: 700 }}>
                        <span style={{ color: '#334155', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Progress</span>
                        <span style={{ color: '#A855F7' }}>Phase {currentPhaseIndex || 0} / 8</span>
                    </div>
                    <div style={{ height: '5px', background: 'rgba(168,85,247,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'linear-gradient(90deg, #A855F7, #3B82F6)', borderRadius: '3px', transition: 'width 1s ease', boxShadow: '0 0 8px rgba(168,85,247,0.5)', width: `${((currentPhaseIndex || 0) / 8) * 100}%` }} />
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(168,85,247,0.08)', margin: '0 10px 2px' }} />

                {/* NAV — single flat list */}
                <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ padding: '6px 8px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {isAdmin && (
                        <Link
                            href="/admin"
                            style={pathname.startsWith('/admin') ? activeStyle : inactiveStyle}
                            onMouseEnter={e => { if (!pathname.startsWith('/admin')) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94A3B8' } }}
                            onMouseLeave={e => { if (!pathname.startsWith('/admin')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' } }}
                        >
                            {pathname.startsWith('/admin') && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '16px', background: 'linear-gradient(180deg, #A855F7, #3B82F6)', borderRadius: '0 4px 4px 0' }} />}
                            <ShieldAlert style={{ width: '16px', height: '16px', color: '#EF4444', flexShrink: 0 }} />
                            <span style={{ color: '#EF4444' }}>Admin Panel</span>
                        </Link>
                    )}

                    {allNav.map((item) => {
                        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
                        const isExpanded = expandedPhase === item.id

                        return (
                            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <Link
                                    href={item.href}
                                    onClick={() => {
                                        setIsOpen(false)
                                        if (item.accordion) setExpandedPhase(isExpanded ? null : item.id)
                                    }}
                                    style={isActive ? activeStyle : inactiveStyle}
                                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94A3B8' } }}
                                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' } }}
                                >
                                    {isActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '16px', background: 'linear-gradient(180deg, #A855F7, #3B82F6)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 6px rgba(168,85,247,0.8)' }} />}
                                    <item.icon style={{ width: '16px', height: '16px', color: isActive ? '#A855F7' : 'currentColor', flexShrink: 0 }} />
                                    <span>{item.name}</span>
                                    <span style={{ marginLeft: 'auto', color: isActive ? '#A855F7' : '#475569', fontSize: '12px', transition: 'transform 0.2s ease', transform: (item.accordion && isExpanded) ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>›</span>
                                </Link>

                                {/* Research accordion */}
                                {item.accordion && isExpanded && (
                                    <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '1px', borderLeft: '1px solid rgba(168,85,247,0.15)', paddingLeft: '8px' }}>
                                        {[
                                            { name: 'Niche Finder', href: '/research', active: pathname === '/research' },
                                            { name: 'SERP Analyzer', href: '/research/serp', soon: true },
                                            { name: 'Competitor Research', href: '/research/competitor', soon: true },
                                            { name: 'Keyword Discovery', href: '/research/keywords', soon: true },
                                        ].map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.soon ? '#' : sub.href}
                                                className="flex items-center justify-between transition-all"
                                                style={{ padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: sub.active ? 600 : 500, color: sub.active ? '#A855F7' : '#475569', background: sub.active ? 'rgba(168,85,247,0.05)' : 'transparent', textDecoration: 'none' }}
                                            >
                                                <span>{sub.name}</span>
                                                {sub.soon && <span style={{ fontSize: '8px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '4px', padding: '1px 5px', color: '#64748B' }}>Soon</span>}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* BOTTOM — 2 compact cards */}
                <div style={{ padding: '6px 8px 10px', borderTop: '1px solid rgba(168,85,247,0.1)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* User Type Card */}
                    <div style={compactCard}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '9px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Building as</span>
                            <span style={{ fontSize: '10px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {userType || 'Not Selected'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                                onClick={handleChangeRole}
                                style={{ flex: 1, fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: '#A855F7', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)' }}
                            >↩ Change Role</button>
                            <button
                                onClick={() => window.location.href = '/system'}
                                style={{ flex: 1, fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#3B82F6', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)' }}
                            >⚙ Preferences</button>
                        </div>
                    </div>

                    {/* Plan Card */}
                    <div style={{ ...compactCard, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '9px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>My Plan</div>
                            <div style={{ color: 'white', fontSize: '12px', fontWeight: 600 }}>Free Plan</div>
                            <div style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '10px', fontWeight: 700 }}>5 searches left</div>
                        </div>
                        <button style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '11px', fontWeight: 800, cursor: 'pointer', flexShrink: 0, marginLeft: '8px' }}>
                            Upgrade ›
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
            )}
        </>
    )
}
