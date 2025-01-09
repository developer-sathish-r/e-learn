import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidenav"; // Import Sidebar component

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For responsive toggle

  const handleTabClick = useCallback(
    (tab) => {
      setActiveTab(tab.key);
      navigate(tab.path);
    },
    [navigate]
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-20" : "w-0"
          } transition-all duration-300 bg-gray-100 shadow-lg lg:w-20 flex-shrink-0`}
      >
        <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
      {children}
        
      </div>
    </div>
  );
};

export default UserLayout;
