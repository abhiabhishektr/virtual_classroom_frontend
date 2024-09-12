import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateProfile } from '../../api/profileApi';
import { setProfileData, setLoading, setError } from '../../redux/slices/profileSlice';
import { showToast } from '../../utils/toast';
import ImageCropper from "../../libraries/ImageCropper";
import uploadImage from "../../libraries/uploadImage";
import axios from 'axios';
import ChangePasswordPopup from './ChangePasswordPopup';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';

const PersonalDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { name, email, phone, profilePicture } = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [selectedImage, setSelectedImage] = useState<string | null>(profilePicture);
  const [imageChanged, setImageChanged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    setEditedName(name);
    setEditedPhone(phone);
    setSelectedImage(profilePicture);
  }, [name, phone, profilePicture]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setEditedName(value);
    if (name === 'phone') setEditedPhone(value);
  };


  // personal details .tsx
  const handleSave = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const updatedProfile = await updateProfile({ name: editedName, phone: editedPhone });
      
      dispatch(setProfileData(updatedProfile)); 
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      dispatch(setError("Failed to update profile"));
      showToast('Failed to update profile', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangeImage = async () => {
    if (!selectedImage) {
      showToast('Please select an image', 'error');
      return;
    }
    try {
      const userId = "6655b84dcd18c2d98ae176aa"; // You might want to get this from your Redux state
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
      dispatch(setProfileData({ ...response.data, profilePicture: selectedImage }));
      showToast('Image uploaded successfully!', 'success');

      setImageChanged(false);
      window.location.reload();
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
      const imageUrl = await uploadImage(file);
      await updateProfile({ profilePicture: imageUrl });
      dispatch(setProfileData({ profilePicture: imageUrl }));

      setSelectedImage(imageUrl);
      setImageChanged(true);
      setCroppingImage(null);
      showToast('Image cropped and uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading cropped image:', error);
      showToast('Failed to upload cropped image', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCropCancel = () => {
    setCroppingImage(null);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md mx-auto rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg p-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-4 text-blue-600"
      >
        Personal Details
      </motion.h2>
  
      {croppingImage ? (
        <ImageCropper
          image={croppingImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      ) : (
        <div className="mx-auto w-32 h-32 relative mb-4 border-4 border-white rounded-full overflow-hidden">
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
                <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer bg-black bg-opacity-50">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="text-white">Change Image</span>
                </label>
              )}
            </div>
          ) : (
            <div
              className="bg-gray-200 w-full h-full rounded-full flex items-center justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered ? (
                <label className="cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="text-gray-500">Upload Image</span>
                </label>
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          )}
        </div>
      )}
  
      {imageChanged && (
        <div className="mt-2 text-center">
          <button onClick={handleChangeImage} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">
            Save Image
          </button>
        </div>
      )}
  
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700">Name</label>
        {isEditing ? (
          <Input
            type="text"
            name="name"
            value={editedName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1">{name}</p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1">{email}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        {isEditing ? (
          <Input
            type="text"
            name="phone"
            value={editedPhone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1">{phone}</p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 flex justify-between"
      >
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">Edit</button>
        )}
        <button
          onClick={handleChangePassword}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          Change Password
        </button>
      </motion.div>
  
      {isChangePasswordOpen && (
        <ChangePasswordPopup
          visible={isChangePasswordOpen}
          setVisible={setIsChangePasswordOpen}
        />
      )}
    </motion.div>
  );
};

export default PersonalDetails;
