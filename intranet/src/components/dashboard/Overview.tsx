import StatsCard from './StatsCard'
import CapitalChart from './CapitalChart'
import { DollarSign, Package, Users, Wallet, Calendar, Sparkles, Bot } from 'lucide-react'

export default function Overview() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pt-4">

            {/* Dashboard Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                        Bienvenido, Juan
                    </h1>
                    <p className="text-slate-500 font-medium">Este es el resumen operativo de tu empresa hoy.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-slate-600 shadow-sm hover:bg-gray-50 transition-colors">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        Últimos 30 días
                    </button>
                    <button className="bg-indigo-600 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all">
                        Generar Reporte
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Ingresos Mensuales"
                    value="$12.450.000"
                    trend="+12.5%"
                    icon={<DollarSign className="h-6 w-6" />}
                />
                <StatsCard
                    title="Stock Inventario"
                    value="1,245 Unidades"
                    trend="-4.2%"
                    trendUp={false}
                    icon={<Package className="h-6 w-6" />}
                />
                <StatsCard
                    title="Nómina Activa"
                    value="48 Empleados"
                    trend="0.0%"
                    trendUp={true}
                    icon={<Users className="h-6 w-6" />}
                />
                <StatsCard
                    title="Caja Disponible"
                    value="$8.240.500"
                    trend="+5.2%"
                    trendUp={true}
                    icon={<Wallet className="h-6 w-6" />}
                />
            </div>

            {/* Charts & AI Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="glass-card rounded-[40px] p-8 h-full min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Flujo de Caja (CLP)</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                                    <span className="text-xs font-bold text-slate-500">Ingresos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-100"></div>
                                    <span className="text-xs font-bold text-slate-500">Egresos</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <CapitalChart />
                        </div>
                    </div>
                </div>

                {/* Vantage AI Widget */}
                <div className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col justify-between group">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Bot className="h-32 w-32 text-indigo-600 rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                <Sparkles className="h-3 w-3" />
                                POWERED BY VANTAGE AI
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-3">Optimizando el Flujo de Caja</h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                            "Basado en tus egresos de este mes, podrías ahorrar un 8.5% renegociando los contratos de servicios básicos antes de noviembre."
                        </p>

                        <button className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                            Analizar más profundo →
                        </button>
                    </div>

                    <div className="bg-[#0f172a] rounded-[30px] p-6 mt-6 relative overflow-hidden text-white group-hover:scale-[1.02] transition-transform duration-300">
                        <h4 className="font-black text-lg mb-1">Vantage Pro Plus</h4>
                        <p className="text-xs text-slate-400 mb-6">Actualiza a la versión ilimitada para acceso total a la API de impuestos de Chile.</p>
                        <button className="w-full bg-white text-slate-900 py-3 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
                            Saber más
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
