// src/api/teacher/createTeacherRequest.ts

import axiosInstance from '../axiosInstance'; // Adjusted import to match your setup
import { AUTH_ENDPOINT } from '../../utils/constants'; // Import your constants

interface TeacherRequestData {
  qualification: string;
  experience: string;
  subjectsToTeach: string;
  bio: string;
}



// not usignn now 

