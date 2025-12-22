import React from 'react';

const AuthContent = () => {
    return (
        <div className="h-full w-full text-white flex flex-col justify-center items-center p-12 relative overflow-hidden">

            {/* Background Decor (Abstract Circles) */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"></div>


            {/* Main Content */}
            <div className="relative z-10 text-center space-y-6 max-w-lg">
                <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-4 border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    Turn Chaos into <br />
                    <span className="text-blue-200">Clarity.</span>
                </h2>

                <p className="text-lg text-blue-100/80 font-light">
                    The simplest way to manage company assets. Track inventory, assign tools, and streamline your HR workflow in one place.
                </p>

                {/* Trust Badge */}
                <div className="pt-8 flex justify-center gap-4 opacity-70">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-xl">100%</span>
                        <span className="text-xs uppercase tracking-wider">Secure</span>
                    </div>
                    <div className="w-px bg-white/30 h-10"></div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-xl">24/7</span>
                        <span className="text-xs uppercase tracking-wider">Access</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContent;