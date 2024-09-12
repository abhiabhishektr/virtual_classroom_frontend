import axiosInstance from './axiosInstance'; // Adjust the import based on your project setup
import { IReview } from '../types/CourseTypes';  // Adjust the import based on your type definitions

const PROFILE_ENDPOINT = '/api/profile'; // Adjust this endpoint based on your project setup


export const addCourseReview = async (
    courseId: string, 
    data: { rating: number; comment: string }
): Promise<any> => {    
    const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/${courseId}/reviews`, data);
    return response.data;
};

export const editCourseReview = async (
    courseId: string, 
    reviewId: string, 
    data: { rating: number; comment: string }
): Promise<any> => {
    const response = await axiosInstance.put(`${PROFILE_ENDPOINT}/courses/${courseId}/reviews/${reviewId}`, data);
    return response.data;
};


// Fetch All Reviews for a Course
export const getCourseReviews = async (courseId: string): Promise<IReview[]> => {
    const response = await axiosInstance.get(`${PROFILE_ENDPOINT}/${courseId}/reviews`);
    return response.data;
};

// Fetch User's Review for a Course
export const getUserReviewForCourse = async (courseId: string): Promise<IReview> => {
    const response = await axiosInstance.get(`${PROFILE_ENDPOINT}/courses/${courseId}/reviews/user`);
    return response.data;
};
