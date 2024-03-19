import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPosts } from "../services/posts";

const MainPage = () => {
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

  return <></>;
};

export default MainPage;
