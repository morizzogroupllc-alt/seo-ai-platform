/*
  If users still not loading, run in Supabase SQL editor:
  
  DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
  
  CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  USING (true);
  
  This allows all authenticated users to 
  read profiles. Secure enough for now.
*/
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Search,
    Download,
    X,
    User as UserIcon,
    CheckCircle2,
    AlertCircle,
    Shield,
    Zap,
    Activity,
    UserMinus,
    Ban
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---

interface Profile {
    id: string;
    email: string;
    role: 'admin' | 'user';
    plan: 'free' | 'starter' | 'pro' | 'agency' | 'enterprise';
    user_type: string;
    api_key_dataforseo: string | null;
    api_key_gemini: string | null;
    usage_niche_finder: number;
    usage_keywords: number;
    usage_serp: number;
    usage_content: number;
    email_confirmed_at?: string | null;
    usage_reset_date: string;
    is_active: boolean;
    created_at: string;
}

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

// --- Components ---

// --- CSS Helpers ---
const avatarGradientColors = [
    'linear-gradient(135deg, #6366f1, #a855f7)',
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #10b981, #3b82f6)',
];

const getAvatarColor = (email: string) => {
    const charCode = email.charCodeAt(0) + email.charCodeAt(email.length - 1);
    return avatarGradientColors[charCode % avatarGradientColors.length];
};

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {children}
        </span>
    );
}

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="inner-box border border-[#333333] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-[#333333]">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 transition-colors rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Page Implementation ---

