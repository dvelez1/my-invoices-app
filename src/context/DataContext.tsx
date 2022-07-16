import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const dataFixed = {
  nombre: "Fernando",
  edad: 35,
};

type nameDataType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<nameDataType>({} as nameDataType);

const CustomerDataProvider: React.FC<Props> = ({ children }) => {
  const [name, setName] = useState("Dennis");

  return (
      <Context.Provider
        value={{
          name,
          setName,
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
