import React, { useState, useEffect } from 'react';
import { FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { allusers ,blockUser, unblockUser } from '../../api/admin/adminUserMan'; // Adjust the import path as necessary

interface User {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
}

const AdminUsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to store the search term entered by the user
  const [users, setUsers] = useState<User[]>([]); // State to store the list of users fetched from the backend

  useEffect(() => {
    fetchUsers(); // Fetch users from the backend when the component mounts
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await allusers() // Replace with your backend API endpoint
      console.log('Rea:', response);
      
      setUsers(response); // Update the users state with the fetched data
    } catch (error) {
      console.error('Error fetching users:', error); // Log an error if fetching users fails
    }
  };

  // Event handler for updating the search term state based on user input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Function to toggle the block/unblock status of a user
  const handleBlockToggle = async (userId: any) => {
    try {
      console.log(`Toggling block status for user with ID ${userId}`);
      
      // Check if the user is currently blocked
      
      if (users.find(user => user.email === userId)?.blocked) {
        
        await unblockUser(userId); // If blocked, unblock the user via API call
      } else {
        await blockUser(userId); // If not blocked, block the user via API call
      }

      // Update local state after successful API call to reflect the updated user block status
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, blocked: !user.blocked } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling user block status:', error); // Log an error if toggling user block status fails
    }
  };

  // Filter users based on the search term entered by the user
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
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <button
                onClick={() => handleBlockToggle(user.email)}
                className={`px-3 py-1 rounded-full ${
                  user.blocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {user.blocked ? (
                  <>
                    <FiXCircle className="inline-block mr-1" />
                    Unblock
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="inline-block mr-1" />
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
    </div>
  );
};

export default AdminUsersPage;
