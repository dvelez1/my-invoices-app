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

// Master Files
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";
import { useProductsGet } from "../../hooks/Products/useProductsGet";

// Data Context
import { useDataContext } from "../../context/DataContext";
import { Product } from "../../models/product";

// Helpers
import {
  dateFormatter,
  setDateValue,
  currentDate,
} from "../../helper/dateFormatter";
import { InvoiceUpserMaster } from "./InvoiceUpserMaster";
import { InvoiceUpsertDetailsAddToList } from "./InvoiceUpsertDetailsAddToList";

export const InvoiceUpsert = () => {
  // Import Data Context Properties
  const {
    invoiceMasterModel,
    setInvoiceMasterModel,
    invoiceDetailsArray,
    setInvoiceDetailsArray,
    invoicePaymentsArray,
    setInvoicePaymentsArray,
  } = useDataContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  // For Select
  const { customers } = useCustomersGet();
  const { products } = useProductsGet();
  const [customer, setCustomer] = useState("Select a Customer");
  const [product, setProduct] = useState("Select a Product");
  const [productPrice, setProductPrice] = useState<number | null>(null);

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/invoice");
  };

  const handleCustomerChange = (e: any) => {
    setCustomer(e.target.value);
  };

  const handleProductChange = (e: any) => {
    setProduct(e.target.value);
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {};

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  // Submit Event
  const handleAddInvoiceDetailsSubmit = (event: any) => {
    event.preventDefault();
    // console.log(event.target.elements.name.value); // from elements property
    // console.log(event.target.name.value); // or directly

    const formData: InvoiceDetails = {
      InvoiceDetailsId: 0,
      InvoiceId: invoiceMasterModel?.InvoiceId ?? 0,
      ProductId: Number(event.target.productId.value),
      ProductName: products.filter((obj) => {
        return obj.ProductId == Number(event.target.productId.value);
      })[0].Name,
      CatalogPrice: Number(event.target.catalogPrice.value),
      Price: Number(event.target.price.value),
      RemovedTransaction: false,
      RemovedDate: null,
      Quantity: Number(event.target.quantity.value),
    };

    setInvoiceDetailsArray((current) => [...current, formData]);
  };

  return (
    <>
      <div className="card">
        <h3 className="card-header">Invoice</h3>
        <div className="card-body">
          <h5 className="card-title">
            {invoiceMasterModel === undefined ? "Create" : "Edit"} Invoice
          </h5>
          <hr />

          <div className="mt-2">
            <div className="card">
              <div className="card-body">
                <InvoiceUpserMaster
                  invoiceMasterModel={invoiceMasterModel}
                  customers={customers}
                />

                {/* Add to DETAILS */}
                <div className="card mt-2" style={{ width: "100" }}>
                  <div className="card-body">
                    <h5 className="card-title">Details</h5>
                    <div className="card mt-2" style={{ width: "100" }}>
                      <div className="card-body">
                        <label className="fw-bold mb-2">
                          Add detail to the Invoice:
                        </label>
                        <form onSubmit={handleAddInvoiceDetailsSubmit}>
                          <InvoiceUpsertDetailsAddToList
                            setProductPrice={setProductPrice}
                            products={products}
                            productPrice={productPrice}
                          />
                        </form>
                      </div>
                    </div>
                    {/* Detais */}
                    <hr />
                    <table className="table table-sm mt-2">
                      <thead className="thead-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Catalog Price</th>
                          <th>Transaction Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      {invoiceDetailsArray?.map(
                        ({
                          InvoiceDetailsId,
                          InvoiceId,
                          ProductId,
                          ProductName,
                          CatalogPrice,
                          Price,
                          Quantity,
                        }) => (
                          <tr key={InvoiceDetailsId}>
                            <td>
                              <select
                                className="form-control"
                                aria-label="Floating label select example"
                                onChange={handleProductChange}
                              >
                                <option value="Select a Product">
                                  {" "}
                                  -- Select a Product --{" "}
                                </option>
                                {products.map((prod) => (
                                  <option
                                    value={prod.ProductId}
                                    selected={
                                      prod.ProductId === ProductId
                                        ? true
                                        : false
                                    }
                                  >
                                    ({prod.ProductId}) - {prod.Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id="masterPrice"
                                name="masterPrice"
                                placeholder="Catalog Price"
                                defaultValue={CatalogPrice}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                placeholder="Price"
                                defaultValue={Price}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                placeholder="Quantity"
                                defaultValue={Quantity}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id="total"
                                name="total"
                                placeholder="Total"
                                defaultValue={(Price ?? 0) * (Quantity ?? 0)}
                                readOnly
                              />
                            </td>
                            <td>
                              <span className="me-md-2 ">
                                <i
                                  title="Edit Customer"
                                  className="bi bi-pencil-square cursor"
                                  style={{ fontSize: 25 }}
                                ></i>
                              </span>
                              <span>
                                <i
                                  title="Delete Customer"
                                  className="bi bi-trash cursor"
                                  style={{ fontSize: 25 }}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        )
                      )}

                      <tbody></tbody>
                    </table>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                  <button
                    className="btn btn-primary btn-md me-md-2"
                    onClick={handleUpsertClick}
                  >
                    Return
                  </button>
                  <button className="btn btn-primary btn-md me-md-2">
                    Void
                  </button>
                  <button className="btn btn-primary btn-md">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
