//#region Imports
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomersGet } from "../../hooks/Customers/useCustomersGet";
import { Customer } from "../../interfaces/customer";

// Data Context
import { useDataContext } from "../../context/DataContext";
// Toast
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";
import { successToastTransaction } from "../../helper/toastMessages";

// Import Spinner
import { Loading } from "../../components/shared/Loading";
import { currentDate } from "../../helper/dateFormatter";
import { genericMessages } from "../../helper/genericMessages";
import { PaginationCustom } from "../shared/PaginationCustom";

//#endregion Imports

export const Customers = () => {
  const { setCustomerModel, successToast, setSuccessToast } = useDataContext();
  const { customers, isLoading } = useCustomersGet();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  // Trigger Toast Message if the redirection was from upsert success Evenet.
  useEffect(() => {
    if (successToast) {
      setSuccessToast(false);
      successToastTransaction(genericMessages.success);
    }
  }, []);

  //#region "Methods"

  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/customerUpsert");
  };

  const customerDefaultInitialization = {
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
  // Redirect to Main Page
  function handleEditClick(customerId: Number) {
    if (customerId == 0) {
      setCustomerModel(customerDefaultInitialization);
    } else {
      setCustomerModel(
        customers.filter((obj) => {
          return obj.CustomerId === customerId;
        })[0]
      );
    }
    handleUpsertClick();
  }

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

  const nextPage = () => {
    if (
      customers.filter((cust) => cust["Name"].includes(search)).length >
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

  const totalGridRecords = (): number => {
    if (search.length === 0) return customers.length;

    return customers.filter((cust) => cust.Name.toLowerCase().includes(search))
      .length;
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
            onClick={() => handleEditClick(0)}
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
                          onClick={() => handleEditClick(CustomerId)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <PaginationCustom
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            totalPages={Math.ceil(totalGridRecords() / 10)}
          />
          {isLoading && <Loading />}
          <ToastContainerImplementation />
        </div>
      </div>
    </>
  );
};
