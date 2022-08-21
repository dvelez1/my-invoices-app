import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const invoiceDetailsValidationSuccess = (
  values: InvoiceDetails[]
): [] => {
  const errors: any = [];
  if (values.length === 0) return errors.push("Invoice Details not provided!");

  for (const invoiceDetails of values) {
    if (!invoiceDetails.ProductId) {
      return errors.push("Invoice Details: Product not provided!")
    }

    if (!invoiceDetails.Price || invoiceDetails.Price <= 0) {
      return errors.push("Invoice Details: Price not provided or is less than or equal to 0!")
    }

    if (!invoiceDetails.Quantity || invoiceDetails.Quantity <= 0) {
      return errors.push("Invoice Details: Quantity not provided or is less than or equal to 0!")
    }
  }

  // values.forEach((invoiceDetails) => {
  //   if (!invoiceDetails.ProductId) {
  //     return false;
  //   }

  //   console.log("invoiceDetails.Price", invoiceDetails.Price);
  //   if (!invoiceDetails.Price || invoiceDetails.Price <= 0) {
  //     console.log("entre price ");
  //     return false;
  //   }

  //   console.log("invoiceDetails.Quantity", invoiceDetails.Quantity);
  //   if (!invoiceDetails.Quantity || invoiceDetails.Quantity <= 0) {
  //     console.log("entre quantity ");
  //     return false;
  //   }
  // });

  return errors;
};
