// src/api/teacher/courseContentApi.ts

import axiosInstance from '../axiosInstance';

import { TEACHER_ENDPOINT } from '../../utils/constants';

// Function to add a new module to a course
export const addModule = async (data: object): Promise<any> => {
    const response = await axiosInstance.post(`${TEACHER_ENDPOINT}/modules`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// Function to get all modules for a specific course
export const getModulesByCourseId = async (courseId: string): Promise<any> => {
    const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/modules/course/${courseId}`);
    console.log("response.data", response.data);
    
    return response.data;
};

// Function to get a single module by ID
export const getModuleById = async (moduleId: string): Promise<any> => {
    const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/modules/${moduleId}`);
    return response.data;
};// not in use right now

// Function to update a module by ID
export const updateModule = async (moduleId: string, data: object): Promise<any> => {
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/modules/${moduleId}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// Function to delete a module by ID
export const deleteModule = async (moduleId: string): Promise<any> => {
    const response = await axiosInstance.delete(`${TEACHER_ENDPOINT}/modules/${moduleId}`);
    console.log(response.data);
    return response.data;
};


// Function to delete content by content ID from a specific module
export const deleteContent = async (moduleId: string, contentId: string, courseId: string): Promise<any> => {
    const response = await axiosInstance.delete(`${TEACHER_ENDPOINT}/modules/${moduleId}/contents/${contentId}`, {
        data: { courseId } 
    });
    console.log(response.data);
    return response.data;
};
