import React, { useState, useEffect } from 'react';
import { FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { allusers, blockUser, unblockUser } from '../../api/admin/adminUserMan';

interface User {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
}

const AdminUsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [confirmAction, setConfirmAction] = useState<{ userId: string; action: 'block' | 'unblock' } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await allusers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleBlockToggle = (userId: string, isBlocked: boolean) => {
    setConfirmAction({
      userId,
      action: isBlocked ? 'unblock' : 'block'
    });
  };

  const confirmBlockToggle = async () => {
    if (!confirmAction) return;

    try {
      const { userId, action } = confirmAction;
      if (action === 'block') {
        await blockUser(userId);
      } else {
        await unblockUser(userId);
      }

      const updatedUsers = users.map(user =>
        user.email === userId ? { ...user, blocked: action === 'block' } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling user block status:', error);
    }

    setConfirmAction(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-4">Users</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users"
            className="py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FiSearch />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user,index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <button
                onClick={() => handleBlockToggle(user.email, user.blocked)}
                className={`px-3 py-1 rounded-full ${
                  user.blocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {user.blocked ? (
                  <>
                    <FiCheckCircle className="inline-block mr-1" />
                    Unblock
                  </>
                ) : (
                  <>
                    <FiXCircle className="inline-block mr-1" />
                    Block
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-2">{user.email}</p>
            <p className="text-sm">
              Status: {user.blocked ? 'Blocked' : 'Active'}
            </p>
          </div>
        ))}
      </div>

      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Confirm {confirmAction.action === 'block' ? 'Block' : 'Unblock'}
            </h3>
            <p>
              Are you sure you want to {confirmAction.action}{' '}
              {users.find(u => u.email === confirmAction.userId)?.name}?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setConfirmAction(null)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockToggle}
                className={`px-4 py-2 rounded text-white ${
                  confirmAction.action === 'block' ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;