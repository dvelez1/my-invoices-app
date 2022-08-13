import { Customer } from "../models/customer";

export const setCustomerInterface = (customer: Customer) => {
  return {
    CustomerId: customer.CustomerId,
    Name: customer.Name,
    MiddleName: customer.MiddleName,
    FirstName: customer.FirstName,
    LastName: customer.LastName,
    Address1: customer.Address1,
    Address2: customer.Address2,
    City: customer.City,
    State: customer.State,
    ZipCode: customer.ZipCode,
    StartDate: customer.CustomerId === 0 ? new Date() : customer.StartDate,
    EndDate: customer.CustomerId === 0 ? null : customer.EndDate,
  };
};
