import { Button, Form, Modal, notification } from 'antd';
import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Add } from "../../../Assets/SVGs/Icons/actions/add.svg";
import { ReactComponent as Admin } from "../../../Assets/SVGs/Icons/admin_dashboard/admin.svg";
import { ReactComponent as Course } from "../../../Assets/SVGs/Icons/admin_dashboard/course.svg";
import { ReactComponent as Mentor } from "../../../Assets/SVGs/Icons/admin_dashboard/mentor.svg";
import { ReactComponent as User } from "../../../Assets/SVGs/Icons/admin_dashboard/user.svg";
import { ReactComponent as List } from "../../../Assets/SVGs/Icons/list.svg";

import { PrimaryButton, SecondaryButton } from '../../../Components';
import { API_BASE_URL } from "../../../Config/variables";
import UserForm from '../../Forms/AddUserForm';



const Dashboard = memo(() => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/getall`);
            setUserData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const calculateCounts = () => {
        return userData.reduce((acc, cur) => {
            acc[cur.basic_details.course] = (acc[cur.basic_details.course] || 0) + 1;
            acc[cur.basic_details.role] = (acc[cur.basic_details.role] || 0) + 1;
            return acc;
        }, {});
    };

    const counts = calculateCounts();

    const handleModalOpen = (action) => {
        setSelectedAction(action);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values) => {
        console.log("inside");
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/`, values, {
                headers: { 'Accept': 'application/json' },
            });

            if (response.data.success) {
                notification.success({ message: "Success", description: "User added successfully!" });
                setConfirmLoading(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setConfirmLoading(false);
                }, 1000);
                form.resetFields();
                fetchUserData();
            } else {
                notification.error({ message: "Error", description: "Invalid credentials provided." });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            notification.error({ message: "Error", description: "An unexpected error occurred." });
        }
    };

    const mappingData = [
        {
            id: "Add User",
            name: "User",
            count: counts.user || 0,
            icon: <User className="w-45 h-45 p-5 rounded-full border-2 border-primaryColor-500" />
        },
        {
            id: "Add Mentor",
            name: "Mentor",
            count: counts.mentor || 0,
            icon: <Mentor className="w-45 h-45 p-5 rounded-full border-2 border-primaryColor-500" />
        },
        {
            id: "Add Admin",
            name: "Admin",
            count: counts.admin || 0,
            icon: <Admin className="w-45 h-45 p-5 rounded-full border-2 border-primaryColor-500" />
        },
        {
            id: "Add Course",
            name: "Course",
            count: counts.course || 0,
            icon: <Course className="w-44 h-44 p-5 rounded-full border-2 border-primaryColor-500" />
        }
    ];

    return (
        <section className="">
            <div className="h-screen flex justify-center items-center">
                <div className="flex flex-col gap-5">
                    <div className="grid gap-5 lg:grid-cols-2">
                        {mappingData.map((data) => (
                            <div key={data.name} className="group h-96 w-96 [perspective:1000px]">
                                <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 h-full w-full rounded-xl bg-white flex flex-col items-center justify-center gap-4 [backface-visibility:hidden] text-primaryColor-500">
                                        {data.icon}
                                        <p className="text-2xl font-bold text-primaryColor-500">{data.name}s</p>
                                        <p className="text-5xl font-semibold text-gray-600">{data.count}</p>
                                    </div>
                                    <div className="absolute inset-0 h-full w-full rounded-xl bg-white px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                        <div className="absolute inset-0 h-full w-full rounded-xl bg-white flex flex-col items-center justify-center gap-4 [backface-visibility:hidden] text-primaryColor-500">
                                            {data.icon}
                                            <p className="text-2xl font-bold text-primaryColor-500">{data.name}</p>
                                            <div className="flex items-center justify-center gap-4">
                                                <PrimaryButton label="Add" onClick={() => handleModalOpen(data.id)} ReactComponent={Add} iconPosition="left" />
                                                <SecondaryButton label="List" onClick={() => navigate(`/admin/lists/${data.name}`)} ReactComponent={List} iconPosition="right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                title={selectedAction}
                open={isModalOpen}
                confirmLoading={confirmLoading}
                onCancel={handleModalClose}
                footer={null}>
                {selectedAction === "Add User" && <UserForm formName={"add_user"} form={form} onFinish={handleFormSubmit} />}
                {selectedAction === "Add Mentor" && (
                    <>
                        <Button>User to Mentor</Button>
                        <Button onClick={() => setSelectedAction("Add User")}>Add Mentor</Button>
                    </>
                )}
                {selectedAction === "Add Admin" && (
                    <>
                        <Button>Mentor to Admin</Button>
                        <Button>Add Admin</Button>
                    </>
                )}
            </Modal>
        </section>
    );
});

export default Dashboard;
