import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fadeInUp, staggerContainer, ios18Card } from '@/utils/animations';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [cameraStatuses, setCameraStatuses] = useState([
    { id: 1, status: 'Online', activity: 'Normal' },
    { id: 2, status: 'Online', activity: 'Normal' },
    { id: 3, status: 'Online', activity: 'Normal' },
    { id: 4, status: 'Online', activity: 'Normal' },
    { id: 5, status: 'Online', activity: 'Normal' },
    { id: 6, status: 'Online', activity: 'Normal' },
  ]);

  const videoUrls = [
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output.mp4',
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output1.mp4',
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output2.mp4',
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output3.mp4',
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output4.mp4',
    'https://aicoe.sgp1.digitaloceanspaces.com/demo-community/fixed_output6.mp4',
  ];

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
      className="ios18-container min-h-screen w-full"
    >
      <div className="container mx-auto px-4 py-6 relative z-10 pointer-events-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.h1 
            variants={fadeInUp}
            className="ios18-title text-center text-4xl font-bold mb-2"
          >
            Surveillance
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-center text-gray-600 mb-8"
          >
            Real-time camera monitoring
          </motion.p>

          {/* System Status */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-between items-center mb-6 px-4"
          >
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-600">System Active</span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ios18-button px-3 py-1 text-xs flex items-center"
              >
                <Icon icon="heroicons:video-camera" className="mr-1" />
                Live View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary border border-primary/20 rounded-lg px-3 py-1 text-xs flex items-center shadow-sm hover:shadow-md transition-all"
              >
                <Icon icon="heroicons:shield-check" className="mr-1" />
                Security Status
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-[30vh]"
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
                <p className="text-gray-600">Connecting to cameras...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cameras"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {videoUrls.map((videoUrl, index) => (
                <motion.div
                  key={index}
                  variants={ios18Card}
                  whileHover="hover"
                  onClick={() => setSelectedCamera(index)}
                  className="ios18-card overflow-hidden transition-all duration-300"
                >
                  <div className="bg-primary p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm font-medium text-white">Camera {index + 1}</span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/80 hover:text-white"
                      >
                        <Icon icon="heroicons:square-2-stack" className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/80 hover:text-white"
                      >
                        <Icon icon="heroicons:arrow-path" className="text-sm" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="relative">
                    <video
                      className="aspect-video w-full object-cover"
                      preload="metadata"
                      autoPlay
                      muted
                      loop
                      src={videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full flex items-center">
                      <Icon icon="heroicons:clock" className="mr-1 text-xs" />
                      Live
                    </div>
                  </div>
                  <div className="p-3 bg-white/90 backdrop-blur-sm">
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>Status: {cameraStatuses[index].status}</span>
                      <span>Activity: {cameraStatuses[index].activity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Page;
