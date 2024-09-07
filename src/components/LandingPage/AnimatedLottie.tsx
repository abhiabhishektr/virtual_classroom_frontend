import React from 'react';
import hero from '../../assets/images/hero.jpg';
import Lottie from 'lottie-react';
import animationData from '../../assets/Json/hero.json';
import { motion } from 'framer-motion';

interface AnimatedLottieProps {
  isAuthenticated: boolean;
}

const AnimatedLottie: React.FC<AnimatedLottieProps> = ({ isAuthenticated }) => {
  return (
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
        <img className="w-full" src={hero} alt="Hero" />
      )}
    </motion.div>
  );
};

export default AnimatedLottie;