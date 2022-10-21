//#region Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/Customers/useCustomers";
import { currentDate } from "../../helper/dateFormatter";
// Data Context
import { useDataContext } from "../../context/DataContext";
import { customerValidation } from "../../hooks/Customers/customerValidation";
// Import Spinner
import { Loading } from "../../components/shared/Loading";
import { Customer } from "../../interfaces/customer";
import { useToastNotification } from "../../hooks/helpers/useToastNotification";

//#endregion Imports

export const CustomerUpsert = () => {
  const { setCustomerModel, customerModel } = useDataContext();
  const [formErrors, setFormErrors] = useState<any>({});
  const { notificationApi } = useToastNotification();
  const [isSubmit, setIsSubmit] = useState(false);
  const { customerApi } = useCustomers();

  const customerDefaultInitialization: Customer = {
    CustomerId: 0,
    Name: "",
    MiddleName: "",
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    ZipCode: "",
    StartDate: currentDate(),
    EndDate: null,
  };

  // Initialize with default data when null object
  useEffect(() => {
    if (!customerModel) {
      setCustomerModel(customerDefaultInitialization);
    }
  }, []);

  // Run Validation
  useEffect(() => {
    if (customerModel) setFormErrors(customerValidation(customerModel));
  }, [customerModel]);

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertRedirection = () => {
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

  // Validation Result Evaluation
  const successValidation = (): boolean => {
    return Object.keys(formErrors).length === 0;
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setIsSubmit(true);
    if (successValidation()) {
      customerApi.upsertCustomer(customerModel).finally(() => {
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
                defaultValue={customerModel?.Name}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors?.Name}</p>
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
              <p className="text-danger"> {formErrors?.FirstName}</p>
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
                defaultValue={customerModel?.City}
                onChange={handleChange}
              />
              <p className="text-danger"> {formErrors?.City}</p>
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
              <p className="text-danger"> {formErrors?.State}</p>
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
              <p className="text-danger"> {formErrors?.ZipCode}</p>
            </div>
          </div>

          <div className="card-footer text-muted mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                disabled={!successValidation()}
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
