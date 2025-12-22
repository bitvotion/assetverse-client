import React from 'react';
import useAuth from './useAuth';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure.jsx';

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading: isRoleLoading } = useQuery({

        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`)
            return res.data?.role
        }
    })

    return [role, isRoleLoading]
};

export default useRole; 