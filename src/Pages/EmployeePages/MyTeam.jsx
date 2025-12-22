import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import LoadingSpinner from '../../Utilities/LoadingSpinner';


const MyTeam = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    
    // State to track which company is currently selected
    const [selectedCompanyId, setSelectedCompanyId] = useState(null); // Stores hrEmail

    // 1. Fetch User's Companies (For Tabs)
    const { data: companies = [], isLoading: companiesLoading } = useQuery({
        queryKey: ['my-affiliations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get('/my-affiliations', {
                params: { email: user.email }
            });
            return res.data;
        }
    });

    console.log(companies);

    // Auto-select the first company when data loads
    if (companies.length > 0 && !selectedCompanyId) {
        setSelectedCompanyId(companies[0].hrEmail);
    }

    // 2. Fetch Team Members for the Selected Company
    const { data: teamMembers = [], isLoading: teamLoading } = useQuery({
        queryKey: ['team-members', user?.email, selectedCompanyId],
        enabled: !!user?.email && !!selectedCompanyId,
        queryFn: async () => {
            const res = await axiosInstance.get('/team-members', {
                params: { 
                    email: user.email,
                    hrEmail: selectedCompanyId
                }
            });
            return res.data;
        }
    });
console.log("Team member",teamMembers);
    // 🎂 Birthday Logic: Filter for Current Month
    const currentMonth = new Date().getMonth(); // 0-11
    const upcomingBirthdays = teamMembers.filter(member => {
        if (!member.dateOfBirth) return false;
        const dob = new Date(member.dateOfBirth);
        return dob.getMonth() === currentMonth;
    });

    if (companiesLoading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Team</h2>

            {/* 🏢 Company Tabs (Only show if > 1 company) */}
            {companies.length > 0 && (
                <div className="tabs rounded tabs-boxed mb-8 bg-base-200  inline-block">
                    {companies.map(company => (
                        <a 
                            key={company._id} 
                            className={`tab tab-lg ${selectedCompanyId === company.hrEmail ? 'tab-active bg-primary/20 rounded' : ''}`}
                            onClick={() => setSelectedCompanyId(company.hrEmail)}
                        >
                            {company.companyLogo && (
                                <img src={company.companyLogo} alt="logo" className="w-5 h-5 mr-2 rounded" />
                            )}
                            {company.companyName}
                        </a>
                    ))}
                </div>
            )}

            <div className="flex flex-col xl:flex-row gap-8">
                
                {/* Left: Team Members Grid */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                    {teamLoading ? <LoadingSpinner /> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="card bg-base-100 shadow-lg border border-base-200">
                                    <div className="card-body items-center gap-6 sm:flex-row ">
                                        <div className="avatar">
                                            <div className="w-20 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                                                <img src={member.image || "https://via.placeholder.com/150"} alt={member.name} />
                                            </div>
                                        </div>
                                        <div className='space-y-1'>
                                            <h2 className="card-title text-base">{member.name}</h2>
                                            <p>{member.email}</p>
                                            <div className={`badge badge-sm ${member.role === 'admin' ? 'badge-secondary' : 'badge-ghost'}`}>
                                                {member.role === 'admin' ? 'Admin' : 'Member'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Upcoming Birthdays Sidebar */}
                <div className="w-full xl:w-80">
                    <div className="card bg-primary text-primary-content shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title flex items-center gap-2">
                                🎂 Upcoming Birthdays
                            </h2>
                            <p className="opacity-90 text-sm mb-4">Celebrations for {new Date().toLocaleString('default', { month: 'long' })}</p>
                            
                            {upcomingBirthdays.length === 0 ? (
                                <div className="text-center py-4 bg-primary-focus rounded-lg opacity-80">
                                    No birthdays this month.
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {upcomingBirthdays.map((member, idx) => (
                                        <li key={idx} className="flex items-center gap-3 bg-white/10 p-2 rounded-lg">
                                            <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={member.image || "https://via.placeholder.com/150"} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{member.name}</div>
                                                <div className="text-xs opacity-80">
                                                    {new Date(member.dateOfBirth).getDate()} 
                                                    {['st','nd','rd'][((new Date(member.dateOfBirth).getDate()+90)%100-10)%10-1]||'th'}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyTeam;