//#region "Imports"
import React, { useEffect, useState } from "react";
// Used for routing
import { useNavigate } from "react-router-dom";

// Custom hook with mhy models
import { useInvoicesGet } from "../../hooks/Invoice/useInvoicesGet";

// Interfaces
import { InvoiceMaster } from "../../interfaces/InvoiceMaster";

// Data Context
import { useDataContext } from "../../context/DataContext";

// Components
import { Loading } from "../../components/shared/Loading";
import { InvoicesDetails } from "./InvoicesDetails";
import { InvoiceBody } from "./InvoiceBody";
import { PaginationComponent } from "../shared/PaginationComponent";

export const Invoices = () => {
  // Import Data Context Properties
  const {
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
    successToast,
    setSuccessToast,
  } = useDataContext();

  // Load Invoices (Custom Hook)
  const { isLoading, invoiceMaster, invoiceDetails, invoicePayments } =
    useInvoicesGet();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#endregion

  //#region "Methods"
  const navigate = useNavigate();
  const handleUpsertClick = (createOperation: boolean) => {
    if (createOperation)
      setInvoiceMasterModel({
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
      });
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
  const filteredDataSource = (): InvoiceMaster[] => {
    if (search.length === 0)
      return invoiceMaster.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = invoiceMaster.filter((invMaster) =>
      invMaster.CustomerName.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
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

          {filteredDataSource().map(
            ({
              InvoiceId,
              CustomerName,
              FirstName,
              LastName,
              TotalAmount,
              PayedAmount,
              Note,
              StartDate,
              EndDate,
            }) => (
              <div key={InvoiceId} className="mt-2">
                <div className="card">
                  <h5 className="card-header">Invoice: {InvoiceId}</h5>
                  <div className="card-body">
                    <InvoiceBody
                      InvoiceId={InvoiceId}
                      CustomerName={CustomerName}
                      FirstName={FirstName}
                      LastName={LastName}
                      TotalAmount={TotalAmount}
                      PayedAmount={PayedAmount}
                      Note={Note}
                      StartDate={StartDate}
                      EndDate={EndDate}
                      handleEditClick={handleEditClick}
                    />
                    <hr />

                    <InvoicesDetails
                      invoiceDetails={invoiceDetails}
                      InvoiceId={InvoiceId}
                    />
                  </div>
                </div>
              </div>
            )
          )}

          <PaginationComponent
            currentPage={currentPage}
            search={search}
            dataSource={invoiceMaster}
            filterValueName="CustomerName"
            setCurrentPage={setCurrentPage}
          />

          <div className="row">{isLoading && <Loading />}</div>
        </div>
      </div>
    </>
  );
};
