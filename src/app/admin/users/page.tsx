'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Search,
    Filter,
    Download,
    Eye,
    Settings,
    Ban,
    X,
    ChevronRight,
    MoreVertical,
    User as UserIcon,
    CheckCircle2,
    AlertCircle,
    Shield,
    Zap,
    Clock,
    Activity,
    UserMinus,
    Check
} from 'lucide-react';

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

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1A1740] border border-[#2D2B55] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-[#2D2B55]">
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
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [planFilter, setPlanFilter] = useState('All Plans');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All');

    // Modal states
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [planModalOpen, setPlanModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);

    // Tab state in detail modal
    const [activeTab, setActiveTab] = useState<'profile' | 'usage' | 'activity'>('profile');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            showToast('Failed to fetch users', 'error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
        const headers = ['ID', 'Email', 'Plan', 'User Type', 'Joined', 'Usage (Niche)', 'Usage (Keywords)', 'Usage (SERP)', 'Usage (Content)', 'Active'];
        const rows = filteredUsers.map(u => [
            u.id,
            u.email,
            u.plan,
            u.user_type,
            new Date(u.created_at).toLocaleDateString(),
            u.usage_niche_finder,
            u.usage_keywords,
            u.usage_serp,
            u.usage_content,
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
            fetchUsers();
        } catch (err) {
            showToast('Failed to update plan', 'error');
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
            fetchUsers();
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

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white p-4 lg:p-8 space-y-8">
            {/* SECTION 1: Page Header */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                    <p className="text-gray-400 mt-1">Manage all platform users</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Users', value: stats.total, icon: UserIcon, color: 'text-purple-400' },
                        { label: 'Free Plan', value: stats.free, icon: Zap, color: 'text-blue-400' },
                        { label: 'Paid Plan', value: stats.paid, icon: Shield, color: 'text-emerald-400' },
                        { label: 'Banned', value: stats.banned, icon: Ban, color: 'text-red-400' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#1A1740] border border-[#2D2B55] p-6 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                            <p className="text-2xl font-bold">{loading ? '...' : stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 2: Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-[#1A1740] border border-[#2D2B55] p-4 rounded-xl">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="w-full bg-[#1A1740] border border-[#2D2B55] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="bg-[#1A1740] border border-[#2D2B55] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
                        className="bg-[#1A1740] border border-[#2D2B55] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
                        className="bg-[#1A1740] border border-[#2D2B55] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
            <div className="bg-[#1A1740] border border-[#2D2B55] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">User Type</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Usage</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2D2B55]">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={7} className="px-6 py-4 h-16 bg-white/5 opacity-50"></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No users found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">
                                                    {user.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{user.email}</p>
                                                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter truncate max-w-[120px]">
                                                        ID: {user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className={getPlanColor(user.plan)}>
                                                {user.plan.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase text-[10px] font-semibold tracking-wide">
                                                {user.user_type || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-300">{new Date(user.created_at).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Activity size={14} className="text-gray-500" />
                                                <span className="text-sm">{user.usage_niche_finder + user.usage_keywords + user.usage_serp + user.usage_content} hits</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></div>
                                                <span className={`text-xs font-semibold ${user.is_active ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {user.is_active ? 'Active' : 'Banned'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedUser(user); setViewModalOpen(true); }}
                                                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all group relative"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedUser(user); setPlanModalOpen(true); }}
                                                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all group relative"
                                                    title="Change Plan"
                                                >
                                                    <Settings size={18} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedUser(user); setBanModalOpen(true); }}
                                                    className={`p-1.5 rounded-lg transition-all ${user.is_active ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10' : 'text-red-400 hover:bg-emerald-400/10 hover:text-emerald-400'}`}
                                                    title={user.is_active ? "Ban User" : "Unban User"}
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
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

                        <div className="flex border-b border-[#2D2B55]">
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
                                        { label: 'Role', value: selectedUser.role },
                                        { label: 'User Type', value: selectedUser.user_type },
                                        { label: 'Joined', value: new Date(selectedUser.created_at).toLocaleDateString() },
                                        { label: 'Last Active', value: 'Today' }, // Placeholder
                                        { label: 'DataForSEO API Key', value: selectedUser.api_key_dataforseo ? '••••••••••••••••' : 'Not set' },
                                        { label: 'Gemini API Key', value: selectedUser.api_key_gemini ? '••••••••••••••••' : 'Not set' }
                                    ].map((field, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">{field.label}</p>
                                            <p className="text-sm font-medium">{field.value || 'N/A'}</p>
                                        </div>
                                    ))}
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 flex items-center justify-between col-span-full">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Subscription Plan</p>
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
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
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
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500 space-y-4">
                                    <div className="p-4 bg-white/5 rounded-full">
                                        <Clock size={32} />
                                    </div>
                                    <p className="font-medium">Activity log coming soon</p>
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
                            <p className="text-xs text-gray-500 mt-1">Current: <span className="capitalize">{selectedUser.plan}</span></p>
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium text-gray-400 px-1">Select New Plan</label>
                            <select
                                className="w-full bg-[#0F0C29] border border-[#2D2B55] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
                                defaultValue={selectedUser.plan}
                                id="plan-select"
                            >
                                <option value="free">Free</option>
                                <option value="starter">Starter</option>
                                <option value="pro">Pro</option>
                                <option value="agency">Agency</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setPlanModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#2D2B55] hover:bg-white/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    const select = document.getElementById('plan-select') as HTMLSelectElement;
                                    updateUserPlan(select.value);
                                }}
                                className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                            >
                                Save Plan
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* SECTION 6: Ban/Unban Modal */}
            <Modal
                isOpen={banModalOpen}
                onClose={() => setBanModalOpen(false)}
                title={selectedUser?.is_active ? "Confirm Ban User" : "Confirm Unban User"}
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
                            <p className="text-gray-400 max-w-sm mx-auto">
                                {selectedUser.is_active
                                    ? "They will immediately lose access to the platform and won't be able to log in."
                                    : "They will immediately regain access to the platform and all features."}
                            </p>
                        </div>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono text-gray-500 truncate">
                            {selectedUser.email}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setBanModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#2D2B55] hover:bg-white/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={toggleUserBan}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${selectedUser.is_active
                                        ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                    }`}
                            >
                                {selectedUser.is_active ? 'Confirm Ban' : 'Confirm Unban'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* TOAST NOTIFICATIONS */}
            <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border pointer-events-auto animate-in slide-in-from-right duration-300 ${toast.type === 'success'
                                ? 'bg-[#1A1740] border-emerald-500/50 text-emerald-400'
                                : 'bg-[#1A1740] border-red-500/50 text-red-400'
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
