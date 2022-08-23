import { InvoiceMaster } from "../../interfaces/InvoiceMaster";

export const invoiceVoidValidation = (values: InvoiceMaster): {} => {
  const errors: any = {};
  if (!values.StartDate) {
    errors.StartDate = "Invoice Start Date is Required!";
  }

  if (!values.EndDate) {
    errors.EndDate = "Invoice Closed Date is Required!";
  }

  if (!values.CustomerId) {
    errors.CustomerId = "Customer Name is Required!";
  }

  if (!values.Note || values.Note.length <=3) {
    errors.Note = "Comments is Required! Please, provide more than 3 characteres.";
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
