import React, { useEffect, useState } from "react";
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
import { RootState } from '../redux/store';
import Loader from "../components/Shared/Loader";
import { useAuth } from "../hooks/useAuth";
import ChangeProfilePasswordForm from "../components/Auth/ChangeProfilePasswordForm";
import axios from 'axios';
import { showToast } from '../utils/toast';
import ImageCropper from "../libraries/ImageCropper";
import uploadImage from "../libraries/uploadImage";


const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    name,
    email,
    phone,
    loading,
    error,
    isEditing
  } = useSelector((state: RootState) => state.profile);

  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [croppingImage, setCroppingImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!name && !email) {
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
  }, [dispatch, name, email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setProfileData({ [name]: value } as Partial<ProfileState>));
  };

  const handleSave = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const updatedProfile = await updateProfile({ name });
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



  const handleChangeImage = async () => {
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }
    try {
      const userId = "6655b84dcd18c2d98ae176aa";
      const data = {
        userId: userId,
        image: selectedImage,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/uploadImage`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Image uploaded:', response.data);
      showToast('Image uploaded successfully!', 'success');

      setImageChanged(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Failed to upload image', 'error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCroppingImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      dispatch(setLoading(true));

      const file = new File([croppedBlob], "cropped_image.jpg", { type: 'image/jpeg' });
      const imageUrl  = await uploadImage(file);
      await updateProfile({ profilePicture: imageUrl  });
      console.log('Image uploaded:', imageUrl );
      
      setSelectedImage(imageUrl );
      setImageChanged(true);
      setCroppingImage(null);
    } catch (error) {
      console.error('Error uploading cropped image:', error);
      showToast('Failed to upload cropped image', 'error');
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  const handleCropCancel = () => {
    setCroppingImage(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200"><Loader /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white shadow-md p-8">
        {croppingImage ? (
          <ImageCropper
            image={croppingImage}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        ) : (
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            {selectedImage ? (
              <div
                className="relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  className="object-cover object-center h-32 w-32"
                  src={selectedImage}
                  alt='User Profile'
                />
                {hovered && (
                  <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className="text-gray-500">Change Image</span>
                  </label>
                )}
              </div>
            ) : (
              <div
                className="bg-gray-200 w-full h-full rounded-full"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {hovered && (
                  <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className="text-gray-500">Upload Image</span>
                  </label>
                )}
              </div>
            )}
          </div>
        )}

        {imageChanged && (
          <div className="mt-2 text-center">
            <button onClick={handleChangeImage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save Image
            </button>
          </div>
        )}

        {['name', 'email', 'phone'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              value={field === 'name' ? name : field === 'email' ? email : phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isEditing ? "bg-white" : "bg-gray-200"}`}
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            onClick={toggleEdit}
            className={`px-4 py-2 rounded-md ${isEditing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => setPasswordFormVisible(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      <ChangeProfilePasswordForm visible={isPasswordFormVisible} setVisible={setPasswordFormVisible} />
    </div>
  );
};

export default ProfilePage;