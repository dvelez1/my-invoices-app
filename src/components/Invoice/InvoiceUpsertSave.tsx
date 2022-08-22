//#region Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import { currentDate } from "../../helper/dateFormatter";

import InvoiceDataService from "../../api/Invoice/upsertEvents";
import { InvoicePayments } from "../../interfaces/InvoicePayments";

import { invoiceMasterValidation } from "../../hooks/Invoice/invoiceMasterValidation";
import { invoiceDetailsValidationSuccess } from "../../hooks/Invoice/InvoiceDetailsArrayValidation";
import { invoiceVoidValidation } from "../../hooks/Invoice/invoiceVoidValidation";
import { infoToastTransaction } from "../../helper/toastMessages";


//#endregion Imports

export const InvoiceUpsertSave = ({
  handlePostOperationResult,
}: any) => {
  // DataContext
  const {
    invoiceMasterModel,
    invoiceDetailsArray,
    setInvoiceMasterModel,
    setInvoiceDetailsArray,
    setInvoicePaymentsArray,
  } = useDataContext();

  // Redirect to another Page / Reset the Contect during redirection
  const navigate = useNavigate();
  const handleUpsertReturnClick = () => {
    setInvoiceMasterModel(null!);
    setInvoiceDetailsArray([]);
    setInvoicePaymentsArray(null!);
    navigate("/invoice");
  };

  const [formErrors, setFormErrors] = useState<any>({});
  const [formErrorsInvoiceDetails, setFormErrorsInvoiceDetails] = useState<any>(
    []
  );

  const invPaymentInitialInitialization = {
    InvoiceId: invoiceMasterModel.InvoiceId,
    InvoicePaiymentsId: 0,
    RemovedTransaction: false,
    RemovedTransactionDate: null,
    TransactionDate: currentDate(),
    Payment: 0,
  } as InvoicePayments;

  const [invoicePayment, setInvoicePayment] = useState<InvoicePayments>(
    invPaymentInitialInitialization
  );

  const [submitted, setSubmitted] = useState(false);
  const [submittedVoidOperation, setSubmittedVoidOperation] = useState(false);

  // When Model be updated, Run The Validation
  useEffect(() => {
    setFormErrorsInvoiceDetails(
      invoiceDetailsValidationSuccess(invoiceDetailsArray)
    );
    setFormErrors(invoiceMasterValidation(invoiceMasterModel));

    // Validate invoiceDetailsArray
  }, [invoicePayment]);

  // Trigger Submit After Validation (Only if submitted equal to true)
  useEffect(() => {
    if (submitted) {
      if (
        Object.keys(formErrors).length === 0 &&
        formErrorsInvoiceDetails.length === 0 &&
        submitted
      ) {
        setSubmitted(false);

        if (isCreateEvent()) handleCreateEvent();
        else handleEditEvent();
      } else {
        infoToastTransaction(
          "Please, provide all requested information!" +
            " Maybe some data did not meet the requirements or is missing."
        );
      }
    }

    // After Run the validation, set IsSubmit to False
    if (submitted) {
      setSubmitted(false);
    }
  }, [formErrors]);

  // Return true on Create New Invoice
  const isCreateEvent = (): boolean => {
    return (
      invoiceMasterModel === undefined || invoiceMasterModel?.InvoiceId === 0
    );
  };

  // Insert/Edit Click Event
  const handleSaveClick = () => {
    // Indicate that we can proceed with the save event in the useEffect method that will be triggered when invoicePayment change
    setSubmitted(true);

    // Automatic close the transaction when TotalAmount <= PayedAmount (Only the logic will be evaluated if invoiceMasterModel.EndDate is null )
    // Also, if EndDate provided, the transaction will be closed.
    setInvoiceMasterModel({
      ...invoiceMasterModel,
      EndDate:
        invoiceMasterModel.EndDate ??
        invoiceMasterModel?.TotalAmount <= invoiceMasterModel?.PayedAmount
          ? currentDate()
          : null,
      TransactionActive: invoiceMasterModel.EndDate
        ? false
        : invoiceMasterModel?.TotalAmount <= invoiceMasterModel?.PayedAmount
        ? false
        : true,
    });

    setInvoicePayment({
      ...invoicePayment,
      Payment: Number(invoiceMasterModel?.PayedAmount),
      RemovedTransaction: invoiceMasterModel?.EndDate ? true : false,
    });

    // Note: We are submitting the transaction with use effect. The following condition need to be completed: Change of invoicePayment and submitted equal to true
  };

  // Void Invoice Click Event
  const handleVoidClick = () => {
    setSubmittedVoidOperation(true);


  };


  const handleVoidOperation = () =>{
    InvoiceDataService.deleteInvoiceMaster(
      invoiceMasterModel,
      invoiceMasterModel.InvoiceId
    ).then((successTransaction) => {
      if (successTransaction === true) {
        handlePostOperationResult(true);
        handleUpsertReturnClick();
      } else {
        handlePostOperationResult(false);
      }
    });
  }

  // Create Invoice
  const handleCreateEvent = () => {
    // Create: Invoice Master
    InvoiceDataService.createInvoiceMaster(invoiceMasterModel).then(
      (invoiceId) => {
        setInvoicePayment({
          ...invoicePayment,
          InvoiceId: Number(invoiceId),
        });

        if (!(invoiceId === 0)) {
          // Create: Invoice Details
          // We are sending invoiceDetailsArray as parameter with their corresponding InvoiceId
          InvoiceDataService.createInvoiceInvoiceDetails(
            invoiceDetailsArray.map((obj) => {
              return { ...obj, InvoiceId: invoiceId };
            })
          ).then((successResponseInvoiceDetails) => {
            if (successResponseInvoiceDetails === true) {
              // Create: Invoice Payment
              InvoiceDataService.createInvoicePayments({
                ...invoicePayment,
                InvoiceId: invoiceId,
              }).then((successResponseInvoicePayment) => {
                if (successResponseInvoicePayment === true) {
                  handlePostOperationResult(true);
                  handleUpsertReturnClick();
                } else {
                  handlePostOperationResult(false);
                }
              });
            } else {
              handlePostOperationResult(false);
            }
          });

          // Invoice Payment
        } else {
          handlePostOperationResult(false);
        }
      }
    );
  };

  // Edit Invoice
  const handleEditEvent = () => {
    InvoiceDataService.updateInvoiceMaster(invoiceMasterModel).then(
      (successTransaction) => {
        if (successTransaction === true) {
          // Create transaction on InvoicePayments Table
          InvoiceDataService.createInvoicePayments(invoicePayment).then(
            (paymentTransactionSuccessResponse) => {
              if (paymentTransactionSuccessResponse === true) {
                handlePostOperationResult(true);
                handleUpsertReturnClick();
              } else {
                // error Invoice Payment
                handlePostOperationResult(false);
              }
            }
          );
        } else {
          //error Invoice Master}
          handlePostOperationResult(false);
        }
      }
    );
  };

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
      <button
        className="btn btn-primary btn-md me-md-2"
        onClick={handleUpsertReturnClick}
      >
        Return
      </button>
      <button
        className="btn btn-primary btn-md me-md-2"
        type="submit"
        onClick={handleSaveClick}
      >
        Submit
      </button>
      {!isCreateEvent() && (
        <button className="btn btn-danger btn-md " onClick={handleVoidClick}>
          Void
        </button>
      )}
    </div>
  );
};
