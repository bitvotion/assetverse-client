import React from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';

const HRRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole(); // Assuming it returns [role, loading]
    const location = useLocation();

    // 1. Wait for Auth AND Role to load
    if (loading || isRoleLoading) {
        return <LoadingSpinner />;
    }

    // 2. Allow access if User is logged in AND is HR
    if (user && role === 'hr') {
        return children;
    }

    // 3. If logged in but NOT HR, send them to Home (or unauthorized page)
    // We don't send to login because they are already logged in
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default HRRoute;