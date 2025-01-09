import React from "react";

const Certificate = ({ certificate, onClose }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = certificate.certificateUrl;
        link.download = `${certificate.courseName}_Certificate.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Certificate</h2>
                <p><strong>Course Name:</strong> {certificate.courseName}</p>
                <p><strong>Assigned By:</strong> {certificate.assignedBy}</p>
                <p><strong>Reviewed By:</strong> {certificate.reviewedBy}</p>
                <p><strong>Completed At:</strong> {certificate.completedAt}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
