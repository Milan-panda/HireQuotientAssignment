import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

const Pagination = ({
  totalData,
  dataPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div>
        <p className="font-semibold">Page {currentPage} of {pages.length}</p>
      </div>
      <div>
        <button
          onClick={() => setCurrentPage(1)}
          className={`first-page p-4 border-solid border-2 mx-2 rounded-full ${
            currentPage == 1 ? "pointer-events-none" : ""
          }`}
        >
          <FaAnglesLeft />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`previous-page p-4 border-solid border-2 mx-2 rounded-full ${
            currentPage == 1 ? "pointer-events-none" : ""
          }`}
        >
          <FaAngleLeft />
        </button>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={`${currentPage} px-4 py-2 border-solid border-2 mx-2 bg-blue-300 rounded-full ${
                page == currentPage ? "bg-white" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`next-page p-4 border-solid border-2 mx-2 rounded-full ${
            currentPage == pages.length ? "pointer-events-none" : ""
          }`}
        >
          <FaAngleRight />
        </button>
        <button
          onClick={() => setCurrentPage(pages.length)}
          className={`last-page p-4 border-solid border-2 mx-2 rounded-full ${
            currentPage == pages.length ? "pointer-events-none" : ""
          }`}
        >
          <FaAnglesRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;
