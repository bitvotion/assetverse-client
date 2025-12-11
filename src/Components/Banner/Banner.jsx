import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='bg-blue-950 w-full h-180 pt-10'>
            <div className='max-w-9xl h-full flex mx-auto  justify-center items-center'>
                {/* Left */}
                <div className='flex-1 flex flex-col gap-6 px-4'>
                    <h1 className='text-base-100 text-6xl font-semibold'>
                        <span>Manage Assets </span><br />
                        <span>Without</span>
                        <span> the Chaos.</span>
                    </h1>
                    <p className='text-base-100 text-xl'>Stop losing track of company equipment. AssetVerse helps modern HR teams assign, track, and recover physical assets effortlessly.</p>
                    <div className="flex gap-4">
                        <Link to="/join-as-hr" className="btn btn-xl btn-primary font-bold text-base-100  ">Start as HR Manager</Link>
                        <Link to="/join-as-employee" className="btn btn-xl btn-primary btn-outline font-bold text-base-100 border-2">Join as Employee</Link>
                    </div>
                </div>
                {/* Right */}
                <div className='flex-1'>
                    <h1 className='text-white text-5xl'>kichu ekta</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;