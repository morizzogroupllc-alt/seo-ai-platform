'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, Plus, FileText, Activity, Layout, ArrowRight,
    Lock, CheckCircle2, Zap, Globe, Users, Rocket, Layers,
    Settings, Cpu, BarChart3, Package, MapPin, Building2,
    TrendingUp, Star, Target, ChevronRight, Heart, AlertCircle,
    Clock, DollarSign, Shield, Sparkles, Database, Link,
    MousePointer2, LayoutDashboard, Play, Check, Circle
} from 'lucide-react';

// ═══════════════════════════════════════════
// SHARED MINI COMPONENTS
// ═══════════════════════════════════════════

const GradientText = ({ children, className = '' }: any) => (
    <span className={`bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${className}`}>
        {children}
    </span>
);

const StatCard = ({ label, value, icon: Icon, color = '#A855F7', sublabel = '' }: any) => (
    <div style={{
        background: '#0D1B2E',
        border: '1px solid rgba(168,85,247,0.15)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'all 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
    }}
        onMouseEnter={e => {
            e.currentTarget.style.border = '1px solid rgba(168,85,247,0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(168,85,247,0.1)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.border = '1px solid rgba(168,85,247,0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle, ${color}15, transparent)`, borderRadius: '50%', transform: 'translate(20px, -20px)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
            {Icon && <Icon size={16} style={{ color }} />}
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1 }}>{value}</div>
        {sublabel && <div style={{ fontSize: '11px', color: '#64748B' }}>{sublabel}</div>}
    </div>
);

const QuickToolBtn = ({ icon: Icon, label, onClick, active = false, locked = false }: any) => (
    <button
        onClick={locked ? undefined : onClick}
        style={{
            background: active ? 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.1))' : '#0D1B2E',
            border: active ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.15)',
            borderRadius: '14px',
            padding: '16px 12px',
            cursor: locked ? 'not-allowed' : 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            opacity: locked ? 0.4 : 1,
            position: 'relative'
        }}
        onMouseEnter={e => {
            if (!locked) {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }
        }}
        onMouseLeave={e => {
            if (!locked) {
                e.currentTarget.style.borderColor = active ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
            }
        }}
    >
        {locked && <Lock size={10} style={{ position: 'absolute', top: 8, right: 8, color: '#475569' }} />}
        <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: active ? 'linear-gradient(135deg, #A855F7, #3B82F6)' : 'rgba(168,85,247,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Icon size={18} style={{ color: active ? 'white' : '#A855F7' }} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: active ? '#E2D9F3' : '#94A3B8', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </button>
);

const SectionTitle = ({ children }: any) => (
    <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
        {children}
    </h3>
);

const Card = ({ children, style = {} }: any) => (
    <div style={{
        background: '#0D1B2E',
        border: '1px solid rgba(168,85,247,0.15)',
        borderRadius: '20px',
        padding: '24px',
        ...style
    }}>
        {children}
    </div>
);

// ═══════════════════════════════════════════
// BUSINESS PROFILE BANNER
// Shows if no active profile set
// ═══════════════════════════════════════════

const ProfileBanner = ({ userType, router }: any) => {
    const labels: any = {
        'Local SEO Newbie': 'Setup your business profile first',
        'Client SEO Professional': 'Add your first client profile',
        'Rank & Rent': 'Add your first site/niche profile',
        'Agency': 'Setup your agency profile',
        'Automation / Scale': 'Configure your first campaign profile',
    };
    return (
        <div
            onClick={() => router.push('/system')}
            style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.05))',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                gap: '12px',
                flexWrap: 'wrap',
                transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Heart size={16} style={{ color: '#A855F7' }} />
                </div>
                <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>
                        {labels[userType] || 'Setup your business profile'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        Tamam tools isko use karte hain — pehle ye setup karo
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#A855F7', flexShrink: 0 }}>
                Setup Now <ChevronRight size={14} />
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════
// VIEW 1: 🆕 LOCAL SEO NEWBIE
// ═══════════════════════════════════════════
const ViewNewbie = ({ router, hasProfile }: any) => {
    const steps = [
        { step: 1, title: 'Setup Business Profile', desc: 'Apna business info enter karo', icon: Heart, path: '/system', done: hasProfile, color: '#A855F7' },
        { step: 2, title: 'Find Your Niche', desc: 'Low-competition local niche dhundo', icon: Search, path: '/research', done: false, color: '#3B82F6' },
        { step: 3, title: 'Build Your Website', desc: 'AI se website generate karo', icon: Layout, path: '/build', done: false, color: '#10B981' },
        { step: 4, title: 'Deploy & Go Live', desc: 'Site ko live karo', icon: Rocket, path: '/deploy', done: false, color: '#F59E0B' },
        { step: 5, title: 'Get on Google Maps', desc: 'GBP setup karo', icon: MapPin, path: '/authority', done: false, color: '#EF4444' },
    ];

    const currentStep = steps.findIndex(s => !s.done);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Journey Progress */}
            <Card>
                <SectionTitle>🎯 Your Journey — Step by Step</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {steps.map((s, i) => {
                        const isCurrent = i === currentStep;
                        const isLocked = i > currentStep;
                        const isDone = s.done;
                        return (
                            <div
                                key={s.step}
                                onClick={() => !isLocked && router.push(s.path)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px 20px',
                                    borderRadius: '14px',
                                    background: isCurrent ? `linear-gradient(135deg, ${s.color}12, ${s.color}06)` : 'rgba(255,255,255,0.02)',
                                    border: isCurrent ? `1px solid ${s.color}40` : '1px solid rgba(255,255,255,0.05)',
                                    cursor: isLocked ? 'not-allowed' : 'pointer',
                                    opacity: isLocked ? 0.4 : 1,
                                    transition: 'all 0.2s ease',
                                    boxShadow: isCurrent ? `0 0 20px ${s.color}10` : 'none'
                                }}
                                onMouseEnter={e => { if (!isLocked) e.currentTarget.style.borderColor = `${s.color}60`; }}
                                onMouseLeave={e => { if (!isLocked) e.currentTarget.style.borderColor = isCurrent ? `${s.color}40` : 'rgba(255,255,255,0.05)'; }}
                            >
                                {/* Step indicator */}
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                                    background: isDone ? '#059669' : isCurrent ? s.color : 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: isCurrent ? `0 0 16px ${s.color}40` : 'none'
                                }}>
                                    {isDone ? <Check size={16} style={{ color: 'white' }} /> :
                                        isLocked ? <Lock size={14} style={{ color: '#475569' }} /> :
                                            <s.icon size={16} style={{ color: 'white' }} />}
                                </div>
                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: isDone ? '#64748B' : 'white', textDecoration: isDone ? 'line-through' : 'none' }}>
                                        {s.title}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{s.desc}</div>
                                </div>
                                {/* Action */}
                                {isCurrent && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: s.color, flexShrink: 0 }}>
                                        Start <ChevronRight size={14} />
                                    </div>
                                )}
                                {isDone && <Check size={16} style={{ color: '#059669', flexShrink: 0 }} />}
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Quick Tools */}
            <div>
                <SectionTitle>🛠️ Your Tools (Research Phase)</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                    <QuickToolBtn icon={Search} label="Niche Finder" onClick={() => router.push('/research')} active />
                    <QuickToolBtn icon={BarChart3} label="SERP Analyzer" onClick={() => router.push('/research')} />
                    <QuickToolBtn icon={Target} label="Competitor Research" onClick={() => router.push('/research')} />
                    <QuickToolBtn icon={Database} label="Keyword Research" onClick={() => router.push('/research')} />
                    <QuickToolBtn icon={Layout} label="Website Builder" locked />
                    <QuickToolBtn icon={MapPin} label="GBP Setup" locked />
                </div>
            </div>

            {/* Tip */}
            <div style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '14px', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Sparkles size={16} style={{ color: '#A855F7', marginTop: '2px', flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                    <strong style={{ color: '#A855F7' }}>Newbie Tip:</strong> Pehle Business Profile setup karo — phir Research shuru karo. Steps unlock hote jaenge!
                </p>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════
// VIEW 2: 💼 CLIENT SEO PROFESSIONAL
// ═══════════════════════════════════════════
const ViewPro = ({ router, hasProfile }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            <StatCard label="Active Clients" value="0" icon={Users} color="#3B82F6" sublabel="Add your first client" />
            <StatCard label="Sites Managed" value="0" icon={Globe} color="#A855F7" sublabel="Across all clients" />
            <StatCard label="Reports Sent" value="0" icon={FileText} color="#10B981" sublabel="This month" />
            <StatCard label="Monthly Revenue" value="$0" icon={DollarSign} color="#F59E0B" sublabel="From all clients" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Client List */}
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <SectionTitle>👥 Client Accounts</SectionTitle>
                    <button
                        onClick={() => router.push('/system')}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#A855F7', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}
                    >
                        <Plus size={12} /> Add Client
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '12px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(168,85,247,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={24} style={{ color: '#475569' }} />
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>No clients yet</p>
                    <button onClick={() => router.push('/system')} style={{ fontSize: '12px', color: '#A855F7', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>+ Add First Client →</button>
                </div>
            </Card>

            {/* Quick Tools */}
            <Card>
                <SectionTitle>⚡ Quick Actions</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { icon: Search, label: 'Site Audit', path: '/optimize', color: '#3B82F6' },
                        { icon: Globe, label: 'GBP Audit', path: '/authority', color: '#10B981' },
                        { icon: FileText, label: 'Monthly Report', path: '/reports', color: '#A855F7' },
                        { icon: BarChart3, label: 'Competitor Analysis', path: '/research', color: '#F59E0B' },
                        { icon: Target, label: 'Keyword Research', path: '/research', color: '#EF4444' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            onClick={() => router.push(item.path)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${item.color}10`; e.currentTarget.style.borderColor = `${item.color}30`; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                        >
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <item.icon size={15} style={{ color: item.color }} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0', flex: 1 }}>{item.label}</span>
                            <ChevronRight size={14} style={{ color: '#475569' }} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* Tools Grid */}
        <div>
            <SectionTitle>🛠️ Client SEO Tools</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                <QuickToolBtn icon={Search} label="Niche Finder" onClick={() => router.push('/research')} active />
                <QuickToolBtn icon={Layout} label="Website Builder" onClick={() => router.push('/build')} />
                <QuickToolBtn icon={Shield} label="SEO Audit" onClick={() => router.push('/optimize')} />
                <QuickToolBtn icon={MapPin} label="GBP Tools" onClick={() => router.push('/authority')} />
                <QuickToolBtn icon={Star} label="Reviews" onClick={() => router.push('/authority')} />
                <QuickToolBtn icon={BarChart3} label="Rank Tracker" onClick={() => router.push('/track')} />
                <QuickToolBtn icon={FileText} label="Reports" onClick={() => router.push('/reports')} />
                <QuickToolBtn icon={Link} label="Citations" onClick={() => router.push('/authority')} />
            </div>
        </div>
    </div>
);

// ═══════════════════════════════════════════
// VIEW 3: 🏠 RANK & RENT
// ═══════════════════════════════════════════
const ViewRankRent = ({ router, hasProfile }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            <StatCard label="Total Sites" value="0" icon={Globe} color="#3B82F6" sublabel="In portfolio" />
            <StatCard label="Ranking" value="0" icon={TrendingUp} color="#F59E0B" sublabel="Getting traffic" />
            <StatCard label="Rented" value="0" icon={DollarSign} color="#10B981" sublabel="Earning revenue" />
            <StatCard label="Monthly Revenue" value="$0" icon={Zap} color="#A855F7" sublabel="From rentals" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Sites Portfolio */}
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <SectionTitle>🏗️ Sites Portfolio</SectionTitle>
                    <button
                        onClick={() => router.push('/research')}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#A855F7', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}
                    >
                        <Plus size={12} /> New Site
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(168,85,247,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={28} style={{ color: '#475569' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 8px 0', fontWeight: 600 }}>No sites yet</p>
                        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 16px 0' }}>Pehle niche dhundo, phir site banao</p>
                        <button onClick={() => router.push('/research')} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <Search size={14} /> Find Niche
                        </button>
                    </div>
                </div>
            </Card>

            {/* R&R Toolkit */}
            <Card>
                <SectionTitle>⭐ Core Toolkit</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { icon: Search, label: 'Niche Finder', path: '/research', active: true },
                        { icon: Layers, label: 'Bulk Page Gen', path: '/automation' },
                        { icon: Link, label: 'Internal Linking', path: '/optimize' },
                        { icon: Rocket, label: 'Auto Deploy', path: '/deploy' },
                        { icon: BarChart3, label: 'Geo-Grid Tracker', path: '/track' },
                    ].map((t, i) => (
                        <div
                            key={i}
                            onClick={() => router.push(t.path)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: t.active ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)', border: t.active ? '1px solid rgba(168,85,247,0.2)' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background = t.active ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)'}
                        >
                            <t.icon size={15} style={{ color: t.active ? '#A855F7' : '#64748B', flexShrink: 0 }} />
                            <span style={{ fontSize: '12px', fontWeight: 600, color: t.active ? '#E2D9F3' : '#94A3B8' }}>{t.label}</span>
                            {t.active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', marginLeft: 'auto' }} />}
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* All Tools */}
        <div>
            <SectionTitle>🛠️ Rank & Rent Tools</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                <QuickToolBtn icon={Search} label="Niche Finder" onClick={() => router.push('/research')} active />
                <QuickToolBtn icon={Layout} label="Static Site Gen" onClick={() => router.push('/build')} />
                <QuickToolBtn icon={Layers} label="Bulk Pages" onClick={() => router.push('/automation')} />
                <QuickToolBtn icon={Link} label="Internal Links" onClick={() => router.push('/optimize')} />
                <QuickToolBtn icon={Rocket} label="Deploy" onClick={() => router.push('/deploy')} />
                <QuickToolBtn icon={BarChart3} label="Rank Track" onClick={() => router.push('/track')} />
                <QuickToolBtn icon={MapPin} label="GBP Audit" onClick={() => router.push('/authority')} />
                <QuickToolBtn icon={Target} label="Competitor Spy" onClick={() => router.push('/research')} />
            </div>
        </div>
    </div>
);

// ═══════════════════════════════════════════
// VIEW 4: 🏢 AGENCY
// ═══════════════════════════════════════════
const ViewAgency = ({ router, hasProfile }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            <StatCard label="Total Clients" value="0" icon={Users} color="#3B82F6" sublabel="Active accounts" />
            <StatCard label="Sites Managed" value="0" icon={Globe} color="#A855F7" sublabel="Across clients" />
            <StatCard label="Reports Sent" value="0" icon={FileText} color="#10B981" sublabel="This month" />
            <StatCard label="MRR" value="$0" icon={DollarSign} color="#F59E0B" sublabel="Monthly revenue" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Clients */}
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <SectionTitle>👥 Client Accounts</SectionTitle>
                    <button onClick={() => router.push('/system')} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#A855F7', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>
                        <Plus size={12} /> Add Client
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: '12px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(168,85,247,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={24} style={{ color: '#475569' }} />
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>No clients added</p>
                    <button onClick={() => router.push('/system')} style={{ fontSize: '12px', color: '#A855F7', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>+ Add First Client →</button>
                </div>
            </Card>

            {/* Agency Tools */}
            <Card>
                <SectionTitle>🏢 Agency Tools</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                        { icon: Activity, label: 'Multi-Client Dashboard', active: true },
                        { icon: FileText, label: 'White Label Reports' },
                        { icon: Layers, label: 'Bulk Site Generator' },
                        { icon: Package, label: 'Client Proposals' },
                        { icon: Shield, label: 'Site Audits' },
                        { icon: BarChart3, label: 'Rank Tracking' },
                    ].map((t, i) => (
                        <div key={i} style={{ padding: '12px', borderRadius: '12px', background: t.active ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.02)', border: t.active ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <t.icon size={16} style={{ color: t.active ? '#A855F7' : '#64748B' }} />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: t.active ? '#E2D9F3' : '#94A3B8', lineHeight: 1.3 }}>{t.label}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* All Tools */}
        <div>
            <SectionTitle>🛠️ Full Agency Toolkit</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                <QuickToolBtn icon={Search} label="Research" onClick={() => router.push('/research')} active />
                <QuickToolBtn icon={Layout} label="Build Sites" onClick={() => router.push('/build')} />
                <QuickToolBtn icon={Rocket} label="Deploy" onClick={() => router.push('/deploy')} />
                <QuickToolBtn icon={Shield} label="Optimize" onClick={() => router.push('/optimize')} />
                <QuickToolBtn icon={MapPin} label="GBP & Local" onClick={() => router.push('/authority')} />
                <QuickToolBtn icon={MousePointer2} label="Convert" onClick={() => router.push('/convert')} />
                <QuickToolBtn icon={BarChart3} label="Track" onClick={() => router.push('/track')} />
                <QuickToolBtn icon={FileText} label="Reports" onClick={() => router.push('/reports')} />
            </div>
        </div>
    </div>
);

// ═══════════════════════════════════════════
// VIEW 5: 🤖 AUTOMATION / SCALE
// ═══════════════════════════════════════════
const ViewAutomation = ({ router, hasProfile }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            <StatCard label="Pages Generated" value="0" icon={Layers} color="#3B82F6" sublabel="Total pages" />
            <StatCard label="Sites Deployed" value="0" icon={Rocket} color="#A855F7" sublabel="Live sites" />
            <StatCard label="Pipelines" value="0" icon={Zap} color="#F59E0B" sublabel="Active automations" />
            <StatCard label="Keywords Tracked" value="0" icon={BarChart3} color="#10B981" sublabel="Across all sites" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Pipelines */}
            <Card style={{ border: '1px dashed rgba(168,85,247,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <SectionTitle>⚡ Active Pipelines</SectionTitle>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#A855F7', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>
                        <Plus size={12} /> Create Pipeline
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(168,85,247,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Cpu size={28} style={{ color: '#475569' }} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748B', margin: 0, fontWeight: 600 }}>No pipelines running</p>
                    <button style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #A855F7, #3B82F6)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 0 24px rgba(168,85,247,0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={14} /> Create First Pipeline
                    </button>
                </div>
            </Card>

            {/* Quick Stats */}
            <Card>
                <SectionTitle>📊 Quick Stats</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {[
                        { label: 'Pages Generated', value: 0, color: '#3B82F6' },
                        { label: 'Sites Deployed', value: 0, color: '#A855F7' },
                        { label: 'Keywords Tracked', value: 0, color: '#10B981' },
                        { label: 'Automations Active', value: 0, color: '#F59E0B' },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{s.label}</span>
                            <span style={{ fontSize: '20px', fontWeight: 800, color: s.color }}>{s.value}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* Automation Tools */}
        <div>
            <SectionTitle>🤖 Automation Toolkit</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                <QuickToolBtn icon={Zap} label="1-Click Full SEO" onClick={() => router.push('/automation')} active />
                <QuickToolBtn icon={Layers} label="Bulk Page Gen" onClick={() => router.push('/automation')} active />
                <QuickToolBtn icon={Search} label="Bulk Niche Finder" onClick={() => router.push('/research')} />
                <QuickToolBtn icon={Link} label="Auto Int. Linking" onClick={() => router.push('/optimize')} />
                <QuickToolBtn icon={Rocket} label="Auto Deploy" onClick={() => router.push('/deploy')} />
                <QuickToolBtn icon={FileText} label="Auto Reports" onClick={() => router.push('/reports')} />
                <QuickToolBtn icon={MapPin} label="Auto GBP" onClick={() => router.push('/authority')} />
                <QuickToolBtn icon={BarChart3} label="Rank Alerts" onClick={() => router.push('/track')} />
            </div>
        </div>

        <div style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '14px', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Sparkles size={16} style={{ color: '#A855F7', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: '#A855F7' }}>Automation Tip:</strong> Pehle API keys setup karo System mein — phir 1-Click Full SEO se sab kuch auto ho jayega!
            </p>
        </div>
    </div>
);

// ═══════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════
export default function DashboardPage() {
    const router = useRouter();
    const [userType, setUserType] = useState('');
    const [hasProfile, setHasProfile] = useState(false);
    const [loading, setLoading] = useState(true);

    const userConfig: any = {
        'Local SEO Newbie': { emoji: '🆕', color: '#3B82F6', label: 'Local SEO Newbie', greeting: "Chalo shuru karte hain! 🚀" },
        'Client SEO Professional': { emoji: '💼', color: '#8B5CF6', label: 'Client SEO Pro', greeting: "Aaj kaunsa client dekhna hai? 💼" },
        'Rank & Rent': { emoji: '🏠', color: '#F59E0B', label: 'Rank & Rent', greeting: "Apni empire banate hain! 🏠" },
        'Agency': { emoji: '🏢', color: '#10B981', label: 'Agency', greeting: "Agency ka din shuru ho gaya! 🏢" },
        'Automation / Scale': { emoji: '🤖', color: '#EF4444', label: 'Automation / Scale', greeting: "Sab kuch automate karte hain! ⚡" },
    };

    useEffect(() => {
        const ut = localStorage.getItem('user_type') || 'Local SEO Newbie';
        const pid = localStorage.getItem('active_profile_id');
        setUserType(ut);
        setHasProfile(!!pid);
        setLoading(false);
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid #A855F7', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#475569', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading Dashboard...</p>
        </div>
    );

    const cfg = userConfig[userType] || userConfig['Local SEO Newbie'];
    const now = new Date();
    const hour = now.getHours();
    const timeGreet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    const renderView = () => {
        const props = { router, hasProfile };
        switch (userType) {
            case 'Local SEO Newbie': return <ViewNewbie {...props} />;
            case 'Client SEO Professional': return <ViewPro {...props} />;
            case 'Rank & Rent': return <ViewRankRent {...props} />;
            case 'Agency': return <ViewAgency {...props} />;
            case 'Automation / Scale': return <ViewAutomation {...props} />;
            default: return <ViewNewbie {...props} />;
        }
    };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: 'Inter, sans-serif' }}>

            {/* ── HERO BANNER ── */}
            <div style={{
                background: 'linear-gradient(135deg, #0D1B2E 0%, #0F1E35 50%, rgba(168,85,247,0.06) 100%)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '24px',
                padding: '32px 36px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* BG blobs */}
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: `radial-gradient(circle, ${cfg.color}18, transparent)`, borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    {/* Left */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                            {timeGreet} 👋
                        </div>
                        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                            {cfg.greeting}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Building as:</span>
                            <span style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}40`, color: cfg.color, fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {cfg.emoji} {cfg.label}
                            </span>
                            <button
                                onClick={() => router.push('/onboarding')}
                                style={{ fontSize: '10px', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
                            >
                                Change Role
                            </button>
                        </div>
                    </div>

                    {/* Right — platform stats */}
                    <div style={{ display: 'flex', gap: '0', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        {[
                            { val: '136', label: 'Tools' },
                            { val: '8', label: 'Phases' },
                            { val: '5', label: 'User Types' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding: '16px 24px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                <div style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg, #A855F7, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROFILE BANNER (if no profile) ── */}
            {!hasProfile && <ProfileBanner userType={userType} router={router} />}

            {/* ── DYNAMIC VIEW ── */}
            {renderView()}

            {/* ── FOOTER ── */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>© 2026 Local SEO AI Platform</p>
                <button onClick={() => router.push('/research')} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#A855F7', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Explore All Tools <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
}
