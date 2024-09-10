// import React, { useState, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// interface FeaturedCourse {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   courseLink: string;
// }

const FeaturedCoursesBanner= () => {
  // // const [featuredCourses, setFeaturedCourses] = useState<FeaturedCourse[]>([]);
  // // const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  // // const [isLoading, setIsLoading] = useState(true);

  // // useEffect(() => {
  // //   // Sample featured courses data with working URLs
  // //   const sampleCourses: FeaturedCourse[] = [
  // //     {
  // //       id: 1,
  // //       title: "Stuck in neutral?",
  // //       description: "Accelerate your future with lessons from McLaren Racing.",
  // //       imageUrl: "https://img-c.udemycdn.com/notices/featured_carousel_slide/3x2/c986864c-a398-4e43-a790-69c3a43b6642.jpg",
  // //       courseLink: "https://www.udemy.com/course/mclaren-applied-technologies-high-performance/", 
  // //     },
  // //     {
  // //       id: 2,
  // //       title: "The Complete 2023 Web Development Bootcamp",
  // //       description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!",
  // //       imageUrl: "https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg",
  // //       courseLink: "https://www.udemy.com/course/the-web-developer-bootcamp/", 
  // //     },
  // //     {
  // //       id: 3,
  // //       title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
  // //       description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
  // //       imageUrl: "https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg",
  // //       courseLink: "https://www.udemy.com/course/machinelearning/", 
  // //     },
  // //     // Add more sample courses with working URLs here
  // //   ];

  // //   setFeaturedCourses(sampleCourses);
  // //   setIsLoading(false);
  // // }, []);

  // // const handleNextCourse = () => {
  // //   setCurrentCourseIndex((prevIndex) =>
  // //     (prevIndex + 1) % featuredCourses.length
  // //   );
  // // };

  // // const handlePreviousCourse = () => {
  // //   setCurrentCourseIndex((prevIndex) =>
  // //     prevIndex === 0 ? featuredCourses.length - 1 : prevIndex - 1
  // //   );
  // // };

  // if (isLoading) {
  //   return (
  //     <div className="lg:col-span-6 bg-black p-6 relative">
  //       <div className="flex items-center justify-center">
  //         <div className="max-w-md">
  //           <Skeleton height={200} />
  //           <div className="p-4 bg-gray-800 rounded-lg mt-4">
  //             <Skeleton height={20} width={200} />
  //             <Skeleton height={10} width={300} count={2} />
  //             <Skeleton height={30} width={150} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (featuredCourses.length === 0) {
  //   return <div>No featured courses found.</div>;
  // }

  // const currentCourse = featuredCourses[currentCourseIndex];

  // return (
    // <div className="lg:col-span-6 bg-black p-6 relative">
    //   <div className="flex items-center justify-center">
    //     <button
    //       onClick={handlePreviousCourse}
    //       className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
    //       disabled={featuredCourses.length <= 1}
    //     >
    //       ←
    //     </button>

    //     <div className="max-w-md">
    //       <img
    //         src={currentCourse.imageUrl}
    //         alt={currentCourse.title}
    //         className="w-full h-auto object-cover rounded-lg"
    //       />
    //       <div className="p-4 bg-gray-800 rounded-lg mt-4">
    //         <h3 className="text-white text-xl font-bold mb-2">{currentCourse.title}</h3>
    //         <p className="text-gray-400 text-base mb-4">{currentCourse.description}</p>
    //         <a
    //           href={currentCourse.courseLink}
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           target="_blank" 
    //           rel="noopener noreferrer" 
    //         >
    //           Take the course
    //         </a>
    //       </div>
    //     </div>

    //     <button
    //       onClick={handleNextCourse}
    //       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
    //       disabled={featuredCourses.length <= 1}
    //     >
    //      →
    //     </button>
    //   </div>
    // </div>
  // );
};

export default FeaturedCoursesBanner;