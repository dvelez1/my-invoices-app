import React, { useEffect, useState } from "react";
import {
  dateFormatter,
  setDateValue,
  currentDate,
} from "../../helper/dateFormatter";

import { useDataContext } from "../../context/DataContext";

export const InvoiceUpserMaster = (props: any) => {
  const { invoiceMasterModel, setInvoiceMasterModel } = useDataContext();

  const handleChange = (e: any) => {
    setInvoiceMasterModel({
      ...invoiceMasterModel,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleCustomerChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="card" style={{ width: "100" }}>
        <div className="card-body">
          <h5 className="card-title">Master</h5>

          <hr />
          <div className="row">
            <div className="col-md-3">
              <label className="form-label fw-bold">Invoice Id</label>
              <input
                type="text"
                className="form-control"
                name="InvoiceId"
                placeholder="Invoice Id"
                defaultValue={invoiceMasterModel?.InvoiceId}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Invoice Date</label>
              <input
                type="date"
                className="form-control"
                name="StartDate"
                placeholder="Invoice Date"
                onChange={handleChange}
                defaultValue={setDateValue(invoiceMasterModel?.StartDate)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Invoice Closed On:</label>
              <input
                type="date"
                className="form-control"
                name="EndDate"
                placeholder="Invoice Closed On"
                onChange={handleChange}
                defaultValue={setDateValue(invoiceMasterModel?.EndDate)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-3">
              <label className="form-label fw-bold">Customer Name:</label>
              <select
                className="form-control"
                aria-label="Floating label select example"
                name="CustomerId"
                onChange={handleChange}
                defaultValue={invoiceMasterModel?.CustomerId || ""}
              >
                <option value="" disabled>
                  {" "}
                  -- Select a Customer --{" "}
                </option>
                {props.customers.map((cust: any) => (
                  <option key={cust.CustomerId} value={cust.CustomerId}>
                    {cust.Name} {cust.FirstName} {cust.LastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Total Amount:</label>
              <input
                type="number"
                className="form-control"
                name="TotalAmount"
                placeholder="Total Amount"
                onChange={handleChange}
                defaultValue={invoiceMasterModel?.TotalAmount}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Payed Amount:</label>
              <input
                type="number"
                className="form-control"
                name="PayedAmount"
                placeholder="Payed Amount"
                onChange={handleChange}
                defaultValue={invoiceMasterModel?.PayedAmount}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Amount Difference:</label>
              <input
                type="number"
                className="form-control"
                name="difference"
                placeholder="Amount Difference"
                defaultValue={
                  (invoiceMasterModel?.TotalAmount ?? 0) -
                  (invoiceMasterModel?.PayedAmount ?? 0)
                }
                value={
                  (invoiceMasterModel?.TotalAmount ?? 0) -
                  (invoiceMasterModel?.PayedAmount ?? 0)
                }
                readOnly
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12">
              <label>
                {" "}
                <span className="fw-bold">Comments:</span>{" "}
                <textarea
                  className="form-control"
                  name="Note"
                  placeholder="Comments"
                  rows={3}
                  cols={400}
                  onChange={handleChange}
                  defaultValue={invoiceMasterModel?.Note}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
