import React, { useEffect, useState } from 'react';
import { userData } from "../user";
import UserForm from "../../Forms/AddUserForm";
import { Form, Input, DatePicker, Select, Button, Row, Col, notification } from 'antd';
import { API_BASE_URL, COLORS } from "../../../Config/variables";
import { useParams } from 'react-router';
import axios from "axios";
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';

function ExperienceSection({ user }) {
    const dataObject = useSelector((state) => state);
    const [activeTab, setActiveTab] = useState('Details');
    const [activeSubTab, setActiveSubTab] = useState('Details');
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState()
    const params = useParams();
    const [selectedFile, setSelectedFile] = useState();
    const [form] = useForm();


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const courses = [
        {
            title: "Version Control",
            issuer: "Meta",
            grade: "93.75%",
        },
        {
            title: "Project Execution: Running the Project",
            issuer: "Google",
            grade: "87.20%",
        },
        {
            title: "Advanced React",
            issuer: "Meta",
            grade: "89.20%",
        },
        {
            title: "React Native",
            issuer: "Meta",
            grade: "91.31%",
        },
        {
            title: "Developing Back-End Apps with Node.js and Express",
            issuer: "IBM",
            grade: "88.33%",
        },
    ];

    function CourseCard({ title, issuer, grade }) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-gray-600">{issuer}</p>
                    <p className="text-sm text-gray-600 font-medium">Grade Achieved: {grade}</p>
                </div>
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Add to LinkedIn
                </button>
            </div>
        );
    }


    const getUserById = async (data) => {
        const response = await axios.get(`${API_BASE_URL}/api/get/user/${data}`);
        if (response?.data?.data?._id) {
            await console.log("getuserByID", response);
            await setData(response?.data?.data);
        }
        else {
            await notification.error(
                {
                    message: "Error",
                    description: "User Not Found!",
                }
            )
        }
    }

    useEffect(() => {
        if (edit) {
            const date_of_birth = new Date(data?.profile?.date_of_birth)
            form.setFieldsValue({
                name: data?.profile?.name,
                email: data?.profile?.email,
                password: data?.profile?.password,
                linkedin: data?.profile?.linkedin,
                phone_number: data?.profile?.phone_number,
                branch: data?.profile?.branch,
                gender: data?.profile?.gender
            })
        }
    }, [edit])


    useEffect(() => {
        (async () => {
            await getUserById(params?.id)
        })()
    }, [])


    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            formData.forEach((value, key) => {
                console.log(key, value);
            });


            const response = await axios.post(
                `${API_BASE_URL}/api/upload/profile/${params.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Upload response:", response);
            alert("File uploaded successfully!");

            setSelectedFile(null);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload the file. Please provide a valid file.");
        }
    };


    const onFinish = async (data) => {
        const dateOfBirth = data.date_of_birth ? data.date_of_birth.toDate() : null;

        const response = await axios.patch(`${API_BASE_URL}/api/edit/profileCard/${params.id}`, {
            ...data,
            date_of_birth: dateOfBirth,
            role: dataObject?.token?.success.profile?.role,
            password: dataObject?.token?.success.profile?.password
        })
        await getUserById(params?.id)
        await setEdit(false)
        await console.log(response);

    }

    const renderSubTabContent = () => {
        switch (activeSubTab) {

            case 'Desigin':
                return (
                    <div>
                        <p>Subcontent</p>
                    </div>
                )
            case 'Assign':
                return <p className="text-gray-500 text-sm">Here</p>;
            case 'Active':
                return (
                    <div>
                        <h3>Enrolled Courses</h3>
                        {/* Example: Fetch user-enrolled courses dynamically */}
                        {userData.learningProgress?.enrolledCourses?.map((course, i) => (
                            <div key={i}>
                                <p>{course.name} - {course.progress}</p>
                                <p>Start Date: {course.startDate}, Completion: {course.estimatedCompletion}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'Completed':
                return (

                    <div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Version Control (Meta)</h3>
                            <p className="text-gray-500 text-sm">Completed December 2023</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Capstone: Applying Project Management</h3>
                            <p className="text-gray-500 text-sm">Completed September 2023</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Agile Project Management</h3>
                            <p className="text-gray-500 text-sm">Completed August 2023</p>
                        </div>
                        <div>
                            <h3>Certificates</h3>
                            <div className="bg-gray-100 min-h-screen p-8">
                                <div className="max-w-3xl mx-auto space-y-6">
                                    {courses.map((course, index) => (
                                        <CourseCard
                                            key={index}
                                            title={course.title}
                                            issuer={course.issuer}
                                            grade={course.grade}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                );

            case 'Summary':
                return (
                    <div>
                        <p>Total Hours: {userData.achievements?.totalHours}</p>
                        <p>Last Active: {userData.achievements?.lastActive}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':

                return (
                    <div>

                        {edit ?
                            <div>
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    form={form}
                                >
                                    <Row gutter={16}>
                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                value={user?.email}
                                                rules={[{ message: 'Please enter your email!' }]}
                                            >
                                                <Input
                                                    type="email"
                                                    size="large"
                                                    placeholder="Enter your email"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="password"
                                                label="Password"
                                                Value={user?.password}
                                                rules={[{ message: 'Please enter your password!' }]}
                                            >
                                                <Input.Password
                                                    size="large"
                                                    placeholder="Enter your password"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="name"
                                                label="Name"
                                                value={user?.name}
                                                rules={[{ required: true, message: 'Please enter your name!' }]}
                                            >
                                                <Input size="large" placeholder="Enter your name" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="phone_number"
                                                label="Phone No"
                                                value={user?.phone_number}
                                                rules={[
                                                    { required: true, message: 'Please enter your phone number!' },
                                                    { pattern: /^[0-9]{10}$/, message: 'Enter only 10 digit Numbers' },
                                                ]}
                                            >
                                                <Input
                                                    type="tel"
                                                    size="large"
                                                    placeholder="Enter phone number"
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="dob"
                                                label="Date of Birth"
                                                value={user?.date_of_birth}
                                                rules={[{ required: true, message: 'Please select your date of birth!' }]}
                                            >
                                                <DatePicker size="large" placeholder="Enter your date of birth" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="qualification"
                                                label="Qualification"
                                                value="B.E"
                                                rules={[{ required: true, message: 'Please enter your qualification!' }]}
                                            >
                                                <Input size="large" placeholder="Enter your qualification" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="report_to"
                                                label="Report To"
                                                value="Ganapathy"
                                                rules={[{ required: true, message: 'Please enter your report to!' }]}
                                            >
                                                <Input size="large" placeholder="Enter the person you report to" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="interested"
                                                label="Interested"
                                                value="HTML & CSS"
                                                rules={[{ required: true, message: 'Please enter your interest!' }]}
                                            >
                                                <Input size="large" placeholder="Enter your interest" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="upload"
                                                label="Upload"
                                            >
                                                <Input type="file" size="large" onChange={handleFileChange} />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="linkedin"
                                                label="LinkedIn"
                                            >
                                                <Input size="large" placeholder="Enter your LinkedIn profile URL" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24} md={12}>
                                            <Form.Item
                                                name="github"
                                                label="GitHub"
                                            >
                                                <Input size="large" placeholder="Enter your GitHub profile URL" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            style={{ marginRight: '10px' }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            type="default"
                                            size="large"
                                            onClick={() => form.resetFields()}
                                        >
                                            Reset
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            :
                            <>
                                {user ? (
                                    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">Email:</strong>
                                                <span className="text-gray-800">{user?.email}</span>
                                            </div>
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">Password:</strong>
                                                <span className="text-gray-800">{user?.password}</span>
                                            </div>
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">Name:</strong>
                                                <span className="text-gray-800">{user?.name}</span>
                                            </div>
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">Phone No:</strong>
                                                <span className="text-gray-800">{user?.phone_number}</span>
                                            </div>
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">DOB:</strong>
                                                <span className="text-gray-800">{user?.date_of_birth}</span>
                                            </div>
                                            <div className="flex justify-between mb-4 border-b pb-4">
                                                <strong className="text-gray-600">Report To:</strong>
                                                <span className="text-gray-800">Ganapathy</span>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <strong className="text-gray-600">Interested In:</strong>
                                                <span className="text-gray-800">HTML & CSS</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div>Loading user data...</div>)}
                            </>
                        }
                    </div>
                );

            case 'Courses':
                return (
                    <div>
                        {/* Horizontal Sub-Tabs Aligned to the Left */}
                        <div className="grid justify-start space-x-4 mb-4 border-b pb-2">
                            {['Assign', 'Active', 'Completed', 'Summary'].map((subTab) => (
                                <button
                                    key={subTab}
                                    className={`px-4 py-2 text-base font-medium ${activeSubTab === subTab
                                        ? 'border-b-2 border-blue-500 text-blue-500'
                                        : 'text-gray-500 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveSubTab(subTab)}
                                >
                                    {subTab}
                                </button>
                            ))}
                        </div>

                        {/* Render SubTab Content */}
                        {renderSubTabContent()}
                    </div>

                );
            case 'Edu & Exp':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Education</h2>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold">Bachelor's Degree</h3>
                            <p className="text-gray-600 text-sm">Google Project Management Professional Certificate</p>
                            <p className="text-gray-500 text-sm mt-2">Completed September 2023</p>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Experience</h2>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold">Capstone: Applying Project Management</h3>
                            <p className="text-gray-600 text-sm">Completed December 2023</p>
                            <p className="text-gray-500 text-sm mt-2">Project Management, Problem Solving, Quality Management, and more</p>
                        </div>
                    </>
                );
            case 'Security':
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Update Password</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-1">Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter old password"
                                    className="w-full px-3 py-2 border rounded"
                                    onChange={(e) => (userData.security.oldPassword = e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 border rounded"
                                    onChange={(e) => (userData.security.newPassword = e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full px-3 py-2 border rounded"
                                    onChange={(e) => (userData.security.confirmPassword = e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Update Password
                            </button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleEdit = () => {
        setEdit(true)
    }

    const handleRest = () => {
        form.resetFields()
    };

    const handleProfileUpdate = async (e) => {
        await setSelectedFile(e.target.files[0]);
    };
    useEffect(() => {
        (async () => {
            await (selectedFile) ? handleUpload() : setSelectedFile("")
        })()
    }, [selectedFile])



    return (
        <>
            <div className="mb-6">
                <div className="flex justify-center mb-4">
                    {["Details", 'Courses', 'Edu & Exp', 'Security'].map((tab) => (
                        <button key={tab} className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {renderTabContent()}
            </div>

            <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                onClick={handleEdit}  >
                Edit
            </button>

        </>
    );
}

export default ExperienceSection;
