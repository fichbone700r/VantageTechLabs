import { Search, Bell, Menu } from 'lucide-react'

export default function TopBar() {
    return (
        <div className="flex items-center justify-between py-6 px-10">
            {/* Search */}
            <div className="relative w-96 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar en el sistema..."
                    className="glass-card w-full pl-12 pr-4 py-3.5 rounded-full text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="glass-card p-3 rounded-full text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="glass-card p-3 rounded-full text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all lg:hidden">
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
