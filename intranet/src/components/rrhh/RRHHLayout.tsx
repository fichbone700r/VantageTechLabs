import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { UserPlus, Users } from 'lucide-react'
import WorkerRegistration from './WorkerRegistration'

export default function RRHHLayout() {
    const location = useLocation()

    // Helper to check if a route is active
    const isActive = (path: string) => location.pathname.includes(path)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Recursos Humanos</h1>
                    <p className="text-slate-500 font-medium">Gestión de colaboradores, contratos y asignaciones.</p>
                </div>
            </div>

            {/* Sub-navigation for RRHH Module */}
            <div className="flex gap-4 border-b border-gray-200 pb-1 overflow-x-auto">
                <Link
                    to="/rrhh/ficha"
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${isActive('/ficha')
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <UserPlus className="w-4 h-4" />
                    Ficha Trabajador
                </Link>
                <Link
                    to="/rrhh/lista"
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${isActive('/lista')
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Lista de Trabajadores
                </Link>
            </div>

            {/* Module Content */}
            <Routes>
                <Route path="/" element={<Navigate to="ficha" replace />} />
                <Route path="ficha" element={<WorkerRegistration />} />
                <Route path="lista" element={<div className="p-10 text-center text-slate-500">Módulo en construcción: Lista de Trabajadores</div>} />
            </Routes>
        </div>
    )
}
