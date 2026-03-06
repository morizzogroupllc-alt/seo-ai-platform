'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, ShieldAlert, LogOut, Sun, Moon, ChevronRight } from 'lucide-react'

export default function TopBar() {
    const pathname = usePathname()
    const [userType, setUserType] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)

        const getUser = async () => {
            const { getCurrentUser } = await import('@/lib/auth')
            const user = await getCurrentUser()
            if (user) setUserEmail(user.email || '')
        }
        getUser()
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [showDropdown])

    const handleSignOut = async () => {
        try {
            const { signOut } = await import('@/lib/auth')
            await signOut()
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    // Map path to title
    const getPageTitle = (path: string) => {
        const segments = path.split('/').filter(Boolean)
        if (segments.length === 0) return 'Dashboard'
        const page = segments[0]
        switch (page) {
            case 'dashboard': return 'Dashboard'
            case 'research': return 'Research'
            case 'build': return 'Build'
            case 'deploy': return 'Deploy'
            case 'optimize': return 'Optimize'
            case 'authority': return 'Local Authority'
            case 'convert': return 'Convert'
            case 'track': return 'Track'
            case 'reports': return 'Reports'
            case 'automation': return 'Automation'
            case 'system': return 'System'
            default: return page.charAt(0).toUpperCase() + page.slice(1)
        }
    }

    const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : (userType ? userType.charAt(0).toUpperCase() : 'U')

    return (
        <header
            className="fixed top-0 right-0 left-0 h-14 z-30 flex items-center justify-between px-6"
            style={{
                background: 'rgba(13,27,46,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(168,85,247,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
        >
            {/* LEFT: Title › User Type */}
            <div className="flex items-center gap-2 md:ml-64">
                <h2
                    className="uppercase tracking-widest"
                    style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}
                >
                    {getPageTitle(pathname)}
                </h2>
                <span style={{ color: '#334155', fontSize: '12px' }}>›</span>
                <span style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '12px', fontWeight: 600 }}>
                    {userType || ''}
                </span>
            </div>

            {/* CENTER: Search */}
            <div className="hidden md:flex flex-1 max-w-xs mx-6">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4" style={{ color: '#64748B' }} />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-xl py-1.5 pl-10 pr-3 text-sm outline-none transition-all"
                        placeholder="Search tools..."
                        style={{ background: '#0A1628', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', color: '#F1F5F9' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.1)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

                {/* Back to Admin Button */}
                {typeof window !== 'undefined' && sessionStorage.getItem('admin_viewing') === 'true' && (
                    <button
                        onClick={() => { sessionStorage.removeItem('admin_viewing'); window.location.href = '/admin' }}
                        className="flex items-center gap-1.5 animate-pulse"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', borderRadius: '10px', padding: '6px 12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}
                    >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Back to Admin</span>
                    </button>
                )}

                {/* 1. Avatar with dropdown */}
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                    <div
                        onClick={e => { e.stopPropagation(); setShowDropdown(!showDropdown) }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', boxShadow: '0 0 16px rgba(168,85,247,0.4)', transition: 'transform 0.2s ease', cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                        {userInitial}
                    </div>

                    {/* Dropdown */}
                    {showDropdown && (
                        <div style={{ position: 'absolute', top: '44px', right: 0, background: '#0D1B2E', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '14px', padding: '8px', minWidth: '180px', boxShadow: '0 16px 48px rgba(0,0,0,0.4)', zIndex: 100 }}>
                            {/* Email */}
                            <div style={{ padding: '6px 12px 8px', borderBottom: '1px solid rgba(168,85,247,0.1)', marginBottom: '6px' }}>
                                <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {userEmail || 'User'}
                                </div>
                            </div>
                            {/* Sign Out */}
                            <button
                                onClick={handleSignOut}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)' }}
                            >
                                <LogOut size={14} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. Bell */}
                <button
                    className="relative transition-colors"
                    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#A855F7' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748B' }}
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#A855F7', boxShadow: '0 0 8px rgba(168,85,247,0.6)' }} />
                </button>

                {/* 3. Dark/Light toggle */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#A855F7'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                {/* 4. Plan badge */}
                <div
                    className="hidden sm:flex items-center"
                    style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '20px', padding: '4px 12px' }}
                >
                    <span style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Free Plan
                    </span>
                </div>

            </div>
        </header>
    )
}
