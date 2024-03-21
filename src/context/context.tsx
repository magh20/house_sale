import React, { createContext, useState } from "react";

type contextType = {
  access?: boolean | string;
  setAccess?: React.Dispatch<React.SetStateAction<contextType["access"]>>;
  userDetail?: any;
  setUserDetail?: React.Dispatch<
    React.SetStateAction<contextType["userDetail"]>
  >;
};

export const myContext = createContext<contextType | null>(null);

const Context = ({ children }: React.PropsWithChildren<object>) => {
  const [access, setAccess] = useState(
    localStorage.getItem("access") ? localStorage.getItem("access") : false
  );
  const [userDetail, setuserDetail] = useState(
    localStorage.getItem("userDetail")
      ? localStorage.getItem("userDetail")
      : "{}"
  );

  const setUserDetail = (item: any) => {
    setuserDetail(item);
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
