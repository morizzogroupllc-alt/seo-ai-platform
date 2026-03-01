import BusinessProfileForm from '../../components/BusinessProfileForm'
import ProfileList from '../../components/ProfileList'
import { Heart, Info } from 'lucide-react'

export default function UserDashboard() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Premium Hero Banner (SemanticsX Style) */}
            <section className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-10 md:p-14 text-white shadow-2xl shadow-indigo-500/20">
                {/* Animated Background Shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-indigo-400/30 transition-all duration-700"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-6 max-w-2xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-inner">
                            <Heart className="w-4 h-4 text-indigo-200 fill-indigo-200" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-100">Core Infrastructure</span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-tight drop-shadow-lg">
                                THE HEART <span className="text-white/60">&bull;</span> <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">BUSINESS PROFILER</span>
                            </h1>
                            <p className="text-lg md:text-xl text-indigo-100 font-medium opacity-80 leading-relaxed max-w-xl">
                                The central intelligence hub for your Local SEO empire. Define your business identity once, and broadcast it to the entire digital ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            <span className="text-[60px] md:text-[80px] drop-shadow-2xl">❤️</span>
                        </div>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="mt-12 flex flex-wrap gap-4 relative z-10">
                    <div className="bg-black/20 backdrop-blur-sm border border-white/5 px-5 py-3 rounded-2xl flex items-center space-x-3">
                        <Info className="w-4 h-4 text-indigo-300" />
                        <span className="text-xs font-bold text-white/80">60+ AI Signals Integrated</span>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm border border-white/5 px-5 py-3 rounded-2xl flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        <span className="text-xs font-bold text-white/80">Cloud Sync Active</span>
                    </div>
                </div>
            </section>

            {/* Main Tool Content */}
            <div className="grid grid-cols-1 gap-20 py-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <BusinessProfileForm />
                <ProfileList />
            </div>
        </div>
    )
}
