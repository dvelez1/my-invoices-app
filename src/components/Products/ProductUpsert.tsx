//#region Imports
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Product Interface
import { Product } from "../../interfaces/product";
import { useToastNotification } from "../../hooks/helpers/useToastNotification";
// Form Vaidation
import { useProductValidation } from "../../hooks/Products/useProductValidation";

// Components
import { ProductUpsertSave } from "./ProductUpsertSave";
import { ProductUpsertBody } from "./ProductUpsertBody";
import { useProducts } from "../../hooks/Products/useProducts";

//#endregion Imports

export const ProductUpsert = () => {
  const { producApi } = useProducts();
  const { notificationApi } = useToastNotification();
  const {
    productValidations,
    productValidationPassed,
    productValidationErrors
  } = useProductValidation();

  // Note: We are sending from Product and Object of Product Type as Parameter on the Route Navigation event
  const location = useLocation();
  var initialFormData = Object.freeze(location.state as Product);

  const [product, setProduct] = React.useState<Product>(initialFormData);
  const [isSubmit, setIsSubmit] = useState(false);

  //#region "Methods"

  // Navigate (Route)
  const navigate = useNavigate();
  const handleUpsertRedirection = () => {
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
    event.preventDefault();
    setIsSubmit(true);
    if (productValidationPassed) {
      producApi.upsertProduct(product).finally(() => {
        handleUpsertRedirection();
      });
    } else {
      notificationApi.showNotification(
        notificationApi.notificationType.Info,
        "Please, provide all requested information!" +
          " Maybe some data did not meet the requirements or is missing."
      );
    }
    setIsSubmit(false);
  };

  // Used for Form validation: When Product Change - Trigger the validation without submit (Because isSubmit will be false )
  useEffect(() => {
    productValidations(product);
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
              formErrors={productValidationErrors}
              handleChange={handleChange}
            />
            <ProductUpsertSave
              setIsSubmit={isSubmit}
              handleUpsertRedirection={handleUpsertRedirection}
              productValidationPassed={productValidationPassed}
            />
          </div>
        </div>
      </form>
    </>
  );
};
