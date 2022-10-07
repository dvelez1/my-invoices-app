import React from "react";

export const useValidations = () => {

  const requiredField = (value: any, name: string) => {
    if (!value) return name + " is required!";
  };

  const numberGreaterThanZero = (value: number, name: string) => {
    console.log(value)
    if (value && !(value > 0)) return name + " must be greater than 0!";
  };

  const validationsPassed = (validationResults: {}): boolean => {
    return Object.keys(validationResults).length === 0;
  };

  const cleanValidationModel = (validationModel: any): {} => {
    //Mutate object to remove properties with null or undefined value
    Object.keys(validationModel).forEach(
      (k) => !validationModel[k] && delete validationModel[k]
    );
    return validationModel;
  };

  
  const validationsTypes = {
    requiredField,
    numberGreaterThanZero,
  };

  const validationsActions = {
    validationsPassed,
    cleanValidationModel,
  }

  return {
    validationsTypes,
    validationsActions
  };
};
