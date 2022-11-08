import { useState, useEffect } from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { useToastNotification } from "../helpers/useToastNotification";

// Models
import { InvoiceMaster } from "../../interfaces/InvoiceMaster";
import { InvoiceDetails } from "../../interfaces/InvoiceDetails";
import { InvoicePayments } from "../../interfaces/InvoicePayments";

export const useInvoicesGet = () => {
  // Used to Loading /Spinner Implementation
  const { notificationApi } = useToastNotification();
  const [invoiceMaster, setInvoiceMaster] = useState<InvoiceMaster[]>([]);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails[]>([]);
  const [invoicePayments, setInvoicePayments] = useState<InvoicePayments[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInterface
      .get("invoiceMaster/getTransformedInvoiceAll")
      .then((response) => {
        setInvoiceMaster(response.data[0]);
        setInvoiceDetails(response.data[1]);
        setInvoicePayments(response.data[2]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        notificationApi.showNotification(
          notificationApi.notificationType.Error,
          notificationApi.genericMessage.Error
        );
        console.log(error);
      });
  }, []);

  return {
    isLoading,
    invoiceMaster,
    invoiceDetails,
    invoicePayments,
  };
};
