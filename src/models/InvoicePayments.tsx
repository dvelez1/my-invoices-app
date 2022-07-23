export interface invoicePayments {
    InvoicePaiymentsId: number;
    InvoiceId: number;
    Payment: number;
    TransactionDate: Date;
    RemovedTransactionDate: Date | null;
    TransactionActive: boolean;
    RemovedTransaction: boolean;
  }
  