import { InvoiceMaster } from "../../interfaces/InvoiceMaster";

export const invoiceMasterValidation = (values: InvoiceMaster): {} => {
  const errors: any = {};
  // Not Run validation If model does not exist
  if (!values) return errors;

  if (!values.StartDate) {
    errors.StartDate = "Invoice Date is Required!";
  }

  if (!values.CustomerId) {
    errors.CustomerId = "Customer Name is Required!";
  }

  if (!values.PayedAmount) {
    if (!Number.isFinite(values.PayedAmount))
      errors.PayedAmount = "Payed Amount is Required!";
  } else {
    if (values.PayedAmount < 0)
      errors.PayedAmount = "Payed Amount need to be 0 or greater!!";
  }

  return errors;
};
