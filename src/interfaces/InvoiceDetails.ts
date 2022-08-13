export interface InvoiceDetails {
  InvoiceDetailsId: number;
  InvoiceId: number;
  ProductId: number;
  ProductName: string;
  CatalogPrice: number;
  Price: number;
  RemovedTransaction: boolean;
  RemovedDate: Date | null;
  Quantity: number;
}
