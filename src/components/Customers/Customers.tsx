import React from "react";
import { useNavigate } from "react-router-dom";
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";

// Data Context
import { useCustomerDataContext } from "../../context/DataContext";

export const Customers = () => {
  const {name, setName} = useCustomerDataContext();

  const navigate = useNavigate();

  const customers = useCustomersGet();

  const handleUpsertClick = () => {
    navigate("/customerUpsert");
  };

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
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
                      <button className="btn btn-primary me-md-2" type="button">
                        Edit
                      </button>
                      <button className="btn btn-primary" type="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
