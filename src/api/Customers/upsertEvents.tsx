import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../models/customer";

var successResult: boolean = false;

export const createCustomer = async (customer: Customer): Promise<boolean> => {
  try {
    const resp = await axiosInterface.put("customer/createCustomer", customer);
    successResult = resp.status === 200;
  } catch (error) {
    console.error(error);
  }

  return successResult;
};

export const updateCustomer = (customer: Customer) => {
  console.log(customer)
  axiosInterface
    .post("customer/updateCustomer", customer)
    .then((response) => {
      successResult = response.status === 200 ? true : false;
    })
    .catch((error) => console.log(error));

  return successResult;
};

// export const deleteCustomer = (customer: Customer) => {};
