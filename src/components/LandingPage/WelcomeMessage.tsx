import React from 'react';

interface WelcomeMessageProps {
  isAuthenticated: boolean;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <>
        <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A platform for learners</p>
        <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Connect & learn from the experts</h1>
        <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Grow your career fast with the right mentor.</p>
      </>
    );
  } else {
    return (
      <>
        <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">Welcome Back!</p>
        <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Hey, how are you today?</h1>
        <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Continue your learning journey.</p>
      </>
    );
  }
};

export default WelcomeMessage;