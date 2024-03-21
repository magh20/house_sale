const PostCart = ({ item }: any) => {
  return (
    <article className=" mt-5 w-full lg:w-[23%] h-[150px] rounded-2xl flex flex-col justify-center items-center border border-gray-400 p-3  shadow-md shadow-slate-500">
      <img
        src="/images/defaultCamera.svg"
        alt="default camera"
        className=" w-full h-[60%] mb-2"
      />

      <span className=" w-full h-[40%] flex justify-end flex-wrap">
        {item.address}
      </span>
    </article>
  );
};

export default PostCart;
