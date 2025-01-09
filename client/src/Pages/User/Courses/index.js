import React, { useState, useEffect } from 'react';
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import ActiveCource from './Active';
import UpcomingCourse from './Completed';
import { API_BASE_URL, COLORS } from "../../../Config/variables";
import axios from "axios";
import { useSelector } from 'react-redux';

const Courses = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState();
    const id = useSelector((obj) => obj.token.success._id);

    const tabsData = [
        { icon: <IoMdHome />, title: 'Active', content: <ActiveCource data={data} /> },
        { icon: <IoMdPerson />, title: 'Completed', content: <UpcomingCourse  data={data}/> },
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        (async () => {
          const response = await axios.get(`${API_BASE_URL}/api/get/user/${id}`);
          await setData(response?.data?.data);
        })();
      }, []);

     
    return (
        <div className="max-w-full mx-auto">
            <div className="mb-4 flex space-x-1 border-solid border-indigo-500 bg-gray-100 p-1 rounded-lg">
                {tabsData.map((tab, index) => (
                    <button 
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`flex-1 flex items-center justify-center p-2 rounded-md transition-all duration-200 ${activeTab === index
                            ? 'bg-white text-primaryColor-500 shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md min-h-[200px]">
                <div>
                    <p>{tabsData[activeTab].content}</p>
                </div>
            </div>
        </div>
    );
};

export default Courses;