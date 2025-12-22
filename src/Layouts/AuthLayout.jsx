import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import LogoFull from '../Components/Logo/LogoFull';
import Logo from '../Components/Logo/Logo';
import AuthContent from '../Components/Shared/AuthContent/AuthContent';

const AuthLayout = () => {
    return (
        <div>
            <div className='relative z-50'>
                <Logo></Logo>
            </div>
            <div className='flex bg-gradient-to-br from-blue-600 to-purple-700'>
                <Outlet></Outlet>
                <div className=' w-1/2 min-h-screen hidden lg:block'>
                    <AuthContent />
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AuthLayout;