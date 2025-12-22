import React from 'react';
import { FaUserPlus, FaSearch, FaCheckCircle } from 'react-icons/fa';

const ExtraSections = () => {
    return (
        <div>
            {/* --- SECTION A: How It Works (3-Step Process) --- */}
            <section className="py-20 bg-linear-to-b from-blue-500 to-blue-700">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl text-white font-bold mb-4">How AssetVerse Works</h2>
                        <p className="text-white/80">Get started in 3 simple steps.</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-1/2 left-20 right-20 h-1 bg-white/80  -z-0 -translate-y-1/2"></div>

                        {/* Step 1 */}
                        <div className="card bg-white w-full md:w-1/3 shadow-xl z-10 border border-gray-100">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-primary/40">
                                    <FaUserPlus />
                                </div>
                                <h3 className="text-xl font-bold">1. Sign Up</h3>
                                <p className="text-gray-500 text-sm">
                                    Register as an HR Manager to set up your company or as an Employee to join a team.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="card bg-white w-full md:w-1/3 shadow-xl z-10 border border-gray-100">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-secondary/40">
                                    <FaSearch />
                                </div>
                                <h3 className="text-xl font-bold">2. Request Assets</h3>
                                <p className="text-gray-500 text-sm">
                                    Employees browse the available inventory and submit requests for the equipment they need.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="card bg-white w-full md:w-1/3 shadow-xl z-10 border border-gray-100">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-accent/40">
                                    <FaCheckCircle />
                                </div>
                                <h3 className="text-xl font-bold">3. Approve & Track</h3>
                                <p className="text-gray-500 text-sm">
                                    HR approves requests, creating an instant audit trail. Track returns and usage effortlessly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION B: FAQ Section --- */}
            <section className="py-20 bg-linear-to-b from-blue-700 to-blue-800 ">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
                    
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-plus join-item border border-base-300 bg-white/90">
                            <input type="radio" name="my-accordion-4" defaultChecked /> 
                            <div className="collapse-title text-xl font-medium">
                                Is AssetVerse free for small businesses?
                            </div>
                            <div className="collapse-content">
                                <p>Yes! Our "Basic" package allows you to manage up to 5 employees and unlimited assets completely free of charge.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300 bg-white/98">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">
                                Can an employee belong to multiple companies?
                            </div>
                            <div className="collapse-content">
                                <p>Absolutely. AssetVerse supports multi-company affiliation. An employee can request assets from different companies using the same account.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300 bg-white/90">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">
                                How do I upgrade my employee limit?
                            </div>
                            <div className="collapse-content">
                                <p>HR Managers can upgrade their package at any time via the "Packages" section on their dashboard. Payment is secure via Stripe, and the limit increases instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION C: Contact CTA --- */}
            <section className="py-20 bg-linear-to-b from-blue-800 to-blue-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Organize Your Assets?</h2>
                    <p className="mb-8 max-w-2xl mx-auto text-primary-content/80 text-lg">
                        Join over 500+ companies streamlining their operations with AssetVerse today.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="btn btn-wide btn-secondary font-bold text-lg">
                            Get Started Now
                        </button>
                        <button className="btn btn-wide btn-outline btn-accent text-white font-bold text-lg">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraSections;