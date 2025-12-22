import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';


const UpgradePackage = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const packages = [
        { name: "Basic", employeeLimit: 5, price: 5 },
        { name: "Standard", employeeLimit: 10, price: 8 },
        { name: "Premium", employeeLimit: 20, price: 15 }
    ];

    const handleBuy = async (pkg) => {
        try {
            const res = await axiosInstance.post('/create-checkout-session', {
                price: pkg.price,
                packageName: pkg.name,
                employeeLimit: pkg.employeeLimit,
                hrEmail: user.email
            });

            // Redirect user to the Stripe hosted page
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error("Payment Error:", err);
        }
    };

    return (
        <div className="container mx-auto p-10">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg.name} className="card bg-base-100 shadow-xl border border-gray-200">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">{pkg.name}</h2>
                            <p className="text-4xl font-bold my-4">${pkg.price}</p>
                            <p className="mb-4">Up to {pkg.employeeLimit} Employees</p>
                            <button 
                                onClick={() => handleBuy(pkg)}
                                className="btn btn-primary w-full"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackage;