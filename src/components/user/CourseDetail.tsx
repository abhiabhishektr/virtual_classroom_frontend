// src/components/user/CourseDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICourse } from '../../types/CourseTypes';
import { getUserCourseById } from '../../api/userCourseApi';
import { motion } from 'framer-motion';
import { constants } from '../../utils/constants'; // Ensure constants are imported correctly
import PaymentComponent from '../Payment/PaymentComponent';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

import RatingAndReview from './RatingAndReview';
import { markContentCompleted, markContentImportant, unmarkContentCompleted, unmarkContentImportant } from '../../api/user/userProgressApi';
import { showToast } from '../../utils/toast';
import SaveButton from './SaveButton';
import ReportIssueButton from './ReportIssueButton.tsx';


const CourseDetail: React.FC = () => {
    const [isInView, setIsInView] = useState(false);
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<ICourse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handleVideoClick = (url: string) => {
        if (url) {
            setSelectedVideo(url);
        }
    };

    const handleIntersection = () => {
        setIsInView(true);
    };

    const ref = useIntersectionObserver(handleIntersection);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const fetchedCourse = await getUserCourseById(courseId ?? '');
                // setCourse(fetchedCourse);
                setCourse(fetchedCourse);
            } catch (err) {
                setError('Failed to fetch course details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);



    const handleStarToggle = async (moduleIndex: number, contentIndex: number) => {
        if (!course || !course.modules || !courseId) return;

        const content = course?.modules?.[moduleIndex]?.contents[contentIndex];
        if (!content) return;
        const isImportant = content.isImportant;


        try {
            if (isImportant) {
                // Unmark content as important
                await unmarkContentImportant(courseId as string, content._id);
            } else {
                // Mark content as important
                await markContentImportant(courseId as string, content._id);
            }

            // Update the state to reflect the change
            const updatedCourse = { ...course };
            if (updatedCourse.modules) {
                // Ensure modules and contents are defined
                if (updatedCourse.modules[moduleIndex]?.contents?.[contentIndex]) {
                    updatedCourse.modules[moduleIndex].contents[contentIndex].isImportant = !isImportant;
                }
            }
            setCourse(updatedCourse);
            showToast('Importance Marked', 'success', 'small-toast', 2000, 'bottom-left');
        } catch (error) {
            showToast('Failed to update content importance', 'error');
            console.error('Error updating content importance', error);
        }
    };


    const handleCheckboxToggle = async (moduleIndex: number, contentIndex: number) => {

        if (!course || !course.modules || !courseId) return;

        const content = course.modules?.[moduleIndex]?.contents?.[contentIndex];
        if (!content) return;
        const isCompleted = content.isCompleted;


        try {
            if (isCompleted) {
                // Unmark content as completed
                await unmarkContentCompleted(courseId as string, content._id);
            } else {
                // Mark content as completed
                await markContentCompleted(courseId as string, content._id);
            }

            // Update the state to reflect the change
            const updatedCourse = { ...course };
            if (updatedCourse.modules) {
                // Ensure modules and contents are defined
                if (updatedCourse.modules?.[moduleIndex]?.contents?.[contentIndex]) {
                    updatedCourse.modules[moduleIndex].contents[contentIndex].isCompleted = !isCompleted;
                }
            }
            setCourse(updatedCourse);
            showToast('Bookmark Added', 'success', 'small-toast', 2000, 'bottom-left');


        } catch (error) {
            showToast('Failed to update content completion status', 'error');
            console.error('Error updating content completion status', error);
        }
    };




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
                                {selectedVideo ? (
                                    <video
                                        src={selectedVideo}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={course.imageUrl || constants.defaultAvatarUrl}
                                        alt={course.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>


                        {/* Course Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Details</h2>
                                {!course.isPurchased && (
                                    <SaveButton courseId={course._id} />
                                )}

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Instructor", value: course.instructorName },
                                    { label: "Category", value: course.category },
                                    { label: "Duration", value: `${course.duration ? course.duration * 10 : 'Not specified'} hours` },
                                    { label: "Start Date", value: course.startDate ? new Date(course.startDate).toLocaleDateString() : 'Not specified' },
                                    { label: "Modules", value: course.duration ? `${course.duration} modules` : 'Not specified' },
                                    { label: "Level", value: constants.level },
                                    { label: "Language", value: constants.language },
                                    {
                                        label: "Rating", value: (
                                            <div className="flex items-center">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        className={`w-4 h-4 ${index < Math.round(course.rating ?? 3) ? 'text-yellow-300' : 'text-gray-300'} ms-1`}
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 22 20"
                                                    >
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        )
                                    },
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
                                    src={course.instructorProfilePicture || 'https://picsum.photos/160'}
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



                        <div ref={ref}>
                            {isInView && <RatingAndReview isPurchased={course.isPurchased} />}
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
                                    ₹{course.fees ? course.fees.toFixed(2) : 'Price not available'}
                                </h2>
                                <PaymentComponent courseId={course._id} instructorEmail={course.instructorEmail} />

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
                            <Accordion type="single" collapsible>
                                {course.modules && course.modules.map((module, moduleIndex) => (
                                    <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
                                        <AccordionTrigger className="text-lg font-medium text-gray-800 mb-2">
                                            {module.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-2">
                                                {module.contents.map((content, contentIndex) => (
                                                    <li
                                                        key={contentIndex}
                                                        className="flex items-center justify-between space-x-2"
                                                    >
                                                        <span
                                                            onClick={() => handleVideoClick(content.url)}
                                                            className={`text-black hover:text-blue-400 ${!content.url ? "text-gray-500 cursor-not-allowed" : "cursor-pointer"}`}
                                                            title={!content.url ? "Unlock by Purchase" : ""}
                                                        >
                                                            {content.title}
                                                        </span>
                                                        <div className="flex items-center space-x-2">
                                                            {/* Star icon for marking as important */}
                                                            {content.isImportant ? (
                                                                <SolidStarIcon
                                                                    className="h-5 w-5 text-yellow-400 cursor-pointer"
                                                                    onClick={() => handleStarToggle(moduleIndex, contentIndex)}
                                                                />
                                                            ) : (
                                                                <OutlineStarIcon
                                                                    className="h-5 w-5 text-gray-400 cursor-pointer"
                                                                    onClick={() => handleStarToggle(moduleIndex, contentIndex)}
                                                                />
                                                            )}
                                                            {/* Checkbox */}
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox h-4 w-4 text-blue-600"
                                                                title="Mark as completed"
                                                                checked={content.isCompleted || false}
                                                                onChange={() => handleCheckboxToggle(moduleIndex, contentIndex)}
                                                                disabled={!content.url}
                                                            />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="flex items-center justify-center py-3">
                <ReportIssueButton courseId={course._id}  tittle={course.title}/> {/* Use the new component */}
            </div>
        </div>
    );
};

export default CourseDetail;
