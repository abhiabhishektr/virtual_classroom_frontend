// src/components/Profile/CourseRegistrationForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CourseData, CourseSubmissionData } from '../../types/CourseTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

interface CourseRegistrationFormProps {
  mode: 'create' | 'edit';
  course?: CourseData;
  onSubmit: (data: CourseSubmissionData) => void;
  nonEditableFields?: (keyof CourseData)[];
}

const categories = ['Programming', 'Science', 'History', 'Mathematics', 'Literature', 'Art'];

const validationSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title must be at least 5 characters').required('Required'),
  description: Yup.string().min(50, 'Description must be at least 50 characters').required('Required'),
  duration: Yup.number().min(2, 'Must have at least 2 modules').max(10, 'Cannot exceed 10 modules').required('Required'),
  category: Yup.string().oneOf(categories, 'Invalid category').required('Required'),
  startDate: Yup.date().min(new Date(), 'Start date cannot be in the past').required('Required'),
  fees: Yup.number().min(10, 'Fees must be at least 10 rupees').required('Required'),
});

const CourseRegistrationForm: React.FC<CourseRegistrationFormProps> = ({
  mode,
  course,
  onSubmit,
  nonEditableFields = []
}) => {
  const { name, email } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  const [image, setImage] = useState<string>(
    course?.imageUrl || 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const initialValues: CourseData = {
    title: '',
    description: '',
    imageUrl: '',
    duration: 0,
    startDate: '',
    fees: 0,
    category: '',
    ...course,
  };

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 10, // Maximum file size in MB
          maxWidthOrHeight: 1024, // Max width or height to maintain aspect ratio
          useWebWorker: true // web content to run scripts in background threads
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setImageFile(compressedFile);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      
      <div className="flex items-center justify-between mb-6">
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
        <h2 className="text-2xl font-bold">
          {mode === 'edit' ? 'Edit Course' : 'Register a New Course'}
        </h2>
        <div></div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit({ ...values, image: imageFile })}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Course Title</label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Introduction to Programming"
                      disabled={mode === 'edit' && nonEditableFields.includes('title')}
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Number of Modules</label>
                    <Field
                      type="number"
                      id="duration"
                      name="duration"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="2"
                    />
                    <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="fees" className="block mb-2 text-sm font-medium text-gray-900">Fees (in rupees)</label>
                    <Field
                      type="number"
                      id="fees"
                      name="fees"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="10"
                    />
                    <ErrorMessage name="fees" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className='items-center '>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">Contact Email : {email} </p>
                    </div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">Instructor Name : {name}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Course Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="An introductory course on programming."
                    rows={4}
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Course Image</h3>
                  <img src={image} alt="Course Preview" className="w-full h-48 object-cover rounded-md mb-2" />
                  <input
                    type="file"
                    onChange={handleChangeImage}
                    className="text-sm text-gray-500"
                    disabled={mode === 'edit' && nonEditableFields.includes('imageUrl')}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {mode === 'edit' ? 'Update Course' : 'Add Course'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseRegistrationForm;
