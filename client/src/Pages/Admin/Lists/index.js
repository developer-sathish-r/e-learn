import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    notification,

    Row
} from 'antd';
import axios from "axios";
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Add } from "../../../Assets/SVGs/Icons/actions/add.svg";
import { ReactComponent as Back } from "../../../Assets/SVGs/Icons/actions/back_arrow.svg";
import { ReactComponent as Male } from "../../../Assets/SVGs/Icons/male.svg";
import { ReactComponent as View } from "../../../Assets/SVGs/Icons/actions/view.svg";
import { ReactComponent as Delete } from "../../../Assets/SVGs/Icons/actions/delete.svg";
import { ReactComponent as Search } from "../../../Assets/SVGs/Icons/actions/search.svg";

import { PrimaryButton, SecondaryButton } from "../../../Components";
import Pagination from "../../../Components/Pagination";


import { API_BASE_URL } from "../../../Config/variables";
import UserForm from '../../Forms/AddUserForm';


const Lists = memo(() => {
    const id = useParams();
    const redirect = useNavigate();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const [modal, setModal] = useState();
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filtered = dataSource.filter((user) =>
            user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getAllUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/getall`);
        console.log('response: ', response);
        const users = response.data.data.filter((data, index) => {
            if (data.basic_details.role.toLowerCase() === id.role.toLowerCase()) {
                data.key = index;
                return data;
            }
        });
        setDataSource(users);
        setFilteredData(users);
    };

    const handleFormSubmit = async (values) => {
        const rawResponse = await axios.post(`${API_BASE_URL}/api/`, {
            email: values.email,
            password: values.password,
            name: values.name,
            role : id.role.toLowerCase(),
            phone_number: values.Phone
        }, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (rawResponse.data.success) {
            notification.success({
                message: "Success",
                description: "User added successfully!",
            });
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 1000);
            form.resetFields();
            getAllUsers();
        } else {
            notification.error({
                message: "Error",
                description: "Something went wrong.",
            });
        }
    };

    const deleteUserById = async (data) => {
        const response = await axios.delete(`${API_BASE_URL}/api/deleteById/${data}`);
        if (response.data.success) {
            notification.success({
                message: "Success",
                description: "User deleted successfully!",
            });
            setSelectedRowKeys([]);
            setOpen(false);
            getAllUsers();
        } else {
            notification.error({
                message: "Error",
                description: "User deletion failed.",
            });
        }
    };

    const deleteSelectedUsers = async () => {
        for (const key of selectedRowKeys) {
            await deleteUserById(key);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const formatEmail = (email) => {
        const username = email && email.split('@')[0] || '';
        return `@${username}`;
    }

    return (
        <div className="h-screen">
            {/* section 1 */}
            <Row justify="space-between" className="px-7 pt-7">
                <Col>
                    <SecondaryButton
                        label="Back"
                        onClick={() => redirect(-1)}
                        ReactComponent={Back}
                    />
                </Col>
                <Col>
                    <Row className="gap-5">
                        <Col>
                            <style>
                                {`
                                    .custom-search {
                                        border-radius: 8px;
                                        overflow: hidden;
                                        border: none;
                                        outline: 2px solid red;
                                        // box-shadow: 0 0 0 2px #3b82f6; 
                                        border-radius: 8px;
                                    }

                                    .custom-search .ant-btn-primary {
                                        background-color: #3b82f6; 
                                        border-color: #3b82f6;
                                    }

                                    .custom-search .ant-btn-primary:hover {
                                        background-color: #2563eb; 
                                        border-color: #2563eb;
                                    }
                                `}
                            </style>

                            <div className="hidden md:flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        className="bg-white text-primaryColor-500 h-10 w-52 px-5 rounded-md  outline-none ring-1 ring-primaryColor-500 "
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                        </Col>
                        <Col>
                            <PrimaryButton
                                label="Add"
                                onClick={() => {setModal(`Add ${id?.role}`)
                                 setOpen(true)}}
                                ReactComponent={Add}
                                iconPosition='right'
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Divider />
            {/* section 2 */}
            <div className="grid grid-cols-1 gap-8 m-8 md:grid-cols-2 xl:grid-cols-4">
                {paginatedData.map((profile) => (
                    <div key={profile?.basic_details._id} className="relative flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-primaryColor-500 rounded-xl shadow-xl hover:shadow-2xl">
                        <Male className="object-cover w-32 h-32 p-3 rounded-full ring-4 ring-gray-300 text-primaryColor-500 group-hover:text-white mx-auto" />
                        <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize text-center group-hover:text-white">
                            {profile?.basic_details.name}
                        </h1>
                        <p className="mt-2 text-gray-500 capitalize text-center group-hover:text-gray-300">
                            {formatEmail(profile?.basic_details.email)}
                        </p>

                        <div className="flex justify-center gap-4 mt-4">
                            <View
                                className="w-6 h-6 text-primaryColor-500 group-hover:text-white cursor-pointer"
                                onClick={() => redirect(`/admin/profile/${profile?._id}`)}
                            />
                            <Delete
                                className="w-6 h-6 text-red-500 group-hover:text-white cursor-pointer"
                                onClick={() => {
                                    setModal("Delete");
                                    setOpen(profile?._id);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>



            {/* section 3 */}
            {/* <div className="absolute bottom-12 right-16">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={filteredData.length}
                    onChange={handlePageChange}
                    className="rounded-full px-4 py-2"
                />
            </div> */}
            <div className="absolute bottom-12 right-16">
                {
                    paginatedData.length >0 ? <Pagination
                    totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                    initialPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)} // Custom callback for page change
                /> : <></>
                }
            </div>

            {console.log('modal: ', modal)}
            <Modal
                title={modal}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    form.resetFields();
                    setOpen(false);
                }}
                footer={null}
            >
                {(modal === "Add User" || modal==="Add Mentor" || modal==="Add Course" || modal==="Add Admin") && <UserForm formName={`add_${id.role.toLowerCase()}`} form={form} onFinish={handleFormSubmit} />}
                {modal === "Delete" && (
                    <>
                        <p>Are you sure you want to delete this user?</p>
                        <Row justify="end">
                            <Col className="p-5">
                                <Button type="primary" onClick={() => deleteUserById(open)}>Delete</Button>
                            </Col>
                            <Col className="p-5">
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                            </Col>
                        </Row>
                    </>
                )}

                {modal === "DeleteSelected" && (
                    <>
                        <p>Are you sure you want to delete selected users?</p>
                        <Row justify="end">
                            <Col className="p-5">
                                <Button type="primary" onClick={deleteSelectedUsers}>Delete</Button>
                            </Col>
                            <Col className="p-5">
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Modal>
        </div>
    );
});

export default Lists;
