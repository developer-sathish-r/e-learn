import { loginFalse } from "../../../Redux/CreateAction";
import { CgProfile } from "react-icons/cg";
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import React, { memo } from 'react';
import { GrOverview } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { Layout, Menu, theme, Button } from 'antd';
import MentorOverview from "../Overview";
import MentorProfile from "../Profile";
import { useDispatch } from "react-redux";
const { Header, Content, Sider } = Layout;

const MentorHome = memo(() => {
    const dispatch = useDispatch()
    const redirect = useNavigate()    
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onFinish = () => {
        dispatch(loginFalse());
    redirect('/')
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsed={true}>
                <div className="demo-logo-vertical flex flex-col">
                    <Menu theme="dark" onClick={(value) => {
                        redirect(value.key)
                    }} selectedKeys={(window.location.pathname === "/mentor/overview") ? ['/mentor/overview'] : ""} mode="inline" items={[
                        {
                            key: '/mentor/overview',
                            icon: <GrOverview />,
                            label: 'Overview',
                        },
                    ]} />
                    <Menu theme="light" mode="inline" onClick={(value) => {
                        redirect(value.key)
                    }}
                        selectedKeys={(window.location.pathname === "/mentor/profile") ? ['/mentor/profile'] : ""}
                        items={[
                            {
                                key: '/mentor/profile',
                                icon: <CgProfile />,
                                label: 'Profile',
                            }
                        ]} />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}

                >
                    <div className="flex justify-between">
                        <h1>
                            {
                                ((window.location.pathname).includes("/overview") ? "Overview" : (window.location.pathname).includes("/mycourses") ? "My Courses" : (window.location.pathname).includes("/explore") ? "Explore" : (window.location.pathname).includes("/notification") ? "Notification" : "Profile")
                            }
                        </h1>
                        <Link to="/"><Button onClick={onFinish} size="large" className="logoutBtn" htmlType="submit">
                            <IoIosLogOut />Logout
                        </Button>
                        </Link>
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '20px 20px',
                    }}
                ><Routes>
                        <Route path="/mentor/overview" element={<MentorOverview />} />
                        <Route path="/mentor/profile" element={<MentorProfile />} />
                        <Route path="/*" element={<MentorOverview />} />
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    );
})
export default MentorHome;