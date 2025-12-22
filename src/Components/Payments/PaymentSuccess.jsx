import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);
console.log(sessionId);
    useEffect(() => {
        if (sessionId) {
            // Call backend to validate and save
            axiosInstance.post('/validate-payment', { sessionId })
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Confirmed!',
                            text: 'Your package limit has been updated.',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/dashboard');
                    }
                })
                .catch(err => {
                    console.error("Validation Error:", err);
                    Swal.fire('Error', 'Could not verify payment.', 'error');
                })
                .finally(() => setIsProcessing(false));
        }
    }, [sessionId, axiosInstance, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {isProcessing ? (
                <>
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <h2 className="text-xl mt-4 font-semibold">Confirming your payment...</h2>
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-600">Success!</h1>
                    <p>Redirecting you to dashboard...</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;