// src/api/admin/adminNotification.ts
import { ADMIN_ENDPOINT } from '../../utils/constants';
import adminAxiosInstance from './adminAxiosInstance';

export const searchUser = async (query: string, recipientType: 'all' | 'teachers'|'') => {
  try {
    const endpoint = recipientType === 'teachers' ? `${ADMIN_ENDPOINT}/searchteachers` : `${ADMIN_ENDPOINT}/searchusers`;
    
    const response = await adminAxiosInstance.get(endpoint, {
      params: { search: query },
    });
    
    return response.data; // Assuming the response contains the user list in the data property
  } catch (error) {
    console.error('Error searching for users:', error);
    throw error; // Throw error to handle it in the component
  }
};

export const pushNotification = async (notificationPayload: { title: string; message: string; recipientType: 'all' | 'teachers'; recipient: string }) => {
  try {
    const response = await adminAxiosInstance.post(`${ADMIN_ENDPOINT}/pushNotification`, notificationPayload);
    return response.data; // Assuming the response contains success message or other data
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error; // Throw error to handle it in the component
  }
};