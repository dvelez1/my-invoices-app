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

  createInvoiceBackup = async (
    invoiceMaster: InvoiceMaster,
    invoiceDetails: InvoiceDetails[],
    invoicePayments: InvoicePayments
  ): Promise<boolean> => {
    try {
      console.log("InvoiceMaster", invoiceMaster);
      console.log("invoiceDetails", invoiceDetails);
      console.log("InvoiceMaster", invoicePayments);

      const resp = await axiosInterface.put(
        Urls.CreateInvoiceMaster,
        invoiceMaster
      );

      if (resp.status === 200) {
        console.log("InvoiceMaster", resp.data[0].Id);
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

  createInvoiceInvoiceDetailsBackup = async (
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

      console.log("createInvoiceInvoiceDetails", invoiceDetails);
      // Example 1
      const promises = invoiceDetails.map(async (obj) => {
        const result = await axiosInterface.put(Urls.CreateInvoiceDetails, obj);
        return result;
      });
      console.log("promises", promises);
      const res = await Promise.all(promises);
      console.log("res", res);
      const statusArrat = res.map((res) => res.status);
      console.log("statusArrat", statusArrat);
      console.log("statusArrat.includes(200)", statusArrat.includes(200));
      return statusArrat.includes(200);

      // console.log("data",data)
      // console.log(data.flat());
      // // TODO: Remember Get ReturnValue and verify is some transaction failed
      // return data[0].status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  createInvoicePaymentsBackup = async (
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

  createInvoice = async (
    invoiceMaster: InvoiceMaster
    // invoiceDetails: InvoiceDetails[],
    // invoicePayments: InvoicePayments
  ): Promise<boolean> => {
    try {
       this.createInvoiceMaster(invoiceMaster)
        .then((invoiceMasterResult) => {
          if (!(invoiceMasterResult === 0)) {
            return true;
          } else {
            return false;
          }
        })

      // const resp = await axiosInterface.put(
      //   Urls.CreateInvoiceMaster,
      //   invoiceMaster
      // );

      // if (resp.status === 200) {
      //   // Invoice Master Success Response
      //   const invoiceId = resp.data[0].Id;
      //   console.log("invoiceId", invoiceId);
      //   invoicePayments.InvoiceId = invoiceId;
      //   // Create Invoice Details

      //   this.createInvoiceInvoiceDetails(
      //     invoiceDetails.map((obj) => {
      //       return { ...obj, InvoiceId: invoiceId };
      //     })
      //   ).then((invoiceDetailsSuccessResponse) => {
      //     if (invoiceDetailsSuccessResponse === true) {
      //       return true;
      //       // this.createInvoicePayments(invoicePayments).then(
      //       //   (invoicePaymentSuccessResponse) => {
      //       //     if (invoicePaymentSuccessResponse === true) {
      //       //       return true;
      //       //     } else {
      //       //       // error Invoice Payment
      //       //       alert("Failed Invoice Payment");
      //       //       return false;
      //       //     }
      //       //   }
      //       // );

      //     } else {
      //       // error Invoice Payment
      //       alert("Failed Invoice Details");
      //       return false;
      //     }
      //   });
      // } else {
      //   // Invoice Master failed
      //   console.log("Create Invoice Master Failed");
      //   return false;
      // }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Added per example
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
      console.log(
        "Create Invoice Details: invoiceDetails Before Post ==>",
        invoiceDetails
      );
      // Example 1
      const promises = invoiceDetails.map(async (obj) => {
        const result = await axiosInterface.put(Urls.CreateInvoiceDetails, obj);
        return result;
      });
      const res = await Promise.all(promises);
      const statusArrat = res.map((res) => res.status);
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
