import React from 'react';
import { createBrowserRouter } from 'react-router';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home/Home';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    }
])

export default router;