// src/api/teacher/courseContentApi.ts

import axiosInstance from '../axiosInstance';

import { TEACHER_ENDPOINT } from '../../utils/constants';
import { ApiIContent, IContent } from '../../types/contentTypes';

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
export const getModulesByCourseId = async (courseId: string): Promise<ApiIContent> => {
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
export const deleteModule = async (moduleId: string, courseId: string, chapterId: string): Promise<any> => {
    console.log(`courseId: ${courseId}, moduleId: ${moduleId}, chapterId: ${chapterId}`);
    
    const response = await axiosInstance.delete(`${TEACHER_ENDPOINT}/modules/${chapterId}`, {
        data: { moduleId, courseId },
    });
    return response.data;
};

// Function to delete a module by ID
export const renameModule = async (moduleId: string, courseId: string, chapterId: string): Promise<any> => {
    console.log(`courseId: ${courseId}, moduleId: ${moduleId}, chapterId: ${chapterId}`);
    
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/modules/${chapterId}`, {
        data: { moduleId, courseId },
    });
    return response.data;
};


export const updateContent = async (chapterId: string, contentId: string, courseId: string, moduleId: string): Promise<any> => {
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/content`, {
        data: { chapterId, moduleId, contentId, courseId },
    });
    return response.data;
};






// working

export const uploadContent = async (courseId: string, moduleId: string, chapterId: string, content: IContent) => {
    try {

        const formData = new FormData();
        const fileBlob = await fetch(content.url).then(r => r.blob());

        formData.append('file', fileBlob, content.title);
        formData.append('type', content.type);
        formData.append('title', content.title);

        // Logging FormData contents (for debugging, this may need adjustments)
        formData.forEach((value, key) => {
            console.log(`FormData Key: ${key}, Value:`, value);
        });

        const response = await axiosInstance.post(`${TEACHER_ENDPOINT}/content/${courseId}/modules/${moduleId}/chapters/${chapterId}/contents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Upload successful:', response.data); // Debug log
        return response.data;
    } catch (error: any) {
        console.error('Error during upload:', error.message); // Error log
        throw error; // Re-throw the error after logging
    }
};



export const deleteContent = async (chapterId: string, contentId: string, courseId: string, moduleId: string): Promise<any> => {
    const response = await axiosInstance.delete(`${TEACHER_ENDPOINT}/content`, {
        data: { chapterId, moduleId, contentId, courseId },
    });
    return response.data;
};

export const renameContent = async (chapterId: string, contentId: string, courseId: string, moduleId: string): Promise<any> => {
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/content`, {
        data: { chapterId, moduleId, contentId, courseId },
    });
    return response.data;
};
