// src/api/adminAuthApi.ts
import adminAxiosInstance from './adminAxiosInstance';
import { ADMIN_ENDPOINT } from '../../utils/constants';

// interface User {
//   id: number;
//   // Define other user properties as needed
// }

export const allusers = async (): Promise<any> => {
  try {
    const response = await adminAxiosInstance.get(`${ADMIN_ENDPOINT}/getUsers`);
    return response; // Assuming backend sends back some data on successful fetch
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const  blockUser = async (userId: string): Promise<void> => {
  try {
    
  await adminAxiosInstance.put(`${ADMIN_ENDPOINT}/block/${userId}`);
  } catch (error) {
    console.error(`Failed to block user with ID ${userId}:`, error);
    throw error;
  }
};

export const unblockUser = async (userId: string): Promise<void> => {
  try {
   await adminAxiosInstance.put(`${ADMIN_ENDPOINT}/unblock/${userId}`);
  } catch (error) {
    console.error(`Failed to unblock user with ID ${userId}:`, error);
    throw error;
  }
};


// src/api/admin/adminUserMan.ts (or wherever you define your API calls)

export interface MonthlyCourseSale {
  totalSales: number;
  month: string;
}

export interface MonthlyTeacherRequest {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  month: string;
}

export interface LatestTeacher {
  status: string;
  bio: string;
  createdAt: Date;
  user: {
      email: string;
      name: string;
  };
}

export interface DashboardData {
  totalCourses: number;
  totalStudents: number;
  totalTeachers: number;
  pendingApplications: number;
  monthlyCourseSales: MonthlyCourseSale[];
  newTeacherRegistrations: MonthlyTeacherRequest[];
  recentApplications: LatestTeacher[];
}

// ... your getDashboardData function ...

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await adminAxiosInstance.get<DashboardData>(`${ADMIN_ENDPOINT}/dashboard`); // Add "/dashboard" to the endpoint
    console.log("Dashboard data:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error; // Re-throw the error for the calling function to handle it
  }
}