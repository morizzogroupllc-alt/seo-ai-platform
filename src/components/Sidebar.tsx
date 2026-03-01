'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    Heart,
    Globe,
    Search,
    ChevronDown,
    ChevronRight,
    Settings,
    DollarSign,
    BarChart3,
    FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface NavItem {
    name: string
    icon: LucideIcon
    href?: string
    children?: {
        name: string
        href: string
        icon?: LucideIcon
    }[]
}

const navigation: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Marketplace', icon: ShoppingBag, href: '#' },
    { name: 'Bulk Analysis', icon: BarChart3, href: '#' },
    {
        name: 'Local SEO',
        icon: Heart,
        children: [
            { name: 'The Heart (NAP)', href: '/dashboard', icon: Heart },
            { name: 'AI Website Generator', href: '#', icon: Globe },
            { name: 'GBP Audit', href: '#', icon: Search },
        ]
    },
    {
        name: 'Content Creation',
        icon: FileText,
        children: [
            { name: 'Blog Generator', href: '#', icon: FileText },
            { name: 'Schema Markup', href: '#', icon: Layers },
        ]
    },
    { name: 'SEO Tools', icon: Layers, href: '#' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [openMenus, setOpenMenus] = useState<string[]>(['Local SEO'])

    const toggleMenu = (name: string) => {
        setOpenMenus(prev =>
            prev.includes(name)
                ? prev.filter(m => m !== name)
                : [...prev, name]
        )
    }

    return (
        <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-screen sticky top-0 overflow-y-auto scrollbar-hide">
            {/* Logo */}
            <div className="p-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-xl italic">S</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">SemanticsX</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const hasChildren = !!item.children
                    const isOpen = openMenus.includes(item.name)
                    const isActive = pathname === item.href

                    return (
                        <div key={item.name}>
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                                        isOpen ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    )}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon size={20} className={cn(isOpen ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </div>
                                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                            ) : (
                                <Link
                                    href={item.href || '#'}
                                    className={cn(
                                        "flex items-center space-x-3 p-3 rounded-xl transition-all group",
                                        isActive
                                            ? "bg-indigo-600/10 text-indigo-400 font-semibold"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    )}
                                >
                                    <item.icon size={20} className={cn(isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            )}

                            {/* Children */}
                            {hasChildren && isOpen && (
                                <div className="mt-1 ml-4 space-y-1 border-l border-slate-800 pl-4 py-1">
                                    {item.children?.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className={cn(
                                                "flex items-center space-x-3 p-2 rounded-lg text-sm transition-all",
                                                pathname === child.href
                                                    ? "bg-indigo-600/20 text-indigo-400 font-medium"
                                                    : "text-slate-500 hover:text-white hover:bg-slate-800/30"
                                            )}
                                        >
                                            {child.icon && <child.icon size={16} />}
                                            <span>{child.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Footer Nav */}
            <div className="p-4 border-t border-slate-800 bg-[#0f172a]/50">
                <Link
                    href="#"
                    className="flex items-center space-x-3 p-3 text-slate-400 hover:text-white transition-all group"
                >
                    <DollarSign size={20} className="text-slate-500 group-hover:text-indigo-400" />
                    <span className="text-sm font-medium">Earn Forever</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center space-x-3 p-3 text-slate-400 hover:text-white transition-all group"
                >
                    <Settings size={20} className="text-slate-500 group-hover:text-indigo-400" />
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    )
}
