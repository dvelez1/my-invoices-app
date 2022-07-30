// Note: Implemeneted with Form for handleSubmit 
//#region Imports
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Product Interface
import { Product } from "../../models/product";
// Import Spinner
import { Loading } from "../../components/shared/Loading";
// Data Context
import { useDataContext } from "../../context/DataContext";
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
  // Data Context
  const { productModel, setProductModel } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertClick = () => {
    setProductModel(undefined);
    navigate("/product");
  };

  // Submit Event
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log(event.target.elements.name.value); // from elements property
    // console.log(event.target.name.value); // or directly

    const formData: Product = {
      ProductId:
        productModel === undefined || productModel.ProductId === 0
          ? 0
          : productModel.ProductId,
      Name: event.target.name.value,
      Price: Number(event.target.price.value),
      StartDate: currentDate(),
      EndDate: null,
    };

    //Insert / Update Operation
    if (formData.ProductId === 0) {
      //PUT (Create)
      saveEventResultMessageHandler(Boolean(createProduct(formData)));
    } else if (formData.ProductId > 0) {
      // Post (Update)
      saveEventResultMessageHandler(Boolean(updateProduct(formData)));
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
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 className="card-header">
            {productModel === undefined ? "Edit Product" : "Create Product"}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  defaultValue={productModel?.Name}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Middle Name"
                  step=".01"
                  defaultValue={productModel?.Price}
                />
              </div>
            </div>

            {isLoading && <Loading />}

            <div className="card-footer text-muted mt-4">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2" type="submit">
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
      </form>
    </>
  );
};
