import React, { useState, useCallback } from "react";
import { Form, Input, notification, Radio } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkButton, PrimaryButton } from "../../Components";
import axios from "axios";
import { API_BASE_URL, COLORS, REGEX_EMAIL, REGEX_PASSWORD } from "../../Config/variables";
import { loginTrue, storeToken } from "../../Redux/CreateAction";
import AuthLayout from "./AuthLayout";
import { ReactComponent as LoginIcon } from "../../Assets/SVGs/Icons/auth/login.svg";
import { ReactComponent as User } from "../../Assets/SVGs/Icons/auth/user-circle.svg";
import { ReactComponent as Lock } from "../../Assets/SVGs/Icons/auth/lock.svg";
import { ReactComponent as Closed } from "../../Assets/SVGs/Icons/auth/eye-closed.svg";
import { ReactComponent as Opened } from "../../Assets/SVGs/Icons/auth/eye-opened.svg";
import UserForm from "../Forms/AddUserForm";

const Login = () => {
    // const [selectedRole, setSelectedRole] = useState("user");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginForm] = Form.useForm()

    const handleLogin = useCallback(async (formValues,selectedRole) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, {
                email: formValues.email,
                password: formValues.password,
                role: selectedRole,
            });
            
            if (response.data.success) {
                const loginData = response.data;
                notification.success({
                    message: "Login Successful",
                    description: "Welcome!",
                });
                dispatch(storeToken(loginData));
                dispatch(loginTrue());
                navigate("/dashboard");
            } else {
                notification.error({
                    message: "Login Failed",
                    description: "Invalid credentials. Please try again.",
                });
            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Login Error",
                description: "An error occurred during login. Please try again.",
            });
        }
    }, [dispatch, navigate]);


    return (
        <AuthLayout>
            <h1 className="mb-8 font-extrabold text-3xl lg:text-4xl text-center text-primaryColor-500">Login</h1>
          
            <UserForm onFinish={handleLogin} form={loginForm} formName={"login"} />
            <LinkButton
                label="Forgot Password?"
                onClick={() => navigate("/forgot-password")}
                iconPosition="left"
                className="text-end"
            />
        </AuthLayout>
    );
};

export default Login;