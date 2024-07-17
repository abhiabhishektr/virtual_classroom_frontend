// src/utils/constants.ts

// API Endpoints
export const API_BASE_URL = "http://localhost:5000/";
export const AUTH_ENDPOINT = "/api/auth";
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

