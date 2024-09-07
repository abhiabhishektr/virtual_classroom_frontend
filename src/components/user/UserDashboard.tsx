import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const UserProfile: React.FC = () => {
  const { name, email, phone, profilePicture, role } = useSelector((state: RootState) => state.profile);

  const initials = name ? name.split(' ').map(n => n[0]).join('') : 'AT';

  return (
    <div className="bg-gray-100 py-12 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Profile Information & Actions */}
        <div>
          <div className="text-center md:text-left">
            {profilePicture ? (
              <img
                className="object-cover w-32 h-32 mx-auto md:mx-0 rounded-full border-4 border-white shadow-lg"
                src={profilePicture}
                alt="Profile"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0 shadow-lg border-4 border-white">
                {initials}
              </div>
            )}
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-lg text-gray-600">{email}</p>
            <p className="text-gray-500">{phone || 'add your phone number'}</p> 
          </div>

          <div className="mt-6 space-y-4">
            <Link to="/profile/edit-profile">
              <Button className="w-full  bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors">
                Edit Profile
              </Button>
            </Link>

            {role !== 'teacher' && (
              <Link to="/profile/teacher-registration">
                <Button className="w-full bg-green-600 text-white mt-2 px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors">
                  Become a Teacher
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Right Section: About Platform */}
        <div className="text-gray-700">
          <h3 className="text-xl font-semibold mb-2">About This Platform</h3>
          <p>
            Welcome to our e-learning platform! Here, you can explore a wide range of courses and learn new skills.
            If you're passionate about teaching, you can even become an instructor and share your knowledge with others.
          </p>
          <p className="mt-2">
            To become a teacher, simply click the "Become a Teacher" Button above and complete the registration process.
            Once you're registered, you can start creating and selling your own courses!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;