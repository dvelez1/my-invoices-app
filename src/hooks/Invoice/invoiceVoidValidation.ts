import { InvoiceMaster } from "../../interfaces/InvoiceMaster";

export const invoiceVoidValidation = (values: InvoiceMaster): {} => {
  const errors: any = {};
  if (!values.StartDate) {
    errors.StartDate = "Invoice Start Date is Required!";
  }

  if (!values.EndDate) {
    errors.EndDate = "Invoice End Date is Required!";
  }

  if (!values.CustomerId) {
    errors.CustomerId = "Customer Name is Required!";
  }

  if (!values.Note || values.Note.length >=3) {
    errors.Note = "Note is Required! Please, provide more than 3 characteres.";
  }


  if (!values.PayedAmount) {
    if (values.PayedAmount < 0)
      errors.PayedAmount = "Payed Amount is Required!";
  }
  return errors;
};
