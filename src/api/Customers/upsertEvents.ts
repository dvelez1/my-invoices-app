import { axiosInterface } from "../../helper/axiosInterface";
import { genericMessages } from "../../helper/genericMessages";
import { Customer } from "../../interfaces/customer";

export const createCustomer = async (
  customer: Customer
): Promise<[boolean, string]> => {
  try {
    const resp = await axiosInterface.put("customer/createCustomer", customer);
    return [
      resp.status === 200,
      resp.status === 200 ? genericMessages.success : genericMessages.error,
    ];
  } catch (error) {
    console.error(error);
    return [false, genericMessages.error];
  }
};

export const updateCustomer = async (
  customer: Customer
): Promise<[boolean, string]> => {
  try {
    const resp = await axiosInterface.post("customer/updateCustomer", customer);
    return [
      resp.status === 200,
      resp.status === 200 ? genericMessages.success : genericMessages.error,
    ];
  } catch (error) {
    console.error(error);
    return [false, genericMessages.error];
  }
};
