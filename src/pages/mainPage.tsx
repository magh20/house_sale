import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPosts } from "../services/posts";
import PostCart from "../components/posts/PostCart";
import Pagination from "../components/Pagination";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getData = async () => {
    const obj = {
      _limit: 12,
      _page: page,
    };

    const response = await getPosts(obj);

    if (response.data?.length != 0) {
      setData(response.data);
      setTotalPage(Math.ceil(parseInt(response.headers["x-total-count"]) / 12));
    } else {
      toast.error("!پستی وجود ندارد");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <main className="w-full pt-[6%] px-5 h-screen flex flex-col">
      <section className=" w-full flex justify-between items-start flex-wrap h-auto lg:h-[530px]  ">
        {data?.map((item: any) => (
          <PostCart item={item} />
        ))}
      </section>

      <section className=" w-full flex justify-center items-center mt-7">
        <Pagination
          totalPage={totalPage}
          handlePageChange={handlePageChange}
          page={page}
        />
      </section>
    </main>
  );
};

export default MainPage;
