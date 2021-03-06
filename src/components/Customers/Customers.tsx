import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";
import { Customer } from "../../models/customer";

// Data Context
import { useDataContext } from "../../context/DataContext";

// Import Spinner
import { Loading } from "../../components/shared/Loading";

export const Customers = () => {
  const { setCustomerModel, customerModel } = useDataContext();
  const { customers, isLoading } = useCustomersGet();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/customerUpsert");
  };

  // Redirect to Main Page
  function handleEditClick(customerId: Number) {
    setCustomerModel(
      customers.filter((obj) => {
        return obj.CustomerId === customerId;
      })[0]
    );
    if (customerId > 0) handleUpsertClick();
  }

  //#region "Filtering and Pagination"
  const filteredCustomers = (): Customer[] => {
    if (search.length === 0)
      return customers.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = customers.filter((cust) => cust.Name.toLowerCase().includes(search));
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      customers.filter((cust) => cust.Name.includes(search)).length >
      currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value.toLowerCase());
  };

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Customers</h3>
        <div className="card-body">
          <h5 className="card-title">List of Customers</h5>
          <hr />

          <input
            className="mb-2 form-control"
            type="text"
            placeholder="Customers Search by Name"
            value={search}
            onChange={onSearchChange}
          />

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
              {filteredCustomers().map(
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
                      {/* <span>
                        <i
                          title="Delete Customer"
                          className="bi bi-trash cursor"
                          style={{ fontSize: 25 }}
                          onClick={() => handleDeleteClick(CustomerId)}
                        ></i>
                      </span> */}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" onClick={prevPage}>
              Previous
            </button>
            <button className="btn btn-primary" onClick={nextPage}>
              Next
            </button>
          </div>
          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};
