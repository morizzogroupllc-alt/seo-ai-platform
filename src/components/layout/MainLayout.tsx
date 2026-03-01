'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '../sidebar/Sidebar'
import TopBar from './TopBar'

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
        <div className="min-h-screen bg-[#020617]">
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
