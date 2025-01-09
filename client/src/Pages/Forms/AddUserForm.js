import { useState, useCallback } from "react";
import { Button, Form, Radio } from 'antd';
import { FormInput } from '../../Components';
import { COLORS, REGEX_EMAIL, REGEX_PASSWORD } from '../../Config/variables';
import { ReactComponent as Lock } from "../../Assets/SVGs/Icons/auth/lock.svg";
import { ReactComponent as User } from "../../Assets/SVGs/Icons/auth/user-circle.svg";
import { ReactComponent as Opened } from "../../Assets/SVGs/Icons/auth/eye-closed.svg";
import { ReactComponent as Closed } from "../../Assets/SVGs/Icons/auth/eye-opened.svg";

const UserForm = ({ form, onFinish, formName,role }) => {
    const [selectedRole, setSelectedRole] = useState(role);

    const  renderRoleSelector = useCallback(() => (
        <Form.Item
            name="Role"
            label="Role"
            rules={[{ required: true, message: 'Please select your role' }]}
        >
            <Radio.Group onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
                <Radio value="admin">Admin</Radio>
                <Radio value="mentor">Mentor</Radio>
            </Radio.Group>
        </Form.Item>
    ), [selectedRole]);
    
    return (
        <>
            <Form layout="vertical" form={form} onFinish={(values)=>onFinish(values,selectedRole?selectedRole : "user")}>
                {
                    (formName === "login" || formName === "forgot_password" || formName === "add_mentor" || formName === "add_user") &&
                    <FormInput
                        name="email"
                        placeholder="Enter Email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { pattern: REGEX_EMAIL, message: "Invalid email format" },
                        ]}
                        style={{ borderColor: COLORS.PRIMARY_COLOR, color: COLORS.PRIMARY_COLOR }}
                        prefix={<User width={22} height={22} />}
                    />
                }
                {
                    (formName === "login" || formName === "add_user" || formName === "add_mentor") &&
                    <FormInput
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            {
                                pattern: REGEX_PASSWORD,
                                message: "Password must contain uppercase, lowercase, number, and special character.",
                            },
                        ]}
                        style={{ borderColor: COLORS.PRIMARY_COLOR, color: COLORS.PRIMARY_COLOR }}
                        prefix={<Lock width={22} height={22} />}
                        iconRender={(visible) =>
                            visible ? <Closed width={22} height={22} /> : <Opened width={22} height={22} />
                        }
                    />}
                {
                    (formName === "add_user" || formName === "add_mentor") &&
                    <FormInput
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                },
                            }),
                        ]}
                        style={{ borderColor: COLORS.PRIMARY_COLOR, color: COLORS.PRIMARY_COLOR }}
                        prefix={<Lock width={22} height={22} />}
                        iconRender={(visible) =>
                            visible ? <Closed width={22} height={22} /> : <Opened width={22} height={22} />
                        }
                    />}
                {window.location.pathname === "/mentorhome" && renderRoleSelector()}

                <Button type="primary" htmlType="submit" className="submit-btn">
                    Submit
                </Button>
            </Form>
        </>
    )
};

export default UserForm;