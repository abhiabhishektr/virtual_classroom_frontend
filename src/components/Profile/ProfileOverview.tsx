import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

const ProfileOverview: React.FC = () => {
  const { name, email, phone, profilePicture } = useSelector((state: RootState) => state.profile);

  const initials = name ? name.split(' ').map(n => n[0]).join('') : 'AT';

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-0 ">
      <div className="px-4 mx-auto max-w-full sm:px-6 lg:px-8 flex justify-center items-center h-[87vh]">
        <div className="text-center">
          {profilePicture ? (
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg"
              src={profilePicture}
              alt="Profile"
            />
          ) : (
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg border-4 border-white">
              {initials}
            </div>
          )}
          <p className="mt-6 text-lg font-semibold text-black">
            {name}, <span className="font-normal text-gray-600">{email}</span>
          </p>
          <p className="text-lg font-medium text-gray-700 mt-2">{phone}</p>
          <blockquote className="max-w-xl mx-auto mt-7 text-lg leading-relaxed text-gray-800">
            “Discover the joy of teaching and sharing your knowledge with others. Whether you're looking to teach part-time or start a new career, becoming a teacher can be a rewarding experience. Earn, grow, and inspire as you contribute to the educational journey of your students.”
          </blockquote>
          <div className="mt-8 flex flex-col items-center space-y-4">
            <Link to="/profile/edit-profile">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </Link>

            <Link to="/profile/teacher-registration">
              <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors">
                Become a Teacher
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
