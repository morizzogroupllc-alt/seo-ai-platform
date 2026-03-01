'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Search,
    Wrench,
    Rocket,
    ShieldCheck,
    Link2,
    Target,
    LineChart,
    FileText,
    Zap,
    Settings,
    Menu,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'P1: Research', href: '/research', icon: Search },
    { name: 'P2: Build', href: '/build', icon: Wrench },
    { name: 'P3: Deploy', href: '/deploy', icon: Rocket },
    { name: 'P4: Optimize', href: '/optimize', icon: ShieldCheck },
    { name: 'P5: Authority', href: '/authority', icon: Link2 },
    { name: 'P6: Convert', href: '/convert', icon: Target },
    { name: 'P7: Track', href: '/track', icon: LineChart },
    { name: 'P8: Reports', href: '/reports', icon: FileText },
    { name: 'Automation', href: '/automation', icon: Zap },
    { name: 'System', href: '/system', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userType, setUserType] = useState<string | null>(null)

    React.useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)
    }, [])

    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-primary">SEO AI Platform</h1>
                        {userType && (
                            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {userType}
                            </div>
                        )}
                    </div>

                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-primary text-white"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
