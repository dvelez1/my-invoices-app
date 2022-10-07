import { useState } from "react";
import { Product } from "../../interfaces/product";
import { useValidations } from "../helpers/useValidations";

export const useProductValidation = () => {
  const { validationsTypes, validationsActions } = useValidations();
  const validationErrors: any = {};
  const [productValidationPassed, setProductValidationPassed] = useState<boolean>(false);

  const productValidations = (values: Product): {} => {
    validationErrors.Name = validationsTypes.requiredField(values.Name, "Name");
    validationErrors.Price = validationsTypes.requiredField(
      values.Price,
      "Price"
    );

    let cleanedValidationModel =
      validationsActions.cleanValidationModel(validationErrors);
      setProductValidationPassed(
      validationsActions.validationsPassed(cleanedValidationModel)
    );
    return cleanedValidationModel;
  };

  return {
    productValidations,
    productValidationPassed,
  };
};