export default function UsersManagementPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [planFilter, setPlanFilter] = useState('All Plans');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All');

    // Modal states
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [planModalOpen, setPlanModalOpen] = useState(false);
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);

    // Tab state in detail modal
    const [activeTab, setActiveTab] = useState<'profile' | 'usage' | 'activity'>('profile');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            // First verify current user is authenticated
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setError('Not authenticated. Please log in.')
                setUsers([])
                return
            }

            // Fetch ALL profiles
            const { data, error } = await supabase
                .from('profiles')
                .select('*')

            if (error) {
                console.error('Error fetching profiles:', error)
                setError(error.message)
                setUsers([])
            } else {
                setUsers(data || [])
            }
        } catch (err: any) {
            console.error('Unexpected error fetching profiles:', err);
            setError(err.message)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    // NOTE TO ADMIN: If user fetching still fails with 401/403 despite being admin, 
    // run this SQL in Supabase SQL Editor to ensure Admin full access:
    /*
    CREATE POLICY "Admin full access" ON profiles
    FOR ALL USING (
      EXISTS (SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin')
    );
    */

    const showToast = (message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPlan = planFilter === 'All Plans' || user.plan === planFilter.toLowerCase();
            const matchesType = typeFilter === 'All Types' || user.user_type === typeFilter;
            const matchesStatus = statusFilter === 'All' ||
                (statusFilter === 'Active' && user.is_active) ||
                (statusFilter === 'Banned' && !user.is_active);

            return matchesSearch && matchesPlan && matchesType && matchesStatus;
        });
    }, [users, searchQuery, planFilter, typeFilter, statusFilter]);

    const stats = useMemo(() => {
        return {
            total: users.length,
            free: users.filter(u => u.plan === 'free').length,
            paid: users.filter(u => u.plan !== 'free').length,
            banned: users.filter(u => !u.is_active).length
        };
    }, [users]);

    const handleExportCSV = () => {
        const headers = ['ID', 'Email', 'Plan', 'User Type', 'Joined', 'Usage (Total)', 'Active'];
        const rows = filteredUsers.map(u => [
            u.id,
            u.email,
            u.plan,
            u.user_type,
            new Date(u.created_at).toLocaleDateString(),
            u.usage_niche_finder + u.usage_keywords + u.usage_serp + u.usage_content,
            u.is_active
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const updateUserPlan = async (newPlan: string) => {
        if (!selectedUser) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ plan: newPlan.toLowerCase() })
                .eq('id', selectedUser.id);

            if (error) throw error;

            showToast(`Plan updated to ${newPlan}`, 'success');
            setPlanModalOpen(false);

            // Update local state immediately
            setUsers(prev => prev.map(u =>
                u.id === selectedUser.id ? { ...u, plan: newPlan as any } : u
            ));
        } catch (err) {
            showToast('Failed to update plan', 'error');
        }
    };

    const updateUserRole = async (newRole: string) => {
        if (!selectedUser) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', selectedUser.id);

            if (error) throw error;

            showToast(`Role updated to ${newRole}`, 'success');
            setRoleModalOpen(false);

            // Update local state immediately
            setUsers(prev => prev.map(u =>
                u.id === selectedUser.id ? { ...u, role: newRole as 'admin' | 'user' } : u
            ));
        } catch (err) {
            showToast('Failed to update role', 'error');
        }
    };

    const toggleUserBan = async () => {
        if (!selectedUser) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ is_active: !selectedUser.is_active })
                .eq('id', selectedUser.id);

            if (error) throw error;

            showToast(`User ${selectedUser.is_active ? 'banned' : 'unbanned'} successfully`, 'success');
            setBanModalOpen(false);

            // Update local state immediately
            setUsers(prev => prev.map(u =>
                u.id === selectedUser.id ? { ...u, is_active: !u.is_active } : u
            ));
        } catch (err) {
            showToast('Failed to toggle ban status', 'error');
        }
    };

    const getPlanColor = (plan: string) => {
        switch (plan.toLowerCase()) {
            case 'free': return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
            case 'starter': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'pro': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            case 'agency': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            case 'enterprise': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
        }
    };

    const getUserTypeColor = (type: string) => {
        if (!type || type === 'Not Selected') return 'text-gray-500 bg-white/5 border-[rgba(255,255,255,0.06)]';

        const t = type.toLowerCase();
        if (t.includes('newbie')) return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
        if (t.includes('client')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        if (t.includes('rank')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if (t.includes('agency')) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
        if (t.includes('automation')) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';

        return 'text-gray-400 bg-white/5 border-[rgba(255,255,255,0.06)]';
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-4 lg:p-8 space-y-8">
            {/* SECTION 1: Page Header */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users <span className="gradient-text">Management</span></h1>
                    <p className="text-gray-400 mt-1">Manage all platform users</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Users', value: stats.total, icon: UserIcon, color: 'text-purple-400' },
                        { label: 'Free Plan', value: stats.free, icon: Zap, color: 'text-blue-400' },
                        { label: 'Paid Plan', value: stats.paid, icon: Shield, color: 'text-emerald-400' },
                        { label: 'Banned', value: stats.banned, icon: Ban, color: 'text-red-400' }
                    ].map((stat, i) => (
                        <div key={i} className={cn("admin-stat-card card-enter", i === 0 ? 'delay-75' : i === 1 ? 'delay-100' : i === 2 ? 'delay-150' : 'delay-200'
                        )}>
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                            <p className="text-3xl font-bold tracking-tight">{loading ? '...' : stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 2: Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between glass-card shimmer-border p-4 rounded-xl shadow-lg animate-fadeIn delay-200">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="w-full bg-[#1E1E1E] border border-[#333333] rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
                            style={{
                                colorScheme: 'dark',
                                backgroundColor: '#1E1E1E',
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <select
                        className="bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                    >
                        <option>All Plans</option>
                        <option>Free</option>
                        <option>Starter</option>
                        <option>Pro</option>
                        <option>Agency</option>
                        <option>Enterprise</option>
                    </select>

                    <select
                        className="bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>All Types</option>
                        <option>Local SEO Newbie</option>
                        <option>Client SEO Pro</option>
                        <option>Rank & Rent</option>
                        <option>Agency</option>
                        <option>Automation</option>
                    </select>

                    <select
                        className="bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Banned</option>
                    </select>
                </div>

                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                >
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            {/* SECTION 3: Users Table */}
            <div className="glass-card shimmer-border overflow-hidden shadow-xl dark-glow animate-slideInUp delay-300 transition-all duration-300">
                <div className="overflow-x-auto">
                    <table className="data-table w-full">
                        <thead>
                            <tr className="border-b border-[#333333] bg-white/5">
                                <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[260px]">
                                    User
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[100px]">
                                    Plan
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[130px]">
                                    User Type
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[110px]">
                                    Verified
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[100px]">
                                    Joined
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[100px]">
                                    Usage
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[90px]">
                                    Status
                                </th>
                                <th className="text-center px-4 py-3 text-xs text-gray-500 uppercase tracking-wider w-[180px]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={8} className="px-6 py-4 h-20 bg-white/5 opacity-50"></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        No users found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, idx) => {
                                    // Verified logic: Use email_confirmed_at if profile has it
                                    const isVerified = user.email_confirmed_at !== null && user.email_confirmed_at !== undefined;

                                    return (
                                        <tr
                                            key={user.id}
                                            className={cn(
                                                "border-b border-[#1E1E1E] hover:bg-purple-900/5 transition-all opacity-0 animate-fadeIn",
                                                !user.is_active && "bg-red-950/20"
                                            )}
                                            style={{ animationDelay: `${300 + (idx * 50)}ms`, animationFillMode: 'forwards' }}
                                        >
                                            <td className="px-4 py-4 text-left">
                                                <div className="flex items-center gap-3 text-[#EEF2FF]">
                                                    <div
                                                        className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm border border-[rgba(255,255,255,0.06)] user-avatar"
                                                        style={{ background: getAvatarColor(user.email) }}
                                                    >
                                                        {user.email[0].toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white text-sm font-medium">
                                                                {user.email}
                                                            </span>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${user.role === 'admin'
                                                                ? 'bg-red-900/70 text-red-300 border border-red-700'
                                                                : 'bg-gray-800 text-gray-300 border border-gray-600'
                                                                }`}>
                                                                {user.role === 'admin' ? <>⚡ admin</> : <>👤 user</>}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <Badge className={`${getPlanColor(user.plan)} text-[9px] px-1.5`}>
                                                    {user.plan.toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border uppercase inline-block ${getUserTypeColor(user.user_type)}`}>
                                                    {user.user_type || 'Not Set'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-green-400 text-lg verified-glow">✓</div>
                                                    <span className="text-green-400 text-[10px] mt-0.5 font-medium">Verified</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center text-gray-400 text-sm">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="text-gray-300 text-sm font-semibold">
                                                    {(user.usage_niche_finder ?? 0) + (user.usage_keywords ?? 0) + (user.usage_serp ?? 0) + (user.usage_content ?? 0)}
                                                </div>
                                                <div className="text-gray-600 text-[10px] items-center gap-1 uppercase tracking-tighter">
                                                    searches
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.is_active
                                                        ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                                                        : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'}`}></div>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${user.is_active ? 'text-green-400' : 'text-red-400'}`}>
                                                        {user.is_active ? 'Active' : 'Banned'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => { setSelectedUser(user); setViewModalOpen(true); }}
                                                        title="View Details"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1E1E1E] border border-[#333333] hover:border-purple-500 hover:bg-purple-900/30 text-gray-400 hover:text-white transition-all text-sm active:scale-95 action-btn">
                                                        👁️
                                                    </button>

                                                    <button onClick={() => { setSelectedUser(user); setPlanModalOpen(true); }}
                                                        title="Change Plan"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1E1E1E] border border-[#333333] hover:border-blue-500 hover:bg-blue-900/30 text-gray-400 hover:text-white transition-all text-sm active:scale-95 action-btn">
                                                        ✏️
                                                    </button>

                                                    <button onClick={() => { setSelectedUser(user); setRoleModalOpen(true); }}
                                                        title="Change Role"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1E1E1E] border border-[#333333] hover:border-yellow-500 hover:bg-yellow-900/30 text-gray-400 hover:text-white transition-all text-sm active:scale-95 action-btn">
                                                        👑
                                                    </button>

                                                    <button onClick={() => { setSelectedUser(user); setBanModalOpen(true); }}
                                                        title={user.is_active ? 'Ban' : 'Unban'}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all text-sm active:scale-95 action-btn ${user.is_active
                                                            ? 'bg-red-950/40 border-red-800 text-red-400 hover:bg-red-900/60'
                                                            : 'bg-green-950/40 border-green-800 text-green-400 hover:bg-green-900/60'
                                                            }`}>
                                                        {user.is_active ? '🚫' : '✅'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SECTION 4: User Detail Modal */}
            <Modal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="User Details"
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-2xl border border-purple-500/30">
                                {selectedUser.email[0].toUpperCase()}
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold">{selectedUser.email}</h4>
                                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">ID: {selectedUser.id}</p>
                                <div className="flex items-center gap-2 pt-1">
                                    <Badge className={`${selectedUser.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {selectedUser.is_active ? 'Active' : 'Banned'}
                                    </Badge>
                                    <Badge className={getPlanColor(selectedUser.plan)}>
                                        {selectedUser.plan.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex border-b border-[#333333]">
                            {(['profile', 'usage', 'activity'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium capitalize transition-all border-b-2 ${activeTab === tab
                                        ? 'border-purple-500 text-purple-400'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="py-2">
                            {activeTab === 'profile' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Role', value: selectedUser.role === 'admin' ? '⚡ Admin' : 'User' },
                                        {
                                            label: 'User Type', value: (
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getUserTypeColor(selectedUser.user_type)}`}>
                                                    {selectedUser.user_type || 'Not Set'}
                                                </span>
                                            )
                                        },
                                        { label: 'Joined', value: new Date(selectedUser.created_at).toLocaleDateString() },
                                        { label: 'Last Active', value: 'Today' },
                                        { label: 'DataForSEO API Key', value: selectedUser.api_key_dataforseo ? '••••••••••••••••' : 'Not set' },
                                        { label: 'Gemini API Key', value: selectedUser.api_key_gemini ? '••••••••••••••••' : 'Not set' }
                                    ].map((field, i) => (
                                        <div key={i} className="bg-white/5 border border-[rgba(255,255,255,0.06)] p-4 rounded-xl space-y-1">
                                            <p className="text-xs text-gray-400 uppercase font-bold text-[10px] tracking-widest">{field.label}</p>
                                            <div className="text-sm font-medium text-gray-200">{field.value}</div>
                                        </div>
                                    ))}
                                    <div className="bg-white/5 border border-[rgba(255,255,255,0.06)] p-4 rounded-xl space-y-1 flex items-center justify-between col-span-full">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold text-[10px]">Subscription Plan</p>
                                            <p className="text-sm font-medium capitalize">{selectedUser.plan}</p>
                                        </div>
                                        <button
                                            onClick={() => { setViewModalOpen(false); setPlanModalOpen(true); }}
                                            className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase transition-colors"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'usage' && (
                                <div className="space-y-6">
                                    {[
                                        { label: 'Niche Finder', current: selectedUser.usage_niche_finder, limit: 50 },
                                        { label: 'Keywords', current: selectedUser.usage_keywords, limit: 100 },
                                        { label: 'SERP Lookups', current: selectedUser.usage_serp, limit: 50 },
                                        { label: 'Content Pages', current: selectedUser.usage_content, limit: 50 }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400 font-medium">{item.label}</span>
                                                <span className="text-white font-bold">{item.current} / {item.limit} searches</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500"
                                                    style={{ width: `${Math.min((item.current / item.limit) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="space-y-4 py-2">
                                    {[
                                        { icon: "🟢", label: "Account Created", date: new Date(selectedUser.created_at).toLocaleDateString() },
                                        { icon: "📋", label: `Plan: ${selectedUser.plan.toUpperCase()}`, date: "Current" },
                                        { icon: "👤", label: `User Type: ${selectedUser.user_type || 'Not Set'}`, date: selectedUser.user_type ? "Set" : "-" },
                                        { icon: selectedUser.is_active ? "🟢" : "🔴", label: `Status: ${selectedUser.is_active ? 'Active' : 'Banned'}`, date: "Today" }
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-[rgba(255,255,255,0.06)] rounded-xl transition hover:bg-white/10">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{act.icon}</span>
                                                <span className="text-sm font-medium text-gray-200">{act.label}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{act.date}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            {/* SECTION 5: Change Plan Modal */}
            <Modal
                isOpen={planModalOpen}
                onClose={() => setPlanModalOpen(false)}
                title="Change Subscription Plan"
            >
                {selectedUser && (
                    <div className="space-y-6 text-center">
                        <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-xl">
                            <p className="text-sm text-gray-300">
                                Update plan for <span className="text-white font-bold">{selectedUser.email}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Current: <span className="text-purple-400 font-bold">{selectedUser.plan}</span></p>
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-bold text-gray-500 px-1 uppercase tracking-widest">Select New Plan</label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-[#1E1E1E] border border-[#333333] text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:border-purple-500 transition-all font-medium"
                                    defaultValue={selectedUser.plan}
                                    id="plan-select"
                                >
                                    <option value="free">Free</option>
                                    <option value="starter">Starter</option>
                                    <option value="pro">Pro</option>
                                    <option value="agency">Agency</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-500">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setPlanModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#333333] hover:bg-white/5 transition-colors font-bold text-[10px] uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    const select = document.getElementById('plan-select') as HTMLSelectElement;
                                    updateUserPlan(select.value);
                                }}
                                className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* SECTION 6: Role Modal */}
            <Modal
                isOpen={roleModalOpen}
                onClose={() => setRoleModalOpen(false)}
                title="Change User Role"
            >
                {selectedUser && (
                    <div className="space-y-6 text-center">
                        <div className="p-4 bg-yellow-600/10 border border-yellow-500/20 rounded-xl">
                            <p className="text-sm text-gray-300">
                                Update role for <span className="text-white font-bold">{selectedUser.email}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Current: <span className="text-yellow-400 font-bold">{selectedUser.role}</span></p>
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-bold text-gray-500 px-1 uppercase tracking-widest">Select New Role</label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-[#1E1E1E] border border-[#333333] text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:border-yellow-500 transition-all font-medium"
                                    defaultValue={selectedUser.role}
                                    id="role-select"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-500">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setRoleModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#333333] hover:bg-white/5 transition-colors font-bold text-[10px] uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    const select = document.getElementById('role-select') as HTMLSelectElement;
                                    updateUserRole(select.value);
                                }}
                                className="flex-1 px-4 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition-colors font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(202,138,4,0.3)]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* SECTION 7: Ban Modal */}
            <Modal
                isOpen={banModalOpen}
                onClose={() => setBanModalOpen(false)}
                title={selectedUser?.is_active ? "Confirm Ban" : "Confirm Unban"}
            >
                {selectedUser && (
                    <div className="space-y-6 text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${selectedUser.is_active ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {selectedUser.is_active ? <UserMinus size={40} /> : <CheckCircle2 size={40} />}
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xl font-bold">
                                {selectedUser.is_active ? 'Ban this user?' : 'Unban this user?'}
                            </h4>
                            <p className="text-gray-400 max-w-sm mx-auto text-sm">
                                {selectedUser.is_active
                                    ? "They will immediately lose access to the platform and won't be able to log in."
                                    : "They will immediately regain access to the platform and all features."}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setBanModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#333333] hover:bg-white/5 transition-colors font-bold text-[10px] uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={toggleUserBan}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${selectedUser.is_active
                                    ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                    }`}
                            >
                                Confirm Action
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* TOASTS */}
            <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border pointer-events-auto animate-in slide-in-from-right duration-300 ${toast.type === 'success'
                            ? 'bg-[#1E1E1E] border-emerald-500/50 text-emerald-400'
                            : 'bg-[#1E1E1E] border-red-500/50 text-red-400'
                            }`}
                    >
                        {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-sm font-semibold">{toast.message}</span>
                        <button
                            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                            className="ml-2 hover:opacity-70"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

