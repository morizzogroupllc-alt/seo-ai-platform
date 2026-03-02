'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    Plus,
    FileText,
    Activity,
    Layout,
    ArrowRight,
    Lock,
    CheckCircle2,
    Zap,
    Globe,
    Users,
    Rocket,
    Mail,
    Layers,
    Settings,
    Cpu,
    BarChart3,
    MousePointer2,
    Package,
    Grip
} from 'lucide-react';

// --- Shared Components ---

const StatCard = ({ label, value, icon: Icon, color = "text-purple-400" }: { label: string, value: string | number, icon?: any, color?: string }) => (
    <div className="bg-[#1A1740] border border-[#2D2B55] p-4 rounded-xl text-center flex flex-col items-center justify-center space-y-1">
        {Icon && <Icon size={18} className={`${color} mb-1`} />}
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</div>
    </div>
);

const ToolCard = ({ icon: Icon, name, highlighted = false, badge }: { icon: any, name: string, highlighted?: boolean, badge?: string }) => (
    <div className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group ${highlighted
            ? 'bg-purple-600/10 border-purple-500/50 shadow-[0_0_15px_rgba(124,58,237,0.1)]'
            : 'bg-[#1A1740] border-[#2D2B55] hover:border-purple-500/50'
        }`}>
        <div className={`p-3 rounded-lg ${highlighted ? 'bg-purple-600 text-white' : 'bg-white/5 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors'}`}>
            <Icon size={24} />
        </div>
        <div className="space-y-1">
            <div className="text-white font-semibold text-sm">{name}</div>
            {badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${badge === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-500'
                    }`}>
                    {badge}
                </span>
            )}
        </div>
    </div>
);

const TipBox = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-purple-600/5 border border-purple-500/20 p-4 rounded-xl flex items-start gap-4">
        <div className="text-xl">💡</div>
        <p className="text-purple-300/80 text-sm leading-relaxed italic">
            {children}
        </p>
    </div>
);

// --- VIEW 1: Local SEO Newbie ---

