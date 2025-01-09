import { Badge, Button, Col, Input, Modal, notification, Row, Form } from "antd";
import { useForm } from 'antd/es/form/Form';
import axios from "axios";
import { DatePicker, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Books } from "../../../Assets/SVGs/Icons/book.svg";
import { ReactComponent as Delete } from "../../../Assets/SVGs/Icons/actions/delete.svg";
import { ReactComponent as Edit } from "../../../Assets/SVGs/Icons/actions/edit.svg";
import { ReactComponent as Email } from "../../../Assets/SVGs/Icons/email.svg";
import { ReactComponent as Goals } from "../../../Assets/SVGs/Icons/goals.svg";
import { ReactComponent as Graph } from "../../../Assets/SVGs/Icons/graph.svg";
import { ReactComponent as LinkedIn } from "../../../Assets/SVGs/Icons/linkedin.svg";
import { ReactComponent as Medal } from "../../../Assets/SVGs/Icons/medal.svg";
import { ReactComponent as Security } from "../../../Assets/SVGs/Icons/security.svg";
import { ReactComponent as Settings } from "../../../Assets/SVGs/Icons/settings.svg";
import { ReactComponent as Male } from "../../../Assets/SVGs/Icons/male.svg";
import { API_BASE_URL, COLORS } from "../../../Config/variables";
import { userData } from "../user";
import { PrimaryButton, SecondaryButton } from "../../../Components/index"

