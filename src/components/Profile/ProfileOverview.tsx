import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProfileOverview: React.FC = () => {
  const { name, email, phone, profilePicture } = useSelector((state: RootState) => state.profile);

  const initials = name ? name.split(' ').map(n => n[0]).join('') : 'AT';

  return (
    <div className="w-full max-w-md rounded-xl bg-white shadow-md p-8">
      <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
      <div className="flex items-center mb-6">
        {profilePicture ? (
          <img
            className="rounded-full w-24 h-24 object-cover mr-4"
            src={profilePicture}
            alt="Profile"
          />
        ) : (
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mr-4">
            {initials}
          </div>
        )}
        <div>
          <p className="text-lg font-medium text-gray-700 mb-1">
            <strong>Name:</strong> {name}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Phone:</strong> {phone}
          </p>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Edit Profile</button>
    </div>
  );
};

export default ProfileOverview;
