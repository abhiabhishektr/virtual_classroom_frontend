import React from 'react';
// import { BellIcon                                                                                                                                                                                                                                                                                                                                                } from '@heroicons/react/solid';

interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, date }) => {
  return (
    <div className="py-9 flex items-start space-x-4 bg-white shadow-md rounded-lg p-4">
      <div className="flex-shrink-0">
        {/* <BellIcon className="text-green-500 w-8 h-8" /> */}
      </div>
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-800">{title}</p>
        <p className="mt-2 text-base text-gray-600">{message}</p>
        <p className="mt-2 text-sm text-gray-500">Date: {date}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
