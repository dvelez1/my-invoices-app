import React, { useState } from "react";
import { Customer } from "../models/customer";
import { Product } from "../models/product";

interface Props {
  children: React.ReactNode;
}

type nameDataType = {
  customerModel: Customer | undefined;
  setCustomerModel:React.Dispatch<React.SetStateAction<Customer | undefined>>
  productModel : Product | undefined;
  setProductModel:React.Dispatch<React.SetStateAction<Product | undefined>>
};

const Context = React.createContext<nameDataType>({} as nameDataType);

const DataProvider: React.FC<Props> = ({ children }) => {
  const [customerModel, setCustomerModel] = useState<Customer | undefined>(undefined)
  const [productModel, setProductModel] = useState<Product | undefined>(undefined)

  return (
      <Context.Provider
        value={{
          customerModel,
          setCustomerModel,
          productModel, 
          setProductModel
        }}
      >
        {children}
      </Context.Provider>
  );
};

export default DataProvider;
export const useDataContext = () => React.useContext(Context);
