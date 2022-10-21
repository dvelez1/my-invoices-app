//#region Imports
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { currentDate } from "../../helper/dateFormatter";
// Data Context
import { useCustomerValidation } from "../../hooks/Customers/useCustomerValidation";
// Import Spinner
import { Loading } from "../../components/shared/Loading";
import { Customer } from "../../interfaces/customer";
import { useToastNotification } from "../../hooks/helpers/useToastNotification";
import { useCustomers } from "../../hooks/Customers/useCustomers";

//#endregion Imports

export const CustomerUpsert = () => {
  const location = useLocation();
  var formData = Object.freeze(location.state as Customer);
  const [customer, setCustomer] = React.useState<Customer>(formData);
  const { notificationApi } = useToastNotification();
  const [isSubmit, setIsSubmit] = useState(false);
  const { customerApi } = useCustomers();
  const {
    customerValidationErrors,
    customerValidationPassed,
    customerValidations,
  } = useCustomerValidation();

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertRedirection = () => {
    navigate("/customer");
  };

  const handleChange = (e: any) => {
    setCustomer({
      ...customer,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setIsSubmit(true);
    if (customerValidationPassed) {
      customerApi.upsertCustomer(customer).finally(() => {
        handleUpsertRedirection();
      });
    } else {
      notificationApi.showNotification(
        notificationApi.notificationType.Info,
        "Please, provide all requested information!" +
          " Maybe some data did not meet the requirements or is missing."
      );
    }
    setIsSubmit(false);
  };

  //#endregion "Methods"

  // Run Validation
  useEffect(() => {
    if (customer) customerValidations(customer);
  }, [customer]);

  return (
    <>
      <div className="card">
        <h3 className="card-header">
          {customer?.CustomerId === 0 ? "Create Customer" : "Edit Customer"}
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
                defaultValue={customer?.Name}
                onChange={handleChange}
              />
              <p className="text-danger"> {customerValidationErrors?.Name}</p>
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
                defaultValue={customer?.MiddleName}
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
                defaultValue={customer?.FirstName}
                onChange={handleChange}
              />
              <p className="text-danger"> {customerValidationErrors?.FirstName}</p>
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
                defaultValue={customer?.LastName}
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
                defaultValue={customer?.Address1}
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
                defaultValue={customer?.Address2}
                onChange={handleChange}
              />
            </div>
          </div>
          {isSubmit && <Loading />}
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
                defaultValue={customer?.City}
                onChange={handleChange}
              />
              <p className="text-danger"> {customerValidationErrors?.City}</p>
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
                defaultValue={customer?.State}
                onChange={handleChange}
              />
              <p className="text-danger"> {customerValidationErrors?.State}</p>
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
                defaultValue={customer?.ZipCode}
                onChange={handleChange}
              />
              <p className="text-danger"> {customerValidationErrors?.ZipCode}</p>
            </div>
          </div>

          <div className="card-footer text-muted mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                disabled={!customerValidationPassed}
                className="btn btn-primary me-md-2"
                type="button"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleUpsertRedirection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
