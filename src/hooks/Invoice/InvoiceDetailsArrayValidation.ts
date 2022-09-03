import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const invoiceDetailsValidationSuccess = (
  values: InvoiceDetails[]
): any => {
  var errors: Array<string> = [];

  if (values.length === 0) {
    errors.push("Invoice Details not provided!");
    return errors;
  }

  for (const invoiceDetails of values) {
    if (!invoiceDetails.ProductId) {
      errors.push("Invoice Details: Product not provided!");
      return errors;
    }

    if (!invoiceDetails.Price) {
      if (!Number.isFinite(invoiceDetails.Price))
        errors.push("Invoice Details: Price not provided or is less than 0!");
      return errors;
    } else {
      if (invoiceDetails.Price < 0) {
        errors.push("Invoice Details: Price not provided or is less than 0!");
        return errors;
      }
    }

    if (!invoiceDetails.Quantity || invoiceDetails.Quantity <= 0) {
      errors.push(
        "Invoice Details: Quantity not provided or is less than or equal to 0!"
      );
      return errors;
    }
  }

  return errors;
};
