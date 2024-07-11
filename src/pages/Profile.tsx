// Profile.tsx
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    password: "password123",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-sm">Change Image</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={profileData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full
                 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={profileData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={profileData.password}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={toggleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
