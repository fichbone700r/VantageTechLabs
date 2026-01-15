import { useState } from 'react'
import RutInput from '../common/RutInput'
import { Save, Send, User } from 'lucide-react'

// Mock styles for consistent UI
const inputClass = "w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
const selectClass = "w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
const buttonBase = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all transform active:scale-[0.98]"

export default function WorkerRegistration() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        rut: '',
        email: '',
        telefono: '',
        direccion: '',
        cargo: '',
        departamento: '',
        tipoContrato: '',
        fechaIngreso: '',
        sueldoBase: '',
        afp: '',
        salud: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleRutChange = (rut: string) => {
        setFormData(prev => ({ ...prev, rut }))
    }

    const handleSubmit = async (action: 'save' | 'send') => {
        setLoading(true)
        setMessage(null)

        // Validate basic fields
        if (!formData.nombres || !formData.apellidos || !formData.rut) {
            setMessage({ type: 'error', text: 'Por favor complete la información personal obligatoria (Nombres, Apellidos, RUT).' })
            setLoading(false)
            return
        }

        // Simulate API delay
        setTimeout(() => {
            setLoading(false)
            if (action === 'save') {
                setMessage({ type: 'success', text: 'Ficha de trabajador guardada exitosamente.' })
            } else {
                setMessage({ type: 'success', text: 'Ficha guardada y enviada a contabilidad (correo enviado a contador).' })
            }
            // Reset form could go here if desired
        }, 1500)
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Registro de Trabajador</h2>
                    <p className="text-slate-500 font-medium">Complete la ficha para registrar un nuevo colaborador y asignar su puesto.</p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <User className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Información Personal</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className={labelClass}>Nombres *</label>
                            <input
                                type="text"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Ej. Juan Andrés"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>Apellidos *</label>
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Ej. Pérez López"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>RUT *</label>
                        <RutInput
                            value={formData.rut}
                            onChange={handleRutChange}
                            placeholder="12.345.678-9"
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className={labelClass}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="juan.perez@empresa.com"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="+56 9 1234 5678"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Av. Providencia 1234, Dpto 50"
                        />
                    </div>
                </div>

                {/* Job Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <Save className="w-5 h-5" /> {/* Using generic icon for job info distinction */}
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Puesto de Trabajo</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className={labelClass}>Cargo</label>
                            <input
                                type="text"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Ej. Desarrollador Frontend"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>Departamento</label>
                            <div className="relative">
                                <select
                                    name="departamento"
                                    value={formData.departamento}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Administración">Administración</option>
                                    <option value="Ventas">Ventas</option>
                                    <option value="Operaciones">Operaciones</option>
                                    <option value="TI">TI</option>
                                    <option value="RRHH">RRHH</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className={labelClass}>Tipo de Contrato</label>
                            <div className="relative">
                                <select
                                    name="tipoContrato"
                                    value={formData.tipoContrato}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Indefinido">Indefinido</option>
                                    <option value="Plazo Fijo">Plazo Fijo</option>
                                    <option value="Por Proyecto">Por Proyecto</option>
                                    <option value="Honorarios">Honorarios</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>Fecha de Ingreso</label>
                            <input
                                type="date"
                                name="fechaIngreso"
                                value={formData.fechaIngreso}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className={labelClass}>Sueldo Base ($)</label>
                            <input
                                type="number"
                                name="sueldoBase"
                                value={formData.sueldoBase}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="0"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>AFP</label>
                            <input
                                type="text"
                                name="afp"
                                value={formData.afp}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Ej. Modelo"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClass}>Salud</label>
                            <input
                                type="text"
                                name="salud"
                                value={formData.salud}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Ej. Fonasa"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <span className="font-bold text-sm">{message.text}</span>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100">
                <button
                    onClick={() => handleSubmit('save')}
                    disabled={loading}
                    className={`${buttonBase} bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 disabled:opacity-50`}
                >
                    {loading ? 'Guardando...' : (<><Save className="w-4 h-4" /> Guardar</>)}
                </button>
                <button
                    onClick={() => handleSubmit('send')}
                    disabled={loading}
                    className={`${buttonBase} bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50`}
                >
                    {loading ? 'Procesando...' : (<><Send className="w-4 h-4" /> Guardar y Enviar a Contabilidad</>)}
                </button>
            </div>
        </div>
    )
}
