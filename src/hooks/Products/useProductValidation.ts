import { Product } from "../../interfaces/product";
import { useValidations } from "../helpers/useValidations";

export const useProductValidation = () => {
  const { validationsTypes, cleanValidationModel } = useValidations();
  const validationErrors: any = {};

  const runValidations = (values: Product): {} => {
    validationErrors.Name = validationsTypes.requiredField(values.Name, "Name");
    validationErrors.Price = validationsTypes.requiredField(values.Price, "Price");

    return cleanValidationModel(validationErrors);
  };

  return {
    runValidations,
    
  };
};
