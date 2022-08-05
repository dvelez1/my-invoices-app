//#region Methods and Imports
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
  const handleUpsertReturnClick = () => {
    setInvoiceMasterModel(undefined);
    setInvoiceDetailsArray([]);
    setInvoicePaymentsArray(undefined);
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

                <div className="card mt-2" style={{ width: "100" }}>
                  <div className="card-body">
                    <h5 className="card-title">Details</h5>
                    <hr />
                    
                      {!invoiceMasterModel && (
                        <InvoiceUpsertDetailsAddToList
                          setProductPrice={setProductPrice}
                          products={products}
                          productPrice={productPrice}
                        />
                      )}
                   

                    <InvoiceUpsertDetails
                      handleProductChange={handleProductChange}
                      products={products}
                    />
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
