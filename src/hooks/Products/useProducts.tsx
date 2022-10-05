import React, { useState, useEffect } from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { Product } from "../../interfaces/product";
import { genericMessages } from "../../helper/genericMessages";
import {
  errorToastTransaction,
  successToastTransaction,
} from "../../helper/toastMessages";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosInterface.get<Product[]>("product/getProducts");
      setProducts(resp.data);
    } catch (error: any) {
      console.error(error);
      errorToastTransaction(genericMessages.error);
    } finally {
      setIsLoading(false);
    }
  };

  const upsertProduct = async (product: Product) => {
    try {
      const resp =
        product?.ProductId && product?.ProductId > 0
          ? axiosInterface.post("product/updateProduct", product)
          : axiosInterface.put("product/createProduct", product);

      if ((await resp)?.data) successToastTransaction(genericMessages.success);
    } catch (error) {
      console.error(error);
      errorToastTransaction(genericMessages.error);
    } finally {
      getProducts();
    }
  };

  const producApi = {
    getProducts,
    upsertProduct,
  };

  return {
    products,
    isLoading,
    producApi,
  };
};
