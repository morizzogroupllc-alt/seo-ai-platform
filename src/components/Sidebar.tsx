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
    RefreshCw,
    Type,
    Link as LinkIcon,
    Database,
    Activity,
    Smartphone,
    Bug,
    Network,
    Bot,
    ClipboardCheck,
    MonitorCheck,
    FileCheck,
    ShieldAlert,
    MessageSquareQuote,
    Send,
    Tags,
    Eye,
    Copy,
    ClipboardList,
    Mail,
    MessageCircle,
    TrendingUp,
    Star,
    Shield,
    Navigation,
    Grid3X3,
    List,
    Users,
    PieChart,
    Map,
    Telescope,
    Key,
    Combine,
    BarChart,
    Link2,
    CheckCircle2,
    Locate,
    Upload,
    ExternalLink,
    FileStack,
    Play,
    Mic
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
        name: 'On-Page SEO',
        icon: Search,
        children: [
            { name: 'Title & Meta Generator', href: '/dashboard/tools/title-meta-gen', icon: FileText },
            { name: 'Header Structure Optimizer', href: '/dashboard/tools/header-optimizer', icon: Type },
            { name: 'Image ALT Text Generator', href: '/dashboard/tools/image-alt-gen', icon: ImageIcon },
            { name: 'Internal Keyword Mapper', href: '/dashboard/tools/keyword-mapping', icon: LinkIcon },
            { name: 'Schema Markup Generator', href: '/dashboard/tools/schema-gen', icon: Database },
        ]
    },
    {
        name: 'Technical SEO',
        icon: Settings,
        children: [
            { name: 'Core Web Vitals Checker', href: '/dashboard/tools/vitals-checker', icon: Activity },
            { name: 'Mobile Checker', href: '/dashboard/tools/mobile-checker', icon: Smartphone },
            { name: 'Indexation & Crawl Audit', href: '/dashboard/tools/crawl-audit', icon: Bug },
            { name: 'XML Sitemap Generator', href: '/dashboard/tools/sitemap-gen', icon: Network },
            { name: 'Robots.txt Generator', href: '/dashboard/tools/robots-gen', icon: Bot },
            { name: 'Technical SEO Audit', href: '/dashboard/tools/tech-audit', icon: ClipboardCheck },
            { name: 'Full Website Audit', href: '/dashboard/tools/full-site-audit', icon: MonitorCheck },
        ]
    },
    {
        name: 'GBP Management',
        icon: MapPin,
        children: [
            { name: 'GBP Audit Tool', href: '/dashboard/tools/gbp-audit', icon: FileCheck },
            { name: 'GBP Insights Analyzer', href: '/dashboard/tools/gbp-insights', icon: BarChart3 },
            { name: 'GBP Spam Fighter', href: '/dashboard/tools/gbp-spam-fighter', icon: ShieldAlert },
            { name: 'GBP Q&A Responder', href: '/dashboard/tools/gbp-qa-responder', icon: MessageSquareQuote },
            { name: 'GBP Post Generator', href: '/dashboard/tools/gbp-post-gen', icon: Send },
            { name: 'GBP AI Agent', href: '/dashboard/tools/gbp-ai-agent', icon: Bot },
            { name: 'GMB Category Finder', href: '/dashboard/tools/gmb-category-finder', icon: Tags },
            { name: 'Competitor GBP Spy', href: '/dashboard/tools/competitor-gbp-spy', icon: Eye },
            { name: 'Duplicate GBP Detector', href: '/dashboard/tools/duplicate-gbp-detector', icon: Copy },
            { name: 'GBP Website Builder', href: '/dashboard/tools/gbp-website-builder', icon: Globe },
            { name: 'GMB Full Audit', href: '/dashboard/tools/gmb-full-audit', icon: ClipboardList },
            { name: 'Review Aggregator', href: '/dashboard/tools/review-aggregator', icon: MessageSquare },
        ]
    },
    {
        name: 'Reviews & Reputation',
        icon: Star,
        children: [
            { name: 'Review Campaign Builder', href: '/dashboard/tools/review-campaign-builder', icon: Mail },
            { name: 'Review Response Gen', href: '/dashboard/tools/review-response-gen', icon: MessageCircle },
            { name: 'Sentiment & Gap Analysis', href: '/dashboard/tools/review-sentiment-gap', icon: TrendingUp },
            { name: 'Reputation Score Calc', href: '/dashboard/tools/reputation-score-calc', icon: Star },
            { name: 'Reputation Manager', href: '/dashboard/tools/reputation-manager', icon: Shield },
        ]
    },
    {
        name: 'Rank Tracking',
        icon: Navigation,
        children: [
            { name: 'Geo-Grid Rank Tracker', href: '/dashboard/tools/geo-grid-rank-tracker', icon: Grid3X3 },
            { name: 'Local SERP Tracker', href: '/dashboard/tools/local-serp-tracker', icon: List },
            { name: 'Competitor Rank Comparator', href: '/dashboard/tools/competitor-rank-comparator', icon: Users },
            { name: 'Visibility Score Calc', href: '/dashboard/tools/visibility-score-calc', icon: Eye },
            { name: 'Service Area Mapper', href: '/dashboard/tools/service-area-mapper', icon: Map },
            { name: 'AI Share of Voice', href: '/dashboard/tools/ai-share-of-voice', icon: PieChart },
        ]
    },
    {
        name: 'Niche & Keywords',
        icon: Telescope,
        children: [
            { name: 'AI Niche Finder', href: '/dashboard/tools/ai-niche-finder', icon: Telescope },
            { name: 'Local Keyword Gen', href: '/dashboard/tools/local-keyword-gen', icon: Key },
            { name: 'Service+City Combiner', href: '/dashboard/tools/service-city-kw-combiner', icon: Combine },
            { name: 'Difficulty Estimator', href: '/dashboard/tools/keyword-difficulty-estimator', icon: BarChart },
        ]
    },
    {
        name: 'Citations & Off-Page',
        icon: Link2,
        children: [
            { name: 'NAP Consistency Check', href: '/dashboard/tools/nap-consistency', icon: CheckCircle2 },
            { name: 'Citation Finder', href: '/dashboard/tools/citation-finder', icon: Locate },
            { name: 'Citation Tracker', href: '/dashboard/tools/citation-tracker', icon: Activity },
            { name: 'Auto Citation Builder', href: '/dashboard/tools/auto-citation-builder', icon: Upload },
            { name: 'Duplicate Resolver', href: '/dashboard/tools/duplicate-resolver', icon: Copy },
            { name: 'Knowledge Graph Opt', href: '/dashboard/tools/knowledge-graph-opt', icon: Share2 },
            { name: 'Business Info Sync', href: '/dashboard/tools/business-info-sync', icon: RefreshCw },
            { name: 'Local Backlink Finder', href: '/dashboard/tools/local-backlink-finder', icon: ExternalLink },
            { name: 'Citation Auto Builder', href: '/dashboard/tools/citation-auto-builder', icon: Zap },
            { name: 'AI Link Building', href: '/dashboard/tools/ai-link-building', icon: Bot },
            { name: 'Link Manual Tracker', href: '/dashboard/tools/link-manual-tracker', icon: ClipboardList },
        ]
    },
    {
        name: 'Rank & Rent',
        icon: Rocket,
        children: [
            { name: 'Bulk Page Gen', href: '/dashboard/tools/bulk-page-gen', icon: Layers },
            { name: 'Bulk Publisher (WP)', href: '/dashboard/tools/bulk-publisher-wp', icon: FileStack },
            { name: 'SEO Slug Automation', href: '/dashboard/tools/seo-slug-automation', icon: LinkIcon },
            { name: 'Internal Link Engine', href: '/dashboard/tools/internal-linking-engine', icon: Network },
            { name: 'Silo & Hierarchy', href: '/dashboard/tools/silo-hierarchy-builder', icon: Layout },
            { name: 'Rank & Rent Blueprint', href: '/dashboard/tools/rank-rent-blueprint', icon: Map },
            { name: 'SEO Safety Controller', href: '/dashboard/tools/seo-safety-controller', icon: ShieldCheck },
        ]
    },
    {
        name: 'Image Optimization',
        icon: ImageIcon,
        children: [
            { name: 'Image Geo-Tagging', href: '/dashboard/tools/image-geo-tagging', icon: MapPin },
            { name: 'Image Compression', href: '/dashboard/tools/image-compression', icon: Zap },
            { name: 'GMB Image Optimizer', href: '/dashboard/tools/gmb-image-optimizer', icon: ImageIcon },
        ]
    },
    {
        name: 'Automation & Social',
        icon: Bot,
        children: [
            { name: '1-Click Automation', href: '/dashboard/tools/full-seo-automation', icon: Zap },
            { name: 'GMB Auto-Responder', href: '/dashboard/tools/gmb-auto-responder', icon: MessageCircle },
            { name: 'GMB Social Auto', href: '/dashboard/tools/gmb-social-auto', icon: Share2 },
            { name: 'Review Outreach', href: '/dashboard/tools/review-outreach', icon: Mail },
            { name: 'Heatmap Analysis', href: '/dashboard/tools/heatmap-analysis', icon: Grid3X3 },
            { name: 'Social Connector', href: '/dashboard/tools/social-connector', icon: TrendingUp },
            { name: 'Video SEO Script', href: '/dashboard/tools/video-seo-script', icon: Play },
            { name: 'Local PPC Gen', href: '/dashboard/tools/local-ppc-gen', icon: DollarSign },
            { name: 'Fast Indexing Pusher', href: '/dashboard/tools/indexing-pusher', icon: Send },
        ]
    },
    {
        name: 'Reports & Analytics',
        icon: PieChart,
        children: [
            { name: 'SEO Checklist Gen', href: '/dashboard/tools/seo-checklist-gen', icon: ClipboardCheck },
            { name: 'PDF Report Gen', href: '/dashboard/tools/pdf-report-gen', icon: FileText },
            { name: 'Client Snapshot', href: '/dashboard/tools/client-snapshot', icon: Eye },
            { name: 'Multi-Location Dash', href: '/dashboard/tools/multi-location-dash', icon: LayoutDashboard },
            { name: 'White-Label Reports', href: '/dashboard/tools/white-label-reports', icon: Palette },
            { name: 'Performance Alerts', href: '/dashboard/tools/performance-alerts', icon: ShieldAlert },
            { name: 'Analytics Integrator', href: '/dashboard/tools/analytics-integrator', icon: BarChart3 },
        ]
    },
    {
        name: 'Agency Tools',
        icon: Users,
        children: [
            { name: 'Mobile PRO Fixer', href: '/dashboard/tools/mobile-pro-fixer', icon: Smartphone },
            { name: 'Branding & Name Gen', href: '/dashboard/tools/branding-name-gen', icon: Tags },
            { name: 'CRM Integrator', href: '/dashboard/tools/crm-integrator', icon: Users },
            { name: 'Spam Signal Detector', href: '/dashboard/tools/spam-signal-detector', icon: ShieldAlert },
            { name: 'Citation Manual Mgr', href: '/dashboard/tools/citation-manual-mgr', icon: ClipboardList },
        ]
    },
    {
        name: 'System Core',
        icon: Heart,
        children: [
            { name: 'Unified NAP Hub', href: '/dashboard/tools/unified-nap-hub', icon: Heart },
            { name: 'API Health Monitor', href: '/dashboard/tools/api-health-monitor', icon: Activity },
            { name: 'Multi-Language SEO', href: '/dashboard/tools/multi-language-seo', icon: Globe },
            { name: 'Voice Search Opt', href: '/dashboard/tools/voice-search-opt', icon: Mic },
            { name: 'Zero-Click Opt', href: '/dashboard/tools/zero-click-opt', icon: MousePointer2 },
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
