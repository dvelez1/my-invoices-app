import React, { useState, useEffect } from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { Product } from "../../models/product";

export const useProductsGet = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Used to Loading /Spinner Implementation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInterface
      .get<Product[]>("product/getProducts")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return { 
    products,
    isLoading 
  };
};
