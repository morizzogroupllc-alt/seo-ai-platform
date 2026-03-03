'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    Search,
    Wrench,
    Rocket,
    PenTool,
    MapPin,
    Phone,
    TrendingUp,
    ClipboardList,
    Zap,
    Settings as SettingsIcon,
    Menu,
    X,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    ShieldAlert,
    CreditCard
} from 'lucide-react'
import { cn } from '@/lib/utils'

const phasesNav = [
    { id: 'research', name: 'Research', href: '/research', icon: Search },
    { id: 'build', name: 'Build', href: '/build', icon: Wrench },
    { id: 'deploy', name: 'Deploy', href: '/deploy', icon: Rocket },
    { id: 'optimize', name: 'Optimize', href: '/optimize', icon: PenTool },
    { id: 'authority', name: 'Local Authority', href: '/authority', icon: MapPin },
    { id: 'convert', name: 'Convert', href: '/convert', icon: Phone },
    { id: 'track', name: 'Track', href: '/track', icon: TrendingUp },
    { id: 'reports', name: 'Reports', href: '/reports', icon: ClipboardList },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userType, setUserType] = useState<string | null>(null)
    const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const type = localStorage.getItem('user_type')
        if (type) setUserType(type)

        const checkRole = async () => {
            try {
                const { getCurrentUser, getUserRole } = await import('@/lib/auth')
                const user = await getCurrentUser()
                if (user) {
                    const role = await getUserRole(user.id)
                    setIsAdmin(role?.toLowerCase() === 'admin')
                }
            } catch (error) {
                console.error('Error checking role:', error)
            }
        }
        checkRole()

        // Auto-expand current phase section
        const currentPhase = phasesNav.find(p => pathname.startsWith(p.href))
        if (currentPhase) setExpandedPhase(currentPhase.id)
    }, [pathname])

    const currentPhaseIndex = phasesNav.findIndex(p => pathname.startsWith(p.href)) + 1

    const handleSignOut = async () => {
        try {
            const { signOut } = await import('@/lib/auth')
            await signOut()
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const handleChangeRole = () => {
        localStorage.removeItem('user_type')
        window.location.href = '/onboarding'
    }

    const NavItem = ({ href, icon: Icon, children, active, hasArrow }: {
        href: string,
        icon: any,
        children: React.ReactNode,
        active?: boolean,
        hasArrow?: boolean
    }) => (
        <Link
            href={href}
            onClick={() => setIsOpen(false)}
            className={cn(
                "h-11 px-3 rounded-xl flex items-center gap-3 transition-all duration-200 group relative",
                active
                    ? "sidebar-active-glow"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-white"
            )}
        >
            <Icon className={cn("w-5 h-5", active ? "text-white" : "text-gray-400 group-hover:text-purple-400")} />
            <span className="text-sm font-medium">{children}</span>
            {hasArrow && !active && (
                <span className="ml-auto text-gray-600 text-lg leading-none">›</span>
            )}
        </Link>
    )

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                type="button"
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-[var(--accent-blue)] rounded-lg shadow-xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-[var(--bg-primary)] border-r border-[var(--border-default)] flex flex-col transition-transform duration-300 shadow-2xl",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* --- TOP LOGO AREA (h-16) --- */}
                <div className="h-16 px-5 flex items-center shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[var(--accent-blue)] rounded-full flex items-center justify-center font-black text-white italic text-xl shadow-lg shadow-[var(--accent-blue)]/40">
                            S
                        </div>
                        <span className="text-white font-bold text-sm tracking-wider uppercase leading-none gradient-text">
                            SEO AI Platform
                        </span>
                    </div>
                </div>

                {/* --- USER TYPE SECTION --- */}
                <div className="mx-3 mt-3 mb-2 bg-[var(--bg-secondary)] rounded-xl p-3 border border-[var(--border-default)]">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">User Type</div>
                    <div className="text-white text-sm font-semibold mt-0.5 truncate">{userType || 'Not Selected'}</div>
                    <button
                        onClick={handleChangeRole}
                        className="text-[var(--accent-blue)] text-[11px] hover:text-blue-300 font-bold mt-1 inline-flex items-center"
                    >
                        ↩ Change Role
                    </button>
                </div>

                {/* --- PROGRESS BAR --- */}
                <div className="mx-3 mt-2 mb-4">
                    <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                        <span className="text-gray-500 uppercase tracking-wider">Current Progress</span>
                        <span className="text-purple-400">Phase {currentPhaseIndex || 0} of 8</span>
                    </div>
                    <div className="h-1 w-full bg-[var(--bg-input)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-blue)] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${((currentPhaseIndex || 0) / 8) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="border-t border-[var(--border-default)] mx-3" />

                {/* --- NAVIGATION CONTENT --- */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-hide">
                    {/* OVERVIEW */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-2 font-black">Overview</div>
                        {isAdmin && (
                            <NavItem
                                href="/admin"
                                icon={ShieldAlert}
                                active={pathname.startsWith('/admin')}
                            >
                                <span className="text-red-400">Admin Panel</span>
                            </NavItem>
                        )}
                        <NavItem
                            href="/dashboard"
                            icon={LayoutDashboard}
                            active={pathname === '/dashboard'}
                        >
                            Dashboard
                        </NavItem>
                    </div>

                    {/* GROWTH PHASES */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-2 font-black">Growth Phases</div>
                        <div className="space-y-1">
                            {phasesNav.map((phase) => {
                                const isActive = pathname.startsWith(phase.href)
                                const isExpanded = expandedPhase === phase.id

                                return (
                                    <div key={phase.id} className="space-y-1">
                                        <Link
                                            href={phase.href}
                                            onClick={() => {
                                                setIsOpen(false)
                                                setExpandedPhase(isExpanded ? null : phase.id)
                                            }}
                                            className={cn(
                                                "h-11 px-3 rounded-xl flex items-center gap-3 transition-all duration-200 group",
                                                isActive
                                                    ? "sidebar-active-glow"
                                                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-white"
                                            )}
                                        >
                                            <phase.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-purple-400")} />
                                            <span className="text-sm font-medium">{phase.name}</span>
                                            {!isActive && (
                                                <span className="ml-auto text-gray-600 text-lg leading-none">›</span>
                                            )}
                                        </Link>

                                        {/* Sub-items (Accordion) */}
                                        {isExpanded && phase.id === 'research' && (
                                            <div className="ml-3 mt-1 space-y-1 border-l border-[var(--border-default)]">
                                                {[
                                                    { name: 'Niche Finder', href: '/research', active: pathname === '/research' },
                                                    { name: 'SERP Analyzer', href: '/research/serp', soon: true },
                                                    { name: 'Competitor Research', href: '/research/competitor', soon: true },
                                                    { name: 'Keyword Discovery', href: '/research/keywords', soon: true },
                                                ].map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.soon ? '#' : sub.href}
                                                        className={cn(
                                                            "h-9 pl-8 pr-3 flex items-center justify-between text-xs font-semibold rounded-r-xl transition-all",
                                                            sub.active
                                                                ? "text-[var(--accent-blue)] border-l-2 border-[var(--accent-blue)] bg-[var(--accent-blue)]/5"
                                                                : "text-gray-500 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        <span>{sub.name}</span>
                                                        {sub.soon && (
                                                            <span className="text-[8px] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-tertiary)] border border-[var(--border-default)]">Soon</span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* PLATFORM */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-2 font-black">Platform</div>
                        <NavItem
                            href="/automation"
                            icon={Zap}
                            active={pathname === '/automation'}
                        >
                            Automation
                        </NavItem>
                    </div>

                    {/* PREFERENCES */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-2 font-black">Preferences</div>
                        <NavItem
                            href="/system"
                            icon={SettingsIcon}
                            active={pathname === '/system'}
                        >
                            System
                        </NavItem>
                    </div>
                </div>

                {/* --- BOTTOM AREA --- */}
                <div className="mt-auto shrink-0">
                    <div className="border-t border-[var(--border-default)] mx-3" />
                    <div className="px-3 py-4 space-y-3">
                        {/* CREDITS BOX */}
                        <div className="bg-[var(--bg-secondary)] rounded-xl p-3 border border-[var(--border-default)]">
                            <div className="flex items-center gap-2 mb-1.5">
                                <CreditCard size={12} className="text-gray-500" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Plan</span>
                            </div>
                            <div className="text-white text-sm font-semibold">Free Plan</div>
                            <div className="text-purple-400 text-[11px] font-bold mt-1">5 searches remaining</div>
                            <button className="text-[var(--accent-blue)] text-[11px] font-black uppercase tracking-tighter hover:text-white mt-1.5 inline-flex items-center gap-1 transition-colors">
                                Upgrade Plan <ChevronRight size={10} />
                            </button>
                        </div>

                        {/* SIGN OUT */}
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 transition-colors font-bold text-sm"
                        >
                            <span className="text-lg leading-none">→</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
