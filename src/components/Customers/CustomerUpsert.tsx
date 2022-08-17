// Note: We are using ref for submit Data

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCustomer,
  updateCustomer,
} from "../../api/Customers/upsertEvents";

import { Customer } from "../../interfaces/customer";

// Import Spinner
import { Loading } from "../../components/shared/Loading";

// Data Context
import { useDataContext } from "../../context/DataContext";

// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import {
  successToastTransaction,
  errorToastTransaction,
} from "../../helper/toastMessages";
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";

export const CustomerUpsert = () => {
  // Data Context
  const { setCustomerModel, customerModel } = useDataContext();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setCustomerModel({
      ...customerModel,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(customerModel);
  };

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    setCustomerModel(null!);
    navigate("/customer");
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setIsLoading(true);

    //Insert / Update Operation
    if (customerModel?.CustomerId === 0) {
      //PUT (Create)
      saveEventResultMessageHandler(Boolean(createCustomer(customerModel)));
    } else {
      // Post (Update)
      saveEventResultMessageHandler(Boolean(updateCustomer(customerModel)));
    }

    setIsLoading(false);
  };

  // Method to handle Insert/Update Operation Result Message
  const saveEventResultMessageHandler = (successResponse: boolean) => {
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
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="Name"
                placeholder="Name"
                defaultValue={customerModel.Name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Middle Name</label>
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
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="FirstName"
                placeholder="First Name"
                defaultValue={customerModel?.FirstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Last Name</label>
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
              <label className="form-label">Adress 1</label>
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
              <label className="form-label">Adress 2</label>
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
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="City"
                placeholder="City"
                defaultValue={customerModel?.City}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="State"
                placeholder="State"
                defaultValue={customerModel?.State}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="ZipCode"
                placeholder="Zip Code"
                defaultValue={customerModel?.ZipCode}
                onChange={handleChange}
              />
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
