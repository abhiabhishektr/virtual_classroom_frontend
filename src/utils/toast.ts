// src/utils/toast.ts

import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  toast(message, {
    type,
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
