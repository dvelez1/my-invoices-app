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

  createInvoice = async (
    invoiceMaster: InvoiceMaster,
    invoiceDetails: InvoiceDetails[],
    invoicePayments: InvoicePayments
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.put(
        Urls.CreateInvoiceMaster,
        invoiceMaster
      );

      if (resp.status === 200) {
        // Invoice Master Success Response
        const invoiceId = resp.data[0].Id;
        // Create Invoice Details
        if (
          await this.createInvoiceInvoiceDetails(
            invoiceDetails.map((obj) => {
              return { ...obj, InvoiceId: invoiceId };
            })
          )
        ) {
          // Create Invoice Payment
          if (await this.createInvoicePayments(invoicePayments)) {
            return true;
          } else {
            // Invoice Payment failed
            return false;
          }
        } else {
          // Invoice Details Failed
          return false;
        }
      } else {
        // Invoice Master failed
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
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
        const result = await axiosInterface.put(Urls.CreateInvoiceDetails, obj);
        return result;
      });

      const res = await Promise.all(promises);
      const data = res.map((res) => res.data);
      console.log(data.flat());
      // TODO: Remember Get ReturnValue and verify is some transaction failed
      successResult = data[0].status === 200;
    } catch (error) {
      console.error(error);
    }
    return successResult;
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
