import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(false);
  }, []);

  return (
    <header className=" w-full flex justify-between p-5 border-b border-gray-200 fixed z-50">
      {isLogin ? (
        <>
          <span className=" p-2 rounded-lg border border-gray-400 flex justify-center items-center">
            mmd
          </span>

          <NavLink
            to={"/"}
            className=" font-semibold text-lg rounded-lg  shadow-md shadow-slate-800 bg-sky-50 p-2 flex justify-center items-center"
          >
            سایت آگهی مسکن
          </NavLink>

          <button
            className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center"
            onClick={() => navigate("/createPost")}
          >
            ثبت آگهی
          </button>
        </>
      ) : (
        <>
          <article className="flex">
            <button
              className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center mx-3"
              onClick={() => navigate("/auth/register")}
            >
              ثبت نام
            </button>

            <button
              className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center"
              onClick={() => navigate("/auth/login")}
            >
              ورود
            </button>
          </article>

          <NavLink
            to={"/"}
            className=" font-semibold text-lg rounded-lg  shadow-md shadow-slate-800 bg-sky-50 p-2 flex justify-center items-center"
          >
            سایت آگهی مسکن
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Header;
