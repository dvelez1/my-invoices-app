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

// Data Context
import { useDataContext } from "../../context/DataContext";

export const Invoices = () => {
  const { isLoading, invoiceMaster, invoiceDetails, invoicePayments } =
    useInvoicesGet();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/invoiceUpsert");
  };

  // Redirect to Main Page
  function handleEditClick(invoiceId: Number) {
    // setCustomerModel(
    //   customers.filter((obj) => {
    //     return obj.CustomerId === customerId;
    //   })[0]
    // );
    if (invoiceId > 0) handleUpsertClick();
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
        <h3 className="card-header">Invoice</h3>
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
            onClick={handleUpsertClick}
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
                          <span className="fw-bold">Invoice Closed On:</span>{" "}
                          {EndDate != null && new Date(EndDate).toDateString()}{" "}
                        </label>
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
                          <span className="fw-bold">Total Amount:</span>{" "}
                          {TotalAmount}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Payed Amount:</span>{" "}
                          {PayedAmount}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">
                            Amount Diference:
                          </span>{" "}
                          {TotalAmount - PayedAmount}
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label>
                          {" "}
                          <span className="fw-bold">Comments:</span> {Note}{" "}
                        </label>
                      </div>
                    </div>

                    <hr />
                    <label className="fw-bold">Invoice Details</label>
                    <table className="table table-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Catalog Price</th>
                          <th>Price</th>
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
                              <tr key={InvoiceDetailsId}>
                                <td>{ProductName}</td>
                                <td>{CatalogPrice}</td>
                                <td>{Price}</td>
                                <td>{Quantity}</td>
                                <td>{Quantity * Price}</td>
                                <td>
                                  <span className="me-md-2 ">
                                    <i
                                      title="Edit Invoice Details"
                                      className="bi bi-pencil-square cursor"
                                      style={{ fontSize: 18 }}
                                    ></i>
                                  </span>
                                  <span>
                                    <i
                                      title="Delete Invoice Details"
                                      className="bi bi-trash cursor"
                                      style={{ fontSize: 18 }}
                                    ></i>
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
            <button className="btn btn-primary me-md-2" onClick={prevPage}>
              Previous
            </button>
            <button className="btn btn-primary" onClick={nextPage}>
              Next
            </button>
          </div>
          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};
