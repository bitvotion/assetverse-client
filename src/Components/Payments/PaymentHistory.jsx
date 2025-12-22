import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import LoadingSpinner from '../../Utilities/LoadingSpinner';



const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h2>
            
            {payments.length === 0 ? (
                <div className="text-center py-10 bg-base-200 rounded-xl">
                    <p className="text-gray-500 text-lg">No payment records found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                    <table className="table w-full bg-white">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-bold">
                            <tr>
                                <th className="py-4">Package</th>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition-colors border-b">
                                    <td>
                                        <div className="font-bold text-gray-800">{payment.packageName}</div>
                                        <div className="text-xs text-gray-500">
                                            Limit: {payment.employeeLimit} Employees
                                        </div>
                                    </td>
                                    <td className="font-semibold text-primary">
                                        ${payment.amount}
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm p-3 font-mono">
                                            {payment.transactionId}
                                        </span>
                                    </td>
                                    <td className="text-gray-600">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;