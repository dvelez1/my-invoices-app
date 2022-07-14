import React from "react";
import { useNavigate } from "react-router-dom";

export const CustomerUpsert = () => {
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/customer");
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
              />
            </div>
          </div>

          <div className="card-footer text-muted mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="button">
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
