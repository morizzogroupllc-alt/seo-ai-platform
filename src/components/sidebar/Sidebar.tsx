'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Search,
    Wrench,
    Rocket,
    PenTool,
    MapPin,
    Phone,
    TrendingUp,
    ClipboardList,
    Zap,
    Settings as SettingsIcon,
    Menu,
    X,
    ChevronRight,
    LayoutDashboard,
    ShieldAlert,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const phasesNav = [
    { id: 'research', name: 'Research', href: '/research', icon: Search },
    { id: 'build', name: 'Build', href: '/build', icon: Wrench },
    { id: 'deploy', name: 'Deploy', href: '/deploy', icon: Rocket },
    { id: 'optimize', name: 'Optimize', href: '/optimize', icon: PenTool },
    { id: 'authority', name: 'Local Authority', href: '/authority', icon: MapPin },
    { id: 'convert', name: 'Convert', href: '/convert', icon: Phone },
    { id: 'track', name: 'Track', href: '/track', icon: TrendingUp },
    { id: 'reports', name: 'Reports', href: '/reports', icon: ClipboardList },
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

        // Auto-expand current phase section
        const currentPhase = phasesNav.find(p => pathname.startsWith(p.href))
        if (currentPhase) setExpandedPhase(currentPhase.id)
    }, [pathname])

    const currentPhaseIndex = phasesNav.findIndex(p => pathname.startsWith(p.href)) + 1

    const handleChangeRole = () => {
        localStorage.removeItem('user_type')
        window.location.href = '/onboarding'
    }

    // Styles
    const sectionLabel: React.CSSProperties = {
        fontSize: '10px', fontWeight: 700, color: '#334155',
        letterSpacing: '0.15em', textTransform: 'uppercase', padding: '8px 12px 4px',
    }
    const activeNavStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))',
        border: '1px solid rgba(168,85,247,0.3)', borderRadius: '12px', color: '#E2E8F0',
        position: 'relative', display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 12px', textDecoration: 'none', fontWeight: 600, fontSize: '13px',
    }
    const inactiveNavStyle: React.CSSProperties = {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
        borderRadius: '12px', border: '1px solid transparent', color: '#64748B',
        textDecoration: 'none', fontWeight: 500, fontSize: '13px',
        transition: 'all 0.2s ease', cursor: 'pointer',
    }
    const compactCardStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.05))',
        border: '1px solid rgba(168,85,247,0.2)', borderRadius: '10px', padding: '8px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }

    const NavItem = ({ href, icon: Icon, children, active }: {
        href: string, icon: any, children: React.ReactNode, active?: boolean,
    }) => (
        <Link
            href={href}
            onClick={() => setIsOpen(false)}
            style={active ? activeNavStyle : inactiveNavStyle}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94A3B8' } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' } }}
        >
            {active && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: 'linear-gradient(180deg, #A855F7, #3B82F6)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />}
            <Icon style={{ width: '17px', height: '17px', color: active ? '#A855F7' : 'currentColor', flexShrink: 0 }} />
            <span>{children}</span>
            {!active && <span style={{ marginLeft: 'auto', color: '#334155', fontSize: '16px', lineHeight: 1 }}>›</span>}
        </Link>
    )

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                type="button"
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white rounded-lg shadow-xl"
                style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 shadow-2xl",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
                style={{ background: '#0D1B2E', borderRight: '1px solid rgba(168,85,247,0.15)' }}
            >
                {/* 1. LOGO */}
                <div className="h-16 px-5 flex items-center shrink-0" style={{ borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white italic text-xl" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', boxShadow: '0 0 20px rgba(168,85,247,0.4)', flexShrink: 0 }}>S</div>
                        <span className="text-white font-bold text-sm tracking-wider uppercase leading-none gradient-text">SEO AI Platform</span>
                    </div>
                </div>

                {/* 2. PROGRESS BAR */}
                <div className="mx-3 mt-4 mb-3">
                    <div className="flex justify-between items-center mb-2" style={{ fontSize: '10px', fontWeight: 700 }}>
                        <span style={{ color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Progress</span>
                        <span style={{ color: '#A855F7' }}>Phase {currentPhaseIndex || 0} of 8</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: 'rgba(168,85,247,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'linear-gradient(90deg, #A855F7, #3B82F6)', borderRadius: '3px', transition: 'width 1s ease', boxShadow: '0 0 10px rgba(168,85,247,0.5)', width: `${((currentPhaseIndex || 0) / 8) * 100}%` }} />
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(168,85,247,0.1)', margin: '0 12px 4px' }} />

                {/* 3. NAVIGATION */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-hide">
                    {/* Overview */}
                    <div className="space-y-1">
                        <div style={sectionLabel}>Overview</div>
                        {isAdmin && (
                            <NavItem href="/admin" icon={ShieldAlert} active={pathname.startsWith('/admin')}>
                                <span style={{ color: pathname.startsWith('/admin') ? '#E2E8F0' : '#EF4444' }}>Admin Panel</span>
                            </NavItem>
                        )}
                        <NavItem href="/dashboard" icon={LayoutDashboard} active={pathname === '/dashboard'}>Dashboard</NavItem>
                    </div>

                    {/* Growth Phases */}
                    <div className="space-y-1">
                        <div style={sectionLabel}>Growth Phases</div>
                        <div className="space-y-1">
                            {phasesNav.map((phase) => {
                                const isActive = pathname.startsWith(phase.href)
                                const isExpanded = expandedPhase === phase.id
                                return (
                                    <div key={phase.id} className="space-y-1">
                                        <Link
                                            href={phase.href}
                                            onClick={() => { setIsOpen(false); setExpandedPhase(isExpanded ? null : phase.id) }}
                                            style={isActive ? activeNavStyle : inactiveNavStyle}
                                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94A3B8' } }}
                                            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' } }}
                                        >
                                            {isActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: 'linear-gradient(180deg, #A855F7, #3B82F6)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />}
                                            <phase.icon style={{ width: '17px', height: '17px', color: isActive ? '#A855F7' : 'currentColor', flexShrink: 0 }} />
                                            <span>{phase.name}</span>
                                            {!isActive && <span style={{ marginLeft: 'auto', color: '#334155', fontSize: '16px', lineHeight: 1 }}>›</span>}
                                        </Link>
                                        {isExpanded && phase.id === 'research' && (
                                            <div className="ml-3 mt-1 space-y-1" style={{ borderLeft: '1px solid rgba(168,85,247,0.15)' }}>
                                                {[
                                                    { name: 'Niche Finder', href: '/research', active: pathname === '/research' },
                                                    { name: 'SERP Analyzer', href: '/research/serp', soon: true },
                                                    { name: 'Competitor Research', href: '/research/competitor', soon: true },
                                                    { name: 'Keyword Discovery', href: '/research/keywords', soon: true },
                                                ].map((sub) => (
                                                    <Link key={sub.name} href={sub.soon ? '#' : sub.href}
                                                        className="h-9 pl-8 pr-3 flex items-center justify-between text-xs font-semibold rounded-r-xl transition-all"
                                                        style={sub.active ? { color: '#A855F7', borderLeft: '2px solid #A855F7', background: 'rgba(168,85,247,0.05)' } : { color: '#475569' }}
                                                    >
                                                        <span>{sub.name}</span>
                                                        {sub.soon && <span style={{ fontSize: '8px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '4px', padding: '1px 6px', color: '#64748B' }}>Soon</span>}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="space-y-1">
                        <div style={sectionLabel}>Platform</div>
                        <NavItem href="/automation" icon={Zap} active={pathname === '/automation'}>Automation</NavItem>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-1">
                        <div style={sectionLabel}>Preferences</div>
                        <NavItem href="/system" icon={SettingsIcon} active={pathname === '/system'}>System</NavItem>
                    </div>
                </div>

                {/* 4. BOTTOM FIXED — 2 compact cards */}
                <div style={{ padding: '8px 12px 12px', borderTop: '1px solid rgba(168,85,247,0.1)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* Card 1: User Type */}
                    <div style={compactCardStyle}>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '10px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>User Type</div>
                            <div className="truncate" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700, fontSize: '12px', maxWidth: '130px' }}>
                                {userType || 'Not Selected'}
                            </div>
                        </div>
                        <button onClick={handleChangeRole} style={{ color: '#A855F7', fontSize: '11px', fontWeight: 700, cursor: 'pointer', flexShrink: 0, marginLeft: '8px' }}>↩</button>
                    </div>

                    {/* Card 2: Plan */}
                    <div style={compactCardStyle}>
                        <div>
                            <div style={{ fontSize: '10px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>My Plan</div>
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
