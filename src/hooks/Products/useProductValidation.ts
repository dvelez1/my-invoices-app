import { useState } from "react";
import { Product } from "../../interfaces/product";
import { useValidations } from "../helpers/useValidations";

export const useProductValidation = () => {
  const { validationsTypes, validationsActions } = useValidations();
  var productValidationErrors: any = {};
  const [productValidationPassed, setProductValidationPassed] =
    useState<boolean>(false);
    // const [productValidationErrors, setProductValidationErrors] = useState<{}>({})

  const productValidations = (values: Product): {} => {

    // Run Validations
    productValidationErrors.Name = validationsTypes.requiredField(
      values.Name,
      "Name"
    );
    productValidationErrors.Price = validationsTypes.requiredField(
      values.Price,
      "Price"
    );

    //Clean Model
    productValidationErrors = validationsActions.cleanValidationModel(
      productValidationErrors
    );

    // Verify if model failed
    setProductValidationPassed(
      validationsActions.validationsPassed(productValidationErrors)
    );
    

    return productValidationErrors;
  };

  return {
    productValidations,
    productValidationPassed,
  };
};
