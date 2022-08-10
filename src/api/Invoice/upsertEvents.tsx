import { axiosInterface } from "../../helper/axiosInterface";
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

var successResult = false;

enum Urls {
  CreateInvoiceMaster = "invoiceMaster/createInvoiceMaster",
  CreateInvoiceDetails = "invoiceDetails/createInvoiceDetails",
  CreateInvoicePayment = "invoicePayments/createInvoicePayment",
  EditInvoiceMaster = "invoiceMaster/updateInvoiceMaster",
  DeleteInvoiceMaster = "invoiceMaster/deleteInvoiceMaster/:Id",
  DeleteInvoiceAllByInvoiceId = "invoiceMaster/deleteInvoiceAllByInvoiceId/:Id",
  DeleteInvoiceDetails = "invoiceDetails/deleteInvoiceDetails/:Id",
  DeleteInvoicePayment = "invoiceMaster/deleteInvoicePayments/:Id",
}

class InvoiceDataService {
  //#region Create Events
  
  createInvoiceMaster = async (
    invoiceMaster: InvoiceMaster
  ): Promise<number> => {
    try {
      const resp = await axiosInterface.put(
        Urls.CreateInvoiceMaster,
        invoiceMaster
      );
      if (resp.status === 200) {
        return resp.data[0].Id;
      } else return 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  createInvoiceInvoiceDetails = async (
    invoiceDetails: InvoiceDetails[]
  ): Promise<boolean> => {
    try {
      const promises = invoiceDetails.map(async (obj) => {
        const result = await axiosInterface.put(Urls.CreateInvoiceDetails, obj);
        return result;
      });
      const res = await Promise.all(promises);
      const statusArrat = res.map((res) => res.status);
      // Verify if one record is not 200
      return statusArrat.includes(200);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  createInvoicePayments = async (
    invoicePayments: InvoicePayments
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.put(
        Urls.CreateInvoicePayment,
        invoicePayments
      );
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //#endregion Create Events

  //#region Edit Events
  updateInvoiceMaster = async (
    invoiceMaster: InvoiceMaster
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.post(
        Urls.EditInvoiceMaster,
        invoiceMaster
      );
      successResult = resp.status === 200;
      return successResult;
    } catch (error) {
      console.error("CatchError", error);
      return false;
    }
  };

  //#endregion Edit Events

  //#region Delete Events

  // Delete All Transaction associated to an InvoiceId
  deleteInvoiceAllByInvoiceId = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        Urls.DeleteInvoiceAllByInvoiceId + "/" + Id.toString()
      );
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  deleteInvoiceMaster = async (
    invoiceMaster: InvoiceMaster,
    Id: Number
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        Urls.DeleteInvoiceMaster + "/" + Id.toString(),
        { data: invoiceMaster }
      );
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  deleteInvoiceDetails = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        Urls.DeleteInvoiceDetails + "/" + Id.toString()
      );
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  deleteInvoicePayment = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        Urls.DeleteInvoicePayment + "/" + Id.toString()
      );
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  //#endregion Delete Events
}

export default new InvoiceDataService();
