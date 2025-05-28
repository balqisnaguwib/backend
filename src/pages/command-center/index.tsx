import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import useDynamicHeight from '@/hooks/useDynamicHeight';
import iOS18Decoration from '@/components/iOS18Decoration';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState([
    { id: 1, title: 'Active Users', value: '2,543', icon: 'heroicons:users', change: '+12%' },
    { id: 2, title: 'Avg Response', value: '1.2s', icon: 'heroicons:clock', change: '-8%' },
    { id: 3, title: 'System Status', value: 'Optimal', icon: 'heroicons:server', change: 'Stable' },
    { id: 4, title: 'Alerts', value: '2', icon: 'heroicons:bell-alert', change: '-50%' }
  ]);
  const dynamicHeight = useDynamicHeight();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate iframe height based on available space
  const calculateIframeHeight = () => {
    if (!dynamicHeight) return '400px';
    
    // Subtract approximate header heights and margins
    const headerHeight = 200;
    const footerHeight = 100;
    const availableHeight = dynamicHeight - headerHeight - footerHeight;
    
    return Math.max(availableHeight, 400) + 'px';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ios18-container"
      style={{ height: dynamicHeight ? `${dynamicHeight}px` : '100vh' }}
    >
      {/* <iOS18Decoration className="opacity-100" /> */}
      <div className="container mx-auto h-full px-4 py-6 relative z-10 pointer-events-auto ios18-content">
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
            Command Center
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-center text-gray-600 mb-8"
          >
            Real-time monitoring and control
          </motion.p>

          {/* Key Metrics */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.id}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                className="ios18-card p-4 flex items-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Icon icon={metric.icon} className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{metric.title}</p>
                  <p className="text-gray-800 text-xl font-bold">{metric.value}</p>
                  <p className={`text-xs ${
                    metric.change.includes('+') ? 'text-green-500' : 
                    metric.change.includes('-') ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {metric.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Dashboard Content */}
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
                <p className="text-gray-600">Loading command center...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="ios18-iframe-container bg-white/90 backdrop-blur-md relative flex-grow"
              style={{ height: calculateIframeHeight() }}
            >
              <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <div className="absolute top-4 right-4 z-20 pointer-events-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ios18-button flex items-center px-4 py-2 text-sm"
                  >
                    <Icon icon="heroicons:refresh" className="mr-2" />
                    Refresh Data
                  </motion.button>
                </div>
              </div>
              <iframe
                title="Command Center Dashboard"
                width="100%"
                height="100%"
                src="https://app.powerbi.com/view?r=eyJrIjoiMjA0NDc2YzMtYzNmNS00NDk4LWE0ZTgtZWVhNWM2NTIxYmRkIiwidCI6ImRlNDZjMDQwLWY1ZGQtNDhlZi05MGE3LWIwNmNjMTc5NTBmMSIsImMiOjEwfQ%3D%3D"
                allowFullScreen
                className="z-0"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-6 space-x-4"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="ios18-button px-5 py-3 flex items-center"
          >
            <Icon icon="heroicons:document-report" className="mr-2" />
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary border border-primary/20 rounded-xl px-5 py-3 flex items-center shadow-sm hover:shadow-md transition-all"
          >
            <Icon icon="heroicons:share" className="mr-2" />
            Share Dashboard
          </motion.button> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;