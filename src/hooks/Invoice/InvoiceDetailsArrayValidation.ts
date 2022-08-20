import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const invoiceDetailsValidationSuccess = (
  values: InvoiceDetails[]
): boolean => {
  if (values.length === 0) return false;

  values.forEach((invoiceDetails) => {
    if (!invoiceDetails.ProductId) {
      return false;
    }

    console.log("invoiceDetails.Price", invoiceDetails.Price);
    if (!invoiceDetails.Price || invoiceDetails.Price <= 0) {
      console.log("entre price ");
      return false;
    }

    console.log("invoiceDetails.Quantity", invoiceDetails.Quantity);
    if (!invoiceDetails.Quantity || invoiceDetails.Quantity <= 0) {
      console.log("entre quantity ");
      return false;
    }
  });

  console.log("llegue aca");
  return false;
};
