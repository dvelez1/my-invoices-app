import { InvoiceMaster } from "../../interfaces/InvoiceMaster";

export const invoiceMasterValidation = (values: InvoiceMaster): {} => {
  const errors: any = {};
  if (!values.StartDate) {
    errors.StartDate = "Invoice Date is Required!";
  }

  if (!values.CustomerId) {
    errors.CustomerId = "Customer Name is Required!";
  }

  if (!values.PayedAmount) {
    if (values.PayedAmount < 0)
      errors.PayedAmount = "Payed Amount is Required!";
  }
  return errors;
};
