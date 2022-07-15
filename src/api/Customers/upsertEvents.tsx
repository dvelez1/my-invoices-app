import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../models/customer";

var result: boolean = false;

export const createCustomer = (customer: Customer) => {
  axiosInterface
    .put("customer/createCustomer", customer)
    .then((response) => {
      result = response.data.status === 200;
    })
    .catch((error) => console.log(error));

  return result;
};

export const updateCustomer = (customer: Customer) => {
    axiosInterface
    .post("customer/updateCustomer", customer)
    .then((response) => {
      result = response.data.status === 200;
    })
    .catch((error) => console.log(error));

  return result;
};

// export const deleteCustomer = (customer: Customer) => {};
