// src/pages/Profile.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import PersonalDetails from '../components/Profile/PersonalDetails';
import ProfileOverview from '../components/Profile/ProfileOverview';
import { getProfile } from "../api/profileApi";
import { setProfileData, setLoading, setError } from '../redux/slices/profileSlice';
import { RootState } from '../redux/store';
import Loader from "../components/Shared/Loader";
import RegisterAsTeacher from '../components/Profile/TeacherRegistration';
import CourseList from '../pages/Teacher/CourseList';
import CourseRegistration from '../pages/Teacher/CourseRegistration';
import CourseEdit from '../pages/Teacher/CourseEdit';
import TeacherProtectedRoute from './ProtectedRoute/TeacherProtectedRoute';
import CoursePurchaseHistory from '../pages/Users/CoursePurchaseHistory';
import CourseContents from '../pages/Teacher/CourseContentView';
import Notifications from '../pages/Users/Notifications';
// import { FiMenu } from 'react-icons/fi';


const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { name, email, loading, error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!name && !email) {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          const data = await getProfile();
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200"><Loader /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-200">{error}</div>;
  }

  return (
    <div className="flex min-h-full ">
      {/* <div className='w-72 hidden md:block '> */}
      <Sidebar />
      {/* </div> */}
      <main className="flex-1  ml-0 md:ml-72">
        <Routes>
          <Route path="/" element={<ProfileOverview />} />
          <Route path="/edit-profile" element={<PersonalDetails />} />
          <Route path="/teacher-registration" element={<RegisterAsTeacher />} />
          <Route path="/purchase-history" element={< CoursePurchaseHistory />} />
          <Route path="/notifications" element={< Notifications />} />

          <Route element={<TeacherProtectedRoute requiredRole="teacher" />}>
            <Route path="/course-list" element={<CourseList />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
            <Route path="/course-edit/:courseId" element={<CourseEdit />} />
            <Route path="/course-contents/:courseId" element={<CourseContents />} />
          </Route>

        </Routes>
      </main>
    </div>
  );
};

export default ProfilePage;

