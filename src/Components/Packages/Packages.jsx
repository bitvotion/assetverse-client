import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const Packages = () => {

    const axiosInstance = useAxios()
    
    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosInstance.get('/packages');
            return res.data;
        }
    });


    // Helper to get styles based on package name
    const getCardStyles = (name) => {
        switch (name) {
            case 'Basic':
                return 'bg-[#ffc7dc] hover:bg-[#ffb6d0]'; // Pastel Pink
            case 'Standard':
                return 'bg-[#9ef0e2] hover:bg-[#85e6d6]'; // Mint/Teal
            case 'Premium':
                return 'bg-[#ffcf55] hover:bg-[#ffc53d]'; // Vibrant Yellow/Orange
            default:
                return 'bg-base-100';
        }
    };

    return (
        <section className="py-10 bg-linear-to-b from-blue-900 to-blue-600" id="pricing"> {/* Dark background like the reference */}
            <div className="container mx-auto px-6">
                
                {/* Header (White text on dark bg) */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-extrabold text-white mb-4">Pricing</h2>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Simple, transparent pricing for teams of all sizes.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg) => (
                        <div 
                            key={pkg._id} 
                            className={`card z-0 shadow-xl transition-transform duration-300 hover:-translate-y-2 border-0 rounded-3xl overflow-hidden text-black ${getCardStyles(pkg.name)}`}
                        >
                            <div className="card-body p-10 flex flex-col h-full">
                                
                                {/* Package Title */}
                                <h3 className="text-xl font-medium opacity-80 mb-2">
                                    {pkg.name}
                                </h3>
                                
                                {/* Price Area */}
                                <div className="mb-6">
                                    {/* Special Logic for Basic: Free for first month */}
                                    {pkg.name === 'Basic' ? (
                                        <div>
                                            <span className="text-6xl font-extrabold block">Free</span>
                                            <span className="text-sm font-bold opacity-70 mt-1 block">
                                                For the first month, then ${pkg.price}/mo
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-baseline">
                                            <span className="text-6xl font-extrabold">${pkg.price}</span>
                                            <span className="text-xl font-medium opacity-70 ml-2">/month</span>
                                        </div>
                                    )}
                                </div>

                                {/* Description/Subtitle (Optional based on data) */}
                                <p className="mb-8 font-medium opacity-90">
                                    Perfect for {pkg.employeeLimit <= 5 ? 'startups' : pkg.employeeLimit <= 10 ? 'growing teams' : 'large organizations'}.
                                </p>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features?.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            {/* Black Circle Checkmark */}
                                            <div className="bg-black text-white rounded-full p-1 mt-1 flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 10.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="font-bold text-sm leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button - Pure Black */}
                                <button className="btn bg-black text-white hover:bg-gray-800 border-none w-full rounded-xl h-14 text-lg font-bold mt-auto shadow-none">
                                    {pkg.name === 'Basic' ? 'Start Free Trial' : `Get ${pkg.name}`}
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;