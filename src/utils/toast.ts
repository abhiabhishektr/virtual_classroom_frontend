import { toast, ToastPosition } from 'react-toastify';

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
  customClass?: string,
  autoClose: number = 5000, // Default to 5000ms but can be overridden
  position: ToastPosition = 'bottom-right' // Default to bottom-right but can be overridden
) => {
  toast(message, {
    type,
    position, // Use the provided or default position
    autoClose, // Use the provided or default autoClose value
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: customClass,
  });
};

