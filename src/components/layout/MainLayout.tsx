'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '../sidebar/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const userType = localStorage.getItem('user_type')

        if (!userType && pathname !== '/onboarding') {
            router.push('/onboarding')
        } else {
            setIsLoaded(true)
        }
    }, [pathname, router])

    if (pathname === '/onboarding') {
        return <>{children}</>
    }

    if (!isLoaded) return null

    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar />
            <main className="lg:pl-64 min-h-screen">
                {children}
            </main>
        </div>
    )
}
