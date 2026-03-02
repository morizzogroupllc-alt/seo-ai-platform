'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth'
import {
    Rocket,
    ArrowRight,
    Mail,
    Lock,
    User,
    Loader2,
    AlertCircle,
    ChevronLeft,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SignUpPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error: signUpError } = await signUp(email, password, fullName)
            if (signUpError) throw signUpError

            setIsSuccess(true)
        } catch (err: any) {
            setError(err.message || 'Failed to sign up. Please try again.')
            setLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#0A0818] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md relative z-10 text-center space-y-8 animate-fadeInUp">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Check Your Email</h1>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
                            We've sent a confirmation link to <span className="text-purple-400">{email}</span>. Click it to activate your account.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/login')}
                        className="text-purple-400 font-black uppercase tracking-[0.2em] text-xs hover:underline"
                    >
                        Go to Login page
                    </button>
                </div>
            </div>
        )
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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6 shadow-xl shadow-purple-900/20 italic font-black text-3xl text-white">
                            S
                        </div>
                        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">Join SEO AI</h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Start your 10-second setup</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3 animate-headShake">
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-[#0F0C29] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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
                                    placeholder="your@email.com"
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
                                    minLength={6}
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
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-purple-600/50 disabled:to-blue-600/50 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <Rocket className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            Already have an account? <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => router.push('/login')}>Sign In</span>
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
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Data Encrypted</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
