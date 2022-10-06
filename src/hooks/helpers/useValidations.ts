import React from "react";

export const useValidations = () => {
  const requiredField = (value: any, name:string) => {
    if (!value) return name + " is required!";
  };

  const numberGreaterThanZero = (value: number, name:string) => {
    if (value && value > 0) return name + " must be greater than 0!";
  };

  const validationsTypes = {
    requiredField,
    numberGreaterThanZero,
  };

  const validationsPassed = (validationResults: {}): boolean =>{
    return Object.keys(validationResults).length === 0;

  }

  return {
    validationsTypes,
    validationsPassed
  };
};
