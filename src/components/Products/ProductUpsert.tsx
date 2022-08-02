// Note: Implemeneted with Form for handleSubmit ans change event
//#region Imports
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Route } from "react-router-dom";
// Product Interface
import { Product } from "../../models/product";
// Import Spinner
import { Loading } from "../../components/shared/Loading";
// Data Context
// import { useDataContext } from "../../context/DataContext";
// Methods for Insert
import { createProduct, updateProduct } from "../../api/Products/upsertEvents";
// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import {
  successToastTransaction,
  errorToastTransaction,
} from "../../helper/toastMessages";
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";

// Date Formatter
import { currentDate } from "../../helper/dateFormatter";

//#endregion Imports

export const ProductUpsert = () => {

  // Note: We are sending from Product and Object of Product Type as Parameter on the Route Navigation event
  const location = useLocation();
  const initialFormData = Object.freeze(location.state as Product);
  const [product, setProduct] = React.useState<Product>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  console.log(product)


  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    navigate("/product");
  };

  // We will update our post model with their respective setter
  const handleChange = (e: any) => {
    setProduct({
      ...product,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Submit Event
  const handleSubmit = (event: any) => {
    setIsPending(true);
    event.preventDefault();
    // console.log(event.target.elements.name.value); // from elements property
    // console.log(event.target.name.value); // or directly

    //Insert / Update Operation
    if (product.ProductId === 0)
      saveEventResultMessageHandler(Boolean(createProduct(product)));
    else if (product.ProductId > 0)
      saveEventResultMessageHandler(Boolean(updateProduct(product)));

    setIsLoading(false);
  };

  // Method to handle Insert/Update Operation Result Message
  const saveEventResultMessageHandler = (successResponse: boolean) => {
    if (successResponse) {
      successToastTransaction("Success Transaction!");
      setIsPending(false);
      handleUpsertClick();
    } else errorToastTransaction("Failed Transaction!");
  };

  //#endregion "Methods"

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 className="card-header">
            {product ? "Edit Product" : "Create Product"}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder="Name"
                  defaultValue={product?.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="Price"
                  placeholder="Price"
                  step=".01"
                  defaultValue={product?.Price}
                  onChange={handleChange}
                />
              </div>
            </div>

            {isLoading && <Loading />}

            <div className="card-footer text-muted mt-4">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {!isPending && (
                  <button className="btn btn-primary me-md-2" type="submit">
                    Save
                  </button>
                )}
                {isPending && (
                  <button
                    className="btn btn-primary me-md-2"
                    disabled
                    type="submit"
                  >
                    Saving
                  </button>
                )}
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
      </form>
    </>
  );
};
