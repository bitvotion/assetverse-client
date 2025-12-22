import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';

const LimitWarning = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [isVisible, setIsVisible] = useState(false);

    // 1. Fetch User Stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['limit-check', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}`);
            return res.data; 
        },
        refetchInterval: 60000 
    });

    // 2. Logic Check
    useEffect(() => {
        const checkVisibility = () => {
            // Safety: Wait for data
            if (isLoading || !stats.packageLimit) {
                // console.log("LimitWarning: Loading or no limit data...");
                return;
            }

            // Safety: Convert to numbers to avoid "5" < 5 errors
            // If currentEmployees is undefined in DB, default to 0
            const currentCount = parseInt(stats.currentEmployees || 0);
            const limit = parseInt(stats.packageLimit || 0);

            // console.log(`LimitWarning Check: Used ${currentCount} of ${limit}`);

            // Condition A: HIDE if not HR or Limit not reached
            if (user?.role !== 'hr') {
                console.log("LimitWarning: User is not HR. Hiding.");
                setIsVisible(false);
                return;
            }

            if (currentCount < limit) {
                console.log("LimitWarning: Limit not reached yet. Hiding.");
                setIsVisible(false);
                return;
            }

            // Condition B: Check Snooze Timer
            const dismissedTime = localStorage.getItem('limit_warning_dismissed');
            
            if (!dismissedTime) {
                console.log("LimitWarning: Showing Banner (Never dismissed)");
                setIsVisible(true);
            } else {
                const oneHour = 60 * 60 * 1000;
                const timePassed = Date.now() - parseInt(dismissedTime);

                if (timePassed > oneHour) {
                    console.log("LimitWarning: Showing Banner (Snooze expired)");
                    localStorage.removeItem('limit_warning_dismissed');
                    setIsVisible(true);
                } else {
                    console.log("LimitWarning: Hiding (Snoozed for 1hr)");
                    setIsVisible(false);
                }
            }
        };

        checkVisibility();
        
        // Re-check every minute
        const interval = setInterval(checkVisibility, 60000);
        return () => clearInterval(interval);

    }, [stats, isLoading, user]);

    // 3. Dismiss Handler
    const handleDismiss = () => {
        console.log("LimitWarning: Dismiss clicked. Snoozing for 1hr.");
        localStorage.setItem('limit_warning_dismissed', Date.now().toString());
        setIsVisible(false);
    };

    // If invisible, do not render anything
    if (!isVisible) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-md relative animate-fade-in-down mb-6 mx-4 rounded-r-lg mt-4">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="ml-3 w-full">
                    <h3 className="text-sm font-bold text-red-800">
                        Package Limit Reached!
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>
                            You have used <b>{stats.currentEmployees || 0}/{stats.packageLimit}</b> employee slots. 
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link to="/packages" className="text-sm font-medium text-red-600 hover:text-red-500 underline">
                            Upgrade Plan &rarr;
                        </Link>
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={handleDismiss} className="bg-transparent rounded-md inline-flex text-red-400 hover:text-red-500 focus:outline-none">
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LimitWarning;