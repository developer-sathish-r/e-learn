import React, { useState, useEffect } from "react";
import { ReactComponent as Forword } from "../../Assets/SVGs/Icons/actions/forword_arrow.svg";
import { ReactComponent as Back } from "../../Assets/SVGs/Icons/actions/back_arrow.svg";

const Pagination = ({ totalPages = 1, initialPage = 1, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [initialPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            if (onPageChange) onPageChange(page); 
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primaryColor-500 transition-all duration-200 ${currentPage === i
                        ? "bg-primaryColor-500 text-white font-bold"
                        : "bg-white text-black hover:bg-gray-200"
                        }`}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-5">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div className="flex items-center mb-4 sm:mb-0">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full bg-white text-primaryColor-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryColor-500 transition-all duration-200 mr-2"
                        aria-label="Go to previous page"
                    >
                        <Back className="w-7 h-7 mx-auto" />
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full bg-white text-primaryColor-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryColor-500 transition-all duration-200 ml-2"
                        aria-label="Go to next page"
                    >
                        <Forword className="w-7 h-7 mx-auto" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
