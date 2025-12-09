import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { RouterProvider } from 'react-router';

const AppWrapper = ({ router }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingSpinner />
    }

    return <RouterProvider router={router} />;
};

export default AppWrapper;