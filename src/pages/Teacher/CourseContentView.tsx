// src/pages/Teacher/CourseContentView.tsx
import React, { useEffect, useState } from 'react';
import CourseContentManagement from '../../components/Profile/CourseContentManagement';
import { getModulesByCourseId } from '../../api/teacher/courseContentApi';
import { useParams } from 'react-router-dom';

import {IChapter} from '../../types/contentTypes';



const CourseContent: React.FC = () => {
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (courseId) {
          const response = await getModulesByCourseId(courseId);
          console.log("Modules response:", response);
          setChapters(response);
        }
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    };

    fetchModules();
  }, [courseId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Content Management</h1>
      <CourseContentManagement chapters={chapters} />
    </div>
  );
};

export default CourseContent;