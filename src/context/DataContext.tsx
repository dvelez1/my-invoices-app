import React, { useEffect, useState } from "react";
import { Customer } from "../interfaces/customer";
import { Product } from "../interfaces/product";
import { InvoiceMaster } from "../interfaces/InvoiceMaster";
import { InvoiceDetails } from "../interfaces/InvoiceDetails";
import { InvoicePayments } from "../interfaces/InvoicePayments";
import { resolve } from "path";

interface Props {
  children: React.ReactNode;
}

type nameDataType = {
  // Trigger SuccessToast on the redirection from upsert to Get Invoice After Success Insert / Update Operation
  successToast: boolean;
  setSuccessToast: React.Dispatch<React.SetStateAction<boolean>>;

  // Customer
  customerModel: Customer;
  setCustomerModel: React.Dispatch<React.SetStateAction<Customer>>;
  // Product
  productModel: Product | undefined;
  setProductModel: React.Dispatch<React.SetStateAction<Product | undefined>>;
  // Invoices Master
  invoiceMasterModel: InvoiceMaster;
  setInvoiceMasterModel: React.Dispatch<React.SetStateAction<InvoiceMaster>>;
  // Invoice Details
  invoiceDetailsArray: InvoiceDetails[];
  setInvoiceDetailsArray: React.Dispatch<
    React.SetStateAction<InvoiceDetails[]>
  >;
  // Invoice Payments
  invoicePaymentsArray: InvoicePayments[];
  setInvoicePaymentsArray: React.Dispatch<
    React.SetStateAction<InvoicePayments[]>
  >;

  //#region Example for Login
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authed: boolean;
  //#endregion
};

const Context = React.createContext<nameDataType>({} as nameDataType);

const DataProvider: React.FC<Props> = ({ children }) => {
  // Customer
  const [customerModel, setCustomerModel] = useState<Customer>(null!);

  //Product
  const [productModel, setProductModel] = useState<Product | undefined>(
    undefined
  );
  // Invoice Master
  const [invoiceMasterModel, setInvoiceMasterModel] = useState<InvoiceMaster>(
    null!
  );
  // Invoice Details
  const [invoiceDetailsArray, setInvoiceDetailsArray] = useState<
    InvoiceDetails[]
  >([]);
  // Invoice Payments
  const [invoicePaymentsArray, setInvoicePaymentsArray] = useState<
    InvoicePayments[]
  >(null!);

  // Trigger SuccessToast on the redirection from upsert to Get Invoice on Upsert
  const [successToast, setSuccessToast] = useState(false);

  //#region Examples for Loging

  const [authed, setAuthed] = useState<boolean>(false);
  const login = async (): Promise<void> => {
    const result = await fakeAsyncLogin();

    if (result) {
      setAuthed(true);
    }
  };

  const fakeAsyncLogin = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Logged In");
      }, 300);
    });
  };

  const logout = async (): Promise<void> => {
    const result = await fakeAsyncLogout();

    if (result) {
      setAuthed(false);
    }
  };

  const fakeAsyncLogout = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Logged Out");
      }, 300);
    });
  };

  //#endregion

  return (
    <Context.Provider
      value={{
        // Customer
        customerModel,
        setCustomerModel,
        // Product
        productModel,
        setProductModel,
        // Invoices Master
        invoiceMasterModel,
        setInvoiceMasterModel,
        // Invoice Details
        invoiceDetailsArray,
        setInvoiceDetailsArray,
        // Invoice Payments
        invoicePaymentsArray,
        setInvoicePaymentsArray,
        // Set 
        successToast,
        setSuccessToast,

        //#region Examples for Loging
        login,
        logout,
        authed,
        //#endregion
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default DataProvider;
export const useDataContext = () => React.useContext(Context);
