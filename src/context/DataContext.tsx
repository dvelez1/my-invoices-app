import React, { useEffect, useState } from "react";
import { Customer } from "../models/customer";
import { Product } from "../models/product";
import { InvoiceMaster } from "../models/InvoiceMaster"
import { InvoiceDetails } from "../models/InvoiceDetails"
import { InvoicePayments } from "../models/InvoicePayments"

interface Props {
  children: React.ReactNode;
}

type nameDataType = {
  // Customer
  customerModel: Customer | undefined;
  setCustomerModel:React.Dispatch<React.SetStateAction<Customer | undefined>>
  // Product
  productModel : Product | undefined;
  setProductModel:React.Dispatch<React.SetStateAction<Product | undefined>>
  // Invoices Master
  invoiceMasterModel: InvoiceMaster | undefined;
  setInvoiceMasterModel:React.Dispatch<React.SetStateAction<InvoiceMaster | undefined>>
  // Invoice Details

  // Invoice Payments
};

const Context = React.createContext<nameDataType>({} as nameDataType);

const DataProvider: React.FC<Props> = ({ children }) => {
  const [customerModel, setCustomerModel] = useState<Customer | undefined>(undefined)
  const [productModel, setProductModel] = useState<Product | undefined>(undefined)
  // List of Models
  const [invoiceMasterModel, setInvoiceMasterModel] = useState<InvoiceMaster | undefined>(undefined)
  // const [invoiceDetailsModel, setInvoiceDetailsModel] = useState<InvoiceDetails | undefined>(undefined)
  // const [invoicePaymentsArray, setInvoicePaymentsArray] = useState<[InvoicePayments] | undefined>(undefined)

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
          // invoiceDetailsModel,
          // setInvoiceDetailsModel,
          // invoicePaymentsArray,
          // setInvoicePaymentsArray
        }}
      >
        {children}
      </Context.Provider>
  );
};

export default DataProvider;
export const useDataContext = () => React.useContext(Context);
