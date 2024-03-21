import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, postDelete, postEdit } from "../services/posts";
import { toast } from "react-toastify";
import { myContext } from "../context/context";
import LeafletMap from "../components/leaflet/leaflet";
import Modal from "../components/Modal";

interface MyContextValue {
  userDetail: any;
}

const PostDetail = () => {
  const { userDetail } = useContext(myContext) as MyContextValue;

  const postId = useParams().postId.toString();
  const navigate = useNavigate();

  const [data, setData] = useState<any>({});
  const [admin, setAdmin] = useState(false);
  const [editable, setEditable] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [des, setDes] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState({
    lat: 35.7,
    lng: 51.4,
  });

  const getData = async () => {
    const obj = { id: postId };

    const response = await getPost(obj);

    if (response.data?.length != 0) {
      setData(response.data[0]);

      response.data[0]?.coordinates &&
        setPosition(response.data[0]?.coordinates);
    } else {
      toast.error("!پستی وجود ندارد");
    }
  };

  useEffect(() => {
    getData();
  }, [postId]);

  useEffect(() => {
    userDetail && data
      ? data.phoneNumber == JSON.parse(userDetail)?.phoneNumber
        ? setAdmin(true)
        : setAdmin(false)
      : null;
  }, [data, userDetail]);

  const handleDelete = async () => {
    const response = await postDelete(data?.id);

    if (response.data?.length != 0) {
      toast.success("حذف آگهی با موفقیت انجام شد");
      setDelConfirm(false);
      navigate("/");
    } else {
      toast.error("!مشکلی وجود دارد");
    }
  };

  const handleEdit = async (id: string) => {
    const obj = {
      address: address ? address : data?.address,
      description: des ? des : data?.description,
      coordinates: position ? position : data?.coordinates,
    };

    const response = await postEdit(id, obj);

    if (response.data?.length != 0) {
      setEditable(false);
      toast.success("ویرایش با موفقیت انجام شد");
      getData();
    } else {
      toast.error("!مشکلی وجود دارد");
    }
  };

  const handleCancel = () => {
    setAddress("");
    setPosition({
      lat: 35.7,
      lng: 51.4,
    });
    setDes("");
    setEditable(false);
  };

  return (
    <>
      <div className=" w-full h-screen pt-[7%] flex justify-center">
        <section className=" w-[90%] h-[95%] border border-gray-400 rounded-2xl p-5 ">
          {/* buttons */}
          {admin && (
            <article className="flex w-full justify-end h-[6%] mb-5">
              {editable ? (
                <>
                  <button
                    className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center mx-3"
                    onClick={() => handleEdit(data.id)}
                  >
                    ثبت تغییرات
                  </button>

                  <button
                    className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center"
                    onClick={() => handleCancel()}
                  >
                    لغو
                  </button>
                </>
              ) : (
                <>
                  <button
                    className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center mx-3"
                    onClick={() => setEditable(true)}
                  >
                    ویرایش
                  </button>

                  <button
                    className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center"
                    onClick={() => setDelConfirm(true)}
                  >
                    حذف آگهی
                  </button>
                </>
              )}
            </article>
          )}

          {/* informations */}
          <article className=" w-full h-[40%] flex flex-col ">
            <div className=" flex flex-row-reverse w-full justify-between items-center">
              <span>: شماره تماس </span>
              <span
                className="
             rounded-lg w-[80%] h-[40px]  px-3"
              >
                {data?.phoneNumber}
              </span>
            </div>

            <div className=" flex flex-row-reverse w-full justify-between items-center my-5">
              <span>: آدرس</span>
              {editable ? (
                <input
                  type="text"
                  dir="rtl"
                  defaultValue={data?.address}
                  onChange={(e) => setAddress(e.target.value)}
                  className=" border border-gray-300 rounded-lg w-[80%] h-[40px] flex items-center px-3"
                />
              ) : (
                <span className=" border border-gray-300 rounded-lg w-[80%] h-[40px] flex items-center px-3 justify-end">
                  {data?.address}
                </span>
              )}
            </div>

            <div className=" flex flex-row-reverse w-full justify-between items-center ">
              <span>: توضیحات</span>
              {editable ? (
                <input
                  type="text"
                  dir="rtl"
                  defaultValue={data?.description}
                  onChange={(e) => setDes(e.target.value)}
                  className=" border border-gray-300 rounded-lg w-[80%] h-[40px] flex items-center px-3"
                />
              ) : (
                <span className=" border border-gray-300 rounded-lg w-[80%] h-[40px] flex items-center px-3 justify-end">
                  {data?.description}
                </span>
              )}
            </div>
          </article>

          {/* map */}
          <article className=" w-full flex flex-col  items-end h-[50%]">
            <span className="w-full flex justify-end mb-3"> : مختصات محل</span>
            <div className=" w-full">
              <LeafletMap
                setPosition={setPosition}
                position={position}
                canDrag={editable}
              />
            </div>
          </article>
        </section>

        {delConfirm && (
          <Modal handleDelete={handleDelete} setDelConfirm={setDelConfirm} />
        )}
      </div>
    </>
  );
};

export default PostDetail;
