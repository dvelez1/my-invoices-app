//#region Imports

// Master Files
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";
import { useProductsGet } from "../../hooks/Products/useProductsGet";

// Data Context
import { useDataContext } from "../../context/DataContext";
import { InvoiceUpsertSave } from "./InvoiceUpsertSave";

// Helpers
import { InvoiceUpserMaster } from "./InvoiceUpserMaster";
import { InvoiceUpsertDetailsAddToList } from "./InvoiceUpsertDetailsAddToList";
import { InvoiceUpsertDetails } from "./InvoiceUpsertDetails";

// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import {
  errorToastTransaction,
  successToastTransaction,
} from "../../helper/toastMessages";
import { useEffect } from "react";
import { genericMessages } from "../../helper/genericMessages";

//#endregion

export const InvoiceUpsert = () => {
  const invoiceModelInitialization = {
    InvoiceId: 0,
    CustomerId: 0,
    CustomerName: "",
    FirstName: "",
    LastName: "",
    TransactionActive: true,
    TotalAmount: 0,
    PayedAmount: 0,
    Note: "",
    Void: false,
    StartDate: new Date(),
    EndDate: null,
  };

  // Import Data Context Properties
  const { setInvoiceMasterModel, invoiceMasterModel } = useDataContext();

  // If no data found, initialize with default value
  useEffect(() => {
    if (!invoiceMasterModel) {
      setInvoiceMasterModel(invoiceModelInitialization);
    }
  }, []);

  // For Select
  const { customers } = useCustomersGet();
  const { products } = useProductsGet();

  //#region "Methods"

  // Evaluate if it's a Create or Edit Event
  const isCreateInvoiceEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Evaluate Post Response to Trigger the Toast
  const handlePostOperationResult = (successResult: boolean) => {
    if (successResult) successToastTransaction(genericMessages.success);
    else errorToastTransaction(genericMessages.error);
  };

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">
          {isCreateInvoiceEvent() ? "Create" : "Edit"} Invoice
        </h3>
        <div className="card-body">
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
                <InvoiceUpsertSave
                  handlePostOperationResult={handlePostOperationResult}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
