// src/api/teacher/liveClassApi.ts

import axiosInstance from '../axiosInstance';
import { TEACHER_ENDPOINT } from '../../utils/constants';

// Start a live class
export const startLiveClass = async (data: { courseId: string }): Promise<void> => {
    await axiosInstance.post(`${TEACHER_ENDPOINT}/start-live-session`, data);
};

// End a live class
export const endLiveClass = async (data: { courseId: string }): Promise<void> => {
    await axiosInstance.post(`${TEACHER_ENDPOINT}/end-live-session`, data);
};

// Get live class status
export const getLiveClassStatus = async (courseId: string): Promise<any> => {
    const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/live-class-status`, {
        params: { courseId },
    });
    return response.data;
};