const UserProfile = memo(() => {
    const dataObject = useSelector((state) => state);
    const [activeTab, setActiveTab] = useState(0);
    const [form] = useForm();
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const [data, setData] = useState()
    const [modal, setModal] = useState()
    const [open, setOpen] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [naturalSway, setNaturalSway] = useState({ x: 0, y: 0 })
    const params = useParams();
    const [selectedFile, setSelectedFile] = useState();
    const [modalText, setModalText] = useState();
    const [confirmLoading, setConfirmLoading] = useState(false);


    const getUserById = async (data) => {
        const response = await axios.get(`${API_BASE_URL}/api/get/user/${data}`);
        if (response?.data?.data?._id) {
            await console.log(response);
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

    const onFinish = async (data) => {
        const response = await axios.patch(`${API_BASE_URL}/api/edit/profileCard/${params.id}`, {
            ...data,
            date_of_birth: data.date_of_birth.$d,
            role : dataObject?.token?.success.profile?.role,
            password : dataObject?.token?.success.profile?.password
        })
        await getUserById(params?.id)
        await setEdit(false)
        await console.log(response);

    }

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');


    };
    const deleteUserById = async (data) => {
        const response = await axios.delete(`${API_BASE_URL}/api/deleteById/${data}`);
        if (response.data.success) {
            notification.success(
                {
                    message: " Success",
                    description:
                        "User deleted Successfully !",
                }
            )
            await setOpen(false)
            await redirect("/admin/lists/User")
        }
        else {
            notification.error(
                {
                    message: "Error",
                    description:
                        "User Deletion Failed !",
                }
            )
        }

    }
    const handleCancel = () => {
        form.resetFields()
        setOpen(false);
    };

    useEffect(() => {
        if (edit) {
            const date_of_birth = new Date(data?.profile?.date_of_birth)
            form.setFieldsValue({
                name: data?.profile?.name,
                email: data?.profile?.email,
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


    const renderContent = (content, index) => {
        switch (index) {
            case 0:
                const date = new Date(data?.profile?.profile_image?.createdAt)
                const date_of_birth = new Date(data?.profile?.date_of_birth)
                if (edit) {
                    return (
                        <div>
                            <Form layout="vertical" onFinish={onFinish} form={form}>
                                <Form.Item
                                    name="phone_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter Phone',
                                        },
                                        {
                                            pattern: /^[0-9]{10}$/,
                                            message: "Enter only 10 digit Numbers"
                                        },
                                    ]}
                                    style={{
                                        width: 400
                                    }}
                                >
                                    <Input size='large' enableSearch placeholder="Enter Phone" />
                                </Form.Item>
                                <Form.Item
                                    name="date_of_birth"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Date of Birth',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        value={data?.profile?.name}
                                        placeholder="Enter your Date Of Birth" size="large" />
                                </Form.Item>
                                <Form.Item name="gender">
                                    <Select placeholder="Select your Gender" >
                                        <Select.Option value="male">Male</Select.Option>
                                        <Select.Option value="female">Female</Select.Option>
                                        <Select.Option value="transgender">Transgender</Select.Option>
                                        <Select.Option value="not_preferred">Not Preferred</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="branch">
                                    <Select placeholder="Select your Branch" >
                                        <Select.Option value="madurai">Madurai</Select.Option>
                                        <Select.Option value="kovilpatti">Kovilpatti</Select.Option>
                                        <Select.Option value="coimbatore">Coimbatore</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    )
                }
                return (
                    <div>
                        <Row>
                            <Col span={12}>
                                <h1 className="text-xl py-5 font-bold">Phone</h1>
                                <h3>
                                    {data?.profile?.phone_number ? data?.profile?.phone_number : "---"}
                                </h3>
                            </Col>
                            <Col>
                                <h1 className="text-xl py-5 font-bold">Date Of Birth</h1>
                                <h3>
                                    {data?.profile?.date_of_birth ? date_of_birth.toLocaleDateString('en-GB') : "---"}
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <h1 className="text-xl text-wrap py-5 font-bold">Account Created At</h1>
                                <h3>
                                    {
                                        date ? (date).toLocaleDateString('en-GB') : "---"


                                    }
                                </h3>
                            </Col>
                            <Col>
                                <h1 className="text-xl py-5 font-bold">Created By</h1>
                                <h3>
                                    Mari Ganesh B
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <h1 className="text-xl py-5 font-bold">Branch</h1>
                                <h3>
                                    {
                                        data?.profile?.branch ? data?.profile?.branch?.toUpperCase() : " ---"
                                    }
                                </h3>
                            </Col>
                            <Col>
                                <h1 className="text-xl py-5 font-bold">Gender</h1>
                                <h3>
                                    {data?.profile?.gender ? data?.profile?.gender?.toUpperCase() : "---"}
                                </h3>
                            </Col>
                        </Row>
                        <h1 className="text-xl py-5 font-bold">Linked In</h1>
                        <h3>
                            {
                                data?.profile?.linkedin ? data?.profile?.linkedin : " ---"
                            }
                        </h3>




                    </div>
                );
            case 1:
                return (
                    <div>
                        <p><strong>Weekly Goals:</strong> {userData.personalGoals?.weeklyGoals}</p>
                        <p><strong>Progress:</strong> {userData.personalGoals?.progress}</p>
                        <p><strong>Preferred Learning Mode:</strong> {userData.personalGoals?.preferredMode}</p>
                        <p><strong>Skill Focus:</strong> {userData.personalGoals?.skillFocus.join(", ")}</p>
                    </div>
                );
            case 2:
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
                                    onChange={(e) => handleInputChange("oldPassword", e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 border rounded"
                                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full px-3 py-2 border rounded"
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Update Password
                            </button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>Enrolled Courses</h3>
                        {content?.enrolledCourses.map((course, i) => (
                            <div key={i}>
                                <p>{course.name} - {course.progress}</p>
                                <p>Start Date: {course.startDate}, Completion: {course.estimatedCompletion}</p>
                            </div>
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3>Certificates</h3>
                        {content?.certificates?.map((cert, i) => (
                            <p key={i}>{cert.title} - {cert.date}</p>
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p>Total Hours: {content?.totalHours}</p>
                        <p>Last Active: {content?.lastActive}</p>
                    </div>

                );
            default:
                return null;
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const time = Date.now() / 1000;
            setNaturalSway({
                x: Math.sin(time) * 2,
                y: Math.cos(time * 0.8) * 2
            });
        }, 16);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        if (!isHovered) return;

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleProfileUpdate = async (e) => {
        await setSelectedFile(e.target.files[0]);
    };
    useEffect(() => {
        (async () => {
            await (selectedFile) ? handleUpload() : setSelectedFile("")
        })()
    }, [selectedFile])
    const handleUpload = async () => {
        const formData = await new FormData();
        await formData.append("image", selectedFile);

        try {
            await console.log(formData);
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
            setSelectedFile("")

        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload the file. Please Give Valid File.");
        }
    }



    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };
    const showModal = (values, id) => {
        if (values === "Delete") {
            setModal(values)
            setOpen(id);
        }
        else {
            setModal(values);
            setOpen(true)
        }
    };

    return (
        <>
            <div className="bg-white-100">
                <Form layout="vertical" onFinish={onFinish} form={form}>

                    <div className="container">
                        <div className="grid grid-cols-4  sm:grid-cols-12 gap-6 px-4">
                            <div
                                className={`w-80 col-span-3 p-10 h-[80vh] bg-gradient-to-br  rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-out ${isHovered ? "scale-105" : ""}`}
                                style={{
                                    transform: `perspective(1000px) rotateX(${isHovered ? rotation.x : naturalSway.x}deg) rotateY(${isHovered ? rotation.y : naturalSway.y}deg)`,
                                    // transition: isHovered ? "transform 0.1s ease-out" : "transform 1s ease-out"
                                }}
                            >
                                {/* Header Section */}

                                <Row className="justify-between p-5">
                                    {
                                        edit ? <>
                                            <SecondaryButton label="Cancel" onClick={() => setEdit(false)} />
                                        </> :
                                            <Edit className="bg-white" height={25} width={25} onClick={() => setEdit(true)} />
                                    }
                                    {

                                        dataObject.token.success.profile.role === "admin" ?
                                            <Delete onClick={() => showModal("Delete", params.id)} height={25} width={25} /> : <></>
                                    }
                                </Row>
                                <div className="flex flex-col items-center">
                                    <div class="relative hidden overflow-hidden rounded-full lg:block">
                                        {
                                            data?.profile?.profile_image?.uploaded_file ? <img class="relative h-40 w-40 rounded-full" src={data.profile?.profile_image?.uploaded_file} alt="data?.profile?.profile_image?.name" /> : <Male className="w-40 h-40" />}
                                        {
                                            edit ? <>
                                                <label for="desktop-user-photo" class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                                                    <span>Change</span>
                                                    <span class="sr-only"> user photo</span>
                                                    <Input type="file" accept=".gif,.jpg,.jpeg,.png" onChange={handleProfileUpdate} id="desktop-user-photo" name="user-photo" className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
                                                </label>
                                            </> : <></>
                                        }
                                    </div>
                                    {
                                        edit ?
                                            <div className="p-5">
                                                <Form.Item
                                                    name="name"
                                                    rules={[{ required: true, message: 'Please input your Name!' }, { pattern: /^[a-zA-Z\s]+$/, message: 'Please Enter valid Name!' }]}
                                                >
                                                    <Input size='large' placeholder="Enter your Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="linkedin"
                                                    rules={[{ required: true, message: 'Please input your Name!' }]}
                                                >
                                                    <Input size='large' placeholder="Enter your LinkedIn URL :" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    rules={[{ required: true, message: 'Please input your Email!' }, { pattern: /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/, message: 'Please enter valid email!' }]}
                                                >
                                                    <Input size='large' placeholder="Enter your Email" />
                                                </Form.Item>

                                            </div>
                                            :
                                            <>
                                                <h1 className="text-xl font-bold">{
                                                    data?.profile?.name ? data?.profile?.name : "---"
                                                }</h1>
                                                <p className="text-gray-700">Software Developer</p>
                                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                                    <Email width={30} height={30} />
                                                    <LinkedIn width={35} height={35} />
                                                </div>
                                            </>
                                    }</div>
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                                </div>
                            </div>
                            <div
                                className={`w-[90vh] col-span-7 p-10 h-[80vh] bg-gradient-to-br  rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-out ${isHovered ? "scale-105" : ""}`}
                                style={{
                                    transform: `perspective(1000px) rotateX(${isHovered ? rotation.x : naturalSway.x}deg) rotateY(${isHovered ? rotation.y : naturalSway.y}deg)`,
                                    transition: isHovered ? "transform 0.1s ease-out" : "transform 1s ease-out"
                                }}
                            >
                                <div className="absolute top-0 p-5 left-0 w-full h-full">
                                    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                                    <Badge.Ribbon color="purple" text={data?.profile?.role}>
                                    </Badge.Ribbon>


                                    <div className="h-[64vh]">
                                        <h1 className="text-xl font-bold">{
                                            data?.profile?.name ? data?.profile?.name : "---"
                                        }</h1>
                                        <h3>
                                            {data?.profile?.email}
                                        </h3>
                                        <hr className="my-6 border-t border-gray-300" />
                                        <div >
                                            {renderContent(tabs[activeTab]?.content, activeTab)}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-span-2 justify-center">
                                <nav className="flex flex-wrap rounded-2xl justify-center sm:justify-start gap-2 mb-4">
                                    {tabs.map((tab, index) => {
                                        return (
                                            <Button block
                                                htmlType="submit"
                                                style={buttonStyle}
                                                onMouseEnter={() => setIsHovered(true)}
                                                key={index}
                                                onMouseLeave={() => setIsHovered(false)}
                                                onClick={() => setActiveTab(index)}
                                            >
                                                <tab.icon width="23" className=" mr-2" />
                                                {tab.text}
                                            </Button>
                                        );
                                    })}
                                </nav>

                            </div>

                        </div>
                    </div>
                    <Row justify="end">
                        <Col span={7} className="p-5">
                            {
                                edit ? <SecondaryButton htmlType="submit" label="Submit" /> : <></>
                            }
                        </Col>
                    </Row>
                </Form>
            </div>
            <Modal
                title={modal}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                {
                    (modal === "Delete" || modal === "DeleteSelected") &&
                    <>
                        <span>
                            Are  you Sure you want to Delete?
                        </span>
                        <Row className="justify-end">
                            <Col className="p-5">
                                <Button type="primary" onClick={
                                    () => {
                                        deleteUserById(open)
                                    }
                                }>
                                    Delete
                                </Button>
                            </Col>
                            <Col className="p-5">
                                <Button onClick={() => handleCancel()}>
                                    cancel
                                </Button>
                            </Col>
                        </Row>
                    </>
                }
            </Modal></>

    );
});

export default UserProfile;