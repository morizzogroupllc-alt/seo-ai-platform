'use client'

import React, { useState, useEffect } from 'react'
import { ToolConfig } from '@/lib/registry/tools'
import { cn } from '@/lib/utils'
import { Sparkles, Loader2, Save, Copy } from 'lucide-react'

interface ToolFormProps {
    tool: ToolConfig
    onSubmit: (data: any) => void
    isLoading: boolean
}

export default function ToolForm({ tool, onSubmit, isLoading }: ToolFormProps) {
    const [formData, setFormData] = useState<Record<string, any>>({})

    const handleChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.inputs.map((input) => (
                    <div key={input.id} className={cn("space-y-2", input.type === 'textarea' && "md:col-span-2")}>
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">
                            {input.label} {input.required && <span className="text-indigo-500">*</span>}
                        </label>

                        {input.type === 'select' ? (
                            <select
                                required={input.required}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all appearance-none"
                                onChange={(e) => handleChange(input.id, e.target.value)}
                            >
                                <option value="">Select {input.label}...</option>
                                {input.options?.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        ) : input.type === 'textarea' ? (
                            <textarea
                                required={input.required}
                                placeholder={input.placeholder}
                                rows={4}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                        ) : (
                            <input
                                type={input.type}
                                required={input.required}
                                placeholder={input.placeholder}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                        )}
                        {input.description && <p className="text-[10px] text-slate-500 ml-1">{input.description}</p>}
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-2xl shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 animate-spin" size={20} />
                            Generating Magic...
                        </>
                    ) : (
                        <>
                            Generate with AI
                            <Sparkles className="ml-2 group-hover:rotate-12 transition-transform" size={20} />
                        </>
                    )}
                </span>
            </button>
        </form>
    )
}
