import { PROFILE_ENDPOINT } from "../../utils/constants";
import axiosInstance from "../axiosInstance";

// Mark content as completed
export const markContentCompleted = async (courseId: string, contentId: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/content/${contentId}/complete`, { courseId });
        return response.data;
    } catch (error) {
        throw new Error('Error marking content as completed');
    }
};

// Unmark content as completed
export const unmarkContentCompleted = async (courseId: string, contentId: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/content/${contentId}/uncomplete`, { courseId });
        return response.data;
    } catch (error) {
        throw new Error('Error unmarking content as completed');
    }
};

// Mark content as important
export const markContentImportant = async (courseId: string, contentId: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/content/${contentId}/important`, { courseId });
        return response.data;
    } catch (error) {
        throw new Error('Error marking content as important');
    }
};

// Unmark content as important
export const unmarkContentImportant =async (courseId: string, contentId: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/content/${contentId}/unimportant`, { courseId });
        return response.data;
    } catch (error) {
        throw new Error('Error unmarking content as important');
    }
};
