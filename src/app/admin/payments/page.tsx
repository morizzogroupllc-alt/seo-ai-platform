'use client'

import React from 'react'
import { CreditCard, DollarSign, ArrowUpRight, Search, Filter, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminPayments() {
    const transactions = [
        { id: 'tx_1', email: 'user@example.com', plan: 'Pro', amount: '$49.00', date: '2025-03-01', status: 'success' },
        { id: 'tx_2', email: 'agency@site.com', plan: 'Agency', amount: '$199.00', date: '2025-02-28', status: 'success' },
        { id: 'tx_3', email: 'freebie@test.com', plan: 'Starter', amount: '$19.00', date: '2025-02-27', status: 'failed' },
    ]

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Payments & Revenue</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Monitor subscriptions, transactions, and ARR</p>
                </div>
                <button className="flex items-center space-x-3 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1A1740]/50 border border-white/5 p-8 rounded-[2rem] space-y-2 shadow-2xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Monthly Revenue</span>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">$0.00</h3>
                    <div className="flex items-center space-x-1 text-emerald-500 text-[10px] font-black uppercase">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>0% increase</span>
                    </div>
                </div>
                <div className="bg-[#1A1740]/50 border border-white/5 p-8 rounded-[2rem] space-y-2 shadow-2xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Active Subscriptions</span>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">0</h3>
                </div>
                <div className="bg-[#1A1740]/50 border border-white/5 p-8 rounded-[2rem] space-y-2 shadow-2xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Churn Rate</span>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">0%</h3>
                </div>
            </div>

            <div className="bg-[#1A1740]/30 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
                    <div className="p-6 bg-white/5 rounded-full">
                        <DollarSign className="w-12 h-12 text-slate-500" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                        <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none">No Transactions Found</h3>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Payments will appear here once the Stripe integration is finalized.</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all active:scale-[0.98]">
                        Setup Stripe Integration
                    </button>
                </div>
            </div>
        </div>
    )
}
