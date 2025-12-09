import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className='min-h-screen'>
            {/* <Navbar></Navbar> */}
            Navbar Here 
            {/* <Outlet></Outlet> */}
            Footer Here
        </div>
    );
};

export default HomeLayout;