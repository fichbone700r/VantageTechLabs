import { useState } from 'react'
import {
    LayoutDashboard,
    Wallet,
    Package,
    Users,
    Settings
} from 'lucide-react'

export default function Sidebar() {
    const [active, setActive] = useState('Overview')

    const navigation = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Finanzas', icon: Wallet },
        { name: 'Inventario', icon: Package },
        { name: 'RRHH', icon: Users },
        { name: 'Ajustes', icon: Settings },
    ]

    return (
        <div className="hidden lg:flex flex-col w-72 h-[calc(100vh-2rem)] m-4 glass-card rounded-super shadow-float z-50 transition-all duration-500 hover:translate-y-[-4px]">
            {/* Logo */}
            <div className="flex h-24 items-center px-8">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <img
                        src="/vantage-logo-horizontal.png"
                        alt="Vantage Tech Labs"
                        className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-5 py-8">
                {navigation.map((item) => {
                    const isActive = active === item.name
                    return (
                        <button
                            key={item.name}
                            onClick={() => setActive(item.name)}
                            className={`
                w-full group flex items-center rounded-[20px] px-5 py-4 text-sm font-bold transition-all duration-300 ease-out
                ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100/50 translate-x-2'
                                    : 'text-slate-400 hover:bg-white/50 hover:text-slate-700 hover:shadow-sm'
                                }
              `}
                        >
                            <item.icon
                                className={`mr-4 h-5 w-5 flex-shrink-0 transition-colors duration-300 stroke-[2.5]
                  ${isActive ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-500'}
                `}
                            />
                            <span className="uppercase tracking-wider text-[11px]">{item.name}</span>
                            {isActive && (
                                <div className="ml-auto text-indigo-400">
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-5 mt-auto">
                <div className="glass-card rounded-[24px] p-2 flex items-center gap-4 hover:bg-white/90 transition-all cursor-pointer group hover:scale-[1.02]">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-[18px] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs border-2 border-white shadow-sm">
                            JD
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                        <p className="text-sm font-black text-slate-900 truncate">Juan Domínguez</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
