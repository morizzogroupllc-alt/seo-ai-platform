import Link from 'next/link'
import { Rocket, Shield, Globe, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full"></div>

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-6 flex items-center justify-between max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
            <span className="text-white font-black text-2xl italic">S</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">SemanticsX</span>
        </div>
        <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">Features</span>
          <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
          <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
          <Zap size={14} className="text-indigo-400 fill-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Next-Gen Local SEO Engine</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-8 leading-[0.9] text-center">
          DOMINATE <span className="text-indigo-500">LOCAL</span> <br />
          SEARCH <span className="text-slate-500/50 italic font-light">&bull;</span> AT SCALE
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mb-12 font-medium">
          The world's most powerful AI-driven platform for Local SEO. <br className="hidden md:block" />
          Save business data once. Generate 1,000s of ranking pages instantly.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="/dashboard"
            className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center space-x-4 overflow-hidden"
          >
            <span className="relative z-10 flex items-center order-2">
              Open Tool <Rocket className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/admin"
            className="bg-slate-900/50 border border-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all flex items-center"
          >
            Admin Gateway <Shield className="ml-3 w-4 h-4 text-indigo-500" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-left space-y-4 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">The Heart</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Unified NAP data hub that syncs your business identity across all SEO tools instantly.</p>
          </div>

          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-left space-y-4 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">1-Click Sites</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Generate thousands of localized service pages using high-ranking AI content patterns.</p>
          </div>

          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-left space-y-4 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Vercel Edge</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Lightning fast deployment on Vercel's global edge network for near-instant page speeds.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
