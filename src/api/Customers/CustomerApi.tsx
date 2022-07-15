import React, { useState, useEffect } from 'react';
import axios from "axios";
import { axiosInterface } from '../../helper/axiosInterface';

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/Api/customer',
//     timeout: 1000,
//     headers: {"Access-Control-Allow-Origin": "*"}
//   });
///getCustomers

export const CustomerApi = () => {

    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        axiosInterface.get("customer/getCustomers").
        then((response) => {
            setCustomers(response.data);
        });
      }, []);


  return (
    customers
  )
}