const ViewNewbie = () => {
    const router = useRouter();
    const steps = [
        { id: 1, title: 'Find Your Niche', desc: 'Start here — find a low-competition local niche', status: 'current', icon: Search },
        { id: 2, title: 'Build Your Website', desc: 'Complete Step 1 first', status: 'locked', icon: Layout },
        { id: 3, title: 'Deploy & Go Live', desc: 'Complete Step 2 first', status: 'locked', icon: Rocket },
        { id: 4, title: 'Get on Google Maps', desc: 'Complete Step 3 first', status: 'locked', icon: Globe },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Let's find your first niche! 🎯</h2>
                <p className="text-gray-400">Follow these steps in order</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`p-6 rounded-2xl border transition-all h-full flex flex-col ${step.status === 'current'
                                ? 'bg-[#1A1740] border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.15)] ring-1 ring-purple-500'
                                : 'bg-[#1A1740]/50 border-[#2D2B55] opacity-60'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${step.status === 'current' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-500'}`}>
                                <step.icon size={20} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${step.status === 'current' ? 'text-purple-400' : 'text-gray-600'}`}>
                                Step {step.id}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1 italic">{step.desc}</p>
                        {step.status === 'current' ? (
                            <button
                                onClick={() => router.push('/research')}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group"
                            >
                                Start Step 1
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-tighter bg-white/5 py-2 px-3 rounded-lg justify-center">
                                <Lock size={12} />
                                LOCKED
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold">Your Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ToolCard icon={Search} name="Niche Finder" highlighted={true} />
                    <ToolCard icon={BarChart3} name="SERP Analyzer" />
                    <ToolCard icon={Grip} name="Keyword Research" />
                </div>
            </div>

            <TipBox>
                Newbie Tip: Start with Research. Don't skip steps — the order matters!
            </TipBox>
        </div>
    );
};

// --- VIEW 2: Client SEO Pro ---

const ViewPro = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Manage your clients 💼</h2>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                        <Plus size={16} />
                        Add New Client
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500/50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                        <FileText size={16} />
                        Generate Report
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1A1740] border border-[#2D2B55] hover:border-purple-500/50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                        <Search size={16} />
                        Run Audit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Client Overview</h3>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-12 text-center space-y-4 flex flex-col items-center justify-center">
                        <div className="p-4 bg-white/5 rounded-full text-gray-500">
                            <Users size={48} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 font-medium">No clients yet</p>
                            <button className="text-purple-400 hover:text-purple-300 text-sm font-bold flex items-center gap-2 mx-auto mt-2">
                                <Plus size={16} /> Add First Client
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Quick Tools</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: 'Site Audit', icon: Search },
                            { name: 'GBP Audit', icon: Globe },
                            { name: 'Monthly Report', icon: FileText },
                            { name: 'Competitor Analysis', icon: BarChart3 }
                        ].map((tool, i) => (
                            <div key={i} className="bg-[#1A1740] border border-[#2D2B55] p-6 rounded-2xl flex items-center justify-between group hover:border-purple-500/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white/5 text-purple-400 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <tool.icon size={20} />
                                    </div>
                                    <span className="font-semibold text-sm">{tool.name}</span>
                                </div>
                                <button className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- VIEW 3: Rank & Rent ---

const ViewRankRent = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Build your empire 🏠</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Sites" value="0" icon={Globe} color="text-blue-400" />
                <StatCard label="Ranked" value="0" icon={Activity} color="text-yellow-400" />
                <StatCard label="Rented" value="0" icon={Users} color="text-emerald-400" />
                <StatCard label="Revenue" value="$0" icon={Zap} color="text-purple-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold">Your Sites Portfolio</h3>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-16 text-center space-y-6 flex flex-col items-center justify-center h-full">
                        <div className="p-4 bg-white/5 rounded-full text-gray-500">
                            <Package size={48} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-400 italic font-medium">No sites yet — find a niche first</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 mx-auto">
                                <Search size={18} /> Find Niche
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Rank & Rent Toolkit</h3>
                    <div className="bg-[#1A1740] border border-[#2D2B55] p-2 rounded-2xl divide-y divide-[#2D2B55]">
                        {[
                            { name: 'Niche Finder (CORE)', icon: Search },
                            { name: 'Bulk Page Generator', icon: Layers },
                            { name: 'Internal Linking Engine', icon: Settings },
                            { name: 'Geo-Grid Tracker', icon: Globe }
                        ].map((tool, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl group">
                                <div className="text-yellow-400">⭐</div>
                                <div className="p-2 bg-white/5 text-purple-400 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <tool.icon size={18} />
                                </div>
                                <span className="text-sm font-semibold">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TipBox>
                Start: Find niche → Build site → Rank → Rent
            </TipBox>
        </div>
    );
};

// --- VIEW 4: Agency ---

const ViewAgency = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Your Agency Hub 🏢</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Clients" value="0" icon={Users} color="text-blue-400" />
                <StatCard label="Sites" value="0" icon={Globe} color="text-purple-400" />
                <StatCard label="Reports" value="0" icon={FileText} color="text-emerald-400" />
                <StatCard label="Revenue" value="$0" icon={Zap} color="text-yellow-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Client Accounts</h3>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-12 text-center space-y-4 flex flex-col items-center justify-center">
                        <div className="p-4 bg-white/5 rounded-full text-gray-500">
                            <Mail size={48} />
                        </div>
                        <p className="text-gray-400 font-medium">No clients added</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
                            <Plus size={18} /> Add Client
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Agency Tools</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ToolCard icon={Activity} name="Multi-Client Dashboard" highlighted={true} />
                        <ToolCard icon={FileText} name="White Label Reports" />
                        <ToolCard icon={Layers} name="Bulk Site Generator" />
                        <ToolCard icon={Package} name="Client Proposal Generator" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold">Team Section</h3>
                <div className="bg-[#1A1740] border border-[#2D2B55] p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">U</div>
                        <div className="space-y-0.5">
                            <p className="text-sm font-semibold">Team Members: Just you</p>
                            <p className="text-xs text-gray-500 italic">Expand your team for better scale</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">
                        <Plus size={14} /> Invite Team Member
                        <span className="bg-white/5 text-[8px] px-1.5 py-0.5 rounded ml-1 border border-white/10">COMING SOON</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- VIEW 5: Automation / Scale ---

const ViewAutomation = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Automate everything ⚡</h2>

            <div className="space-y-4">
                <h3 className="text-lg font-bold">Active Pipelines</h3>
                <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl p-12 text-center space-y-4 flex flex-col items-center justify-center border-dashed">
                    <div className="p-4 bg-white/5 rounded-full text-gray-500">
                        <Cpu size={48} />
                    </div>
                    <p className="text-gray-400 font-medium">No pipelines running</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2">
                        <Plus size={18} /> Create Pipeline
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold">Automation Toolkit</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ToolCard icon={Zap} name="1-Click Full SEO" badge="Coming Soon" />
                        <ToolCard icon={Layers} name="Bulk Page Generator" badge="Active" highlighted={true} />
                        <ToolCard icon={Search} name="Bulk Niche Finder" badge="Coming Soon" />
                        <ToolCard icon={Settings} name="Auto Internal Linking" badge="Coming Soon" />
                        <ToolCard icon={Rocket} name="Auto Deploy" badge="Coming Soon" />
                        <ToolCard icon={FileText} name="Auto Reports" badge="Coming Soon" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Quick Stats</h3>
                    <div className="bg-[#1A1740] border border-[#2D2B55] rounded-2xl overflow-hidden divide-y divide-[#2D2B55]">
                        {[
                            { label: 'Pages Generated', value: 0, color: 'text-blue-400' },
                            { label: 'Sites Deployed', value: 0, color: 'text-purple-400' },
                            { label: 'Keywords Tracked', value: 0, color: 'text-emerald-400' }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 flex items-center justify-between">
                                <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
                                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TipBox>
                Set up once → AI handles everything
            </TipBox>
        </div>
    );
};

// --- Main Dashboard Page ---

export default function DashboardPage() {
    const [userType, setUserType] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Read user_type from localStorage
        const savedType = localStorage.getItem('user_type') || 'Local SEO Newbie';
        setUserType(savedType);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const renderView = () => {
        switch (userType) {
            case 'Local SEO Newbie': return <ViewNewbie />;
            case 'Client SEO Professional': return <ViewPro />;
            case 'Rank & Rent': return <ViewRankRent />;
            case 'Agency': return <ViewAgency />;
            case 'Automation / Scale': return <ViewAutomation />;
            default: return <ViewNewbie />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white p-4 lg:p-8 space-y-12 max-w-7xl mx-auto">

            {/* SHARED HEADER: Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#1A1740] to-purple-900/40 border border-purple-500/20 rounded-3xl p-8 lg:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                            Welcome back! 👋
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-purple-400 text-sm font-medium uppercase tracking-[0.2em]">Building as:</span>
                            <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                {userType}
                            </span>
                        </div>
                    </div>

                    <div className="flex divide-x divide-white/10">
                        <div className="px-6 text-center">
                            <p className="text-2xl font-black text-white">136</p>
                            <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest">Tools</p>
                        </div>
                        <div className="px-6 text-center">
                            <p className="text-2xl font-black text-white">9</p>
                            <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest">Phases</p>
                        </div>
                        <div className="px-6 text-center">
                            <p className="text-2xl font-black text-white">READY</p>
                            <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest">Status</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DYNAMIC VIEW */}
            <div className="min-h-[500px]">
                {renderView()}
            </div>

            {/* SHARED FOOTER: Links */}
            <div className="pt-8 border-t border-[#2D2B55] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm font-medium italic">© 2026 SEO AI Platform — Premium Local SEO SaaS</p>
                <button className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-sm transition-all">
                    All Phases
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
}
