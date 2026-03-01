'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Heart, MapPin, Globe, Clock, Phone, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BusinessProfileForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        business_name: '',
        address: '',
        phone: '',
        website: '',
        latitude: '',
        longitude: '',
        working_hours: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            if (!supabase) throw new Error('Supabase client not initialized.')

            const { error } = await supabase
                .from('business_profiles')
                .insert([
                    {
                        business_name: formData.business_name,
                        address: formData.address,
                        phone: formData.phone,
                        website: formData.website,
                        working_hours: formData.working_hours,
                        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                    }
                ])

            if (error) throw error
            setMessage('✅ Data saved successfully to The Heart!')

            setFormData({
                business_name: '',
                address: '',
                phone: '',
                website: '',
                latitude: '',
                longitude: '',
                working_hours: '',
            })
        } catch (error: any) {
            setMessage('❌ Error: ' + (error.message || 'Unknown error'))
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                    <div className="bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/30">
                        <Heart className="text-indigo-400 w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">The Heart (NAP)</h1>
                        <p className="text-slate-500 text-sm">Unified Business Intelligence Hub</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Database Connected</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Business Identity</label>
                        <div className="relative">
                            <input
                                required
                                name="business_name"
                                value={formData.business_name}
                                placeholder="Business Name"
                                className="w-full bg-[#1e293b]/50 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contact Number</label>
                        <div className="relative">
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                            <input
                                required
                                name="phone"
                                value={formData.phone}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-[#1e293b]/50 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Physical Location</label>
                    <div className="relative">
                        <MapPin className="absolute right-4 top-4 text-slate-600 w-4 h-4" />
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            placeholder="Street Address, City, State, ZIP"
                            rows={3}
                            className="w-full bg-[#1e293b]/50 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all resize-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Digital Presence</label>
                        <div className="relative">
                            <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                            <input
                                name="website"
                                value={formData.website}
                                placeholder="https://example.com"
                                className="w-full bg-[#1e293b]/50 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Availability</label>
                        <div className="relative">
                            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                            <input
                                name="working_hours"
                                value={formData.working_hours}
                                placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
                                className="w-full bg-[#1e293b]/50 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Geo-Coordinates (Glassmorphism Section) */}
                <div className="bg-indigo-600/5 border border-indigo-500/20 p-6 rounded-3xl space-y-4">
                    <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center">
                        <span className="mr-3">📍</span> SEO Geo-Targeting
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-bold uppercase ml-1">Latitude</label>
                            <input
                                name="latitude"
                                value={formData.latitude}
                                placeholder="40.7128"
                                className="w-full bg-black/20 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-bold uppercase ml-1">Longitude</label>
                            <input
                                name="longitude"
                                value={formData.longitude}
                                placeholder="-74.0060"
                                className="w-full bg-black/20 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Syncing Database...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Inject Into The Heart</span>
                        </>
                    )}
                </button>

                {message && (
                    <div className={cn(
                        "p-4 rounded-2xl text-center text-sm font-bold border animate-in zoom-in-95 duration-300",
                        message.includes('✅')
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                    )}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}
