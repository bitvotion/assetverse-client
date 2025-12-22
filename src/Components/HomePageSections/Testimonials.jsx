import React from 'react';

const Testimonials = () => {
    const stats = [
        { id: 1, value: "500+", label: "Companies Registered" },
        { id: 2, value: "12k+", label: "Assets Tracked" },
        { id: 3, value: "98%", label: "Satisfaction Rate" },
        { id: 4, value: "24/7", label: "Support Available" },
    ];

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "HR Manager, TechFlow",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            text: "AssetVerse completely transformed how we handle our inventory. No more lost laptops or confusion about who has what. Highly recommended!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Operations Director, GreenCorp",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            text: "The employee request flow is seamless. It saved my team hours of manual work every week. The best investment we made this year.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Admin Lead, StartUp Inc",
            image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            text: "Simple, intuitive, and effective. The return tracking feature ensures we get our equipment back when employees leave.",
            rating: 4
        }
    ];

    return (
        <section className="py-20 bg-linear-to-b from-purple-500 to-blue-500">
            <div className="container mx-auto px-6">
                
                {/* --- Stats Section --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-gray-200 pb-12">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center">
                            <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}</h3>
                            <p className="text-white/70 font-medium uppercase tracking-wide text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* --- Testimonials Section --- */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-white">Trusted by Industry Leaders</h2>
                    <p className="text-white/80 max-w-xl mx-auto">
                        See what HR managers and admins are saying about their experience with AssetVerse.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="card bg-base-100 shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className="card-body">
                                {/* Stars */}
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                                <div className="flex items-center mt-auto">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review.image} alt={review.name} />
                                        </div>
                                    </div>
                                    <div className="ml-4 text-left">
                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                        <p className="text-xs text-gray-500">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;