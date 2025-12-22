import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Utilities/LoadingSpinner';


const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch detailed user info from MongoDB (Role, Company, etc.)
    const { data: dbUser = {}, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl overflow-hidden">
                
                {/* --- Cover Area (Decorative) --- */}
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="Profile" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Profile Content --- */}
                <div className="card-body pt-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{user?.displayName}</h2>
                            <p className="text-gray-500 font-medium">{user?.email}</p>
                        </div>
                        <div className={`badge badge-lg text-white p-4 font-bold uppercase tracking-wide ${
                            dbUser.role === 'hr' ? 'badge-primary' : 'badge-secondary'
                        }`}>
                            {dbUser.role === 'hr' ? 'HR Manager' : 'Employee'}
                        </div>
                    </div>

                    <div className="divider my-6"></div>

                    {/* --- Information Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Box 1: Contact Info */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Contact Information</h3>
                            <div className="space-y-2">
                                <p><span className="font-semibold text-gray-700">Email:</span> {user?.email}</p>
                                <p><span className="font-semibold text-gray-700">Phone:</span> N/A</p>
                            </div>
                        </div>

                        {/* Box 2: Professional Info */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Work Status</h3>
                            
                            {dbUser.role === 'hr' ? (
                                // HR Specific View
                                <div className="space-y-2">
                                    <p><span className="font-semibold text-gray-700">Company:</span> {dbUser.companyName || 'Not Set'}</p>
                                    <p><span className="font-semibold text-gray-700">Plan:</span> {dbUser.package || 'Basic'}</p>
                                </div>
                            ) : (
                                // Employee Specific View
                                <div className="space-y-2">
                                    <p><span className="font-semibold text-gray-700">Affiliated With:</span> {dbUser.companyName || 'Not Affiliated'}</p>
                                    <p><span className="font-semibold text-gray-700">Department:</span> General</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* --- Update Button (Visual Only) --- */}
                    <div className="card-actions justify-end mt-8">
                        <button className="btn btn-primary w-full sm:w-auto">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;