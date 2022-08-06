import React from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";

export const InvoiceUpsertSave = () => {
  const {
    invoiceMasterModel,
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
  } = useDataContext();

  const navigate = useNavigate();
  const handleUpsertReturnClick = () => {
    setInvoiceMasterModel(null!);
    setInvoiceDetailsArray([]);
    setInvoicePaymentsArray(undefined);
    navigate("/invoice");
  };

  const handleVoidClick  = () => {};

  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
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
        <button className="btn btn-danger btn-md " onClick={handleVoidClick}>Void</button>
      )}
    </div>
  );
};
