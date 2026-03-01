import React from 'react'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-200 antialiased font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Sidebar - Fixed for desktop, hidden for mobile (later) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 relative">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </main>

                {/* Footer / Copyright */}
                <footer className="px-10 py-6 border-t border-slate-900 bg-black/20 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] flex justify-between items-center">
                    <span>&copy; 2026 SEO AI PLATFORM &bull; THE FUTURE OF LOCAL SEARCH</span>
                    <div className="flex space-x-6">
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Documentation</span>
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Support</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}
