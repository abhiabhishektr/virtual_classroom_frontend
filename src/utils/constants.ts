// src/utils/constants.ts

// API Endpoints
export const API_BASE_URL = "http://localhost:5000";
//production 
// export const API_BASE_URL = "https://zoschool.zotocode.com";

export const AUTH_ENDPOINT = "/api/auth";
export const TEACHER_ENDPOINT = "/api/teacher";
export const CHAT_ENDPOINT = "/api/chat";
export const ADMIN_ENDPOINT = "/api/admin";
export const PROFILE_ENDPOINT = "/api/profile";
export const CLASSROOM_ENDPOINT = "/classroom";


// Error Messages
export const ERROR_MSG_NETWORK = "Network error, please try again later.";
export const ERROR_MSG_UNAUTHORIZED = "You are not authorized to perform this action.";

// Configuration Values
export const MAX_RETRIES = 3;
export const TIMEOUT_DURATION = 5000; // in milliseconds

export interface ErrorResponse {
    response: {
        data: unknown;
    };
}



// ------------------------ Admin --------------------------


export const constants = {
    // Default values for images and data
    defaultAvatarUrl: 'https://www.example.com/default-avatar.png',
    level: 'Beginner', // You can set this based on the course level
    language: 'English', // Default language
    instructorBio: 'This is a brief bio about the instructor. It could include their background, experience, and teaching philosophy.',
    features: [
        'Lifetime access to course materials',
        'Interactive quizzes and assignments',
        'Certificate of completion',
        '24/7 community support',
    ],
    placeholderSections: [
        {
            title: 'Introduction',
            items: [
                'Welcome to the course',
                'What you will learn',
                'Course overview',
            ],
        },
        {
            title: 'Module 1: Basics',
            items: [
                'Introduction to the basics',
                'Basic concepts and definitions',
                'Simple examples',
            ],
        },
        {
            title: 'Module 2: Intermediate',
            items: [
                'Advanced topics and techniques',
                'Intermediate examples and exercises',
                'Additional resources',
            ],
        },
        {
            title: 'Module 3: Advanced',
            items: [
                'Expert-level content',
                'Complex problems and solutions',
                'Final project',
            ],
        },
    ],
};

