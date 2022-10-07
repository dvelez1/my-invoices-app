import { useState } from "react";
import { Product } from "../../interfaces/product";
import { useValidations } from "../helpers/useValidations";

export const useProductValidation = () => {
  const { validationsTypes, validationsActions } = useValidations();
  var validationErrors: any = {};
  const [productValidationPassed, setProductValidationPassed] =
    useState<boolean>(false);
    // const [productValidationErrors, setProductValidationErrors] = useState<{}>({})

  const productValidations = (values: Product): {} => {

    // Run Validations
    validationErrors.Name = validationsTypes.requiredField(
      values.Name,
      "Name"
    );
    validationErrors.Price = validationsTypes.requiredField(
      values.Price,
      "Price"
    );

    //Clean Model
    validationErrors = validationsActions.cleanValidationModel(
      validationErrors
    );

    // Verify if model failed
    setProductValidationPassed(
      validationsActions.validationsPassed(validationErrors)
    );
    

    return validationErrors;
  };

  return {
    productValidations,
    productValidationPassed,
  };
};
