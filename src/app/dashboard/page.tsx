'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const phases = [
    { icon: '🔍', name: 'Research', tools: 17, path: '/research' },
    { icon: '🏗️', name: 'Build', tools: 26, path: '/build' },
    { icon: '🚀', name: 'Deploy', tools: 8, path: '/deploy' },
    { icon: '📝', name: 'Optimize', tools: 19, path: '/optimize' },
    { icon: '📍', name: 'Local Authority', tools: 34, path: '/authority' },
    { icon: '📞', name: 'Convert', tools: 5, path: '/convert' },
    { icon: '📈', name: 'Track', tools: 9, path: '/track' },
    { icon: '📋', name: 'Reports', tools: 11, path: '/reports' },
]

export default function DashboardPage() {
    const router = useRouter()
    const [userType, setUserType] = useState('')

    useEffect(() => {
        const ut = localStorage.getItem('user_type') || 'User'
        setUserType(ut)
    }, [])

    return (
        <div className="p-6 space-y-8">

            {/* SECTION 1: Welcome */}
            <div className="bg-[#1A1740] rounded-xl p-6 border border-purple-800">
                <h1 className="text-2xl font-bold text-white">
                    Welcome back! 👋
                </h1>
                <p className="text-purple-300 mt-1">
                    You are building as: <span className="text-white font-semibold">{userType}</span>
                </p>
            </div>

            {/* SECTION 2: Phase Cards */}
            <div>
                <h2 className="text-white font-semibold text-lg mb-4">
                    Your Journey
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {phases.map((phase) => (
                        <div
                            key={phase.path}
                            onClick={() => router.push(phase.path)}
                            className="bg-[#1A1740] border border-purple-900 hover:border-purple-500 
                         rounded-xl p-4 cursor-pointer transition-all"
                        >
                            <div className="text-3xl mb-2">{phase.icon}</div>
                            <div className="text-white font-semibold">{phase.name}</div>
                            <div className="text-purple-400 text-sm mt-1">
                                {phase.tools} tools
                            </div>
                            <div className="mt-3 text-purple-300 text-sm font-medium">
                                Start →
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 3: Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Tools', value: '136' },
                    { label: 'Free Tools', value: '78' },
                    { label: 'Paid Tools', value: '58' },
                    { label: 'Your Progress', value: '0%' },
                ].map((stat) => (
                    <div key={stat.label}
                        className="bg-[#1A1740] border border-purple-900 
                       rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">
                            {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* SECTION 4: CTA */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 
                      rounded-xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-white text-xl font-bold">
                        Ready to find your niche?
                    </h3>
                    <p className="text-purple-300 mt-1">
                        Start with Research phase
                    </p>
                </div>
                <button
                    onClick={() => router.push('/research')}
                    className="bg-purple-600 hover:bg-purple-500 text-white 
                     font-semibold px-6 py-3 rounded-lg transition-all"
                >
                    Start Research →
                </button>
            </div>

        </div>
    )
}
