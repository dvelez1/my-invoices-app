//#region Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/customer";
import { useCustomers } from "../../hooks/Customers/useCustomers";

// Import Spinner
import { Loading } from "../../components/shared/Loading";
import { currentDate } from "../../helper/dateFormatter";
import { PaginationComponent } from "../shared/PaginationComponent";

//#endregion Imports

export const Customers = () => {
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

  const { customers, isLoading, customerApi } = useCustomers();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    customerApi.getCustomers();
  }, []);

  //#region "Methods"
  const navigate = useNavigate();
  const handleUpsertClick = (customerId: Number) => {
    let customer = customers.filter((obj) => {
      return obj.CustomerId === customerId;
    })[0];

    navigate("/customerUpsert", {
      state: customer ?? customerDefaultInitialization,
    });
  };

  //#region "Filtering and Pagination"

  const filteredDataSource = (): Customer[] => {
    if (search.length === 0)
      return customers.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = customers.filter((cust) =>
      cust.Name.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value.toLowerCase());
  };

  //#endregion

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Customers</h3>
        <div className="card-body">
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
            onClick={() => handleUpsertClick(0)}
          >
            Create New Customer
          </button>
          <table className="table table-sm mt-2">
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
              {filteredDataSource().map(
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
                          style={{ fontSize: 20 }}
                          onClick={() => handleUpsertClick(CustomerId)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <PaginationComponent
            currentPage={currentPage}
            search={search}
            dataSource={customers}
            filterValueName="Name"
            setCurrentPage={setCurrentPage}
          />
          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};
