//#region Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import {
  dateFormatter,
  setDateValue,
  currentDate,
} from "../../helper/dateFormatter";

import InvoiceDataService from "../../api/Invoice/upsertEvents";
import { InvoicePayments } from "../../models/InvoicePayments";

//#endregion Imports
export const InvoiceUpsertSave = () => {
  const {
    invoiceMasterModel,
    invoiceDetailsArray,
    invoicePaymentsArray,
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
  } = useDataContext();

  const navigate = useNavigate();
  const handleUpsertReturnClick = () => {
    setInvoiceMasterModel(null!);
    setInvoiceDetailsArray([]);
    setInvoicePaymentsArray(null!);
    navigate("/invoice");
  };

  const invPaymentInitialInitialization = {
    InvoiceId: invoiceMasterModel.InvoiceId,
    InvoicePaiymentsId: 0,
    RemovedTransaction: false,
    RemovedTransactionDate: null,
    TransactionDate: currentDate(),
    Payment: 0,
  } as InvoicePayments;
  const [invoicePayment, setInvoicePayment] = useState<InvoicePayments>(
    invPaymentInitialInitialization
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      if (isCreateEvent()) handleCreateEvent();
      else handleEditEvent();
      setSubmitted(false);
    }
  }, [invoicePayment]);

  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setSubmitted(true);
    setInvoicePayment({
      ...invoicePayment,
      Payment: Number(invoiceMasterModel?.PayedAmount),
      RemovedTransaction: invoiceMasterModel?.EndDate ? true : false,
    });

    // Note: We are submitting the transaction with use effect. The following condition need to be completed: Change of invoicePayment and submitted equal to true
  };

  const handleVoidClick = () => {
    InvoiceDataService.deleteInvoiceMaster(
      invoiceMasterModel,
      invoiceMasterModel.InvoiceId
    ).then((successTransaction) => {
      if (successTransaction === true) alert("success");
      else alert("failed");
    });
  };

  const handleCreateEvent = () => {
    InvoiceDataService.createInvoice(
      invoiceMasterModel,
      // invoiceDetailsArray,
      // invoicePayment
    ).then((successResult) => {
      if (successResult === false) {
        // Delete all part of the Invoice by InvoiceId
        InvoiceDataService.deleteInvoiceAllByInvoiceId(
          invoiceMasterModel?.InvoiceId
        );
        alert("Failed ");
      } else {alert("Success"); handleUpsertReturnClick()};
    });
  };

  const handleEditEvent = () => {
    InvoiceDataService.updateInvoiceMaster(invoiceMasterModel).then(
      (successTransaction) => {
        if (successTransaction === true) {
          // Create transaction on InvoicePayments Table
          InvoiceDataService.createInvoicePayments(invoicePayment).then(
            (paymentTransactionSuccessResponse) => {
              if (paymentTransactionSuccessResponse === true) {
                alert("Success ");
              } else {
                // error Invoice Payment
                alert("Failed Invoice Payment");
              }
            }
          );
        } else {
          //error Invoice Master}
          alert("Failed Invoice Master");
        }
      }
    );
  };

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
      <button
        className="btn btn-primary btn-md me-md-2"
        onClick={handleUpsertReturnClick}
      >
        Return
      </button>

      <button
        className="btn btn-primary btn-md me-md-2"
        type="submit"
        onClick={handleSaveClick}
      >
        Submit
      </button>
      {!isCreateEvent() && (
        <button className="btn btn-danger btn-md " onClick={handleVoidClick}>
          Void
        </button>
      )}
    </div>
  );
};
