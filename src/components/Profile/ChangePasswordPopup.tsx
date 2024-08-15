import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../api/profileApi';
import { showToast } from '../../utils/toast';
import { setLoading, setError } from '../../redux/slices/profileSlice';

interface ChangePasswordPopupProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (!visible) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }, [visible]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await updatePassword( currentPassword, newPassword );
      showToast('Password updated successfully', 'success');
      setVisible(false);
    } catch (error) {
      dispatch(setError("Failed to update password"));
      showToast('Failed to update password', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setVisible(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
