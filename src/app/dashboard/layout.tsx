import React from 'react'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-white">
            {/* User Sidebar */}
            <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 hidden lg:block">
                <div className="flex items-center space-x-2 mb-10">
                    <span className="text-2xl text-red-500">🚀</span>
                    <span className="font-bold text-xl text-gray-900">SEO AI Tool</span>
                </div>
                <nav className="space-y-2">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center cursor-pointer">
                        <span className="mr-3">🏠</span> Home Dashboard
                    </div>
                    <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all flex items-center cursor-pointer">
                        <span className="mr-3">❤️</span> The Heart (NAP)
                    </div>
                    <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all flex items-center cursor-pointer">
                        <span className="mr-3">🛠️</span> Website Generator
                    </div>
                    <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all flex items-center cursor-pointer">
                        <span className="mr-3">📊</span> Reports & SEO
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-sm font-semibold text-gray-400">User Workspace</h2>
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-900">John Doe</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Free Plan</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden text-center flex items-center justify-center font-bold text-gray-400">
                            U
                        </div>
                    </div>
                </header>
                <main className="p-4 md:p-8 bg-gray-50/30 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
