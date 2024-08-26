import React from 'react';
import NotificationItem from '../../components/user/NotificationItem';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
}

const NotificationPage: React.FC = () => {
  const notificationData: Notification[] = [
    {
      id: 1,
      title: 'Account Verification Completed',
      message: 'Your account has been successfully verified. You can now access all features of the platform. Thank you for verifying your email address.',
      date: 'August 15, 2024',
    },
    // You can add more notification items here
  ];

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Notification History
        </h2>
        <div className="flow-root mt-12 sm:mt-16">
          <div className="divide-y divide-gray-200 -my-9">
            {notificationData.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                message={notification.message}
                date={notification.date}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;