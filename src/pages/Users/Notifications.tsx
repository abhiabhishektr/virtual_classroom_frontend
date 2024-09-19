import React, { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/solid'; // Assuming you're using Heroicons
import { notifications, INotification } from '../../api/profileApi';

const NotificationPage: React.FC = () => {
  const [notificationData, setNotificationData] = useState<INotification[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notifications(); // This should return INotification[]
        setNotificationData(data); // Setting data of type INotification[]
      } catch (err) {
        setError('Failed to fetch notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Notification History
        </h2>
        <div className="mt-12 sm:mt-16">
          <ul className="shadow-md rounded-md overflow-hidden">
            {notificationData?.length ? (
              notificationData.map((notification) => (
                <li
                  key={notification.id}
                  className="px-6 py-4 border-b border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-between" // Added flex for alignment
                >
                  <div className="flex items-center"> {/* Added flex for icon and content */}
                    <BellIcon className="h-5 w-5 text-gray-500 mr-3" />
                    <div> {/* Wrapped title and message in a div */}
                      <div className="font-medium text-lg text-gray-900">{notification.title}</div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <li className="px-6 py-4 bg-white text-center text-gray-500">
                No notifications available.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
