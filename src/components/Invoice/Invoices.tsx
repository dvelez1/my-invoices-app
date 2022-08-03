import React, { useState } from "react";
// Used for routing
import { useNavigate } from "react-router-dom";

// Import Spinner
import { Loading } from "../../components/shared/Loading";

// Custom hook with mhy models
import { useInvoicesGet } from "../../hooks/Invoice/useInvoicesGet";

// Models
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

// Import InvoiceUpSert
import { InvoiceUpsert } from "../Invoice/InvoiceUpsert";

// Data Context
import { useDataContext } from "../../context/DataContext";
import { InvoicesDetailsRows } from "./InvoicesDetailsRows";

export const Invoices = () => {
  // Import Data Context Properties
  const {
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
  } = useDataContext();
  // Load Invoices
  const { isLoading, invoiceMaster, invoiceDetails, invoicePayments } =
    useInvoicesGet();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#region "Methods"
  const navigate = useNavigate();
  const handleUpsertClick = (createOperation: boolean) => {
    if (createOperation) setInvoiceMasterModel(undefined);
    navigate("/invoiceUpsert");
  };

  // Redirect to Main Page
  function handleEditClick(invoiceId: Number) {
    //#region "Set DataContext Properties"
    setInvoiceMasterModel(
      invoiceMaster.filter((obj) => {
        return obj.InvoiceId === invoiceId;
      })[0]
    );
    setInvoiceDetailsArray(
      invoiceDetails.filter((obj) => {
        return obj.InvoiceId === invoiceId && obj.RemovedTransaction === false;
      })
    );
    setInvoicePaymentsArray(
      invoicePayments.filter((obj) => {
        return obj.InvoiceId === invoiceId && obj.RemovedTransaction === false;
      })
    );
    //#endregion
    if (invoiceId > 0) handleUpsertClick(false);
  }

  //#region "Filtering and Pagination"
  const filteredInvoce = (): InvoiceMaster[] => {
    if (search.length === 0)
      return invoiceMaster.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = invoiceMaster.filter((invMaster) =>
      invMaster.CustomerName.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      invoiceMaster.filter((invMaster) =>
        invMaster.CustomerName.includes(search)
      ).length >
      currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value.toLowerCase());
  };

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Invoices</h3>
        <div className="card-body">
          <h5 className="card-title">List of Invoices</h5>
          <hr />

          <input
            className="mb-2 form-control"
            type="text"
            placeholder="Invoice Search by Name"
            value={search}
            onChange={onSearchChange}
          />

          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => handleUpsertClick(true)}
          >
            Create New Invoice
          </button>

          {filteredInvoce().map(
            ({
              InvoiceId,
              CustomerId,
              CustomerName,
              FirstName,
              LastName,
              TransactionActive,
              TotalAmount,
              PayedAmount,
              Note,
              Void,
              StartDate,
              EndDate,
            }) => (
              <div key={InvoiceId} className="mt-2">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <label className="fw-bold">
                          Invoice Id: {InvoiceId}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Invoice Date:</span>{" "}
                          {new Date(StartDate).toDateString()}{" "}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">
                            Invoice Closed On:
                          </span>{" "}
                          {EndDate != null && new Date(EndDate).toDateString()}{" "}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button
                            className="btn btn-primary btn-sm me-md-2"
                            onClick={() => handleEditClick(InvoiceId)}
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
                          <span className="fw-bold">Name:</span> {CustomerName}{" "}
                          {FirstName} {LastName}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Total Amount:</span> {"$ "}
                          {TotalAmount ?? 0}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Payed Amount:</span> {"$ "}
                          {PayedAmount ?? 0}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">
                            Amount Difference:
                          </span>{" "}
                          {"$ "}
                          {(TotalAmount ?? 0) - (PayedAmount ?? 0)}
                        </label>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Comments:</span> {Note}{" "}
                        </label>
                      </div>
                    </div>

                    <hr />
                    {/* Invoice Details */}
                    <label className="fw-bold">Invoice Details</label>
                    <table className="table table-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Catalog Price</th>
                          <th>Transaction Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {invoiceDetails
                          .filter((obj) => obj.InvoiceId === InvoiceId)
                          .map(
                            ({
                              InvoiceDetailsId,
                              ProductName,
                              CatalogPrice,
                              Price,
                              Quantity,
                            }) => (
                              <InvoicesDetailsRows
                                ProductName={ProductName}
                                CatalogPrice={CatalogPrice}
                                Price={Price}
                                Quantity={Quantity}
                              />
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="text-center mt-2">
            <span className="me-md-2 cursor body">
              <i
                title="Previuos Page"
                className="bi bi-arrow-left-circle-fill"
                style={{ fontSize: 28 }}
                onClick={prevPage}
              ></i>
            </span>
            <span className="me-md-2 cursor body">
              <i
                title="Next Page"
                className="bi bi-arrow-right-circle-fill"
                style={{ fontSize: 28 }}
                onClick={nextPage}
              ></i>
            </span>
          </div>
          <div className="row">{isLoading && <Loading />}</div>
        </div>
      </div>
    </>
  );
};
