import React, { createContext, useState } from "react";

type contextType = {
  access?: boolean | string;
  setAccess?: React.Dispatch<React.SetStateAction<contextType["access"]>>;
  userDetail?: object;
  setUserDetail?: React.Dispatch<
    React.SetStateAction<contextType["userDetail"]>
  >;
};

export const myContext = createContext<contextType | null>(null);

const Context = ({ children }: React.PropsWithChildren<object>) => {
  const [access, setAccess] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  return (
    <myContext.Provider
      value={{
        access,
        setAccess,
        userDetail,
        setUserDetail,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
export default Context;
