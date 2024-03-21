const Pagination = ({ totalPage, handlePageChange, page }) => {
  return (
    <>
      <article className=" w-auto border border-gray-500 flex flex-row-reverse ">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`${
              page == p && "bg-sky-200"
            } border border-gray-300 py-2 px-3 `}
          >
            {p}
          </button>
        ))}
      </article>
    </>
  );
};

export default Pagination;
