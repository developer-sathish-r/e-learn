import React, { useState } from "react";
import Certificate from "./Certificate ";

const CompletedDataTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCertificate, setSelectedCertificate] = useState(null); 
    const rowsPerPage = 5;

    const data = [
        {
            courseName: "HTML & CSS",
            assignedBy: "John Brown",
            reviewedBy: "Jim Green",
            timeToComplete: 8,
            completedAt: "2025-01-01",
            certificateUrl: "certificate-html-css.pdf"
        },
        {
            courseName: "JS",
            assignedBy: "Alice Johnson",
            reviewedBy: "Joe Black",
            timeToComplete: 10,
            completedAt: "2025-01-02",
            certificateUrl: "certificate-js.pdf"
        },
        {
            courseName: "React JS",
            assignedBy: "Edward King",
            reviewedBy: "Jim Red",
            timeToComplete: 12,
            completedAt: "2025-01-03",
            certificateUrl: "certificate-react-js.pdf"
        },
        // Additional data...
    ];

    const filteredData = data.filter((row) =>
        row.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleViewCertificate = (certificate) => {
        setSelectedCertificate(certificate);
    };

    const handleCloseModal = () => {
        setSelectedCertificate(null);
    };

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="min-w-full align-middle border rounded-lg divide-y divide-gray-200 shadow">
                    {/* Search Bar */}
                    <div className="py-3 px-4">
                        <div className="relative max-w-xs">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="py-2 px-3 pl-10 block w-full border-gray-200 rounded-lg shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search for courses"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                    Course Name
                                </th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                    Assigned By
                                </th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                    Reviewed By
                                </th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                    Time to Complete (hours)
                                </th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                    Completed At
                                </th>
                                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                    Certificate
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedData.map((row, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        {row.courseName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {row.assignedBy}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {row.reviewedBy}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {row.timeToComplete}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {row.completedAt}
                                    </td>
                                    <td className="px-6 py-4 text-end text-sm font-medium">
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                            onClick={() => handleViewCertificate(row)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="py-2 px-4 flex justify-end space-x-1">
                        <button
                            className="px-3 py-2 text-sm rounded-full hover:bg-gray-100"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-2 text-sm rounded-full ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-100"
                                    }`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="px-3 py-2 text-sm rounded-full hover:bg-gray-100"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <Certificate
                    certificate={selectedCertificate}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default CompletedDataTable;
