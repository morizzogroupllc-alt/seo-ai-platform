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
    FileText,
    LucideIcon,
    Zap,
    MapPin,
    PenTool,
    Cpu,
    MousePointer2,
    Share2,
    Image as ImageIcon,
    Code,
    Layout,
    Cloud,
    Rocket,
    Server,
    Hammer,
    Palette,
    MessageSquare,
    ShieldCheck,
    RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
    {
        name: 'Website Builder',
        icon: Layout,
        children: [
            { name: 'AI Elementor Generator', href: '/dashboard/tools/ai-elementor-gen', icon: Cpu },
            { name: 'AI Website Generator WP', href: '/dashboard/tools/ai-website-gen-wp', icon: Globe },
            { name: 'SEO Structure Enforcer', href: '/dashboard/tools/seo-structure-enforcer', icon: Hammer },
            { name: 'Homepage Layout Builder', href: '/dashboard/tools/homepage-layout-builder', icon: Layout },
            { name: 'Service Page Generator', href: '/dashboard/tools/service-page-gen', icon: Layers },
            { name: 'Location Page Generator', href: '/dashboard/tools/location-page-gen', icon: MapPin },
            { name: 'Near-Me Page Generator', href: '/dashboard/tools/near-me-page-gen', icon: Search },
            { name: 'Elementor Section Builder', href: '/dashboard/tools/elementor-section-builder', icon: Code },
            { name: 'Static Website Gen', href: '/dashboard/tools/static-site-gen', icon: Globe },
            { name: 'Netlify/Vercel Hosting', href: '/dashboard/tools/auto-hosting', icon: Cloud },
            { name: 'Hosting Presets', href: '/dashboard/tools/hosting-presets', icon: Server },
            { name: 'WP Migration Tool', href: '/dashboard/tools/wp-migration', icon: Rocket },
        ]
    },
    {
        name: 'Design & UX',
        icon: PenTool,
        children: [
            { name: 'AI Design Generator', href: '/dashboard/tools/ai-design-gen', icon: ImageIcon },
            { name: 'Local SEO Theme Selector', href: '/dashboard/tools/local-seo-theme-selector', icon: Palette },
            { name: 'CTA Placement Optimizer', href: '/dashboard/tools/cta-optimizer', icon: MousePointer2 },
            { name: 'Conversion Layout Engine', href: '/dashboard/tools/conversion-layout-engine', icon: LayoutDashboard },
        ]
    },
    {
        name: 'Content Tools',
        icon: FileText,
        children: [
            { name: 'AI Local Content Writer', href: '/dashboard/tools/ai-local-content-writer', icon: PenTool },
            { name: 'City Content Generator', href: '/dashboard/tools/city-content-gen', icon: Globe },
            { name: 'Service + City Combiner', href: '/dashboard/tools/service-city-combiner', icon: Zap },
            { name: 'FAQ Schema Generator', href: '/dashboard/tools/faq-schema-gen', icon: MessageSquare },
            { name: 'E-E-A-T Content Booster', href: '/dashboard/tools/eeat-booster', icon: ShieldCheck },
            { name: 'AI Content Rewriter', href: '/dashboard/tools/content-rewriter', icon: RefreshCw },
        ]
    },
    {
        name: 'Local SEO',
        icon: Heart,
        children: [
            { name: 'The Heart (NAP)', href: '/dashboard', icon: Heart },
            { name: 'Meta Description Gen', href: '/dashboard/tools/meta-description-gen', icon: FileText },
            { name: 'GMB Optimizer', href: '#', icon: MapPin },
            { name: 'Local Rank Tracker', href: '#', icon: Search },
        ]
    },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [openMenus, setOpenMenus] = useState<string[]>(['Website Builder'])

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
                <div className="flex flex-col text-left">
                    <span className="text-white font-black text-lg tracking-tighter leading-none">SEO AI</span>
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] leading-none mt-0.5">Platform</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 pb-8">
                {navigation.map((item) => {
                    const hasChildren = !!item.children
                    const isOpen = openMenus.includes(item.name)
                    const isActive = pathname === item.href || item.children?.some(c => c.href === pathname && c.href !== '#')

                    return (
                        <div key={item.name}>
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                                        isOpen || isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    )}
                                >
                                    <div className="flex items-center space-x-3 text-left">
                                        <item.icon size={20} className={cn(isOpen || isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
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
                                                "flex items-center space-x-3 p-2 rounded-lg text-sm transition-all text-left",
                                                pathname === child.href && child.href !== '#'
                                                    ? "bg-indigo-600/20 text-indigo-400 font-medium"
                                                    : "text-slate-500 hover:text-white hover:bg-slate-800/30"
                                            )}
                                        >
                                            {child.icon && <child.icon size={16} />}
                                            <span className="truncate">{child.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Footer Nav */}
            <div className="p-4 border-t border-slate-800 bg-[#0f172a]/50 mt-auto">
                <Link
                    href="#"
                    className="flex items-center space-x-3 p-3 text-slate-400 hover:text-white transition-all group"
                >
                    <DollarSign size={20} className="text-slate-500 group-hover:text-indigo-400" />
                    <span className="text-sm font-medium">Affiliate Program</span>
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
