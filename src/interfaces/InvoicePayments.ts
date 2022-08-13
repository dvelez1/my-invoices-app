export interface InvoicePayments {
    InvoicePaiymentsId: number;
    InvoiceId: number;
    Payment: number;
    TransactionDate: Date;
    RemovedTransactionDate: Date | null;
    RemovedTransaction: boolean;
  }
  