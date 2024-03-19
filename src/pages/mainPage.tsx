import { useContext, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { myContext } from "../context/context";
import { toast } from "react-toastify";
import { getPosts } from "../services/posts";

interface MyContextValue {
  access: boolean;
  userDetail: any;
}
const MainPage = () => {
  const { access } = useContext(myContext) as MyContextValue;

  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await getPosts();

    if (response.data?.length != 0) {
      setData(response.data);
    } else {
      toast.error("!پستی وجود ندارد");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header userStatus={access} />
    </>
  );
};

export default MainPage;
