import { axiosInterface } from "../../helper/axiosInterface";
import { Product } from "../../interfaces/product";
import { genericMessages } from "../../helper/genericMessages";

export const createProduct = async (
  product: Product
): Promise<[boolean, string]> => {
  try {
    const resp = await axiosInterface.put("product/createProduct", product);
    return [
      resp.status === 200,
      resp.status === 200 ? genericMessages.success : genericMessages.error,
    ];
  } catch (error) {
    console.error(error);
    return [false, genericMessages.error];
  }
};

export const updateProduct = async (
  product: Product
): Promise<[boolean, string]> => {
  try {
    const resp = await axiosInterface.post("product/updateProduct", product);
    return [
      resp.status === 200,
      resp.status === 200 ? genericMessages.success : genericMessages.error,
    ];
  } catch (error) {
    console.error(error);
    return [false, genericMessages.error];
  }
};
