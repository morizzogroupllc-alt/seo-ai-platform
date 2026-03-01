'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

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

    // Debugging: Check if environment variables are loaded
    useEffect(() => {
        console.log('Supabase URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            // Check if supabase object is initialized
            if (!supabase) {
                throw new Error('Supabase client not initialized. Check your API keys.')
            }

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
                        // Removing user_id for now as we are using anon access
                    }
                ])

            if (error) throw error
            setMessage('✅ Data saved successfully to The Heart!')

            // Clear form after success
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
            console.error('Full Error Object:', error)
            setMessage('❌ Error: ' + (error.message || 'Unknown error') + '. Check console for details.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 border border-gray-100">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-red-500 p-3 rounded-full shadow-lg h-12 w-12 flex items-center justify-center">
                    <span className="text-white text-2xl">❤️</span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Module 17: The Heart</h1>
                    <p className="text-gray-500">Unified Business Profile (NAP Data)</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Business Name</label>
                        <input
                            required
                            name="business_name"
                            value={formData.business_name}
                            placeholder="e.g. Joe's Plumber NYC"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition-all text-black placeholder:text-gray-400 bg-white"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            placeholder="+1 234 567 890"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition-all text-black placeholder:text-gray-400 bg-white"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Physical Address</label>
                    <textarea
                        required
                        name="address"
                        value={formData.address}
                        placeholder="123 Street Name, City, State, ZIP"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition-all text-black placeholder:text-gray-400 bg-white"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Website URL</label>
                        <input
                            name="website"
                            value={formData.website}
                            placeholder="https://example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition-all text-black placeholder:text-gray-400 bg-white"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Working Hours</label>
                        <input
                            name="working_hours"
                            value={formData.working_hours}
                            placeholder="Mon-Fri: 9AM-5PM"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition-all text-black placeholder:text-gray-400 bg-white"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">📍</span> Geo-Coordinates (For SEO)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-bold">Latitude</label>
                            <input
                                name="latitude"
                                value={formData.latitude}
                                placeholder="40.7128"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 text-black placeholder:text-gray-400 bg-white"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-bold">Longitude</label>
                            <input
                                name="longitude"
                                value={formData.longitude}
                                placeholder="-74.0060"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 text-black placeholder:text-gray-400 bg-white"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:bg-gray-400"
                >
                    {loading ? 'Saving to Heart...' : 'Save Business Profile'}
                </button>

                {message && (
                    <p className={`text-center font-bold p-4 rounded-lg my-4 ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}
