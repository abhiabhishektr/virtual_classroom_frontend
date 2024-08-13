import { TEACHER_ENDPOINT } from '../../utils/constants';
import axiosInstance from '../axiosInstance'; // Make sure axiosInstance is properly configured


// Add a new course
export const addCourse = async (data: object): Promise<any> => {
  
  const response = await axiosInstance.post(`${TEACHER_ENDPOINT}/courses`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response.data);
  
  return response.data;
};

// Edit an existing course
export const editCourse = async (courseId: string, data: object): Promise<any> => {
  const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/courses/${courseId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const Contents = async (courseId: string, data: object): Promise<any> => {
  const response = await axiosInstance.put(`${TEACHER_ENDPOINT}/Contents/${courseId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const getCourseById = async (courseId: string,): Promise<any> => {
  const response = await axiosInstance.get(`${TEACHER_ENDPOINT}/getCourseByIdTeacher/${courseId}`);
  return response;
};

// Delete a course
export const deleteCourse = async (courseId: string): Promise<void> => {
  await axiosInstance.delete(`${TEACHER_ENDPOINT}/${courseId}`);
};


interface Course {
  id: string; // MongoDB ObjectId as a string
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
}


// Fetch all courses
export const getTeacherCourses = async (): Promise<Course[]> => {
  const response = await axiosInstance.get<Course[]>(`${TEACHER_ENDPOINT}/getCoursesbyTeacher`);
  return response.data;
};