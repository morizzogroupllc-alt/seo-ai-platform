'use client'

import React from 'react'
import { Copy, Check, Download, Save } from 'lucide-react'
import { useState } from 'react'

interface OutputDisplayProps {
    content: string
    format: 'markdown' | 'html' | 'text'
}

export default function OutputDisplay({ content, format }: OutputDisplayProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400">AI Generated Result</h3>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center space-x-2 text-xs font-bold"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button className="p-2 bg-indigo-600 border border-indigo-500 rounded-lg text-white hover:bg-indigo-500 transition-all flex items-center space-x-2 text-xs font-bold">
                        <Save size={14} />
                        <span>Save</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 min-h-[200px] relative overflow-hidden group">
                {/* Glass Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>

                <div className="relative z-10 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {content || 'Your AI generated content will appear here...'}
                </div>
            </div>
        </div>
    )
}
