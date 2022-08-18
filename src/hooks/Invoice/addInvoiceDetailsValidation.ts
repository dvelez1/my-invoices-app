import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const addInvoiceDetailsValidation = (values: InvoiceDetails): {} => {
    const errors: any = {};
    if (!values.ProductId) {
      errors.ProductId = "Product is Required!";
    }

    if (!values.Price) {
      errors.Price = "Price is Required!";
    }

    if (!values.Quantity) {
      errors.Quantity = "Quantity is Required!";
    }
    return errors;
  };


