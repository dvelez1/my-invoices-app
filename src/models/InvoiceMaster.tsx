export interface invoiceMaster {
  InvoiceId: number;
  CustomerId: number;
  CustomerName: string;
  FirstName: string;
  LastName: string;
  TransactionActive: boolean;
  TotalAmount: number;
  PayedAmount: number;
  Note: string;
  Void: boolean;
  StartDate: Date;
  EndDate: Date | null;
}
