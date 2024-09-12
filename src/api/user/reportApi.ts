// src/api/user.ts 
import { ADMIN_ENDPOINT, PROFILE_ENDPOINT } from "../../utils/constants";
import axiosInstance from "../axiosInstance";
import adminAxiosInstance from "../admin/adminAxiosInstance";
export interface IReport {
    _id: string;
    username : string;
    courseName: string;
    issueType: string;
    description: string;
    createdAt: string;
}

export interface GetReportsResponse {
    reports: IReport[];
}

export const getReportsAdmin = async (): Promise<GetReportsResponse> => {
    const response = await adminAxiosInstance.get<GetReportsResponse>(
        `${ADMIN_ENDPOINT}/getreportIssue`
    );
    console.log("response.data: ", response.data);
    return response.data;
};

export const reportIssue = async (courseId: string, issueType: string, description: string): Promise<any> => {
    const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/reportIssue`, {
        courseId,
        issueType,
        description,
    });
    return response;
};
