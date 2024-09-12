// src/api/teacher/courseContentApi.ts

import axiosInstance from '../axiosInstance';

import { TEACHER_ENDPOINT } from '../../utils/constants';
import { ApiIContent, IChapter, IContent } from '../../types/contentTypes';

// Function to add a new module to a course
export const addModule = async (courseId: string, title: string): Promise<IChapter[]> => {
    const response = await axiosInstance.post(`${TEACHER_ENDPOINT}/modules`, { courseId, title })
    return response.data;
};

// Function to get all modules for a specific course
export const getModulesByCourseId = async (courseId: string): Promise<ApiIContent> => {
    const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/modules/course/${courseId}`);
    return response.data;
};

// Function to get a single module by ID
export const getModuleById = async (moduleId: string): Promise<any> => {
    const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/modules/${moduleId}`);
    return response.data;
};// not in use right now

// Function to update a module by ID
export const updateModule = async (chapterId: string, courseId: string, moduleId: string, newTitle: string): Promise<any> => {
    const response = await axiosInstance.put(
        `${TEACHER_ENDPOINT}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`,
        { title: newTitle }
    )
    return response.data;
};

// Function to delete a module by ID
export const deleteModule = async (moduleId: string, courseId: string, chapterId: string): Promise<any> => {

    const response = await axiosInstance.delete(`${TEACHER_ENDPOINT}/modules/${chapterId}`, {
        data: { moduleId, courseId },
    });
    return response.data;
};

// Function to delete a module by ID
// export const renameModule = async (moduleId: string, courseId: string, chapterId: string): Promise<any> => {

//     const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/modules/${chapterId}`, {
//         data: { moduleId, courseId },
//     });
//     return response.data;
// };


export const updateContent = async (chapterId: string, contentId: string, courseId: string, moduleId: string): Promise<any> => {
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/content`, {
        data: { chapterId, moduleId, contentId, courseId },
    });
    return response.data;
};






// working

export const uploadContent = async (courseId: string, chapterId: string, content: IContent) => {
    try {

        const formData = new FormData();
        const fileBlob = await fetch(content.url).then(r => r.blob());

        formData.append('file', fileBlob, content.title);
        formData.append('type', content.type);
        formData.append('title', content.title);

        const response = await axiosInstance.post(`${TEACHER_ENDPOINT}/content/${courseId}/modules/${chapterId}/contents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

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

export const renameContent = async (courseId: string, moduleId: string, chapterId: string, contentId: string, newTitle: string): Promise<any> => {
    const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/content`, {
        data: { chapterId, moduleId, contentId, courseId, newTitle },
    });
    return response.data;
};
