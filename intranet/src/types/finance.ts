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
