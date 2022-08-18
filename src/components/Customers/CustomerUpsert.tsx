//#region Imports

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCustomer,
  updateCustomer,
} from "../../api/Customers/upsertEvents";

// Data Context
import { useDataContext } from "../../context/DataContext";

// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import {
  successToastTransaction,
  errorToastTransaction,
} from "../../helper/toastMessages";
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";
import { customerValidation } from "../../hooks/Customers/customerValidation";
// Import Spinner
import { Loading } from "../../components/shared/Loading";

//#endregion Imports

export const CustomerUpsert = () => {
  // Data Context
  const { setCustomerModel, customerModel } = useDataContext();
  
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    setCustomerModel(null!);
    navigate("/customer");
  };

  const handleChange = (e: any) => {
    setCustomerModel({
      ...customerModel,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setIsSubmit(true);
    setFormErrors(customerValidation(customerModel));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //Insert / Update Operation
      if (customerModel?.CustomerId === 0) {
        //PUT (Create)
        saveEventResultMessageHandler(Boolean(createCustomer(customerModel)));
      } else {
        // Post (Update)
        saveEventResultMessageHandler(Boolean(updateCustomer(customerModel)));
      }
    }
    // After Run the validation, set IsSubmit to False
    if (isSubmit) {
      setIsSubmit(false);
    }
  }, [formErrors]);

  useEffect(() => {
    setFormErrors(customerValidation(customerModel));
  }, [customerModel]);

  // Method to handle Insert/Update Operation Result Message
  const saveEventResultMessageHandler = (successResponse: boolean) => {
    setIsSubmit(false);
    if (successResponse) {
      successToastTransaction("Success Transaction!");
      handleUpsertClick();
    } else errorToastTransaction("Failed Transaction!");
  };

  //#endregion "Methods"
 
  return (
    <>
      <div className="card">
        <h3 className="card-header">
          {customerModel?.CustomerId === 0
            ? "Create Customer"
            : "Edit Customer"}
        </h3>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="Name"
                placeholder="Name"
                defaultValue={customerModel.Name}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors.Name}</p>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <strong>Middle Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="MiddleName"
                placeholder="Middle Name"
                defaultValue={customerModel?.MiddleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="FirstName"
                placeholder="First Name"
                defaultValue={customerModel?.FirstName}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors.FirstName}</p>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <strong>Second Surname</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="LastName"
                placeholder="Last Name"
                defaultValue={customerModel?.LastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
              <label className="form-label">
                <strong>Adress 1</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="Address1"
                placeholder="Address 1"
                defaultValue={customerModel?.Address1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <strong>Adress 2</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="Address2"
                placeholder="Address 2"
                defaultValue={customerModel?.Address2}
                onChange={handleChange}
              />
            </div>
          </div>
          {isLoading && <Loading />}
          <div className="row mt-2 mb-2">
            <div className="col-md-4">
              <label className="form-label">
                <strong>City</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="City"
                placeholder="City"
                defaultValue={customerModel?.City}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors.City}</p>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {" "}
                <strong>State</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="State"
                placeholder="State"
                defaultValue={customerModel?.State}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors.State}</p>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                <strong>Zip Code</strong>
              </label>
              <input
                type="number"
                className="form-control"
                name="ZipCode"
                placeholder="Zip Code"
                defaultValue={customerModel?.ZipCode}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors.ZipCode}</p>
            </div>
          </div>

          <div className="card-footer text-muted mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-primary me-md-2"
                type="button"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleUpsertClick}
              >
                Cancel
              </button>
            </div>
          </div>
          <ToastContainerImplementation />
        </div>
      </div>
    </>
  );
};
