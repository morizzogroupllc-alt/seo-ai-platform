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

    if (!isLoaded) return null

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-300">
            <TopBar />
            <div className="flex pt-14">
                <Sidebar />
                <main className="flex-1 md:pl-64 min-h-[calc(100vh-3.5rem)]">
                    {children}
                </main>
            </div>
        </div>
    )
}
