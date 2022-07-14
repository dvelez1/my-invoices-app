import React from "react";
import { useNavigate } from "react-router-dom";

export const Customers = () => {
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/customerUpsert");
  };

  return (
    <>
      <div className="card">
        <h3 className="card-header">Customers</h3>
        <div className="card-body">
          <h5 className="card-title">List of Customers</h5>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleUpsertClick}
          >
            Create New Customer
          </button>
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Dennis Vélez</td>
                <td>Carr 116</td>
                <td></td>
                <td>Lajas</td>
                <td>PR</td>
                <td>00610</td>
                <td>Edit / Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
