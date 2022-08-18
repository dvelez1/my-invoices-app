//#region Imports
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Import DataContect
import { useDataContext } from "../../context/DataContext";
// Product Interface
import { Product } from "../../interfaces/product";
// Methods for Insert
import { createProduct, updateProduct } from "../../api/Products/upsertEvents";
// Import Toast components (react-toastify) -> Note: Was implemented a custom solution
import "react-toastify/dist/ReactToastify.css";
import { errorToastTransaction } from "../../helper/toastMessages";
// Form Vaidation
import { productValidation } from "../../hooks/Products/productValidation";

// Components
import { ToastContainerImplementation } from "../shared/ToastContainerImplementation";
import { ProductUpsertSave } from "./ProductUpsertSave";
import { ProductUpsertBody } from "./ProductUpsertBody";

//#endregion Imports

export const ProductUpsert = () => {
  // Note: We are sending from Product and Object of Product Type as Parameter on the Route Navigation event
  const location = useLocation();
  var initialFormData = Object.freeze(location.state as Product);

  const { setSuccessToast } = useDataContext();
  const [product, setProduct] = React.useState<Product>(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    setIsSubmit(true);
    event.preventDefault();
    setFormErrors(productValidation(product));
  };

  // Method to handle Insert/Update Operation Result Message
  const saveEventResultMessageHandler = (successResponse: boolean) => {
    if (successResponse) {
      setSuccessToast(true);
      handleUpsertClick();
    } else {
      errorToastTransaction("Failed Transaction!");
      setSuccessToast(false);
    }
  };

  /* Used for Form validation: Will be triggered if a formErrors object is modified.
  If (Object.keys(formErrors).length === 0) is true (No errors found) AND isSubmit is true, will trigger the create/edit event */
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //Insert / Update Operation
      if (product.ProductId === 0)
        saveEventResultMessageHandler(Boolean(createProduct(product)));
      else if (product.ProductId > 0)
        saveEventResultMessageHandler(Boolean(updateProduct(product)));
    }
    // After Run the validation, set IsSubmit to False
    if (isSubmit) {
      setIsSubmit(false);
    }
  }, [formErrors]);

  // Used for Form validation: When Product Change - Trigger the validation without submit (Because isSubmit will be false )
  useEffect(() => {
    setFormErrors(productValidation(product));
  }, [product]);

  //#endregion "Methods"

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 className="card-header">
            {product && product.ProductId > 0
              ? "Edit Product"
              : "Create Product"}
          </h3>
          <div className="card-body">
            <ProductUpsertBody
              product={product}
              formErrors={formErrors}
              handleChange={handleChange}
            />
            <ProductUpsertSave
              setIsSubmit={isSubmit}
              handleUpsertClick={handleUpsertClick}
            />
            <ToastContainerImplementation />
          </div>
        </div>
      </form>
    </>
  );
};
