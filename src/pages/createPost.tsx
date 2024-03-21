import { useContext, useState } from "react";
import LeafletMap from "../components/leaflet/leaflet";
import { postRegister } from "../services/posts";
import { myContext } from "../context/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface MyContextValue {
  userDetail: any;
}

const CreatePost = () => {
  const [position, setPosition] = useState({
    lat: 35.7,
    lng: 51.4,
  });
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { userDetail } = useContext(myContext) as MyContextValue;

  const postCreate = () => {
    setLoading(true);

    if (address && des && position && userDetail?.phoneNumber) {
      const obj = {
        address,
        coordinates: position,
        phoneNumber: userDetail?.phoneNumber,
        description: des,
      };

      const response: any = postRegister(obj);

      setLoading(false);

      if (response) {
        toast.success("ثبت آگهی با موفقیت انجام شد");
        navigate("/");
      } else {
        toast.error("!مشکلی در ثبت آگهی رخ داده است");
      }
    } else {
      toast.error("لطفا اطلاعات را تکمیل کنید");
    }
  };

  return (
    <>
      <div className=" w-full h-screen flex justify-center items-center ">
        <section className=" rounded-2xl w-[60%] h-auto border border-gray-500 shadow shadow-slate-700 mt-[6%] p-5 flex flex-col">
          <article className=" w-full flex flex-row-reverse justify-between items-center ">
            <span> : آدرس </span>

            <textarea
              dir="rtl"
              onChange={(e) => setAddress(e.target.value)}
              className=" w-[90%] h-[100px] border border-gray-300 rounded-xl p-5 resize-none"
            ></textarea>
          </article>

          <article className=" w-full flex justify-between items-center flex-row-reverse my-5">
            <span> : توضیحات </span>

            <textarea
              dir="rtl"
              onChange={(e) => setDes(e.target.value)}
              className=" w-[90%] !h-[100px] border border-gray-300 rounded-xl p-5 resize-none"
            ></textarea>
          </article>

          <article className=" w-full flex flex-col  items-end">
            <span className="w-full flex justify-end mb-3"> : مختصات محل</span>
            <div className=" w-full">
              <LeafletMap
                setPosition={setPosition}
                position={position}
                canDrag={true}
              />
            </div>
          </article>

          <article className=" w-full flex justify-center items-center mt-2">
            <button
              className=" rounded-lg bg-green-400 justify-center items-center flex py-1 px-5"
              disabled={loading}
              onClick={() => postCreate()}
            >
              ثبت آگهی
            </button>
          </article>
        </section>
      </div>
    </>
  );
};
export default CreatePost;
