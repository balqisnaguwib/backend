// Components
import Chat from '@/components/Chat';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fadeInUp, staggerContainer, floatAnimation } from '@/utils/animations';
import iOS18Decoration from '@/components/iOS18Decoration';
import useDynamicHeight from '@/hooks/useDynamicHeight';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dynamicHeight = useDynamicHeight();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ios18-container"
      style={{ height: dynamicHeight ? `${dynamicHeight}px` : '100vh' }}
    >
      <iOS18Decoration className="opacity-100" />
      <div className="container mx-auto h-full px-4 py-6 relative z-10 pointer-events-auto ios18-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-6"
        >
          <motion.h1 
            variants={fadeInUp}
            className="ios18-title text-center text-4xl font-bold mb-2"
          >
            Assistant
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-center text-gray-600 mb-6"
          >
            Your intelligent conversation partner
          </motion.p>
        </motion.div>

        {/* Chat Container */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center flex-grow"
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    transition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                  className="text-primary text-4xl mb-4"
                >
                  <Icon icon="heroicons:arrow-path" />
                </motion.div>
                <p className="text-gray-600">Initializing assistant...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="container mx-auto flex flex-grow w-full flex-col p-1 md:w-2/3 md:p-4"
            >
              <Chat token={localStorage.getItem('accessToken') || ''} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Page;