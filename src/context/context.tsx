import React, { createContext, useState } from "react";

type contextType = {
  access: string;
  setAccess?: React.Dispatch<React.SetStateAction<contextType["access"]>>;
};

export const myContext = createContext<contextType | null>(null);

const Context = ({ children }: React.PropsWithChildren<object>) => {
  const [access, setAccess] = useState("");

  return (
    <myContext.Provider
      value={{
        access,
        setAccess,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
export default Context;
