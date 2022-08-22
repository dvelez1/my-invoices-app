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
import { errorToastTransaction } from "../../helper/toastMessages";
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";
import { ErrorsBasedOnValidation } from "../shared/ErrorsBasedOnValidation";
import { useState } from "react";

//#endregion

export const InvoiceUpsert = () => {
  // Import Data Context Properties
  const { invoiceMasterModel, setSuccessToast } = useDataContext();
  const [errorsList, setErrorsList] = useState(["a","b","c"]);
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
    if (successResult) {
      setSuccessToast(true);
    } else {
      errorToastTransaction(
        "Transaction Failed! Please, contact your IT Team."
      );
      setSuccessToast(false);
    }
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
                <ErrorsBasedOnValidation errorsList={errorsList} />
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
                  setErrorsList={setErrorsList}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainerImplementation />
      </div>
    </>
  );
};
