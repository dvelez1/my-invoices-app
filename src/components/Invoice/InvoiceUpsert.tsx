//#region Imports

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
import { InvoiceUpsertDetails } from "./InvoiceUpsertDetails";

//#endregion

export const InvoiceUpsert = () => {
  // Import Data Context Properties
  const {
    invoiceMasterModel,
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
  } = useDataContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  // For Select
  const { customers } = useCustomersGet();
  const { products } = useProductsGet();

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertReturnClick = () => {
    setInvoiceMasterModel(null!);
    setInvoiceDetailsArray([]);
    setInvoicePaymentsArray(undefined);
    navigate("/invoice");
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {};

  //#endregion "Methods"

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
                <InvoiceUpserMaster customers={customers} />

                <div className="card mt-2" style={{ width: "100" }}>
                  <div className="card-body">
                    <h5 className="card-title">Details</h5>
                    <hr />

                    {invoiceMasterModel?.InvoiceId === 0 && (
                      <InvoiceUpsertDetailsAddToList products={products} />
                    )}

                    <InvoiceUpsertDetails products={products} />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                  <button
                    className="btn btn-primary btn-md me-md-2"
                    onClick={handleUpsertReturnClick}
                  >
                    Return
                  </button>
                  <button className="btn btn-primary btn-md me-md-2">
                    Void
                  </button>
                  <button
                    className="btn btn-primary btn-md"
                    type="submit"
                    onClick={handleSaveClick}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
