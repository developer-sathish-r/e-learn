import React, { useCallback } from "react";
import { Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LinkButton, PrimaryButton } from "../../Components";
import { COLORS } from "../../Config/variables";
import AuthLayout from "./AuthLayout";
import UserForm from "../Forms/AddUserForm";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword] = Form.useForm()
    const handleSubmit = useCallback((values) => {
        notification.info({
            message: "Forgot Password",
            description: `Password reset link sent to ${values.Email}.`,
        });
    }, []);

    return (
        <AuthLayout>
            <h1 className="mb-8 font-extrabold text-3xl lg:text-4xl text-center text-primaryColor-500">Forgot Password</h1>
            <UserForm form={forgotPassword}  onFinish={handleSubmit} form_name={"forgot_password"} />
        </AuthLayout>
    );
};

export default ForgotPassword;