import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div className="w-full h-screen inset-0 z-50 flex items-center justify-center  backdrop-blur-sm cursor-wait">
            <div className='flex flex-col items-center justify-center gap-4'>
                <div>
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#2563EB"
                        ariaLabel="tail-spin-loading"
                        radius="2"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                <p className="text-lg font-heading font-medium text-primary animate-pulse">
                    Loading AssetVerse...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;