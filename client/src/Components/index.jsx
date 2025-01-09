import React from "react";
import { Button, Form, Input } from 'antd';
import { COLORS } from '../Config/variables';


export const CustomButton = ({ style, type = "primary", block = false, children, ...rest }) => (
    <Button
        style={{
            padding: type === "link" ? "0" : "auto",
            ...style,
        }}
        type={type}
        block={block}
        {...rest}
    >
        {children}
    </Button>
);

export const PrimaryButton = ({
    className = "",
    onClick,
    label = null,
    ReactComponent: Icon = null,
    iconPosition = "left",
    style
}) => {
    return (
        <button
            className={`px-6 py-2 text-white bg-primaryColor-500 border border-transparent rounded hover:text-primaryColor-500 hover:bg-white hover:border-primaryColor-500  transition-all duration-300 flex items-center justify-center gap-2 ${className}`}
            onClick={onClick}
            style={style}
        >
            {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
            {label && <span>{label}</span>}
            {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
        </button>
    );
};

export const SecondaryButton = ({
    className = "",
    onClick,
    label,
    ReactComponent: Icon = null,
    iconPosition = "left",
    style
}) => {
    return (
        <button
            className={`px-6 py-2 text-primaryColor-500 bg-white border border-primaryColor-500 rounded hover:bg-primaryColor-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 ${className}`}
            onClick={onClick}
            style={style}
        >
            {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
            <span>{label}</span>
            {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
        </button>
    );
};

export const LinkButton = ({
    className = "",
    onClick,
    label = "",
    ReactComponent: Icon = null,
    iconPosition = "left",
}) => {
    return (
        <button
            className={`px-6 py-2 text-primaryColor-500 underline transition-all duration-300 flex items-center justify-center gap-2 ${className}`}
            onClick={onClick}
        >
            {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
            <span>{label}</span>
            {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
        </button>
    );
};


export const FormInput = ({ name, rules, placeholder, type = "text", style = {}, prefix, iconRender }) => (
    <Form.Item name={name} rules={rules}>
        {type === "password" ? (
            <Input.Password
                size="large"
                style={{ borderColor: COLORS.PRIMARY_COLOR, color: COLORS.PRIMARY_COLOR }}
                prefix={prefix}
                placeholder={placeholder}
                iconRender={iconRender}
            />
        ) : (
            <Input size="large" style={{ borderColor: COLORS.PRIMARY_COLOR, color: COLORS.PRIMARY_COLOR }} prefix={prefix} placeholder={placeholder} />
        )}
    </Form.Item>
);
const CustomComponent = {
    CustomButton,
    PrimaryButton,
    SecondaryButton,
    LinkButton,
    FormInput
};

export default CustomComponent;