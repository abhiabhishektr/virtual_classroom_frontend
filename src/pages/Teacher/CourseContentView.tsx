// src/pages/Teacher/CourseContentView.tsx
import React, { useEffect, useState } from 'react';
import CourseContentManagement from '../../components/Profile/CourseContentManagement';
import { getModulesByCourseId } from '../../api/teacher/courseContentApi';
import { useNavigate, useParams } from 'react-router-dom';

import { IChapter, courseContentDetails } from '../../types/contentTypes';



const CourseContent: React.FC = () => {
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const navigate =useNavigate();
  // In CourseContentView.tsx
  const [courseDetails, setCourseDetails] = useState<courseContentDetails>({
    courseId: '',
    title: '',
    ModuleId: '' // Provide default values based on your courseContentDetails type
  }); const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (courseId) {
          const response = await getModulesByCourseId(courseId);
          console.log("Modules response:", response);
          setChapters(response.modules);
          setCourseDetails({
            courseId: response.courseId,
            title: response.title,
            ModuleId: response.moduleId
          });

        }
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    };

    fetchModules();
  }, [courseId]);

  return (
    <div className="container mx-auto px-4 py-3">
      <div className='flex items-center justify-between w-full mb-3'>
      <button
          onClick={() => navigate('/profile/course-list')}
          className="mr-4 text-gray-600 hover:text-gray-800 hover:bg-black hover:bg-opacity-20  rounded-full"  
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          > 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      <h2 className="text-2xl font-bold">{courseDetails.title}</h2>
      <div></div>
      </div>
      <CourseContentManagement chapters={chapters} courseDetails={(courseDetails ?? {})} />
    </div>
  ); 
};

export default CourseContent;