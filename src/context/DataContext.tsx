import React, { useState } from "react";
import { Customer } from "../models/customer";

interface Props {
  children: React.ReactNode;
}

type nameDataType = {
  customerModel: Customer | undefined;
  setCustomerModel:React.Dispatch<React.SetStateAction<Customer | undefined>>
};

const Context = React.createContext<nameDataType>({} as nameDataType);

const CustomerDataProvider: React.FC<Props> = ({ children }) => {
  const [customerModel, setCustomerModel] = useState<Customer | undefined>(undefined)

  return (
      <Context.Provider
        value={{
          customerModel,
          setCustomerModel
        }}
      >
        {children}
      </Context.Provider>
  );
};

export default CustomerDataProvider;
export const useCustomerDataContext = () => React.useContext(Context);

// const Context = React.createContext({});

// const CharacterIdProvider: React.FC<Props> = ({ children }) => {
//   const [characterId, setCharacterId] = useState(1);

//   return (
//     <Context.Provider value={{ characterId, setCharacterId }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default CharacterIdProvider;
