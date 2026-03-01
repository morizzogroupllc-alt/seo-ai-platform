'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, ExternalLink, MapPin, Phone, Building2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BusinessProfile {
    id: number
    business_name: string
    address: string
    phone: string
    website: string
    created_at: string
}

export default function ProfileList() {
    const [profiles, setProfiles] = useState<BusinessProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchProfiles()

        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'business_profiles',
                },
                () => {
                    fetchProfiles()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('business_profiles')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProfiles(data || [])
        } catch (error) {
            console.error('Error fetching profiles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this profile?')) return

        try {
            const { error } = await supabase
                .from('business_profiles')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (error) {
            alert('Error deleting profile')
        }
    }

    const filteredProfiles = profiles.filter(p =>
        p.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Retrieving Business Profiles...</p>
        </div>
    )

    return (
        <div className="w-full max-w-6xl mx-auto mt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-500/20 p-3 rounded-2xl border border-orange-500/30">
                        <Building2 className="text-orange-400 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Saved Profiles</h2>
                        <p className="text-slate-500 text-sm">Manage your business identities</p>
                    </div>
                </div>

                {/* Search in List */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter profiles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 w-full md:w-64 transition-all"
                    />
                </div>
            </div>

            {filteredProfiles.length === 0 ? (
                <div className="bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-[2.5rem] p-20 text-center flex flex-col items-center justify-center space-y-4 shadow-inner">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-3xl">📭</div>
                    <p className="text-slate-400 font-medium italic">No profiles found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {filteredProfiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="group relative bg-[#1e293b]/40 border border-slate-800 rounded-[2rem] p-6 hover:bg-[#1e293b]/60 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden"
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>

                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                <button
                                    onClick={() => handleDelete(profile.id)}
                                    className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    title="Delete Profile"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex flex-col h-full space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                                        {profile.business_name}
                                    </h3>
                                    <div className="mt-2 flex items-start text-xs text-slate-500 leading-relaxed min-h-[40px]">
                                        <MapPin className="mr-2 mt-0.5 w-3 h-3 flex-shrink-0 text-indigo-500/70" />
                                        <span className="line-clamp-2">{profile.address}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-800/50 flex flex-col space-y-3">
                                    <div className="flex items-center text-xs text-slate-400">
                                        <Phone className="mr-2 w-3 h-3 text-slate-600" />
                                        <span>{profile.phone}</span>
                                    </div>

                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between w-full py-3 px-4 bg-slate-800/50 hover:bg-indigo-600 rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest group/link"
                                    >
                                        <span>Visit Digital Assets</span>
                                        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
