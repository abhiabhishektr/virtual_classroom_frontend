import React from 'react';
import { Purchase } from '../../api/userCourseApi';

interface PurchaseHistoryProps {
  purchaseHistory: Purchase[];
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ purchaseHistory }) => {
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {purchaseHistory.length === 0 ? (
          <div>No purchases found.</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Course Title</th>
                <th className="px-4 py-2">Purchase Date</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr key={purchase.courseId}>
                  <td className="border px-4 py-2">{purchase.courseTitle}</td>
                  <td className="border px-4 py-2">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{purchase.amount.toFixed(2)} INR</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
