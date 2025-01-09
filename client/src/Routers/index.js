import React, { memo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import AdminHome from "../Pages/Admin/FloatingButton";
import MentorHome from "../Pages/Mentor/Dashboard";
import UserHome from "../Pages/User/Home";
import NotFoundPage from "../Components/404";

const Routing = memo(() => {
    const loginStatus = useSelector((data) => data.login)
    const user = useSelector((data) => data.token.success)

    return (
        <>
            <BrowserRouter>
                {
                    !loginStatus ?
                        <>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/mentorhome" element={<Login />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </> :
                        <>
                            {user?.basic_details?.role === "mentor" ?
                                <MentorHome /> :
                                user?.basic_details?.role === "admin" ?
                                    <AdminHome /> :
                                    user?.basic_details?.role === "user" ?
                                        <UserHome /> :
                                        <NotFoundPage />}

                        </>
                }
            </BrowserRouter>
        </>
    )
})
export default Routing;