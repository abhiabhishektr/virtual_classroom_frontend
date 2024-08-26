import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseRegistrationForm from '../../components/Profile/CourseRegistrationForm';
import { CourseData, CourseSubmissionData } from '../../types/CourseTypes';
import { editCourse, getCourseById } from '../../api/teacher/courseApi';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import { showToast } from '../../utils/toast';

const CourseEdit: React.FC = () => {
  const [course, setCourse] = useState<CourseData | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetchedCourse = useRef(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId && !hasFetchedCourse.current) {
        hasFetchedCourse.current = true; // Prevent multiple fetches
        try {
          const courseData = await getCourseById(courseId);
          courseData.startDate = new Date(courseData.startDate).toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
          setCourse(courseData);

        } catch (error) {
          console.error('Error fetching course:', error);
          showToast('Error fetching course details. Please try again.', 'error');
        } 
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (data: CourseSubmissionData) => {
    if (!courseId) return;

    try {
      dispatch(setLoading(true));
      console.log(data);
      
      await editCourse(courseId, data);
      showToast('Course updated successfully', 'success');
      navigate('/profile/course-list'); // Redirect to course list or appropriate page
    } catch (error: unknown) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      showToast(`Error updating course: ${errorMessage}. Please try again.`, 'error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl mb-6 text-center ">Loading...</div>
      </div>
    );
    
  }

  return (
    <div>
      <CourseRegistrationForm 
        mode="edit" 
        course={course} 
        onSubmit={handleSubmit}
        nonEditableFields={['title']} // Assuming 'title' should not be editable
      />
    </div>
  );
};

export default CourseEdit;
