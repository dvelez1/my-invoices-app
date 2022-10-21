import { useState } from "react";
import { Customer } from "../../interfaces/customer";
import { useValidations } from "../helpers/useValidations";

export const useCustomerValidation = () => {
    const { validationsTypes, validationsActions } =
    useValidations();
  var validationErrors: any = {};
  const [customerValidationErrors, setCustomerValidationErrors] = useState<{}>(
    {}
  );
  const [customerValidationPassed, setCustomerValidationPassed] =
    useState<boolean>(false);

    const customerValidations = (values: Customer) => {
        // Run Validations
        validationErrors.Name = validationsTypes.requiredField(values.Name, "Name");
        validationErrors.FirstName = validationsTypes.requiredField(values.FirstName, "FirstName");
        validationErrors.LastName = validationsTypes.requiredField(values.LastName, "LastName");
        validationErrors.City = validationsTypes.requiredField(values.City, "City");
        validationErrors.State = validationsTypes.requiredField(values.State, "State");
        validationErrors.ZipCode = validationsTypes.nullOrLengthEqualTo(values.ZipCode, "ZipCode",5);    
        
        //Clean Model
        validationErrors =
          validationsActions.cleanValidationModel(validationErrors);
    
        // Verify if model failed
        setCustomerValidationPassed(
          validationsActions.validationsPassed(validationErrors)
        );
    
        setCustomerValidationErrors(validationErrors);
      };
    
      return {
        customerValidations,
        customerValidationPassed,
        customerValidationErrors,
      };



  return {}
}


