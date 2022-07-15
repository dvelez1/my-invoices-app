import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../models/customer";
import { Customers } from "../../components/Customers/Customers";

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/Api/customer',
//     timeout: 1000,
//     headers: {"Access-Control-Allow-Origin": "*"}
//   });
///getCustomers

export const CustomerApi = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  useEffect(() => {
    axiosInterface
      .get<Customer[]>("customer/getCustomers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return customers;
};

