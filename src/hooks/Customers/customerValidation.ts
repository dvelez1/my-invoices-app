import { Customer } from "../../interfaces/customer";

export const customerValidation = (values: Customer): {} => {
  const errors: any = {};
  if (!values.Name) {
    errors.Name = "Name is Required!";
  }

  if (!values.FirstName) {
    errors.FirstName = "Price is Required!";
  }

  if (!values.FirstName) {
    errors.FirstName = "Last Name is Required!";
  }

  if (!values.City) {
    errors.City = "City is Required!";
  }

  if (!values.State) {
    errors.State = "State is Required!";
  }

  if (!values.ZipCode) {
  } else {
    if (values.ZipCode.length != 5) {
      errors.ZipCode = "Only 5 integers allowed! ";
    }
  }

  return errors;
};
