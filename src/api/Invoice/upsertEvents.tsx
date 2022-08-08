import { axiosInterface } from "../../helper/axiosInterface";
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

var successResult = false;

enum InvoiceUrls {
  CreateInvoiceMaster = "invoiceMaster/createInvoiceMaster",
  CreateInvoiceDetails = "invoiceDetails/createInvoiceDetails",
  CreateInvoicePayment = "invoicePayments/createInvoicePayment",
  EditInvoiceMaster = "invoiceMaster/updateInvoiceMaster",
  DeleteInvoiceMaster = "invoiceMaster/deleteInvoiceMaster/:Id",
  DeleteInvoiceDetails = "invoiceDetails/deleteInvoiceDetails/:Id",
  DeleteInvoicePayment = "invoicePayments/deleteInvoicePayments/:Id",
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
        "invoiceMaster/createInvoiceMaster",
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
            successResult = true;
          }
        } else {
          // Invoice Details Failed
          // Delete by InvoiceId (Invoice Master and InvoiceDetails(Array))
          successResult = false;
        }
      } else {
        // Invoice Master failed
        return false;
      }
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
          InvoiceUrls.CreateInvoiceDetails,
          obj
        );
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
        InvoiceUrls.CreateInvoicePayment,
        invoicePayments
      );
      successResult = (resp.status === 200);
    } catch (error) {
      console.error(error);
    }

    return successResult;
  };

  //#endregion Create Events

  //#region Edit Events
  updateInvoiceMaster = async (
    invoiceMaster: InvoiceMaster
  ): Promise<boolean> => {
    try {
      console.log("InvoiceModel", invoiceMaster)
      console.log(InvoiceUrls.EditInvoiceMaster)
      console.log("Entre al post")
      const resp = await axiosInterface.post(
        InvoiceUrls.EditInvoiceMaster,
        invoiceMaster
      );
      successResult = (resp.status === 200);
    } catch (error) {
      console.error(error);
    }
    return successResult;
  };
  //#endregion Edit Events

  //#region Delete Events
  deleteInvoiceMaster = async (
    invoiceMaster: InvoiceMaster,
    Id: Number
  ): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        InvoiceUrls.DeleteInvoiceMaster + "/" + Id.toString(),
        { data: invoiceMaster }
      );
      successResult = (resp.status === 200);
    } catch (error) {
      console.error(error);
    }

    return successResult;
  };

  deleteInvoiceDetails = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        InvoiceUrls.DeleteInvoiceDetails + "/" + Id.toString()
      );
      successResult = (resp.status === 200);
    } catch (error) {
      console.error(error);
    }

    return successResult;
  };

  deleteInvoicePayment = async (Id: Number): Promise<boolean> => {
    try {
      const resp = await axiosInterface.delete(
        InvoiceUrls.DeleteInvoicePayment + "/" + Id.toString()
      );
      successResult = (resp.status === 200);
    } catch (error) {
      console.error(error);
    }

    return successResult;
  };
  //#endregion Delete Events
}

export default new InvoiceDataService();
