import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const invoiceDetailsValidationSuccess = (
  values: InvoiceDetails[]
): [] => {
  var errors: any = [];
  if (values.length === 0) return errors.push("Invoice Details not provided!");

  for (const invoiceDetails of values) {
    if (!invoiceDetails.ProductId) {
      return errors.push("Invoice Details: Product not provided!");
    }

    if (!invoiceDetails.Price) {
      if (!Number.isFinite(invoiceDetails.Price))
        return errors.push(
          "Invoice Details: Price not provided or is less than 0!"
        );
    } else {
      if (invoiceDetails.Price < 0) {
        return errors.push(
          "Invoice Details: Price not provided or is less than 0!"
        );
      }
    }

    if (!invoiceDetails.Quantity || invoiceDetails.Quantity <= 0) {
      return errors.push(
        "Invoice Details: Quantity not provided or is less than or equal to 0!"
      );
    }
  }

  return errors;
};
