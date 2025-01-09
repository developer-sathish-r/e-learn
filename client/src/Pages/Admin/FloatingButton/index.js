import { FloatButton, Layout } from 'antd';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ReactComponent as Add } from "../../../Assets/SVGs/Icons/actions/add.svg";
import { ReactComponent as Logout } from "../../../Assets/SVGs/Icons/auth/logout.svg";
import { ReactComponent as ProfileIcon } from "../../../Assets/SVGs/Icons/sidebar/profile.svg";
import { loginFalse } from "../../../Redux/CreateAction";
import Dashboard from "../Dashboard";
import Lists from "../Lists";
import Profile from "../Profile";

const handleLogout = (dispatch,redirect) => {
    dispatch(loginFalse());
    redirect("/")
};

const { Content } = Layout;
const AdminHome = memo(() => {
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const userData = useSelector((state) => state.token.success);
    const onLogout = useCallback(() => handleLogout(dispatch), [dispatch]);
   

    const FloatingButton = memo(({ userData, onLogout }) => (
        <>
            <FloatButton.Group
                key={"top"}
                trigger="click"
                placement={"top"}
                icon={<Add className="w-5 h-5 text-primaryColor-500" key="up" />}
            >
                <FloatButton icon={<ProfileIcon className="w-5 h-5 text-primaryColor-500" onClick={() => redirect(`/admin/profile/${userData._id}`)} />} />
                <FloatButton icon={<Logout className="w-5 h-5 text-primaryColor-500" />} onClick={() => handleLogout(dispatch,redirect)} />
            </FloatButton.Group></>
    ));
    return (
        <Layout className="">
            <FloatingButton userData={userData} onLogout={onLogout} />
            <Layout>
                <Content>
                    <Routes>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/lists/:role" element={<Lists />} />
                        <Route path="/admin/profile/:id" element={<Profile />} />
                        <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
});

export default AdminHome;