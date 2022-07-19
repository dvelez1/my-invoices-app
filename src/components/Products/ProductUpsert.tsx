import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   createProduct,
//   updateProduct,
// } from "../../api/Products/upsertEvents";

import { Product } from "../../models/product";

// Import Spinner
import { Loading } from "../../components/shared/Loading";

// Data Context
// import { useProductDataContext } from "../../context/DataContext";

// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import {
  successToastTransaction,
  errorToastTransaction,
} from "../../helper/toastMessages";
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";

export const ProductUpsert = () => {
  // Data Context
  // const { setProductModel, productModel } = useProductDataContext();

  const [isLoading, setIsLoading] = useState(false);

  const ProductId = useRef(0);
  const Name = useRef<HTMLInputElement | null>(null);
  const Price = useRef<HTMLInputElement | null>(null);

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    // setProductModel(undefined);
    navigate("/product");
  };

  // Insert/Edit Operation
  const handleSaveClick = () => {
    setIsLoading(true);

    // Prepare formData for Post/Put
    const formData: Product = {
      ProductId: 0,
      Name: String(Name.current?.value),
      Price: Number(Price.current?.value),
      StartDate: new Date(),
      EndDate: null,
    };

    //Insert / Update Operation
    if (formData.ProductId === 0) {
      //PUT (Create)
      // saveEventResultMessageHandler(Boolean(createCustomer(formData)));
      alert("Insert")
    } else if (formData.ProductId > 0) {
      // Post (Update)
      // saveEventResultMessageHandler(Boolean(updateCustomer(formData)));
      alert("Update")
    }

    setIsLoading(false);
  };

  // Method to handle Insert/Update Operation Result Message
  const saveEventResultMessageHandler = (successResponse: boolean) => {
    if (successResponse) {
      successToastTransaction("Success Transaction!");
      handleUpsertClick();
    } else errorToastTransaction("Failed Transaction!");
  };

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">
          Create/Edit Customer
        </h3>
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
               // defaultValue={customerModel?.Name}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                ref={Price}
                //defaultValue={customerModel?.MiddleName}
              />
            </div>
          </div>


          {isLoading && <Loading />}

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
          <ToastContainerImplementation />
        </div>
      </div>
    </>
  );
};
