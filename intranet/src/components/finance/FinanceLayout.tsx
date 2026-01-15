import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import BankModule from './bank/BankModule'
import PurchaseInvoicesModule from './invoices/PurchaseInvoicesModule'
import { Wallet, PieChart, FileText } from 'lucide-react'

export default function FinanceLayout() {
    const location = useLocation()

    // Helper to check if a route is active
    const isActive = (path: string) => location.pathname.includes(path)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Finanzas</h1>
                    <p className="text-slate-500 font-medium">Gestión de bancos, flujo de caja y balances.</p>
                </div>
            </div>

            {/* Sub-navigation for Finance Module */}
            <div className="flex gap-4 border-b border-gray-200 pb-1 overflow-x-auto">
                <Link
                    to="/finanzas/banco"
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${isActive('/banco')
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <Wallet className="w-4 h-4" />
                    Banco
                </Link>
                <Link
                    to="/finanzas/facturas"
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${isActive('/facturas')
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <FileText className="w-4 h-4" />
                    Facturas Compra
                </Link>
                <Link
                    to="/finanzas/flujo"
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${isActive('/flujo')
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <PieChart className="w-4 h-4" />
                    Flujo de Caja
                </Link>

            </div>

            {/* Module Content */}
            <Routes>
                <Route path="/" element={<Navigate to="banco" replace />} />
                <Route path="banco" element={<BankModule />} />
                <Route path="facturas" element={<PurchaseInvoicesModule />} />
                <Route path="flujo" element={<div className="p-10 text-center text-slate-500">Módulo en construcción: Flujo de Caja</div>} />

            </Routes>
        </div>
    )
}
