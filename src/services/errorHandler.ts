// src/services/errorHandler.ts
import { showToast } from '../utils/toast';
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  field?: string;
}

/**
 * Centralized error handler for API errors
 */
export const handleApiError = (error: unknown, customMessage?: string): ApiError => {
  let errorResponse: ApiError = {
    message: customMessage || 'An unexpected error occurred',
    status: 500,
  };

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    errorResponse = {
      message: data?.message || error.message,
      code: data?.code,
      status: status,
      field: data?.field,
    };

    // Handle specific error codes
    switch (status) {
      case 400:
        errorResponse.message = data?.message || 'Invalid request';
        break;
      case 401:
        errorResponse.message = 'Please login to continue';
        break;
      case 403:
        errorResponse.message = 'You do not have permission to perform this action';
        break;
      case 404:
        errorResponse.message = 'The requested resource was not found';
        break;
      case 409:
        errorResponse.message = data?.message || 'Conflict: Resource already exists';
        break;
      case 422:
        errorResponse.message = data?.message || 'Validation failed';
        break;
      case 429:
        errorResponse.message = 'Too many requests. Please try again later';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorResponse.message = 'Server error. Please try again later';
        break;
      default:
        errorResponse.message = data?.message || 'An error occurred';
    }

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: status,
        message: errorResponse.message,
        data: data,
      });
    }
  } else if (error instanceof Error) {
    errorResponse.message = error.message;

    if (import.meta.env.DEV) {
      console.error('Error:', error);
    }
  }

  return errorResponse;
};

/**
 * Show error toast notification
 */
export const showErrorToast = (error: unknown, customMessage?: string): void => {
  const errorResponse = handleApiError(error, customMessage);
  showToast(errorResponse.message, 'error');
};

/**
 * Check if error is network error
 */
export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AxiosError && !error.response;
};

/**
 * Check if error is authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    (error.response?.status === 401 || error.response?.status === 403)
  );
};

/**
 * Extract validation errors from API response
 */
export const extractValidationErrors = (error: unknown): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (error instanceof AxiosError && error.response?.data?.errors) {
    const validationErrors = error.response.data.errors;

    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((err: any) => {
        if (err.field && err.message) {
          errors[err.field] = err.message;
        }
      });
    } else if (typeof validationErrors === 'object') {
      Object.entries(validationErrors).forEach(([field, message]) => {
        errors[field] = String(message);
      });
    }
  }

  return errors;
};
