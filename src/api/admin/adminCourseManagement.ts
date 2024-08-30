// src/api/courseApi.ts

import { ADMIN_ENDPOINT } from "../../utils/constants";
import axiosInstance from "../axiosInstance"; // Adjust the import based on your project's setup



// Function to list all courses
export const getCourses = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${ADMIN_ENDPOINT}/courses`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch courses: ${error}`);
    }
};

// Function to block a course
export const blockCourse = async (courseId: string): Promise<void> => {
    try {
        await axiosInstance.patch(`${ADMIN_ENDPOINT}/${courseId}/block`);
    } catch (error) {
        throw new Error(`Failed to block course: ${error}`);
    }
};

// Function to unblock a course
export const unblockCourse = async (courseId: string): Promise<void> => {
    try {
        await axiosInstance.patch(`${ADMIN_ENDPOINT}/${courseId}/unblock`);
    } catch (error) {
        throw new Error(`Failed to unblock course: ${error}`);
    }
};
