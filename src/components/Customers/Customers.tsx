import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";

// Data Context
import { useCustomerDataContext } from "../../context/DataContext";

// Import Spinner 
import {Loading} from "../../components/shared/Loading";

export const Customers = () => {


  const { setCustomerModel, customerModel } = useCustomerDataContext();
  const { customers, isLoading } = useCustomersGet();

  //setLoading(false);

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/customerUpsert");
  };

  function handleEditClick(customerId: Number) {
    setCustomerModel(
      customers.filter((obj) => {
        return obj.CustomerId === customerId;
      })[0]
    );
    if (customerId > 0) handleUpsertClick();
  }

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
            <thead className="thead-dark">
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
              {customers.map(
                ({
                  CustomerId,
                  Name,
                  FirstName,
                  LastName,
                  Address1,
                  Address2,
                  City,
                  State,
                  ZipCode,
                }) => (
                  <tr key={CustomerId}>
                    <td>{CustomerId}</td>
                    <td>{Name + " " + FirstName + " " + LastName}</td>
                    <td>{Address1}</td>
                    <td>{Address2}</td>
                    <td>{City}</td>
                    <td>{State}</td>
                    <td>{ZipCode}</td>
                    <td>
                      <span className="me-md-2 ">
                        <i
                         title="Edit Customer"
                          className="bi bi-pencil-square cursor"
                          style={{ fontSize: 25 }}
                          onClick={() => handleEditClick(CustomerId)}
                        ></i>
                      </span>
                      <span>
                        <i title="Delete Customer" className="bi bi-trash cursor" style={{ fontSize: 25 }}></i>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {isLoading && <Loading />}
            </div>
      </div>
    </>
  );
};
