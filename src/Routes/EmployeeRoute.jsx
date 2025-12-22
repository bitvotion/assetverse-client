import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Utilities/LoadingSpinner';


const EmployeeRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <LoadingSpinner />;
    }

    if (user && role === 'employee') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default EmployeeRoute;