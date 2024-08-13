import React, { useEffect, useState } from 'react';
import CourseAdminList from '../../components/Admin/CourseAdminList';
import { getUserCourses } from '../../api/userCourseApi';
import {courseListingAdminDTO} from "../../types/courseListingDTO";

const CourseOversight: React.FC = () => {
  const [courses, setCourses] = useState<courseListingAdminDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await getUserCourses();
        console.log(fetchedCourses);
        
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleBlockToggle = (courseId: string, currentlyBlocked: boolean) => {
    // Simulate updating course status
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, blocked: !currentlyBlocked }
        : course
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CourseAdminList courses={courses} onBlockToggle={handleBlockToggle} />
    </div>
  );
};

export default CourseOversight;
