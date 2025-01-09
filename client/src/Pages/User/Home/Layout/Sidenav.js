import React, { memo, useMemo, useEffect, useState } from "react";
import { Divider } from "antd";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { loginFalse } from "../.././../../Redux/CreateAction";
import { ReactComponent as Explore } from "../../../../Assets/SVGs/Icons/sidebar/explore.svg";
import { ReactComponent as Mycourses } from "../../../../Assets/SVGs/Icons/sidebar/mycourses.svg";
import { ReactComponent as Notification } from "../../../../Assets/SVGs/Icons/sidebar/notification.svg";
import { ReactComponent as Overview } from "../../../../Assets/SVGs/Icons/sidebar/overview.svg";
import { ReactComponent as Certificate } from "../../../../Assets/SVGs/Icons/sidebar/certificate.svg";
import { ReactComponent as Logout } from "../../../../Assets/SVGs/Icons/auth/logout.svg";
import { useNavigate, useLocation } from "react-router";
import { COLORS } from "../../../../Config/variables";

const Sidebar = ({ onTabClick, logOut }) => {
  const [activeTab, setActiveTab] = useState("");
  const id = useSelector((obj) => obj.token.success._id);

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const buttonStyle = {
    backgroundColor: isHovered ? COLORS.WHITE : COLORS.PRIMARY_COLOR[500],
    color: isHovered ? COLORS.PRIMARY_COLOR[500] : COLORS.WHITE,
    border: isHovered ? `1px solid ${COLORS.PRIMARY_COLOR[500]}` : `1px solid transparent`,
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab") || "overview";
    setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const matchedTab = tabItems.find((tab) => path.includes(tab.path))?.key || "overview";
    setActiveTab(matchedTab);
  }, [location]); 

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    localStorage.setItem("activeTab", tab.key); // Save active tab to local storage
    onTabClick(tab);
    navigate(tab.path);
  };

  const tabItems = useMemo(
    () => [
      {
        key: "overview",
        label: "Overview",
        path: "/user/overview",
        icon: <Overview width={25} height={25} />,
      },
      {
        key: "courses",
        label: "Courses",
        path: "/user/courses",
        icon: <Mycourses width={25} height={25} />,
      },
      {
        key: "explore",
        label: "Explore",
        path: "/user/explore",
        icon: <Explore width={25} height={25} />,
      },
      {
        key: "notification",
        label: "Notifications",
        path: "/user/notification",
        icon: <Notification width={25} height={25} />,
      },
      {
        key: "profile",
        label: "Profile",
        path: `/user/profile/${id}`,
        icon: <CgProfile size={25} />,
      },
    ],
    [id]
  );

  const profileTab = tabItems.find((tab) => tab.key === "profile");
  const mainTabs = tabItems.filter((tab) =>
    ["overview", "courses", "explore", "notification"].includes(tab.key)
  );

  const onFinish = () => {
    dispatch(loginFalse());
    navigate("/Login");
  };

  return (
    <div className="relative flex flex-col justify-between h-screen w-20 p-3 bg-white shadow-lg">
      {/* Top Section with Certificate */}
      <div className="flex flex-col items-center space-y-2">
        <Certificate width={40} height={40} />
        <Divider />
      </div>

      {/* Middle Section with Tabs */}
      <div className="flex flex-col items-center space-y-4">
        {mainTabs.map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onClick={handleTabClick}
          />
        ))}
      </div>

      {/* Bottom Section with Profile and Logout */}
      <div className="flex flex-col items-center space-y-2">
        <Divider />
        <TabItem
          tab={profileTab}
          isActive={activeTab === profileTab.key}
          onClick={handleTabClick}
        />
        <button
          style={buttonStyle}
          className="w-full p-3 text-sm font-semibold text-white bg-red-500 rounded-lg"
          onClick={logOut}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Logout onClick={onFinish} width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

const TabItem = memo(({ tab, isActive, onClick }) => {
  return (
    <div
      onClick={() => onClick(tab)}
      className="relative flex flex-col justify-center items-center cursor-pointer"
    >
      {isActive && (
        <div
          className="absolute top-0 h-16 w-1 bg-primaryColor-500"
          style={{ right: "-20px" }}
        />
      )}
      <div
        className={`flex justify-center items-center w-12 h-12 rounded-xl drop-shadow-md ${isActive
            ? "bg-primaryColor-500 text-white"
            : "bg-gray-100 text-primaryColor-500 border border-primaryColor-500 hover:bg-primaryColor-500 hover:text-white"
          }`}
      >
        {tab.icon}
      </div>
      <h1 className="mt-2 font-semibold text-xs text-center text-primaryColor-500">
        {tab.label}
      </h1>
    </div>
  );
});

export default Sidebar;
