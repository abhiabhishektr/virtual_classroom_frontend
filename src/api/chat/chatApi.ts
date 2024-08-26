import { IGroup, IMessage } from '../../types/chat';
import { CHAT_ENDPOINT } from '../../utils/constants';
import axiosInstance from '../axiosInstance'; // Make sure axiosInstance is properly configured

// Interface for messages in the backend response
interface BackendMessage {
  sender_email: string;
  senderName: string;
  content: string;
  timestamp: string;
}

// Interface for the backend response structure
interface BackendResponse {
  roomId: string;
  messages: BackendMessage[];
}

// Interface for the formatted message
interface FormattedMessage {
  sender_id: string;
  senderName: string;
  content: string;
}

// Function to transform backend response into desired format
const transformData = (data: BackendResponse[]): { [key: string]: FormattedMessage[] } => {
  const result: { [key: string]: FormattedMessage[] } = {};

  // Ensure the data is an array and transform it
  if (Array.isArray(data)) {
    data.forEach(({ roomId, messages }) => {
      if (Array.isArray(messages)) {
        result[roomId] = messages.map(({ sender_email, senderName, content }) => ({
          sender_id: sender_email,
          senderName,
          content
        }));
      } else {
        console.error(`Messages for roomId ${roomId} is not an array`);
        result[roomId] = [];
      }
    });
  } else {
    console.error('Data is not an array');
  }

  console.log("Result:", result);

  return result;
};

// Function to get groups from the API
export const getGroup = async (): Promise<IGroup[]> => {
  const response = await axiosInstance.get(`${CHAT_ENDPOINT}/group`);
  return response.data;
};

// Function to get messages for a specific group
export const getMessagesForGroup = async (groupId: string): Promise<IMessage[]> => {
  try {
    const response = await axiosInstance.get(`${CHAT_ENDPOINT}/groups/${groupId}/messages`);
    const backendData: BackendResponse[] = response.data;
    const formattedData = transformData(backendData);
    
    // Return messages for the specific groupId
    return formattedData[groupId] || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error; // Optionally handle or rethrow the error as needed
  }
};

// export const getMessagesForGroup = async (groupId: string): Promise<IMessage[]> => {
//   // Simulating API delay
//   await new Promise(resolve => setTimeout(resolve, 500));

//   const sampleMessages: { [key: string]: IMessage[] } = {
//     "66b1bcce57500f04f096041a": [
//       { sender_id: 'teacher@gmail.com', senderName: 'Teacher', content: 'Welcome to the Science group!' },
//       { sender_id: 'alice@example.com', senderName: 'Alice', content: 'Excited to learn more about science!' },
//       { sender_id: 'bob@example.com', senderName: 'Bob', content: 'What topic are we covering first?' },
//       { sender_id: 'teacher@gmail.com', senderName: 'Teacher', content: "We'll start with the scientific method." },
//     ],
//     "66ab6896202ef9368c001a0a": [
//       { sender_id: 'teacher@gmail.com', senderName: 'Teacher', content: 'This is our Testing group. We\'ll use it to practice various concepts.' },
//       { sender_id: 'charlie@example.com', senderName: 'Charlie', content: 'Great! I\'m ready to start testing.' },
//       { sender_id: 'david@example.com', senderName: 'David', content: 'What kind of tests will we be doing?' },
//       { sender_id: 'teacher@gmail.com', senderName: 'Teacher', content: "We'll cover unit testing, integration testing, and more." },
//     ]
//   };

//   return sampleMessages[groupId] || [];
// };
