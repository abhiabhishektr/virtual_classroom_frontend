import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '../../utils/toast';
import { registerAsTeacher, getTeacherRequestStatus } from '../../api/profileApi'; // Adjust the path as needed
import { Input } from '../ui/input';

const RequestTeacherStatus: React.FC = () => {
  const [requestData, setRequestData] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequestStatus = async () => {
      try {
        const data = await getTeacherRequestStatus(); // Replace with actual API call

        setRequestData(data.request);
        setStatus(data.status.toString());
      } catch (error) {
        console.error('Failed to fetch request data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestStatus();
  }, []);

  const formik = useFormik({
    initialValues: {
      qualification: '',
      experience: '',
      subjectsToTeach: '',
      bio: '',
    },
    validationSchema: Yup.object({
      qualification: Yup.string()
        .max(50, 'Qualification must be 50 characters or less')
        .required('Required'),
      experience: Yup.number()
        .required('Required')
        .typeError('Experience must be a number')
        .max(50, 'Experience must be 50 characters or less'),
      subjectsToTeach: Yup.string()
        .max(50, 'Subjects must be 50 characters or less')
        .required('Required'),
      bio: Yup.string()
        .min(20, 'Bio must be at least 20 characters')
        .max(50, 'Bio must be 50 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await registerAsTeacher(values);
        showToast('Teacher status request submitted successfully!', 'success');
        // Reload the page to reflect the new request status
        window.location.reload();
      } catch (error) {
        showToast('Failed to submit request. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center">
    {requestData ? 'Teacher Request Status' : 'Request Teacher Status'}
  </h2>

  {loading ? (
    <p>Loading...</p>
  ) : requestData ? (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
              Highest Qualification
            </label>
            <p className="mt-2 text-gray-900">{requestData.highestQualification}</p>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Years of Teaching Experience
            </label>
            <p className="mt-2 text-gray-900">{requestData.yearsOfTeachingExperience}</p>
          </div>

          <div>
            <label htmlFor="subjectsToTeach" className="block text-sm font-medium text-gray-700">
              Subjects You Want to Teach
            </label>
            <p className="mt-2 text-gray-900">{requestData.subjects}</p>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Brief Bio or Teaching Philosophy
            </label>
            <p className="mt-2 text-gray-900">{requestData.bio}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className={`text-lg font-medium ${status === 'pending' ? 'text-yellow-500' : status === 'approved' ? 'text-green-500' : status === 'rejected' ? 'text-red-500' : ''}`}>
          Status: {status}
        </p>
      </div>
    </div>
  ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
              Highest Qualification
            </label>
            <Input
              id="qualification"
              name="qualification"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.qualification && formik.errors.qualification ? (
              <div className="text-red-600 text-sm">{formik.errors.qualification}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Years of Teaching Experience
            </label>
            <Input
              id="experience"
              name="experience"
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.experience && formik.errors.experience ? (
              <div className="text-red-600 text-sm">{formik.errors.experience}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="subjectsToTeach" className="block text-sm font-medium text-gray-700">
              Subjects You Want to Teach (comma-separated)
            </label>
            <Input
              id="subjectsToTeach"
              name="subjectsToTeach"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={formik.values.subjectsToTeach}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subjectsToTeach && formik.errors.subjectsToTeach ? (
              <div className="text-red-600 text-sm">{formik.errors.subjectsToTeach}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Brief Bio or Teaching Philosophy
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.bio && formik.errors.bio ? (
              <div className="text-red-600 text-sm">{formik.errors.bio}</div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestTeacherStatus;
