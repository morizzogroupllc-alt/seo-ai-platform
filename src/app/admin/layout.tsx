import React from 'react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar Skeleton */}
            <aside className="w-64 bg-black border-r border-gray-800 p-6 hidden md:block">
                <div className="flex items-center space-x-2 mb-10">
                    <span className="text-2xl">🛡️</span>
                    <span className="font-bold text-xl tracking-tight">Admin Portal</span>
                </div>
                <nav className="space-y-4">
                    <div className="p-3 bg-gray-800 rounded-lg text-red-400 font-semibold cursor-pointer">
                        Dashboard Overview
                    </div>
                    <div className="p-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-gray-400">
                        User Management
                    </div>
                    <div className="p-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-gray-400">
                        API Health Check
                    </div>
                    <div className="p-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-gray-400">
                        Platform Settings
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md">
                    <div className="text-sm text-gray-400">Root Directory: /admin</div>
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-orange-500"></div>
                        <span className="font-medium">Master Admin</span>
                    </div>
                </header>
                <main className="p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
