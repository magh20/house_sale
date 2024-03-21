const Modal = ({ setDelConfirm, handleDelete }) => {
  return (
    <>
      <div
        className=" w-screen h-screen  absolute flex justify-center items-start p-5 z-40"
        onClick={() => setDelConfirm(false)}
      >
        <section className=" w-[25%] h-[20%] rounded-lg bg-gray-300 shadow-xl shadow-gray-400 p-5 flex !z-50 items-center flex-col">
          <article>آیا از حذف آگهی مطمئن هستید؟</article>

          <article className="mt-5 flex justify-center">
            <button
              className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center mx-3"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              بله
            </button>

            <button
              className=" py-1 px-3 rounded-lg bg-green-500 flex justify-center items-center"
              onClick={() => setDelConfirm(false)}
            >
              لغو
            </button>
          </article>
        </section>
      </div>
    </>
  );
};

export default Modal;
