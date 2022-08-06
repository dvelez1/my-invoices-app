import React from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

var successResult: boolean = false;

class InvoiceDataService {
  createInvoice = async (
    invoiceMaster: InvoiceMaster,
    invoiceDetails: InvoiceDetails[],
    invoicePayments: InvoicePayments
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.put(
        "invoiceMaster/createInvoiceMaster",
        invoiceMaster
      );
      if (resp.status === 200) {
        const invoiceId = resp.data[0].Id;
        if (
          await !this.createInvoiceInvoiceDetails(
            invoiceDetails.map((obj) => {
              return { ...obj, InvoiceId: invoiceId };
            })
          )
        ) {
          // Hubo un error. Delete all records associated to the Invoice
        }
      } else return false;
    } catch (error) {
      console.error(error);
    }
    return successResult;
  };

  createInvoiceInvoiceDetails = async (
    invoiceDetails: InvoiceDetails[]
  ): Promise<boolean> => {
    try {
      // Example 1
      // const promises = invoiceDetails.map(async (obj) => {
      //   const result = await axiosInterface.put(
      //     "invoiceDetails/createInvoiceDetails",
      //     obj
      //   );
      //   return result;
      // });

      // const responses = await Promise.all(promises);
      // console.log("respuesta", responses);

      // Example 1
      const promises = invoiceDetails.map(async (obj) => {
        const result = await axiosInterface.put(
          "invoiceDetails/createInvoiceDetails",
          obj
        );
        return result;
      });

      const res = await Promise.all(promises);
      const data = res.map((res) => res.data);
      console.log(data.flat());
    } catch (error) {
      console.error(error);
    }
    return successResult;
  };
}

export default new InvoiceDataService();
