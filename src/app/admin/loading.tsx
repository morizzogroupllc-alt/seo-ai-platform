import React from 'react'
import { Loader2 } from 'lucide-react'

export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fadeIn">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-blue-500 rounded-full animate-spin [animation-duration:1.5s]" />
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-white font-black italic uppercase tracking-widest text-sm mb-1">
                    Loading
                </h3>
                <p className="text-purple-500/50 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                    Synchronizing Admin Data
                </p>
            </div>
        </div>
    )
}
