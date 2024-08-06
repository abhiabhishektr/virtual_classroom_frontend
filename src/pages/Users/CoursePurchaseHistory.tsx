import React, { useEffect, useState } from 'react';
import PurchaseHistory from '../../components/user/PurchaseHistory';
import { coursesPurchased } from '../../api/userCourseApi';

interface Purchase {
  courseId: string;
  courseTitle: string;
  purchaseDate: string;
  amount: number;
}

const CoursePurchaseHistory: React.FC = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await coursesPurchased(); // Fetch the purchase history data
        setPurchaseHistory(response); // Set the purchaseHistory state with the data
      } catch (err) {
        setError('Failed to fetch purchase history');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <PurchaseHistory purchaseHistory={purchaseHistory} />;
};

export default CoursePurchaseHistory;
