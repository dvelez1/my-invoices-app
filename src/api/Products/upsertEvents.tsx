import { axiosInterface } from "../../helper/axiosInterface";
import { Product } from "../../interfaces/product";

var successResult: boolean = false;

export const createProduct = async (product: Product): Promise<boolean> => {
  try {
    const resp = await axiosInterface.put("product/createProduct", product);
    successResult = resp.status === 200;
  } catch (error) {
    console.error(error);
  }

  return successResult;
};


export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    const resp = await axiosInterface.post("product/updateProduct", product);
    successResult = resp.status === 200;
  } catch (error) {
    console.error(error);
  }
  return successResult;
};

// export const deleteCustomer = (customer: Customer) => {};
