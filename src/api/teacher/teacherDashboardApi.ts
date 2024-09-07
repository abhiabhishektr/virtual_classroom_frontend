import { TEACHER_ENDPOINT } from "../../utils/constants";
import axiosInstance from "../axiosInstance";

export interface CourseSalesData {
  _id: string;
  title: string;
  price: string;
  sales: number;
}

export interface MonthlySales {
  totalSales: number;
  month: string;
}

export interface TeacherDashboardData {
  getCourses: CourseSalesData[];
  getsales: MonthlySales[];
}

export const getTeacherDashboardData = async (): Promise<TeacherDashboardData> => {
  try {
    const response = await axiosInstance.get<TeacherDashboardData>(`${TEACHER_ENDPOINT}/dashboard`);
    console.log("Dashboard data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};