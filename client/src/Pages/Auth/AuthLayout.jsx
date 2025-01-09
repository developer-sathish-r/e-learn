import React from 'react';
import loginBackgroundImage from "../../Assets/Images/login_bg.png";


const AuthLayout = ({ children }) => {

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-200'>
            <div className='flex flex-wrap justify-center items-center gap-8 md:flex-nowrap bg-white p-8 rounded-lg shadow-lg'>
                <div className='w-full max-w-md'>
                    <div className="px-10">{children}</div>
                </div>
                <div className='bg-primaryColor-500 w-full max-w-md p-8 text-white rounded-lg'>
                    <div className='text-center mb-4'>
                        <img className='w-100 h-100 rounded-full mx-auto' src={loginBackgroundImage} alt='Profile' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;