
// src/api/userCourseApi.ts
import { PROFILE_ENDPOINT } from '../utils/constants';
import axiosInstance from './axiosInstance'; // Make sure axiosInstance is properly configured
import { courseListingDTO } from "../types/courseListingDTO";
import { ICourse } from "../types/CourseTypes";
import { Course } from '../pages/Users/Bookmarks';

// Add a new course for a user
export const addUserCourse = async (data: object): Promise<any> => {
    const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/courses`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Edit an existing user course
export const editUserCourse = async (courseId: string, data: object): Promise<any> => {
    const response = await axiosInstance.put(`${PROFILE_ENDPOINT}/courses/${courseId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Fetch a course by ID
export const getUserCourseById = async (courseId: string): Promise<ICourse> => {
    const response = await axiosInstance.get(`${PROFILE_ENDPOINT}/course/${courseId}`);
    return response.data;
};

// Delete a user course
export const deleteUserCourse = async (courseId: string): Promise<void> => {
    await axiosInstance.delete(`${PROFILE_ENDPOINT}/courses/${courseId}`);
};

// Fetch all courses for a user


export const getUserCourses = async (
    showMyLearnings: boolean,
    searchTerm = '',
    sortOption = '',
    page = 1,
    limit = 8,
    category?: string,
    priceRange?: string
): Promise<any> => {

    if (showMyLearnings) {
        const response = await axiosInstance.get<courseListingDTO[]>(`${PROFILE_ENDPOINT}/user-courses`);
        return response.data;
    } else {



        const response = await axiosInstance.get<courseListingDTO[]>(`${PROFILE_ENDPOINT}/all-courses`, {
            params: {
                search: searchTerm,
                sort: sortOption,
                page,
                limit,
                category,
                priceRange,
            },

        });

        return response.data;
    }
};

export interface Purchase {
    courseId: string;
    courseTitle: string;
    purchaseDate: string;
    amount: number;
}

export const coursesPurchased = async (): Promise<Purchase[]> => {
    const response = await axiosInstance.get<Purchase[]>(`${PROFILE_ENDPOINT}/coursePurchaseHistory`);
    return response.data;
};



// export const enrollCourse = async (courseId: string): Promise<EnrollmentResponse> => {
//     const response = await axiosInstance.get<EnrollmentResponse>(`${PROFILE_ENDPOINT}/enroll-check?courseId=${courseId}`);
//     return response.data;
// }


// interface EnrollmentResponse {
//     success: boolean;
//     message: string;
//   }

export const saveCourseToWishlist = async (courseId: string): Promise<void> => {
    const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/wishlist/save`, { courseId });
    return response.data;
};

export const unsaveCourseFromWishlist = async (courseId: string): Promise<void> => {
    const response = await axiosInstance.delete(`${PROFILE_ENDPOINT}/wishlist/unsave/${courseId}`);
    return response.data;
};



export const wishlistlistCourses = async (): Promise<Course[]> => {
    // return mockBookmarkedCourses; 
    const response = await axiosInstance.get(`${PROFILE_ENDPOINT}/allbookmark`);
    return response.data;
};

export const removePurchasedItemsFromWishlist = async (): Promise<Course[]> => {
    // return mockBookmarkedCourses; 
    const response = await axiosInstance.delete(`${PROFILE_ENDPOINT}/allbookmark`);
    return response.data;
};