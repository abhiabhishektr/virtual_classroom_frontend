import React from 'react';
import PurchaseHistory from '../../components/user/PurchaseHistory';
import { coursesPurchased, Purchase } from '../../api/userCourseApi';
import { useApiQuery } from '../../hooks/useApiQuery';

const CoursePurchaseHistory: React.FC = () => {
  const { data: purchaseHistory, error, isLoading } = useApiQuery<Purchase[]>(
    coursesPurchased,
    ['purchaseHistory'],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <PurchaseHistory purchaseHistory={purchaseHistory || []} />;
};

export default CoursePurchaseHistory;
