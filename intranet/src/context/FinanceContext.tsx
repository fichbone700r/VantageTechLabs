import { createContext, useContext, useState, ReactNode } from 'react'
import type { BankAccount, Transaction, PurchaseInvoice } from '../types/finance'

interface FinanceContextType {
    accounts: BankAccount[];
    transactions: Transaction[];
    invoices: PurchaseInvoice[];
    addAccount: (account: BankAccount) => void;
    addTransaction: (transaction: Transaction) => void;
    addInvoice: (invoice: PurchaseInvoice) => void;
    payInvoice: (invoiceId: string, accountId: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
    // ---- Mock Data Initialization ----
    const [accounts, setAccounts] = useState<BankAccount[]>([
        { id: '1', name: 'Cuenta Corriente Principal', balance: 12450000, accountNumber: '987654321', bankName: 'Banco de Chile' },
        { id: '2', name: 'Cuenta Operacional', balance: 4200500, accountNumber: '123456789', bankName: 'Santander' },
    ])

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 't1', date: '2024-10-24', description: 'Pago Cliente Factura #402', documentType: 'Factura', documentNumber: '402', amount: 3500000, type: 'income', accountId: '1', balanceAfter: 12450000 },
        { id: 't2', date: '2024-10-23', description: 'Compra Insumos Oficina', documentType: 'Factura', documentNumber: '9982', amount: 156000, type: 'expense', accountId: '1', balanceAfter: 8950000 },
    ])

    const [invoices, setInvoices] = useState<PurchaseInvoice[]>([
        { id: '1', providerName: 'Proveedor Tecnológico SpA', providerRUT: '76.123.456-8', documentNumber: '1024', issueDate: '2024-10-20', dueDate: '2024-11-20', netAmount: 1200000, taxAmount: 228000, totalAmount: 1428000, status: 'pending', description: 'Servidores Octubre' },
        { id: '2', providerName: 'Insumos Oficina Ltda', providerRUT: '77.987.654-3', documentNumber: '5501', issueDate: '2024-10-15', dueDate: '2024-10-15', netAmount: 50000, taxAmount: 9500, totalAmount: 59500, status: 'paid', description: 'Papel y Tinta' }
    ])

    // ---- Actions ----

    const addAccount = (account: BankAccount) => {
        setAccounts(prev => [...prev, account])
    }

    const addTransaction = (transaction: Transaction) => {
        setTransactions(prev => [transaction, ...prev])

        // Update account balance
        setAccounts(prev => prev.map(acc => {
            if (acc.id === transaction.accountId) {
                return {
                    ...acc,
                    balance: transaction.type === 'income'
                        ? acc.balance + transaction.amount
                        : acc.balance - transaction.amount
                }
            }
            return acc
        }))
    }

    const addInvoice = (invoice: PurchaseInvoice) => {
        setInvoices(prev => [invoice, ...prev])
    }

    const payInvoice = (invoiceId: string, accountId: string) => {
        const invoice = invoices.find(inv => inv.id === invoiceId)
        const account = accounts.find(acc => acc.id === accountId)

        if (!invoice || !account) return

        if (invoice.status === 'paid') return // Already paid

        // 1. Create Expense Transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            description: `Pago Factura ${invoice.providerName} #${invoice.documentNumber}`,
            documentType: 'Factura',
            documentNumber: invoice.documentNumber,
            amount: invoice.totalAmount,
            type: 'expense',
            accountId: accountId,
            balanceAfter: account.balance - invoice.totalAmount
        }

        addTransaction(newTransaction)

        // 2. Update Invoice Status
        setInvoices(prev => prev.map(inv => {
            if (inv.id === invoiceId) {
                return { ...inv, status: 'paid' }
            }
            return inv
        }))
    }

    return (
        <FinanceContext.Provider value={{ accounts, transactions, invoices, addAccount, addTransaction, addInvoice, payInvoice }}>
            {children}
        </FinanceContext.Provider>
    )
}

export function useFinance() {
    const context = useContext(FinanceContext)
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider')
    }
    return context
}
