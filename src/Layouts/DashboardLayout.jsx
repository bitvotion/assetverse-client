import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router';

const DashboardLayout = () => {
    
    const { signOutUser } = useAuth()
    const navigate = useNavigate()
    // const [role, isRoleLoading] 


    return (
        <div>
            
        </div>
    );
};

export default DashboardLayout;