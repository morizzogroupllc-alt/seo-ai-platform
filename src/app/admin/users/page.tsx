'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Search,
    Filter,
    MoreVertical,
    Shield,
    Ban,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Edit2,
    Lock,
    Unlock,
    Loader2,
    Calendar,
    Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPlan, setFilterPlan] = useState('all')
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [filterPlan])

    const fetchUsers = async () => {
        setLoading(true)
        let query = supabase.from('profiles').select('*')

        if (filterPlan !== 'all') {
            query = query.eq('plan', filterPlan)
        }

        const { data, error } = await query.order('created_at', { ascending: false })
        if (!error) setUsers(data || [])
        setLoading(false)
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchTerm) {
            fetchUsers()
            return
        }
        setLoading(true)
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', `%${searchTerm}%`)
        setUsers(data || [])
        setLoading(false)
    }

    const toggleBan = async (user: any) => {
        const { error } = await supabase
            .from('profiles')
            .update({ is_active: !user.is_active })
            .eq('id', user.id)

        if (!error) fetchUsers()
    }

    const updatePlan = async (userId: string, newPlan: string) => {
        const { error } = await supabase
            .from('profiles')
            .update({ plan: newPlan })
            .eq('id', userId)

        if (!error) {
            fetchUsers()
            setIsEditModalOpen(false)
        }
    }

    const updateRole = async (userId: string, newRole: string) => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId)

        if (!error) {
            fetchUsers()
            setIsEditModalOpen(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">User Management</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Manage roles, subscriptions and access</p>
                </div>
                <div className="flex items-center space-x-3 bg-red-600/10 px-4 py-2 rounded-xl border border-red-500/20">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">{users.length} Total Registered Users</span>
                </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="flex flex-col lg:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1A1740] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500/50 transition-all placeholder:text-slate-600 font-medium"
                    />
                </form>
                <div className="flex gap-4">
                    <select
                        value={filterPlan}
                        onChange={(e) => setFilterPlan(e.target.value)}
                        className="bg-[#1A1740] border border-white/5 rounded-2xl px-6 py-4 text-xs font-black text-white uppercase tracking-widest focus:outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer min-w-[160px]"
                    >
                        <option value="all">All Plans</option>
                        <option value="free">Free</option>
                        <option value="starter">Starter</option>
                        <option value="pro">Pro</option>
                        <option value="agency">Agency</option>
                    </select>
                </div>
            </div>

            {/* USERS TABLE */}
            <div className="bg-[#1A1740]/50 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
                {loading && (
                    <div className="absolute inset-0 bg-[#1A1740]/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">User Info</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Plan & Usage</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Role / Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-red-600/5 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white group-hover:text-red-400 transition-colors">{user.email}</span>
                                                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col space-y-2">
                                            <span className={cn(
                                                "w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all",
                                                user.plan === 'pro' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                    user.plan === 'agency' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        'bg-slate-500/10 text-slate-500 border-white/5'
                                            )}>
                                                {user.plan || 'free'}
                                            </span>
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex justify-between w-32">
                                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Usage</span>
                                                    <span className="text-[8px] font-black text-slate-400">Low</span>
                                                </div>
                                                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="w-1/4 h-full bg-slate-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center space-x-1.5">
                                                <Shield className={cn("w-3 h-3", user.role?.toLowerCase() === 'admin' ? "text-red-500" : "text-blue-500")} />
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest", user.role?.toLowerCase() === 'admin' ? "text-red-500" : "text-blue-500")}>
                                                    {user.role}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                {user.user_type || 'unselected'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border",
                                            user.is_active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", user.is_active ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{user.is_active ? 'Active' : 'Banned'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setIsEditModalOpen(true)
                                                }}
                                                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors border border-transparent hover:border-white/5"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleBan(user)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-all border border-transparent",
                                                    user.is_active
                                                        ? "text-red-500 hover:bg-red-500/10 hover:border-red-500/10"
                                                        : "text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/10"
                                                )}
                                            >
                                                {user.is_active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors border border-transparent hover:border-white/5">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EDIT PLAN MODAL */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/50">
                    <div className="bg-[#1A1740] border border-white/10 w-full max-w-sm rounded-[2rem] p-8 shadow-2xl animate-fadeInUp">
                        <div className="text-center space-y-2 mb-8">
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Edit Subscription</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{selectedUser.email}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select New Plan</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['free', 'starter', 'pro', 'agency', 'enterprise'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => updatePlan(selectedUser.id, p)}
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                selectedUser.plan === p ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-white/5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Change Role</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => updateRole(selectedUser.id, 'user')}
                                        className={cn(
                                            "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                            selectedUser.role?.toLowerCase() === 'user' ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                        )}
                                    >
                                        User
                                    </button>
                                    <button
                                        onClick={() => updateRole(selectedUser.id, 'admin')}
                                        className={cn(
                                            "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                            selectedUser.role?.toLowerCase() === 'admin' ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                        )}
                                    >
                                        Admin
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
