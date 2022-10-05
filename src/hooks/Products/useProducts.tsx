import React, { useState, useEffect } from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { Product } from "../../interfaces/product";
import { useToastNotification } from "../../hooks/helpers/useToastNotification";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notificationApi } = useToastNotification();

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosInterface.get<Product[]>("product/getProducts");
      setProducts(resp.data);
    } catch (error: any) {
      console.error(error);
      notificationApi.showNotification(
        notificationApi.notificationType.Error,
        notificationApi.genericMessage.Error
      );
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

      if ((await resp)?.data)
        notificationApi.showNotification(
          notificationApi.notificationType.Success,
          notificationApi.genericMessage.Success
        );
    } catch (error) {
      console.error(error);
      notificationApi.showNotification(
        notificationApi.notificationType.Error,
        notificationApi.genericMessage.Error
      );
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
