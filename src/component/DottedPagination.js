import React, { useState, useEffect } from "react";
import axios from "axios";

const itemsPerPage = 1;
const displayedPages = 5; // number of page numbers to display

function DottedPagination() {
  const [items, setImage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
    setImage(res?.data);
  };

  const totalPages = Math.ceil(items?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - Math.floor(displayedPages / 2);
    if (startPage < 1) {
      startPage = 1;
    }
    let endPage = startPage + displayedPages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - displayedPages + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <li key="left-dots">
          <button disabled>&hellip;</button>
        </li>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </button>
        </li>
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="right-dots">
          <button disabled>&hellip;</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <ul className="dot">
        {currentItems?.map((item) => (
          <div>
            <li key={item.id}></li>
            <img src={item?.thumbnailUrl} alt="sdfgh" />
          </div>
        ))}
      </ul>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </div>
  );
}

export default DottedPagination;
