import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fadeInUp, staggerContainer, ios18Card } from '@/utils/animations';
import iOS18Decoration from '@/components/iOS18Decoration';
import useDynamicHeight from '@/hooks/useDynamicHeight';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWidget, setShowWidget] = useState(false);
  const dynamicHeight = useDynamicHeight();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-show widget after component loads
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: 'heroicons:chat-bubble-left-right',
      title: 'Smart Conversations',
      description: 'Natural language processing for intuitive interactions',
      color: 'bg-blue-500'
    },
    {
      icon: 'heroicons:globe-alt',
      title: 'Multi-language Support',
      description: 'Communicate in multiple languages with automatic translation',
      color: 'bg-green-500'
    },
    {
      icon: 'heroicons:shield-check',
      title: 'Privacy First',
      description: 'Secure conversations with enterprise-grade encryption',
      color: 'bg-purple-500'
    },
    {
      icon: 'heroicons:device-phone-mobile',
      title: 'Mobile Optimized',
      description: 'Perfect experience across all devices and screen sizes',
      color: 'bg-orange-500'
    },
    {
      icon: 'heroicons:clock',
      title: '24/7 Availability',
      description: 'Always online to help your visitors anytime',
      color: 'bg-indigo-500'
    },
    {
      icon: 'heroicons:chart-bar-square',
      title: 'Analytics Dashboard',
      description: 'Track engagement and optimize customer interactions',
      color: 'bg-pink-500'
    }
  ];

  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || 'demo-token' : 'demo-token';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ios18-container relative"
      style={{ height: dynamicHeight ? `${dynamicHeight}px` : '100vh' }}
    >
      {/* <iOS18Decoration className="opacity-100" /> */}
      
      <div className="container mx-auto h-full px-4 py-6 relative z-10 pointer-events-auto ios18-content overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.h1 
              className="ios18-title text-5xl font-bold mb-4"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              Assistant Demo
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Experience the future of customer service. See how our AI assistant 
              transforms user engagements.
            </motion.p>
            
            <motion.div 
              className="flex justify-center"
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => setShowWidget(true)}
                className="ios18-button px-8 py-4 text-lg flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="heroicons:play" className="text-xl" />
                Try Live Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="ios18-card p-6 group"
                  whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)" }}
                  variants={ios18Card}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon icon={feature.icon} className="text-white text-xl" />
                  </motion.div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Integration Preview */}
          <motion.div 
            variants={fadeInUp}
            className="ios18-card p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Easy Integration</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 text-sm ml-2">HTML</span>
                </div>
                <pre className="text-green-400 text-sm leading-relaxed">
                  <code>{`<!-- Just add this single line to your website -->
                    <iframe
                      src="/demo-community/widget-embed"
                      data-token={token}
                      title="Assistant Widget"
                      style={{
                        width: '400px',
                        height: '600px',
                        border: 'none',
                        background: 'transparent',
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      }}
                      frameBorder="0"
                      allowTransparency={true}
                    />`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Live Widget */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed right-4 bottom-4 z-50"
          >
            <iframe
              src={`${domain}/widget-embed`}
              data-token={token}
              title="Assistant Demo Widget"
              className="w-96 h-[600px]"
              allowTransparency={true}
              allow="microphone; camera"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hint */}
      <AnimatePresence>
        {!showWidget && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-8 bottom-8 z-40"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                boxShadow: [
                  "0 4px 20px rgba(182, 1, 11, 0.1)",
                  "0 8px 30px rgba(182, 1, 11, 0.2)",
                  "0 4px 20px rgba(182, 1, 11, 0.1)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-primary text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
              onClick={() => setShowWidget(true)}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  👋
                </motion.div>
                Click to see the widget in action!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;