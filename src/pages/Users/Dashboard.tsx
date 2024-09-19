import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../../assets/Json/hero.json'; // Adjust the path to your animation JSON file
import hero from '../../assets/images/hero.jpg';
import FeatureCard from "../../components/LandingPage/FeatureCard"; // Assuming you have a FeatureCard component
import Testimonial from "../../components/LandingPage/Testimonial" ; // Assuming you have a Testimonial component
// import LandingCarousel from "../../components/LandingPage/LandingCarousel.ts" ; // Assuming you have a Testimonial component



const Dashboard: React.FC = () => {
  // Check if an auth token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');

  const features = [
    {
      title: 'Become an Instructor',
      description: 'Share your knowledge and expertise by creating and selling your own courses.',
      icon: 'chalkboard-teacher', // Assuming you're using Font Awesome icons
    },
    {
      title: 'Learn from Experts',
      description: 'Access a wide range of high-quality courses taught by industry professionals.',
      icon: 'user-graduate',
    },
    {
      title: 'Flexible Learning',
      description: 'Learn at your own pace, anytime, anywhere, on any device.',
      icon: 'clock',
    },
    {
      title: 'Interactive Community',
      description: 'Connect with other learners, ask questions, and participate in discussions.',
      icon: 'users',
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      quote: '"This platform has transformed my career! I learned valuable skills and landed my dream job."',
      image: '/path/to/john-doe-image.jpg', // Replace with actual image path
    },
    {
      name: 'Jane Smith',
      quote: '"I love the flexibility of learning on this platform. I can fit it into my busy schedule."',
      image: '/path/to/jane-smith-image.jpg',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col justify-center items-center w-screen"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="flex flex-col justify-center items-center w-full"
      >
        {/* Hero Section */}
        <section className="bg-[#FCF8F1] bg-opacity-30 md:py-0 sm:py-16 h-full w-full">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2"
            >
              {/* Text Content */}
              <div>
                {!isAuthenticated ? (
                  <>
                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase mt-6">A platform for learners & educators</p>
                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                      Unlock Your Potential with Online Learning
                    </h1>
                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                      Learn new skills, advance your career, or share your expertise with the world.
                    </p>
                    <div className="flex mt-8 lg:mt-16 space-x-4">
                      <Link
                        to="/auth/signup"
                        title="Join for free"
                        className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-500 rounded-full hover:bg-blue-600 focus:bg-blue-600"
                        role="button"
                      >
                        Join for Free
                      </Link>
                      <Link
                        to="/auth/signup?role=instructor"
                        title="Become an Instructor"
                        className="inline-flex items-center px-6 py-4 font-semibold text-blue-600 transition-all duration-200 bg-gray-100 rounded-full hover:bg-gray-200 focus:bg-gray-200"
                        role="button"
                      >
                        Become an Instructor
                      </Link>
                    </div>
                    <p className="mt-5 text-gray-600">
                      Already joined us?{' '}
                      <Link to="/auth/login" title="Log in" className="text-blue-600 transition-all duration-200 hover:underline">
                        Log in
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">Welcome Back!</p>
                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                      Hey, how are you today?
                    </h1>
                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                      Continue your learning journey.
                    </p>
                    <Link
                      to="/courses"
                      title="Go to Courses"
                      className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-500 rounded-full lg:mt-16 hover:bg-blue-600 focus:bg-blue-600"
                      role="button"
                    >
                      View Courses
                    </Link>
                  </>
                )}
              </div>
              {/* Image/Animation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {isAuthenticated ? (
                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <img className="w-full rounded-lg shadow-lg" src={hero} alt="Hero" />
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        {!isAuthenticated && (
          <section className="py-12 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Discover the benefits of our e-learning platform.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Testimonials Section (Optional) */}
        {!isAuthenticated && (
          <section className="py-12 bg-gray-100">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Testimonial key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action (Optional) */}
        {!isAuthenticated && (
          <section className="py-12 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join our community of learners and educators today!
                </p>
                <Link
                  to="/auth/signup"
                  title="Join for free"
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-500 rounded-full hover:bg-blue-600 focus:bg-blue-600"
                  role="button"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard; 