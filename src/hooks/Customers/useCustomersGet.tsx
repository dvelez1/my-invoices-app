import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../interfaces/customer";

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/Api/customer',
//     timeout: 1000,
//     headers: {"Access-Control-Allow-Origin": "*"}
//   });
///getCustomers

export const useCustomersGet = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  // Used to Loading /Spinner Implementation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInterface
      .get<Customer[]>("customer/getCustomers")
      .then((response) => {
        setCustomers(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return { 
    customers,
    isLoading 
  };
};
