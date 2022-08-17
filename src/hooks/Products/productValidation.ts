import { Product } from "../../interfaces/product";

export const productValidation = (values: Product): {} => {
    const errors: any = {};
    if (!values.Name) {
      errors.Name = "Name is Required!";
    }

    if (!values.Price) {
      errors.Price = "Price is Required!";
    }
    return errors;
  };


