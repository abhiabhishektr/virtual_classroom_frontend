import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserProfile from '../user/UserDashboard';
import TeacherDashboard from '../user/TeacherDashboard';
import ProfileHeader from './ProfileHeader';
import { motion } from 'framer-motion'; 

const ProfileOverview: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.profile);
  const [isTeacherDashboard, setIsTeacherDashboard] = useState(false);

  const handleToggleDashboard = () => {
    setIsTeacherDashboard(!isTeacherDashboard);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      <ProfileHeader 
        handleToggleDashboard={handleToggleDashboard} 
        isTeacherDashboard={isTeacherDashboard} 
      /> {/* Render ProfileHeader for all roles */}

      {role === 'teacher' && isTeacherDashboard ? (
        <TeacherDashboard /> 
      ) : (
        <UserProfile />
      )}
    </motion.div>
  );
};

export default ProfileOverview;