import React, { memo } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../../../Pages/User/Home/Layout/Main";

import UserCourse from '../Courses/index';
import UserExplore from "../Explore";
import UserNotifications from "../Notifications";
import Overview from "../Overview";
import UserProfile from "../Profile";
import NotFoundPage from "../../../Components/404/index" 
import Task from '../Courses/Level/Task';

const PrivateLayoutUser = memo(() => {


    return (
        <>
            <div className="App">
                <Main>
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/user/overview" element={<Overview />} />
                        <Route path="/user/notification" element={<UserNotifications />} />
                        <Route path="/user/profile/:id" element={<UserProfile />} />
                        <Route path="/user/explore" element={<UserExplore />} />
                        <Route path="/user/courses" element={<UserCourse />} />
                        <Route path="/user/courses/easy" element={<Task />} />
                        <Route path="/user/courses/intermediate" element={<Task />} />
                        <Route path="/user/courses/hard" element={<Task />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Routes>
                </Main>
            </div>
        </>
    );
})
export default PrivateLayoutUser;