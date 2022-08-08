//#region Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import {
  dateFormatter,
  setDateValue,
  currentDate,
} from "../../helper/dateFormatter";

import InvoiceDataService from "../../api/Invoice/upsertEvents";

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

  const [successResult, setSuccessResult] = useState<boolean>(false);

  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    if (isCreateEvent()) {
      handleCreateEvent();
    } else handleEditEvent();

    if (successResult) alert("success");
    else alert("failed");

    /* 
    1 If Payed Amount >= Total Amount and Invoice Closed On ==> null. 
    PROCEED TO Add CurrentDate to Invoice Closed On

    2 - Create
      1 - Submit Special Method Create Event. Note: If Fail, remove all transaction
      with the InvoiceId
      
    3 - Edit
      1 - Only we will Update Invoice Master and Invoice Payment
    */
  };

  const handleVoidClick = () => {
    InvoiceDataService.deleteInvoiceMaster(
      invoiceMasterModel,
      invoiceMasterModel.InvoiceId
    ).then((value) => {
      console.log("Edit Result", value);

      if (value) alert("success");
      else alert("failed");
    });
  };

  const handleCreateEvent = (): boolean => {
    const promiseResult = InvoiceDataService.createInvoice(
      invoiceMasterModel,
      invoiceDetailsArray,
      invoicePaymentsArray[0]
    );

    promiseResult.then((value) => {
      console.log("Create Result", value);
      return value;
    });

    return false;
  };

  const handleEditEvent = (): boolean => {
    InvoiceDataService.updateInvoiceMaster(invoiceMasterModel).then((value) => {
      return value;
    });
    return false;
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
