import React from 'react';
import { FaBoxes, FaUserShield, FaChartLine, FaClock } from 'react-icons/fa';

const AboutSection = () => {
    const benefits = [
        {
            id: 1,
            icon: <FaBoxes className="text-4xl text-primary" />,
            title: "Total Asset Visibility",
            description: "Stop losing track of valuable equipment. Monitor every laptop, chair, and keyboard in real-time."
        },
        {
            id: 2,
            icon: <FaUserShield className="text-4xl text-secondary" />,
            title: "Employee Accountability",
            description: "Ensure every asset is assigned to a specific employee. Reduce loss and improve responsibility."
        },
        {
            id: 3,
            icon: <FaChartLine className="text-4xl text-accent" />,
            title: "Cost Optimization",
            description: "Identify underutilized assets and make smarter purchasing decisions based on actual usage data."
        },
        {
            id: 4,
            icon: <FaClock className="text-4xl text-info" />,
            title: "Time Saving",
            description: "Automate check-ins and check-outs. Save HR teams hours of manual spreadsheet updates."
        }
    ];

    return (
        <section className="py-16 bg-linear-to-b from-blue-600 to-blue-500">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-100">Why Choose AssetVerse?</h2>
                    <p className="text-base-300">
                        We streamline the complex process of corporate asset management, helping you focus on growing your business while we handle the inventory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className="card bg-base-100/80 shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="card-body items-center text-center">
                                <div className="mb-4 p-4 bg-base-200 rounded-full">
                                    {benefit.icon}
                                </div>
                                <h3 className="card-title text-xl mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-500">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;