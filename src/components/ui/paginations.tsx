"use client";

import React, { useState } from "react";

interface PaginationProps {
  count: number; // total number of items
  limit?: number; // items per page (optional)
  onPageChange: (page: number) => void; // callback when page changes
}

const Pagination: React.FC<PaginationProps> = ({ count, limit = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(count / limit);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-2 text-sm">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg border ${
          currentPage === 1
            ? "text-gray-700 border-blue-700 cursor-not-allowed"
            : "hover:bg-blue-900 hover:text-gray-100 text-gray-700 border-blue-700"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded-lg border ${
              page === currentPage
                ? "bg-blue-700 text-gray-100"
                : "hover:bg-blue-900 border-blue-700 text-gray-700 hover:text-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg border ${
          currentPage === totalPages
            ? "text-gray-700 border-blue-700 cursor-not-allowed"
            : "hover:bg-blue-900 hover:text-gray-100 text-gray-700 border-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
