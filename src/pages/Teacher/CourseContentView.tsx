// src/pages/Teacher/CourseContentView.tsx
import React, { useEffect, useState } from 'react';
import CourseContentManagement from '../../components/Profile/CourseContentManagement';
import { getModulesByCourseId } from '../../api/teacher/courseContentApi';
import { useParams } from 'react-router-dom';

import { IChapter, courseContentDetails } from '../../types/contentTypes';



const CourseContent: React.FC = () => {
  const [chapters, setChapters] = useState<IChapter[]>([]);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{courseDetails.title}</h1>
      <CourseContentManagement chapters={chapters} courseDetails={(courseDetails ?? {})} />
    </div>
  );
};

export default CourseContent;