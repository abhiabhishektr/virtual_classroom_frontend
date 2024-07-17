import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";

import {
  setProfileData,
  setLoading,
  setError,
  setIsEditing,
  ProfileState
} from '../redux/slices/user/profileSlice';
import { RootState } from '../redux/store'; // Adjust the import path as needed
import Loader from "../components/Shared/Loader";
import { useAuth } from "../hooks/useAuth";

const ProfilePage: React.FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    name,
    // username,
    email,
    phone,
    password,
    loading,
    error,
    isEditing
  } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const fetchProfileData = async () => {
      // if (!name && !username && !email && !phone && !password) { // Check if profile data is already available
      if (!name &&  !email ) { // Check if profile data is already available
        dispatch(setLoading(true));
        dispatch(setError(null));
        console.log("Fetching profile data...");
        
        try {
          const data = await getProfile();
          console.log("Profile data:", data);
          dispatch(setProfileData(data));
        } catch (error) {
          dispatch(setError("Failed to fetch profile data"));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };
  
    fetchProfileData();
  }, [dispatch, name,email]);
  // }, [dispatch, name, username, email, phone, password]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setProfileData({ [name]: value } as Partial<ProfileState>));
  };

  const handleSave = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const updatedProfile = await updateProfile({ name});//username
      dispatch(setProfileData(updatedProfile));
      dispatch(setIsEditing(false));
    } catch (error) {
      dispatch(setError("Failed to update profile"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      dispatch(setIsEditing(true));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200"><Loader /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200">{error}</div>;
  }
  const handleLogout = () => {
    logout() // Dispatch your logout action here
    navigate('/auth/login');
    // Optionally, you can redirect or perform any cleanup after logout
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white shadow-md p-8">
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

        {['name', 'email', 'phone', 'password'].map((field) => (// Add 'username',
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              value={eval(field)}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isEditing ? "bg-white" : "bg-gray-200"
                }`}
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            onClick={toggleEdit}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 mt-6 ml-2 text-center text-white rounded-md font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;