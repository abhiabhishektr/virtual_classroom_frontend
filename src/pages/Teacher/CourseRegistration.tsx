// src/pages/CourseRegistration.tsx

import React from 'react';
import CourseRegistrationForm from '../../components/Profile/CourseRegistrationForm';
import {  CourseSubmissionData } from '../../types/CourseTypes'; // Assuming you've moved the interfaces to a separate file
import { addCourse } from '../../api/teacher/courseApi'; // Import the addCourse API function
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import { showToast } from '../../utils/toast';


const CourseRegistration: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (data: CourseSubmissionData) => {
    try {
      console.log("data", data);
      dispatch(setLoading(true));
      await addCourse(data);
      showToast('Course added successfully', 'success');

    }catch (error: unknown) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      showToast(`Error adding course: ${errorMessage}. Please try again.`, 'error');
    } finally {
      dispatch(setLoading(false));
    }

  };

  return (
    <div>
      <CourseRegistrationForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default CourseRegistration;
