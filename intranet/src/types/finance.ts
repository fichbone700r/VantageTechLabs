export interface BankAccount {
    id: string;
    name: string;
    balance: number;
    accountNumber: string;
    bankName: string;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    documentType: 'Factura' | 'Boleta' | 'Transferencia' | 'Otro';
    documentNumber: string;
    amount: number;
    type: 'income' | 'expense';
    accountId: string;
    balanceAfter: number; // Balance after this transaction
}

export interface PurchaseInvoice {
    id: string;
    providerName: string;
    providerRUT: string;
    documentNumber: string;
    issueDate: string;
    dueDate: string;
    netAmount: number;
    taxAmount: number;
    totalAmount: number;
    status: 'pending' | 'paid' | 'overdue';
    description: string;
}
