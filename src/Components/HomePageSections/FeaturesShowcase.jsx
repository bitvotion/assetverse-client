import React from 'react';
import { FaLaptopCode, FaUsersCog, FaFilePdf, FaClipboardCheck, FaHistory, FaMobileAlt } from 'react-icons/fa';

const FeaturesShowcase = () => {
    const features = [
        {
            icon: <FaLaptopCode />,
            title: "Real-time Tracking",
            desc: "Monitor asset status, assignment history, and location instantly."
        },
        {
            icon: <FaUsersCog />,
            title: "Employee Management",
            desc: "Organize your workforce and view their assigned equipment in one click."
        },
        {
            icon: <FaClipboardCheck />,
            title: "Easy Requests",
            desc: "Employees can request assets directly through a streamlined portal."
        },
        {
            icon: <FaFilePdf />,
            title: "Printable Reports",
            desc: "Generate professional PDF reports for audits and inventory checks."
        },
        {
            icon: <FaHistory />,
            title: "Return Tracking",
            desc: "Manage returnable vs. non-returnable items with clear logs."
        },
        {
            icon: <FaMobileAlt />,
            title: "Mobile Friendly",
            desc: "Fully responsive design allows management on the go from any device."
        }
    ];

    return (
        <section className="py-16 bg-linear-to-b from-blue-500 to-purple-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 ">
                    <h2 className="text-4xl font-bold mb-4 text-white">Powerful Features</h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Everything you need to manage your corporate assets efficiently in one unified platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-4 p-6 bg-base-100/80 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-3xl text-primary mt-1">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-700">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;