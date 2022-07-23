import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../models/customer";


// export const useCustomersGet = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   // Used to Loading /Spinner Implementation
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axiosInterface
//       .get<Customer[]>("customer/getCustomers")
//       .then((response) => {
//         setCustomers(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   return { 
//     customers,
//     isLoading 
//   };
// };

export const useInvoicesGet = () => {
    // Used to Loading /Spinner Implementation
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axiosInterface
        .get("invoiceMaster/getTransformedInvoiceAll")
        .then((response) => {
          console.log('response',response)
          console.log('response.data',response.data)
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);
  
    return { 
      isLoading 
    };
  };