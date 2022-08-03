import React from "react";
import {
    dateFormatter,
    setDateValue,
    currentDate,
  } from "../../helper/dateFormatter";

export const InvoiceUpserMaster = (props:any) => {
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
                id="invoiceId"
                name="invoiceId"
                placeholder="Invoice Id"
                defaultValue={props.invoiceMasterModel?.InvoiceId}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Invoice Date</label>
              <input
                type="date"
                className="form-control"
                id="invoiceDate"
                name="invoiceDate"
                placeholder="Invoice Date"
                defaultValue={setDateValue(props.invoiceMasterModel?.StartDate)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Invoice Closed On:</label>
              <input
                type="date"
                className="form-control"
                id="invoiceEndDate"
                name="invoiceEndDate"
                placeholder="Invoice Closed On"
                defaultValue={setDateValue(props.invoiceMasterModel?.EndDate)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-3">
              <label className="form-label fw-bold">Customer Name:</label>
              {/* {customer} */}
              <select
                className="form-control"
                aria-label="Floating label select example"
                onChange={props.handleCustomerChange}
              >
                <option value="Select a Customer">
                  {" "}
                  -- Select a Customer --{" "}
                </option>
                {props.customers.map((cust:any) => (
                  <option
                    key={cust.CustomerId}
                    value={cust.CustomerId}
                    selected={
                        props.invoiceMasterModel?.CustomerId === cust.CustomerId
                        ? true
                        : false
                    }
                  >
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
                id="totalAmount"
                name="totalAmount"
                placeholder="Total Amount"
                defaultValue={props.invoiceMasterModel?.TotalAmount}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Payed Amount:</label>
              <input
                type="number"
                className="form-control"
                id="payedAmount"
                name="payedAmount"
                placeholder="Payed Amount"
                defaultValue={props.invoiceMasterModel?.PayedAmount}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Amount Difference:</label>
              <input
                type="number"
                className="form-control"
                id="difference"
                name="difference"
                placeholder="Amount Difference"
                defaultValue={
                  (props.invoiceMasterModel?.TotalAmount ?? 0) -
                  (props.invoiceMasterModel?.PayedAmount ?? 0)
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
                  id="notes"
                  name="notes"
                  placeholder="Comments"
                  rows={3}
                  cols={400}
                  defaultValue={props.invoiceMasterModel?.Note}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
