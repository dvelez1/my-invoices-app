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
  DeleteInvoiceMaster = "invoiceMaster/deleteInvoiceMaster/",
  DeleteInvoiceAllByInvoiceId = "invoiceMaster/deleteInvoiceAllByInvoiceId/",
  DeleteInvoiceDetails = "invoiceDetails/deleteInvoiceDetails/",
  DeleteInvoicePayment = "invoiceMaster/deleteInvoicePayments/",
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
        console.log("result", result);
        return result;
      });

      const res = await Promise.all(promises);

      return res.map((res) => res.status).every((currentValue) => currentValue === 200)

        // const statusArray = res.map((res) => res.status);
        // return statusArray.every((currentValue) => currentValue === 200);


      // Example 1

      // const res = await Promise.all(
      //   invoiceDetails.map((obj) => {
      //     const result = axiosInterface.put(Urls.CreateInvoiceDetails, obj);
      //     return result;
      //   })
      // );

      // const statusArray = res.map((res) => res.status);

      // Will Return True if all values are
      // return statusArray.every((currentValue) => currentValue === 200);

      //EXAMPLE 2

      // console.log("invoiceDetails",invoiceDetails)

      // const promises = invoiceDetails.map(async (obj) => {
      //   const result = await axiosInterface.put(Urls.CreateInvoiceDetails, obj);
      //   console.log("result",result)
      //   return result;
      // });

      // console.log("promises",promises)
      // const res = await Promise.all(promises);
      // const statusArrat = res.map((res) => res.status);
      // // Verify if one record is not 200
      // return statusArrat.includes(200);
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

  // Delete All Transaction associated to an InvoiceId (Pending Test)
  deleteInvoiceAllByInvoiceId = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        Urls.DeleteInvoiceAllByInvoiceId + Id
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
      const resp = await axiosInterface.delete(Urls.DeleteInvoiceMaster + Id, {
        data: invoiceMaster,
      });
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  deleteInvoiceDetails = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(Urls.DeleteInvoiceDetails + Id);
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  deleteInvoicePayment = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(Urls.DeleteInvoicePayment + Id);
      return resp.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  //#endregion Delete Events
}

export default new InvoiceDataService();
