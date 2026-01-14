import { useState } from 'react'
import { Plus, Building2, ArrowUpRight, ArrowDownRight, Search, FileText } from 'lucide-react'
import { useFinance } from '../../../context/FinanceContext'
import type { BankAccount, Transaction } from '../../../types/finance'
import RutInput from '../../common/RutInput'
import type { RutData } from '../../../services/rutService'

export default function BankModule() {
    const { accounts, transactions, addAccount, addTransaction } = useFinance()
    const [selectedAccount, setSelectedAccount] = useState<string>(accounts[0]?.id || '')
    const [showAddTransaction, setShowAddTransaction] = useState(false)
    const [showAddAccount, setShowAddAccount] = useState(false)

    // Derived state
    const currentAccount = accounts.find(acc => acc.id === selectedAccount) || accounts[0]
    const currentTransactions = transactions.filter(t => t.accountId === selectedAccount)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
    }

    const handleAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newAccount: BankAccount = {
            id: Date.now().toString(),
            name: formData.get('name') as string,
            bankName: formData.get('bankName') as string,
            accountNumber: formData.get('accountNumber') as string,
            balance: Number(formData.get('initialBalance')),
        }
        addAccount(newAccount)
        setSelectedAccount(newAccount.id) // Switch to new account
        setShowAddAccount(false)
        e.currentTarget.reset()
    }

    const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const type = formData.get('type') as 'income' | 'expense'
        const amount = Number(formData.get('amount'))

        if (!currentAccount) return

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            date: formData.get('date') as string,
            description: formData.get('description') as string,
            documentType: formData.get('documentType') as any,
            documentNumber: formData.get('documentNumber') as string,
            amount: amount,
            type: type,
            accountId: selectedAccount,
            balanceAfter: type === 'income'
                ? currentAccount.balance + amount
                : currentAccount.balance - amount
        }

        addTransaction(newTransaction)
        setShowAddTransaction(false)
        e.currentTarget.reset()
    }

    const handleRutDataFound = (data: RutData) => {
        // Auto-fill form data when RUT is found
        const form = document.querySelector('form[name="transactionForm"]') as HTMLFormElement;
        if (form) {
            const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;
            if (descriptionInput) {
                descriptionInput.value = `Pago a ${data.name}`;
            }
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Left Panel: Accounts List */}
            <div className="lg:col-span-1 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-700">Mis Cuentas</h3>
                    <button
                        onClick={() => setShowAddAccount(true)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-indigo-600 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    {accounts.map(acc => (
                        <div
                            key={acc.id}
                            onClick={() => setSelectedAccount(acc.id)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedAccount === acc.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 border-indigo-600'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Building2 className={`w-5 h-5 ${selectedAccount === acc.id ? 'text-indigo-200' : 'text-slate-400'}`} />
                                <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedAccount === acc.id ? 'text-indigo-200' : 'text-slate-400'
                                    }`}>{acc.bankName}</span>
                            </div>
                            <div className="font-bold text-lg mb-1">{acc.name}</div>
                            <div className={`text-sm opacity-80 font-mono tracking-tight`}>
                                ****{acc.accountNumber.slice(-4)}
                            </div>
                            <div className="mt-4 text-xl font-black">
                                {formatCurrency(acc.balance)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Transactions */}
            <div className="lg:col-span-3 space-y-6">

                {/* Actions Bar */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar transacción..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-medium focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddTransaction(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nueva Transacción
                    </button>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Fecha</th>
                                    <th className="px-6 py-4 font-bold">Descripción</th>
                                    <th className="px-6 py-4 font-bold">Documento</th>
                                    <th className="px-6 py-4 font-bold text-right">Monto</th>
                                    <th className="px-6 py-4 font-bold text-right">Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTransactions.map((t) => (
                                    <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-600 font-mono">{t.date}</td>
                                        <td className="px-6 py-4 font-bold text-slate-700">
                                            <div className="flex flex-col">
                                                <span>{t.description}</span>
                                                <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">{t.type === 'income' ? 'Ingreso' : 'Egreso'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600">
                                                <FileText className="w-3 h-3 text-slate-400" />
                                                {t.documentType} {t.documentNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`font-bold inline-flex items-center gap-1 ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                                                }`}>
                                                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                                {t.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-700">
                                            {formatCurrency(t.balanceAfter)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {showAddTransaction && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Nueva Transacción</h3>
                            <button onClick={() => setShowAddTransaction(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <form name="transactionForm" onSubmit={handleAddTransaction} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fecha</label>
                                    <input type="date" name="date" required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo</label>
                                    <select name="type" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium">
                                        <option value="income">Ingreso (+)</option>
                                        <option value="expense">Egreso (-)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">RUT (Opcional)</label>
                                <RutInput
                                    onDataFound={handleRutDataFound}
                                    onChange={() => { }}
                                    placeholder="Ej: 76.353.490-6 (Solo Demo)"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
                                <input name="description" required placeholder="Ej: Pago Cliente..." className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Doc. Tipo</label>
                                    <select name="documentType" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium">
                                        <option value="Factura">Factura</option>
                                        <option value="Boleta">Boleta</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">N° Doc</label>
                                    <input name="documentNumber" required placeholder="1234" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Monto</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input type="number" name="amount" required placeholder="0" className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 border-none font-black text-lg" />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 mt-2 hover:bg-indigo-700 transition-colors">
                                Registrar Movimiento
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Account Modal */}
            {showAddAccount && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Nueva Cuenta Bancaria</h3>
                            <button onClick={() => setShowAddAccount(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <form onSubmit={handleAddAccount} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre de Cuenta (Alias)</label>
                                <input name="name" required placeholder="Ej: Cuenta Operacional" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Banco</label>
                                    <input name="bankName" required placeholder="Banco..." className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">N° Cuenta</label>
                                    <input name="accountNumber" required placeholder="123456" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none font-medium" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Saldo Inicial</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input type="number" name="initialBalance" required placeholder="0" className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 border-none font-black text-lg" />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 mt-2 hover:bg-indigo-700 transition-colors">
                                Crear Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
