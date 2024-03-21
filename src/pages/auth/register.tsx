/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-misleading-character-class */
"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myContext } from "../../context/context";
import { userLogin, userRegister } from "../../services/auth";

interface FormData {
  username: string;
  password: string;
  phoneNumber: string;
}

interface MyContextValue {
  setAccess: React.Dispatch<React.SetStateAction<boolean>>;
  setUserDetail: React.Dispatch<React.SetStateAction<object>>;
}

const Register = () => {
  const [loading, setLoading] = useState(false);

  const { setAccess, setUserDetail } = useContext(myContext) as MyContextValue;

  const navigate = useNavigate();

  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .min(11)
      .required("please enter your phone number"),
    username: yup
      .string()
      .required("please enter your username")
      .matches(
        /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u0020\u2000-\u200F\u2028-\u202F\u06A9\u06AF\u06BE\u06CC\u0629\u0643\u0649-\u064B\u064D\u06D5\sa-zA-Z]+$/,
        "Username is incorrect!"
      ),
    password: yup.string().required("password is required!"),
    // .min(8, "Password must be at least 8 characters!")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const obj = {
      phoneNumber: data.phoneNumber.toString(),
      username: data.username,
      password: data.password,
    };

    const objCheck = {
      phoneNumber: data.phoneNumber.toString(),
    };

    const res: any = await userLogin(objCheck);

    if (res.data?.length != 0) {
      toast.error("!این کاربر وجود دارد");

      setLoading(false);
    } else {
      const response: any = await userRegister(obj);

      setLoading(false);

      if (response) {
        toast.success(".خوش آمدید");

        setAccess(true);
        localStorage.setItem("access", JSON.parse("true"));
        setUserDetail(response.data);

        navigate("/");
      } else {
        toast.error("مشکلی پیش آمده است! لطفا دوباره تلاش کنید.");
      }
    }
  };

  return (
    <>
      <div className=" flex  items-center justify-center w-full  h-screen">
        <div className=" bg-gray-200 rounded-3xl h-[65%] w-[25%] flex flex-col items-center justify-start ">
          <span className=" font-bold text-xl h-[25%] flex justify-center items-center">
            خوش آمدید
          </span>
          <form
            className=" flex flex-col justify-center items-center  w-full "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="bg-white opacity-100 border border-1 border-rel-blue  w-[90%] h-[60px] max-sm:w-[85%] max-sm:h-[40px] mb-1 focus:outline-none pl-3 rounded-lg "
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            <p className=" text-xs mb-1 font-dana text-red-700 z-50">
              {errors.phoneNumber?.message}
            </p>

            <input
              type="text"
              className="bg-white opacity-100 border border-1 border-rel-blue  w-[90%] h-[60px] max-sm:w-[85%] max-sm:h-[40px] mb-1 focus:outline-none pl-3 rounded-lg "
              placeholder="Username"
              {...register("username")}
            />
            <p className=" text-xs mb-1 font-dana text-red-700 z-50">
              {errors.username?.message}
            </p>

            <input
              type="password"
              className="bg-white opacity-100 border border-1 border-rel-blue  w-[90%] h-[60px] focus:outline-none pl-3 max-sm:w-[85%] max-sm:h-[40px] rounded-lg"
              placeholder="Password"
              {...register("password")}
            />

            <p className=" text-xs mt-2 text-red-700 z-50 mb-2">
              {errors.password?.message}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="text-white bg-[#0377C1] flex justify-center items-center w-[90%] h-[60px] rounded-md mr-2 max-sm:mr-0  bg-rel-blue max-sm:w-[85%] max-sm:h-[40px]"
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
