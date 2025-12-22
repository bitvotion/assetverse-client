import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

const CheckoutForm = ({ selectedPackage }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    // Get Client Secret from backend
    useEffect(() => {
        if (selectedPackage.price > 0) {
            axiosInstance.post('/create-payment-intent', { price: selectedPackage.price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [selectedPackage, axiosInstance]);

  const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);
        setError(''); // Clear previous errors

        try {
            // 1. Create Payment Method
            const { error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                setProcessing(false);
                return;
            }

            // 2. Confirm Payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                setError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // 3. Save to Database
                const paymentInfo = {
                    hrEmail: user.email,
                    packageName: selectedPackage.name,
                    employeeLimit: selectedPackage.employeeLimit,
                    amount: selectedPackage.price,
                    transactionId: paymentIntent.id,
                    paymentDate: new Date(),
                    status: 'completed'
                };

                // ⚠️ CRITICAL: Wrap backend call in try-catch
                try {
                    const res = await axiosInstance.post('/payments', paymentInfo);

                    if (res.data.paymentResult.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Upgrade Successful!',
                            text: `Limit increased to ${selectedPackage.employeeLimit} employees.`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/dashboard');
                    }
                } catch (dbError) {
                    console.error("Database Save Error:", dbError);
                    // Payment worked, but DB failed
                    setError("Payment received, but database update failed. Please contact support.");
                }
            }
        } catch (err) {
            console.error("Stripe Error:", err);
            setError("Something went wrong with the payment.");
        } finally {
            // ✅ THIS LINE IS THE FIX: Always stop loading
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-6 rounded-xl shadow-lg bg-white mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">
                Pay <span className="text-primary">${selectedPackage.price}</span>
            </h3>
            
            <div className="p-4 border rounded-md mb-4 bg-gray-50">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                        },
                    }} 
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            
            <button 
                className="btn btn-primary w-full" 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <span className="loading loading-spinner"></span> : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;