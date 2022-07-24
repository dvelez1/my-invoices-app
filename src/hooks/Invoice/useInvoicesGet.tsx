import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInterface } from "../../helper/axiosInterface";

// Models
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

export const useInvoicesGet = () => {
    // Used to Loading /Spinner Implementation
    const [invoiceMaster, setInvoiceMaster] = useState<InvoiceMaster[]>([]);
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails[]>([]);
    const [invoicePayments, setInvoicePayments] = useState<InvoicePayments[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axiosInterface
        .get("invoiceMaster/getTransformedInvoiceAll")
        .then((response) => {
          console.log("response.data[0]",response.data[0])
          setInvoiceMaster(response.data[0])
          setInvoiceDetails(response.data[1])
          setInvoicePayments(response.data[2])
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);
  
    return { 
      isLoading,
      invoiceMaster, 
      invoiceDetails,
      invoicePayments
    };
  };