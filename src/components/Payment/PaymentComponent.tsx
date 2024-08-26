import React, { useState } from 'react';
import { handlePayment, verifyPayment } from '../../api/payment/paymentApi';
import { showToast } from '../../utils/toast';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface PaymentComponentProps {
    courseId: string;
    instructorEmail: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ courseId ,instructorEmail}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    const { email} = useSelector((state: RootState) => state.profile);

    const loadRazorpayScript = async () => {
        setLoading(true);
        setError(null);
        setPaymentStatus(null);

        if (email === instructorEmail) {
            // Show SweetAlert
            const result = await Swal.fire({
                title: 'Confirmation',
                text: 'This course was created by you. Do you still want to purchase it?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, proceed',
                cancelButtonText: 'No, cancel'
            });

            if (!result.isConfirmed) {
                setLoading(false);
                return; // Abort payment
            }
        }


        try {
            const data = await handlePayment(courseId);
            if (data) {
                initPayment(data);
            } else {
                setError('Failed to load payment data.');
            }
        } catch (error) {
            console.error('Error loading payment script:', error);
            setError('An error occurred while initializing the payment.');
        } finally {
            setLoading(false);
        }
    };

    const initPayment = (data: any) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: data.amount,
            currency: data.currency,
            name: "Virtual Classroom",
            description: "Course Enrollment",
            order_id: data.id,
            handler: async (response: any) => {
                try {
                    const result = await verifyPayment(response,courseId);
                    console.log('Payment verification result:', result);
                    
                    if (result.success) {
                        setPaymentStatus('Payment successful!');
                        showToast('Payment successful!', 'success');
                    } else {
                        setError('Payment failed. Please try again.');
                        showToast('Payment failed. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    setError('Payment verification failed.');
                    showToast('Payment verification failed.', 'error');
                }
            },
            modal: {
                ondismiss: function() {
                    setError('Payment cancelled.');
                    showToast('Payment cancelled.', 'info');
                }
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="w-full">
            {loading ? (
                <button
                    disabled
                    className="w-full bg-gray-400 text-white px-6 py-3 rounded-full transition-colors duration-200 ease-in-out font-semibold text-lg shadow-md mb-4"
                >
                    <svg
                        className="animate-spin h-5 w-5 mr-3 inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                        ></path>
                    </svg>
                    Processing...
                </button>
            ) : paymentStatus ? (
                <div className="text-center text-green-600 mb-4">{paymentStatus}</div>
            ) : error ? (
                <div className="text-center text-red-600 mb-4">{error}</div>
            ) : (
                <button
                    onClick={loadRazorpayScript}
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-full transition-colors duration-200 ease-in-out font-semibold text-lg shadow-md hover:shadow-lg mb-4 transform hover:scale-105"
                >
                    Enroll Now
                </button>
            )}
        </div>
    );
};

export default PaymentComponent;