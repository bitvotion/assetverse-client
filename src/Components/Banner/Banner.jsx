import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className='bg-blue-900 w-full min-h-[600px] py-12 md:pt-40 md:pb-20 overflow-hidden relative'>
            
            {/* Background Decor (Optional glow) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>
            </div>

            <div className='max-w-[1440px] mx-auto px-6 h-full flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10'>
                
                {/* --- LEFT SIDE: Text Content --- */}
                <div className='flex-1 flex flex-col gap-6 text-center lg:text-left'>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-white text-4xl md:text-6xl font-bold leading-tight'
                    >
                        <span>Manage Assets </span><br className="hidden lg:block" />
                        <span className="text-blue-200">Without</span>
                        <span> the Chaos.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className='text-blue-100 text-lg md:text-xl max-w-lg mx-auto lg:mx-0'
                    >
                        Stop losing track of company equipment. AssetVerse helps modern HR teams assign, track, and recover physical assets effortlessly.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link to="/join-hr" className="btn btn-lg bg-blue-500 hover:bg-blue-600 border-none text-white font-bold shadow-lg">
                            Start as HR Manager
                        </Link>
                        <Link to="/join-employee" className="btn btn-lg btn-outline text-white hover:bg-white hover:text-blue-900 font-bold">
                            Join as Employee
                        </Link>
                    </motion.div>
                </div>

                {/* --- RIGHT SIDE: Tech SaaS Visualization --- */}
                <div className='flex-1 w-full flex items-center justify-center perspective-1000'>
                    <div className="relative w-full max-w-md">

                        {/* Abstract Background Blob for the Image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-[80px] opacity-40 -z-10"></div>

                        {/* Card 1: Main Dashboard Preview */}
                        <motion.div
                            initial={{ y: 30, opacity: 0, rotateX: 10 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 z-10 relative"
                        >
                            {/* Fake UI Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                                    <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                                    <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                                </div>
                            </div>
                            {/* Fake UI Rows */}
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-4">
                                    <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">💻</div>
                                    <div className="flex-1">
                                        <div className="h-3 w-32 bg-blue-200 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-blue-100 rounded"></div>
                                    </div>
                                    <div className="badge badge-success text-white text-xs">Active</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-4">
                                    <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs">⌨️</div>
                                    <div className="flex-1">
                                        <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className="badge badge-warning text-white text-xs">Pending</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Floating Stat (Top Right) */}
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: -20, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -right-4 -top-6 md:-right-12 md:top-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                        >
                            <div className="radial-progress text-blue-600 text-xs font-bold" style={{ "--value": 85, "--size": "3rem" }}>85%</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Stock</div>
                                <div className="text-sm font-bold text-gray-800">Available</div>
                            </div>
                        </motion.div>

                        {/* Card 3: Floating Notification (Bottom Left) */}
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: -10, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="absolute -left-4 -bottom-6 md:-left-12 md:bottom-12 bg-white p-3 pr-6 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                        >
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">
                                ✓
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Just Returned</div>
                                <div className="text-sm font-bold text-gray-800">iPad Pro 12.9"</div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;