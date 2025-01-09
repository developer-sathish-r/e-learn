import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { notification } from "antd"; 
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard"; 
import ExperienceSection from "./ExperienceSection"; 
import { API_BASE_URL } from "../../../Config/variables"; 
const UserProfile = () => {
    const params = useParams();
    const [data, setData] = useState(null);
  
    const [selectedFile, setSelectedFile] = useState(null);


    const getUserById = useCallback(async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/get/user/${id}`);
            if (response?.data?.data?._id) {
                setData(response?.data?.data);
            } else {
                notification.error({ message: "Error", description: "User Not Found!" });
            }
        } catch (error) {
            notification.error({ message: "Error", description: error.message });
        }
    }, []);


    const handleProfileUpdate = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    
    const handleUpload = useCallback(async () => {
        if (!selectedFile) return; 
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/upload/profile/${params.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload response:", response);
            alert("File uploaded successfully!");
            setSelectedFile(null); 
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload the file. Please give a valid file.");
        }
    }, [selectedFile, params.id]);


    useEffect(() => {
        if (params?.id) {
            getUserById(params?.id); 
        }
    }, [params?.id, getUserById]); 

  
    useEffect(() => {
        if (selectedFile) {
            handleUpload(); 
        }
    }, [selectedFile, handleUpload]); 

  

    return (
        <div>
            <div className="bg-white border border-gray-300 rounded-lg shadow relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-6 border-r m-10">
                        <ProfileCard user={data?.profile} />
                    </div>
                    <div className="col-span-2 p-6">
                        <ExperienceSection user={data?.profile} />
                    </div>
                </div>
         
            </div>
        </div>
    );
};

export default UserProfile;
