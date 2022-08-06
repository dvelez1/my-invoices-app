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

  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {};

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
        <button className="btn btn-danger btn-md ">Void</button>
      )}
    </div>
  );
};
