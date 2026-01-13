import type { ReactNode } from 'react'

interface StatsCardProps {
    title: string
    value: string
    icon: ReactNode
    trend: string
    trendUp?: boolean
}

export default function StatsCard({ title, value, icon, trend, trendUp = true }: StatsCardProps) {
    return (
        <div className="glass-card rounded-[32px] p-8 relative overflow-hidden group hover:translate-y-[-8px] transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${trendUp ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-600'} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                    {trend}
                </span>
            </div>

            <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2">{title}</p>
                <h3 className="text-3xl font-black italic tracking-tighter text-slate-900">{value}</h3>
            </div>
        </div>
    )
}
