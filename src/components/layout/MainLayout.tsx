'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '../sidebar/Sidebar'
import TopBar from './TopBar'
import { cn } from '@/lib/utils'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const userType = localStorage.getItem('user_type')

        // Redirect to onboarding if no user type and trying to access internal pages
        const internalRoutes = [
            '/dashboard', '/research', '/build', '/deploy', '/optimize',
            '/authority', '/convert', '/track', '/reports', '/automation', '/system'
        ]

        if (internalRoutes.some(route => pathname.startsWith(route)) && !userType) {
            router.push('/onboarding')
        } else {
            setIsLoaded(true)
        }
    }, [pathname, router])

    const noLayoutRoutes = ['/', '/onboarding', '/login', '/signup']
    const isAdminRoute = pathname.startsWith('/admin')
    const [isAdminViewing, setIsAdminViewing] = useState(false)

    useEffect(() => {
        const viewing = sessionStorage.getItem('admin_viewing')
        setIsAdminViewing(viewing === 'true')
    }, [pathname])

    // If route is public, onboarding, login or admin, return children without standard Sidebar/TopBar
    if (noLayoutRoutes.includes(pathname) || isAdminRoute) {
        return <>{children}</>
    }

    if (!isLoaded) return (
        <div style={{ minHeight: '100vh', background: '#0A1628', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid #A855F7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading...</p>
        </div>
    )

    return (
        <div className="min-h-screen antialiased transition-colors duration-300" style={{ background: '#0A1628', color: '#F1F5F9' }}>
            <TopBar />
            <div className="flex pt-14">
                <Sidebar />
                <main
                    className="flex-1 md:pl-64 min-h-[calc(100vh-3.5rem)]"
                    style={{
                        background: '#0A1628',
                        backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    )
}
