import { toast, ToastOptions } from 'react-hot-toast';

export interface CustomToastOptions extends ToastOptions {
  icon?: string;
  style?: React.CSSProperties;
}

export const showHotToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' | 'custom' = 'info',
  options?: CustomToastOptions
) => {
  const baseOptions: CustomToastOptions = {
    duration: options?.duration || 5000,
    position: options?.position || 'top-right',
    icon: options?.icon,
    style: options?.style,
  };

  switch (type) {
    case 'success':
      toast(message, {
        ...baseOptions,
        icon: options?.icon || '✔️',
        style: options?.style || { background: 'green', color: 'white' },
      });
      break;
    case 'error':
      toast(message, {
        ...baseOptions,
        icon: options?.icon || '❌',
        style: options?.style || { background: 'red', color: 'white' },
      });
      break;
    case 'warning':
      toast(message, {
        ...baseOptions,
        icon: options?.icon || '⚠️',
        style: options?.style || { background: 'orange', color: 'white' },
      });
      break;
    case 'info':
      toast(message, {
        ...baseOptions,
        icon: options?.icon || 'ℹ️',
        style: options?.style || { background: 'blue', color: 'white' },
      });
      break;
    case 'custom':
      toast(message, {
        ...baseOptions,
        icon: options?.icon,
        style: options?.style,
      });
      break;
    default:
      toast(message, baseOptions);
      break;
  }
};



// showHotToast('Something went wrong!', 'error', {
//     style: { background: 'darkred', color: 'yellow' },
//     icon: '❗',
//   });


// showHotToast('Operation successful!', 'success');

  
// showHotToast('Custom message with a custom icon!', 'custom', {
//     icon: '🚀',
//     style: { background: '#333', color: '#fff' },
//     duration: 8000,
//     position: 'bottom-center',
//   });
  