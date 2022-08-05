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

        invoiceDetails.forEach((element) => {
          element.InvoiceId = invoiceId;
          if (!this.createInvoiceInvoiceDetails(element)) {
            // Hubo un error. Delete all records associated to the Invoice
          }
        });
      } else return false;
    } catch (error) {
      console.error(error);
    }
    return successResult;
  };

  createInvoiceInvoiceDetails = async (
    invoiceDetails: InvoiceDetails
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.put(
        "invoiceDetails/createInvoiceDetails",
        invoiceDetails
      );
      successResult = resp.status === 200;
    } catch (error) {
      console.error(error);
    }
    return successResult;
  };
}

export default new InvoiceDataService();
