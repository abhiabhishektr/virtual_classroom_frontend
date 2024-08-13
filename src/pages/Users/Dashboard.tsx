import React from "react";
import hero from '../../assets/images/hero.jpg';
import Lottie from 'lottie-react';
import animationData from '../../assets/Json/hero.json'; // Adjust the path to your animation JSON file
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    // Check if an auth token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('authToken');

    return (
        <div className="bg-white"> 
        {/* //style={{ height: 'calc(100vh - 64px)'}} */}
            <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            {!isAuthenticated ? (
                                <>
                                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A platform for learners</p>
                                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Connect & learn from the experts</h1>
                                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Grow your career fast with the right mentor.</p>
                                    <Link to="/auth/signup" title="Join for free" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-400 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                                        Join for free
                                        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                    <p className="mt-5 text-gray-600">Already joined us? <Link to="/auth/login" title="Log in" className="text-black transition-all duration-200 hover:underline">Log in</Link></p>
                                </>
                            ) : (
                                <>
                                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">Welcome Back!</p>
                                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Hey, how are you today?</h1>
                                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Continue your learning journey.</p>
                                    <Link to="/courses" title="Go to Courses" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-400 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                                        View Courses
                                        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div>
                            {isAuthenticated ? (
                                <Lottie 
                                    animationData={animationData}
                                    loop
                                    autoplay
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <img className="w-full" src={hero} alt="Hero" />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
