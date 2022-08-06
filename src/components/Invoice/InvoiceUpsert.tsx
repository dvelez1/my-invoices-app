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

//#endregion

export const InvoiceUpsert = () => {
  // Import Data Context Properties
  const { invoiceMasterModel } = useDataContext();

  // For Select
  const { customers } = useCustomersGet();
  const { products } = useProductsGet();

  //#region "Methods"

  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Invoice</h3>
        <div className="card-body">
          <h5 className="card-title">
            {isCreateEvent() ? "Create" : "Edit"} Invoice
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
                <InvoiceUpsertSave />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
