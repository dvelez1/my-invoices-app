import React from "react";
import {dateFormatter} from "../../helper/dateFormatter"

export const InvoiceBody = (props:any) => {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <label className="fw-bold">Invoice Id: {props.InvoiceId}</label>
        </div>
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Invoice Date:</span>{" "}
            {dateFormatter(props.StartDate)}{" "}
          </label>
        </div>
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Invoice Closed On:</span>{" "}
            {props.EndDate != null && dateFormatter(props.EndDate)}{" "}
          </label>
        </div>
        <div className="col-md-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-sm me-md-2"
              onClick={() => props.handleEditClick(props.InvoiceId)}
            >
              Edit Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Name:</span> {props.CustomerName} {props.FirstName}{" "}
            {props.LastName}
          </label>
        </div>
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Total Amount:</span> {"$ "}
            {props.TotalAmount ?? 0}
          </label>
        </div>
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Payed Amount:</span> {"$ "}
            {props.PayedAmount ?? 0}
          </label>
        </div>
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Amount Difference:</span> {"$ "}
            {(props.TotalAmount ?? 0) - (props.PayedAmount ?? 0)}
          </label>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-3">
          <label>
            {" "}
            <span className="fw-bold">Comments:</span> {props.Note}{" "}
          </label>
        </div>
      </div>
    </>
  );
};
