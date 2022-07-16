import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCustomer,
  updateCustomer,
} from "../../api/Customers/upsertEvents";
import { setCustomerInterface } from "../../helper/setCustomerInterface";
import { Customer } from "../../models/customer";

// Data Context
import { useCustomerDataContext } from "../../context/DataContext";

export const CustomerUpsert = () => {
  const { setCustomerModel, customerModel } = useCustomerDataContext();

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    setCustomerModel(undefined);
    navigate("/customer");
  };

  const CustomerId = useRef(0);
  const Name = useRef<HTMLInputElement | null>(null);
  const MiddleName = useRef<HTMLInputElement | null>(null);
  const FirstName = useRef<HTMLInputElement | null>(null);
  const LastName = useRef<HTMLInputElement | null>(null);
  const Address1 = useRef<HTMLInputElement | null>(null);
  const Address2 = useRef<HTMLInputElement | null>(null);
  const City = useRef<HTMLInputElement | null>(null);
  const State = useRef<HTMLInputElement | null>(null);
  const ZipCode = useRef<HTMLInputElement | null>(null);
 
  const [customer, setCustomer] = useState<Customer>();

  const handleSaveClick = () => {
    const formData = {
      CustomerId: customerModel == undefined ? 0 : customerModel.CustomerId,
      Name: String(Name.current?.value),
      MiddleName: String(MiddleName.current?.value),
      FirstName: String(FirstName.current?.value),
      LastName: String(LastName.current?.value),
      Address1: String(Address1.current?.value),
      Address2: String(Address2.current?.value),
      City: String(City.current?.value),
      State: String(State.current?.value),
      ZipCode: String(ZipCode.current?.value),
      StartDate: new Date(),
      EndDate: null,
    };
    setCustomer(setCustomerInterface(formData));
    var successResponse: boolean = false;
    if (customer?.CustomerId === 0) {
      //PUT (Create)
      successResponse = createCustomer(customer);
    } else if (customer && customer.CustomerId > 0) {
      // Post (Update)
      successResponse = updateCustomer(customer);
    }

    if (successResponse) alert("success");
    else alert("fail");
  };

  return (
    <>
     
      <div className="card">
        <h3 className="card-header">Add/Edit Customer</h3>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                ref={Name}
                value={customerModel?.Name}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                ref={MiddleName}
                value={customerModel?.MiddleName}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                ref={FirstName}
                value={customerModel?.FirstName}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                ref={LastName}
                value={customerModel?.LastName}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
              <label className="form-label">Adress 1</label>
              <input
                type="text"
                className="form-control"
                id="address1"
                name="address1"
                placeholder="Address 1"
                ref={Address1}
                value={customerModel?.Address1}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Adress 2</label>
              <input
                type="text"
                className="form-control"
                id="address2"
                name="address2"
                placeholder="Address 2"
                ref={Address2}
                value={customerModel?.Address2}
              />
            </div>
          </div>

          <div className="row mt-2 mb-2">
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                ref={City}
                value={customerModel?.City}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                placeholder="State"
                ref={State}
                value={customerModel?.State}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zip-code"
                name="zip-code"
                placeholder="Zip Code"
                ref={ZipCode}
                value={customerModel?.ZipCode}
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
        </div>
      </div>
    </>
  );
};
