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

    const noLayoutRoutes = ['/', '/onboarding', '/login']
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

    if (!isLoaded) return null

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white antialiased">
            {/* Admin Mode Banner */}
            {isAdminViewing && (
                <div className="bg-red-900/90 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 text-center relative z-[100] border-b border-red-500/30 flex items-center justify-center space-x-4">
                    <span>⚡ Admin Mode — Viewing as User</span>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('admin_viewing')
                            window.location.href = '/admin'
                        }}
                        className="bg-white text-red-900 px-3 py-0.5 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        ← Back to Admin
                    </button>
                </div>
            )}
            <TopBar />
            <div className={cn("flex", isAdminViewing ? "pt-0" : "pt-14")}>
                <Sidebar />
                <main className="flex-1 md:pl-64 min-h-[calc(100vh-3.5rem)]">
                    {children}
                </main>
            </div>
        </div>
    )
}
