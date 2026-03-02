'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getUserRole } from '@/lib/auth'
import {
    ShieldCheck,
    ArrowRight,
    Mail,
    Lock,
    Loader2,
    AlertCircle,
    ChevronLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error: signInError } = await signIn(email, password)
            if (signInError) throw signInError

            if (data.user) {
                const role = await getUserRole(data.user.id)
                if (role === 'admin') {
                    router.push('/admin')
                } else {
                    router.push('/dashboard')
                }
            }
        } catch (err: any) {
            setError(err.message || 'Failed to sign in. Please check your credentials.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0818] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10 animate-fadeInUp">
                {/* Back to Home */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest italic">Back to Home</span>
                </button>

                <div className="bg-[#1A1740] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-purple-900/10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-6 shadow-xl shadow-purple-900/20 italic font-black text-3xl text-white">
                            S
                        </div>
                        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">SEO AI Platform</h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Sign in to your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3 animate-headShake">
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0F0C29] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0F0C29] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            New here? <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => router.push('/onboarding')}>Create an account</span>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-6 text-slate-600">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">SSL Secured</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-800 rounded-full" />
                    <div className="flex items-center space-x-2">
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Auth</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
