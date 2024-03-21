import React, { createContext, useState } from "react";

type contextType = {
  access?: string;
  setAccess?: React.Dispatch<React.SetStateAction<contextType["access"]>>;
  userDetail?: any;
  setUserDetail?: React.Dispatch<
    React.SetStateAction<contextType["userDetail"]>
  >;
};

export const myContext = createContext<contextType | null>(null);

const Context = ({ children }: React.PropsWithChildren<object>) => {
  const [access, setaccess] = useState(
    localStorage.getItem("access") ? localStorage.getItem("access") : ""
  );
  const [userDetail, setuserDetail] = useState(
    localStorage.getItem("userDetail")
      ? localStorage.getItem("userDetail")
      : "{}"
  );

  const setAccess = (token: any) => {
    setaccess(token);
    localStorage.setItem("access", token);
  };

  const setUserDetail = (item: any) => {
    setuserDetail(JSON.stringify(item));
    localStorage.setItem("userDetail", JSON.stringify(item));
  };

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
