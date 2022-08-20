import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const addInvoiceDetailsValidation = (values: InvoiceDetails): {} => {
    const errors: any = {};
    if (!values.ProductId) {
      errors.ProductId = "Product is Required!";
    }

    if (!values.Price) {
      errors.Price = "Price is Required!";
    }
    else{
      if (values.Price <=0){
        errors.Price = "Price is less or equal to 0!";
      }
    }

    if (!values.Quantity) {
      errors.Quantity = "Quantity is Required!";
    }
    else{
      if (values.Quantity <=0){
        errors.Quantity = "Quantity is less or equal to 0!";
      }
    }
    return errors;
  };


