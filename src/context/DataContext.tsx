import React, { useEffect, useState } from "react";
import { Customer } from "../models/customer";
import { Product } from "../models/product";
import { InvoiceMaster } from "../models/InvoiceMaster";
import { InvoiceDetails } from "../models/InvoiceDetails";
import { InvoicePayments } from "../models/InvoicePayments";
import { resolve } from "path";

interface Props {
  children: React.ReactNode;
}

type nameDataType = {
  // Customer
  customerModel: Customer | undefined;
  setCustomerModel: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  // Product
  productModel: Product | undefined;
  setProductModel: React.Dispatch<React.SetStateAction<Product | undefined>>;
  // Invoices Master
  invoiceMasterModel: InvoiceMaster;
  setInvoiceMasterModel: React.Dispatch<
    React.SetStateAction<InvoiceMaster>
  >;
  // Invoice Details
  invoiceDetailsArray: InvoiceDetails[];
  setInvoiceDetailsArray: React.Dispatch<
    React.SetStateAction<InvoiceDetails[]>
  >;
  // Invoice Payments
  invoicePaymentsArray: InvoicePayments[] | undefined;
  setInvoicePaymentsArray: React.Dispatch<
    React.SetStateAction<InvoicePayments[] | undefined>
  >;

  //#region Example for Login
  login: () => Promise<void>;
  logout:() => Promise<void>;
  authed: boolean;
  //#endregion

};

const Context = React.createContext<nameDataType>({} as nameDataType);

const DataProvider: React.FC<Props> = ({ children }) => {
  // Customer
  const [customerModel, setCustomerModel] = useState<Customer | undefined>(
    undefined
  );
  //Product
  const [productModel, setProductModel] = useState<Product | undefined>(
    undefined
  );
  // Invoice Master
  const [invoiceMasterModel, setInvoiceMasterModel] = useState<
    InvoiceMaster
  >(null!);
  // Invoice Details
  const [invoiceDetailsArray, setInvoiceDetailsArray] = useState<
    InvoiceDetails[]
  >([]);
  // Invoice Payments
  const [invoicePaymentsArray, setInvoicePaymentsArray] = useState<
    InvoicePayments[] | undefined
  >(undefined);

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
