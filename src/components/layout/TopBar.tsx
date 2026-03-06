'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, ShieldAlert } from 'lucide-react'

export default function TopBar() {
    const pathname = usePathname()
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

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

    const userInitial = userType ? userType.charAt(0).toUpperCase() : 'U'

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
            {/* Left: Page Title (Offset for sidebar on desktop) */}
            <div className="flex items-center md:ml-64">
                <h2
                    className="uppercase tracking-widest"
                    style={{
                        background: 'linear-gradient(135deg, #A855F7, #3B82F6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                    }}
                >
                    {getPageTitle(pathname)}
                </h2>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search
                            className="h-4 w-4 transition-colors"
                            style={{ color: '#64748B' }}
                        />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-xl py-1.5 pl-10 pr-3 text-sm transition-all outline-none"
                        placeholder="Search tools..."
                        style={{
                            background: '#0A1628',
                            border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '12px',
                            color: '#F1F5F9',
                        }}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.1)'
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
                {/* Plan Badge */}
                <div
                    className="hidden sm:flex items-center"
                    style={{
                        background: 'rgba(168,85,247,0.1)',
                        border: '1px solid rgba(168,85,247,0.25)',
                        borderRadius: '20px',
                        padding: '4px 12px',
                    }}
                >
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #A855F7, #3B82F6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '10px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Free Plan
                    </span>
                </div>

                {/* Notifications */}
                <button
                    className="p-2 relative transition-colors"
                    style={{ color: '#64748B' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#A855F7' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748B' }}
                >
                    <Bell className="h-5 w-5" />
                    <span
                        className="absolute top-2 right-2 w-2 h-2 rounded-full"
                        style={{
                            background: '#A855F7',
                            boxShadow: '0 0 8px rgba(168,85,247,0.6)',
                        }}
                    />
                </button>

                {/* Back to Admin Button */}
                {typeof window !== 'undefined' && sessionStorage.getItem('admin_viewing') === 'true' && (
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('admin_viewing')
                            window.location.href = '/admin'
                        }}
                        className="flex items-center space-x-2 animate-pulse"
                        style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            color: '#EF4444',
                            borderRadius: '10px',
                            padding: '6px 12px',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                        }}
                    >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Back to Admin</span>
                    </button>
                )}

                {/* User Avatar */}
                <div className="flex items-center space-x-3 ml-2 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{
                            background: 'linear-gradient(135deg, #A855F7, #3B82F6)',
                            boxShadow: '0 0 16px rgba(168,85,247,0.4)',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                        {userInitial}
                    </div>
                </div>
            </div>
        </header>
    )
}
