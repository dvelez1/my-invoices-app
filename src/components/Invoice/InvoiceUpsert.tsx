import React, { useState } from "react";
// Used for routing
import { useNavigate } from "react-router-dom";

// Import Spinner
import { Loading } from "../shared/Loading";

// Custom hook with mhy models
import { useInvoicesGet } from "../../hooks/Invoice/useInvoicesGet";

// Models
import { InvoiceMaster } from "../../models/InvoiceMaster";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { InvoicePayments } from "../../models/InvoicePayments";

// Data Context
import { useDataContext } from "../../context/DataContext";

export const InvoiceUpsert = () => {
  // Import Data Context Properties
  const { invoiceMasterModel, setInvoiceMasterModel } = useDataContext();
  console.log("Modelo Upsert Invoice",invoiceMasterModel)
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/invoice");
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    // setIsLoading(true);

    // // Prepare formData for Post/Put
    // const formData: Customer = {
    //   CustomerId: customerModel == undefined ? 0 : customerModel.CustomerId,
    //   Name: String(Name.current?.value),
    //   MiddleName: String(MiddleName.current?.value),
    //   FirstName: String(FirstName.current?.value),
    //   LastName: String(LastName.current?.value),
    //   Address1: String(Address1.current?.value),
    //   Address2: String(Address2.current?.value),
    //   City: String(City.current?.value),
    //   State: String(State.current?.value),
    //   ZipCode: String(ZipCode.current?.value),
    //   StartDate: new Date(),
    //   EndDate: null,
    // };

    // //Insert / Update Operation
    // if (formData.CustomerId === 0) {
    //   //PUT (Create)
    //   saveEventResultMessageHandler(Boolean(createCustomer(formData)));
    // } else if (formData.CustomerId > 0) {
    //   // Post (Update)
    //   saveEventResultMessageHandler(Boolean(updateCustomer(formData)));
    // }

    // setIsLoading(false);

  };

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Invoice</h3>
        <div className="card-body">
          <h5 className="card-title">Create / Edit Invoice</h5>
          <hr />

          <div className="mt-2">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <label className="fw-bold">
                      Invoice Id: {invoiceMasterModel?.InvoiceId}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Invoice Date:</span>{" "}
                      {/* {new Date(invoiceMasterModel?.StartDate).toDateString()}{" "} */}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Invoice Closed On:</span>{" "}
                      {/* {invoiceMasterModel.EndDate != null &&
                        new Date(
                          invoiceMasterModel.EndDate
                        ).toDateString()}{" "} */}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-primary btn-sm me-md-2">
                        Payment
                      </button>
                      <button className="btn btn-primary btn-sm">
                        Void Invoice
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Name:</span>{" "}
                      {/* {invoiceMasterModel.CustomerName}{" "}
                      {invoiceMasterModel.FirstName}{" "}
                      {invoiceMasterModel.LastName} */}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Total Amount:</span> {"$ "}
                      {/* {invoiceMasterModel.TotalAmount ?? 0} */}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Payed Amount:</span> {"$ "}
                      {/* {invoiceMasterModel.PayedAmount ?? 0} */}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Amount Diference:</span> {"$ "}
                      {/* {(invoiceMasterModel.TotalAmount ?? 0) -
                        (invoiceMasterModel.PayedAmount ?? 0)} */}
                    </label>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-3">
                    <label>
                      {" "}
                      <span className="fw-bold">Comments:</span>{" "}
                      {/* {invoiceMasterModel.Note}{" "} */}
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
                    {/* {invoiceDetails
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
                            <td>
                              {"$ "} {CatalogPrice ?? 0}
                            </td>
                            <td>
                              {"$ "} {Price ?? 0}
                            </td>
                            <td>{Quantity ?? 0}</td>
                            <td>
                              {"$ "}
                              {(Quantity ?? 0) * (Price ?? 0)}
                            </td>
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
                      )} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
