import React from 'react';
import { motion } from 'framer-motion';
import WelcomeMessage from './WelcomeMessage';
import AnimatedLottie from './AnimatedLottie';

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isAuthenticated }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col justify-center items-center h-[87vh] w-screen"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="flex flex-col justify-center items-center w-full h-full"
      >
        <div className="bg-white h-full">
          <section className="bg-[#FCF8F1] bg-opacity-30 md:py-0 sm:py-16 h-full">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2"
              >
                <WelcomeMessage isAuthenticated={isAuthenticated} /> 
                <AnimatedLottie isAuthenticated={isAuthenticated} />
              </motion.div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;