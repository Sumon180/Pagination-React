import React, { useState } from "react";

interface PaginationProps<T> {
  itemsPerPage: number;
  data: T[];
  render: (item: T) => React.ReactNode;
}

function Pagination<T>({ itemsPerPage, data, render }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];

    // Show at most 4 buttons
    const maxButtons = 5;

    // Calculate the middle page number
    const middlePage = Math.floor(maxButtons / 2);

    let startPage = currentPage - middlePage;
    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + maxButtons - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxButtons + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <li
          key={1}
          className="px-3 py-1 cursor-pointer bg-gray-200"
          onClick={() => handleClick(1)}
        >
          1
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li
            key="ellipsis1"
            className="px-3 py-1 cursor-pointer"
            onClick={() => handleClick(startPage - 1)}
          >
            ...
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`px-3 py-1 cursor-pointer ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li
            key="ellipsis2"
            className="px-3 py-1 cursor-pointer"
            onClick={() => handleClick(endPage + 1)}
          >
            ...
          </li>
        );
      }
      pageNumbers.push(
        <li
          key={totalPages}
          className="px-3 py-1 cursor-pointer bg-gray-200"
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index} className="border-b border-gray-300 py-2">
            {render(item)}
          </li>
        ))}
      </ul>
      <ul className="flex space-x-2 mt-4">{renderPagination()}</ul>
    </div>
  );
}

export default Pagination;
