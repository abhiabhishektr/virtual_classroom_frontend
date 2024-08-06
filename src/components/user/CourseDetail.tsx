import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICourse } from '../../types/CourseTypes';
import { getUserCourseById } from '../../api/userCourseApi';
import { motion } from 'framer-motion';
import { constants } from '../../utils/constants'; // Ensure constants are imported correctly
import PaymentComponent from '../Payment/PaymentComponent';

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<ICourse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const fetchedCourse = await getUserCourseById(courseId ?? '');
                setCourse(fetchedCourse);
            } catch (err) {
                setError('Failed to fetch course details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-6">{error}</div>;
    }

    if (!course) {
        return <div className="text-center py-6">No course found.</div>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Course Title and Basic Info */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-4xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                        {course.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-1xl mx-auto">
                        {course.description && course.description.length > 150
                            ? course.description.slice(0, 50) + '...'
                            : course.description}
                    </p>
                </motion.div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    {/* Left Column: Image and Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:w-2/3"
                    >
                        {/* Course Image */}
                        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                            <div className="relative pb-[56.25%]">
                                <img
                                    src={course.imageUrl || constants.defaultAvatarUrl}
                                    alt={course.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Course Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Instructor", value: course.instructorName },
                                    { label: "Category", value: course.category },
                                    { label: "Duration", value: course.duration ? `${course.duration} hours` : 'Not specified' },
                                    { label: "Start Date", value: course.startDate ? new Date(course.startDate).toLocaleDateString() : 'Not specified' },
                                    { label: "Level", value: constants.level },
                                    { label: "Language", value: constants.language },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">{item.label}</span>
                                        <span className="mt-1 text-lg text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Description */}
                        {course.description && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8 mx-1">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Course</h2>
                                <motion.div
                                    initial={false}
                                    animate={{ height: isDescriptionExpanded ? 'auto' : '100px' }}
                                    className="relative overflow-hidden"
                                >
                                    <p className="text-gray-700 whitespace-normal">{course.description}</p>
                                    {!isDescriptionExpanded && (
                                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
                                    )}
                                </motion.div>
                                <button
                                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                                </button>
                            </div>
                        )}


                        {/* Instructor Bio */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructor</h2>
                            <div className="flex items-center mb-4">
                                <img
                                    src={constants.defaultAvatarUrl}
                                    alt={course.instructorName}
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold">{course.instructorName}</h3>
                                    <p className="text-gray-600">{course.instructorEmail}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">{constants.instructorBio}</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Course Content and Enrollment */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:w-1/3 mt-8 lg:mt-0"
                    >
                        {/* Enrollment Card */}
                        {!course.isPurchased && (
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-20">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    ${course.fees ? course.fees.toFixed(2) : 'Price not available'}
                                </h2>
                                <PaymentComponent courseId={course._id} />

                                <ul className="text-gray-600 space-y-2">
                                    {[
                                        `${course.duration || 'N/A'} hours of content`,
                                        ...constants.features
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Course Content */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Content</h2>
                            <div className="space-y-4">
                                {constants.placeholderSections.map((section, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg shadow p-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                        <ul className="list-disc list-inside text-gray-700 mt-2">
                                            {section.items.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
