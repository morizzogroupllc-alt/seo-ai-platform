'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

    useEffect(() => {
        fetchProfiles()

        // Real-time listener for new profiles
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
            // List will auto-update due to real-time listener
        } catch (error) {
            alert('Error deleting profile')
        }
    }

    if (loading) return <div className="text-center p-10">Loading profiles...</div>

    return (
        <div className="max-w-4xl mx-auto mt-12 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">📋</span> Saved Business Profiles
            </h2>

            {profiles.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-500">
                    No profiles saved yet. Fill the form above to add your first business!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <button
                                onClick={() => handleDelete(profile.id)}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="flex flex-col h-full">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{profile.business_name}</h3>
                                <p className="text-sm text-gray-500 mb-3 flex items-start">
                                    <span className="mr-1 mt-1">📍</span> {profile.address}
                                </p>

                                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                                    <span>📞 {profile.phone}</span>
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Website
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
