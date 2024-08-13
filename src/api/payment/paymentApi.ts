// src/api/payment/paymentApi.ts

import axiosInstance from "../axiosInstance";
import { PROFILE_ENDPOINT } from "../../utils/constants";

interface PaymentResponse {
    data: any; // Replace `any` with the actual type of your payment response data
    suscess: boolean;
}


export const handlePayment = async (courseId: string): Promise<PaymentResponse> => {
    try {
        const orderUrl = `${PROFILE_ENDPOINT}/payment/orders`;
        const { data } = await axiosInstance.post<PaymentResponse>(orderUrl, { courseId });
        return data;
    } catch (error) {
        console.error('Payment processing error:', error);
        throw error;
    }
};


export const verifyPayment = async (response: any, courseId: string): Promise<any> => {
    try {
        const verifyUrl = `${PROFILE_ENDPOINT}/payment/verify`;
        const data  = await axiosInstance.post<any>(verifyUrl, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            courseId
        });
        return data
    } catch (error) {
        console.error('Payment verification error:', error);
        throw error;
    }
};