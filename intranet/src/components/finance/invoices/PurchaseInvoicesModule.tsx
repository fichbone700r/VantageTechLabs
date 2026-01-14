import { useState } from 'react'
import { Plus, Search, Calendar, FileText, CheckCircle, AlertCircle, Clock, Wallet } from 'lucide-react'
import { useFinance } from '../../../context/FinanceContext'
import type { PurchaseInvoice } from '../../../types/finance'

export default function PurchaseInvoicesModule() {
    const { invoices, accounts, addInvoice, payInvoice } = useFinance()
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Pay Modal State
    const [invoiceToPay, setInvoiceToPay] = useState<PurchaseInvoice | null>(null)
    const [selectedBankForPayment, setSelectedBankForPayment] = useState('')

    // Form logic state
    const [netAmount, setNetAmount] = useState<number | ''>('')

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
    }

    const filteredInvoices = invoices.filter(inv =>
        inv.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.documentNumber.includes(searchTerm)
    )

    const handleAddInvoice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const net = Number(formData.get('netAmount'))
        const tax = Math.round(net * 0.19)
        const total = net + tax

        const newInvoice: PurchaseInvoice = {
            id: Date.now().toString(),
            providerName: formData.get('providerName') as string,
            providerRUT: formData.get('providerRUT') as string,
            documentNumber: formData.get('documentNumber') as string,
            issueDate: formData.get('issueDate') as string,
            dueDate: formData.get('dueDate') as string,
            description: formData.get('description') as string,
            netAmount: net,
            taxAmount: tax,
            totalAmount: total,
            status: 'pending' // Default status
        }

        addInvoice(newInvoice)
        setShowAddModal(false)
        setNetAmount('') // Reset internal state
        e.currentTarget.reset()
    }

    const handlePayInvoice = (e: React.FormEvent) => {
        e.preventDefault()
        if (invoiceToPay && selectedBankForPayment) {
            payInvoice(invoiceToPay.id, selectedBankForPayment)
            setInvoiceToPay(null)
            setSelectedBankForPayment('')
        }
    }

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar proveedor o folio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-medium focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="bg-indigo-50 px-4 py-2 rounded-xl flex items-center gap-2 text-indigo-700 text-sm font-bold">
                        <span className="text-xs uppercase tracking-wide opacity-70">Total Por Pagar</span>
                        <span>{formatCurrency(invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.totalAmount, 0))}</span>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Registrar Factura
                    </button>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 font-bold">Estado</th>
                            <th className="px-6 py-4 font-bold">Proveedor</th>
                            <th className="px-6 py-4 font-bold">Folio</th>
                            <th className="px-6 py-4 font-bold">Fechas</th>
                            <th className="px-6 py-4 font-bold text-right">Neto</th>
                            <th className="px-6 py-4 font-bold text-right">IVA (19%)</th>
                            <th className="px-6 py-4 font-bold text-right">Total</th>
                            <th className="px-6 py-4 font-bold text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((inv) => (
                            <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${inv.status === 'paid'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : inv.status === 'pending'
                                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        {inv.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                                        {inv.status === 'pending' && <Clock className="w-3 h-3" />}
                                        {inv.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                                        {inv.status === 'paid' ? 'Pagado' : inv.status === 'pending' ? 'Pendiente' : 'Vencido'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-700">{inv.providerName}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{inv.providerRUT}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{inv.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block text-xs">
                                        #{inv.documentNumber}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-1 mb-1" title="Emisión">
                                        <Calendar className="w-3 h-3 text-slate-400" /> {inv.issueDate}
                                    </div>
                                    <div className={`flex items-center gap-1 font-bold ${inv.status === 'pending' ? 'text-amber-600' : 'text-slate-400'
                                        }`} title="Vencimiento">
                                        <AlertCircle className="w-3 h-3" /> {inv.dueDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right text-slate-500 font-medium">
                                    {formatCurrency(inv.netAmount)}
                                </td>
                                <td className="px-6 py-4 text-right text-slate-400 font-medium">
                                    {formatCurrency(inv.taxAmount)}
                                </td>
                                <td className="px-6 py-4 text-right font-black text-slate-800 text-base">
                                    {formatCurrency(inv.totalAmount)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {inv.status === 'pending' && (
                                        <button
                                            onClick={() => {
                                                setInvoiceToPay(inv)
                                                setSelectedBankForPayment(accounts[0]?.id || '')
                                            }}
                                            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            Pagar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pay Invoice Modal */}
            {invoiceToPay && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Pagar Factura</h3>
                            <button onClick={() => setInvoiceToPay(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl mb-6">
                            <p className="text-xs font-bold text-slate-500 uppercase">Estás pagando a</p>
                            <p className="text-lg font-bold text-slate-800">{invoiceToPay.providerName}</p>
                            <div className="flex justify-between mt-2 pt-2 border-t border-slate-200">
                                <span className="text-sm font-medium text-slate-500">Total a Pagar</span>
                                <span className="text-lg font-black text-indigo-600">{formatCurrency(invoiceToPay.totalAmount)}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePayInvoice} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Seleccionar Cuenta de Origen</label>
                                <div className="space-y-2">
                                    {accounts.map(acc => (
                                        <div
                                            key={acc.id}
                                            onClick={() => setSelectedBankForPayment(acc.id)}
                                            className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${selectedBankForPayment === acc.id
                                                    ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${selectedBankForPayment === acc.id ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                                                    <Wallet className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{acc.name}</p>
                                                    <p className="text-xs text-slate-500">{acc.bankName}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-slate-700">{formatCurrency(acc.balance)}</p>
                                                <p className="text-[10px] text-slate-400">Disponible</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 mt-2 hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Confirmar Pago
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Invoice Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-50 rounded-xl">
                                    <FileText className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Registrar Factura de Compra</h3>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <form onSubmit={handleAddInvoice} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Provider Info */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Datos Proveedor</h4>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Razón Social</label>
                                        <input name="providerName" required placeholder="Nombre proveedor" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">RUT</label>
                                        <input name="providerRUT" required placeholder="XX.XXX.XXX-X" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium text-sm" />
                                    </div>
                                </div>

                                {/* Doc Info */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Documento</h4>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Folio (N° Factura)</label>
                                        <input name="documentNumber" required placeholder="0001" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Emisión</label>
                                            <input type="date" name="issueDate" required className="w-full px-3 py-2 rounded-xl bg-slate-50 border-none font-medium text-xs" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vencimiento</label>
                                            <input type="date" name="dueDate" required className="w-full px-3 py-2 rounded-xl bg-slate-50 border-none font-medium text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción / Glosa</label>
                                <input name="description" required placeholder="Detalle de la compra..." className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium text-sm" />
                            </div>

                            {/* Amounts */}
                            <div className="bg-slate-50 p-4 rounded-xl grid grid-cols-3 gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Monto Neto</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                                        <input
                                            type="number"
                                            name="netAmount"
                                            value={netAmount}
                                            onChange={(e) => setNetAmount(Number(e.target.value))}
                                            required
                                            placeholder="0"
                                            className="w-full pl-6 pr-3 py-2 rounded-lg border border-slate-200 font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">IVA (19%)</label>
                                    <div className="px-3 py-2 text-slate-500 font-medium text-sm border-b border-slate-200">
                                        {formatCurrency(Number(netAmount) * 0.19)}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Total</label>
                                    <div className="px-3 py-2 text-indigo-700 font-black text-lg border-b-2 border-indigo-100">
                                        {formatCurrency(Number(netAmount) * 1.19)}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.01] transition-all flex justify-center items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Guardar Factura
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
