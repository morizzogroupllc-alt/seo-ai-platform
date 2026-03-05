'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, signOut } from '@/lib/auth'
import {
    LayoutDashboard, Search, Globe,
    Rocket, FileText, BarChart3,
    Settings, LogOut, Menu, X,
    ChevronRight, Zap, MapPin,
    Activity, Cpu
} from 'lucide-react'

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<any>(null)
    const [userType, setUserType] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        const getUser = async () => {
            const u = await getCurrentUser()
            setUser(u)
        }
        getUser()
        const ut = localStorage.getItem('user_type') || 'Local SEO Newbie'
        setUserType(ut)

        const updateTime = () => {
            const now = new Date()
            let h = now.getHours()
            const m = now.getMinutes().toString().padStart(2, '0')
            const ampm = h >= 12 ? 'PM' : 'AM'
            h = h % 12 || 12
            setCurrentTime(`${h.toString().padStart(2, '0')}:${m} ${ampm}`)
        }
        updateTime()
        const t = setInterval(updateTime, 1000)
        return () => clearInterval(t)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Search, label: 'Research', path: '/research' },
        { icon: Globe, label: 'Build', path: '/build' },
        { icon: Rocket, label: 'Deploy', path: '/deploy' },
        { icon: Activity, label: 'Optimize', path: '/optimize' },
        { icon: MapPin, label: 'Authority', path: '/authority' },
        { icon: Zap, label: 'Convert', path: '/convert' },
        { icon: BarChart3, label: 'Track', path: '/track' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Cpu, label: 'Automation', path: '/automation' },
        { icon: Settings, label: 'Settings', path: '/system' },
    ]

    const firstLetter = user?.email?.[0]?.toUpperCase() || 'U'
    const shortEmail = user?.email?.split('@')[0] || 'User'

    return (
        <div style={{ background: '#0A1628', minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 40 }}
                />
            )}

            {/* ── SIDEBAR ──────────────────────────────────────────────── */}
            <aside style={{
                width: '260px',
                background: '#0D1B2E',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 0,
                left: sidebarOpen ? 0 : '-260px',
                height: '100vh',
                zIndex: 50,
                transition: 'left 0.3s ease',
            }}
                className="lg:!left-0"
            >
                {/* Logo */}
                <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0, boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>S</div>
                    <div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em' }}>SEO AI PLATFORM</div>
                        <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '0.1em' }}>USER DASHBOARD</div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#334155', letterSpacing: '0.15em', padding: '8px 12px 4px', textTransform: 'uppercase' }}>Navigation</div>
                    {navItems.map((item) => {
                        const active = pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    background: active ? 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.1))' : 'transparent',
                                    border: active ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                                    color: active ? '#E2E8F0' : '#64748B',
                                    fontWeight: active ? 600 : 500,
                                    fontSize: '13px',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => {
                                    if (!active) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                        e.currentTarget.style.color = '#94A3B8'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!active) {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#64748B'
                                        e.currentTarget.style.borderColor = 'transparent'
                                    }
                                }}
                            >
                                {active && (
                                    <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 8px rgba(168,85,247,0.6)' }} />
                                )}
                                <item.icon size={16} style={{ color: active ? '#A855F7' : 'currentColor', flexShrink: 0 }} />
                                <span>{item.label}</span>
                                {active && <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#A855F7' }} />}
                            </Link>
                        )
                    })}
                </nav>

                {/* User info bottom */}
                <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{firstLetter}</div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shortEmail}</div>
                            <div style={{ fontSize: '10px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700 }}>{userType}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', width: '100%' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)' }}
                    >
                        <LogOut size={14} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="lg:ml-[260px]">

                {/* TOPBAR */}
                <header style={{ height: '64px', background: 'rgba(13,27,46,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', color: '#64748B', cursor: 'pointer' }}
                        className="lg:hidden"
                    >
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    {/* Breadcrumb */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#64748B', fontSize: '12px' }}>Dashboard</span>
                            <ChevronRight size={12} style={{ color: '#334155' }} />
                            <span style={{ fontSize: '12px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 600 }}>{userType}</span>
                        </div>
                    </div>

                    {/* Center clock */}
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="hidden md:block">
                        <span style={{ color: '#A855F7', fontSize: '13px', fontFamily: 'monospace', fontWeight: 700, background: 'rgba(168,85,247,0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(168,85,247,0.2)' }}>{currentTime}</span>
                    </div>

                    {/* Right: avatar */}
                    <div style={{ marginLeft: 'auto' }}>
                        <div
                            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 0 16px rgba(168,85,247,0.3)', transition: 'transform 0.2s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                        >
                            {firstLetter}
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}
