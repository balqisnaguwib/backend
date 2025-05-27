import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fadeInUp, staggerContainer, ios18Card } from '@/utils/animations';
import iOS18Decoration from '@/components/iOS18Decoration';
import useDynamicHeight from '@/hooks/useDynamicHeight';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'react'>('basic');
  const dynamicHeight = useDynamicHeight();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || 'demo-token' : 'demo-token';

  const embedCodes = {
    basic: `<iframe
  src="${domain}/widget-embed"
  data-token="${token}"
  title="Travel Assistant Widget"
  style="position: fixed; right: 0; bottom: 0; z-index: 9999; height: 600px; width: 400px; border: 0; overflow: hidden; border-radius: 16px;"
  allow="microphone; camera"
  loading="lazy">
</iframe>`,
    
    advanced: `<!-- Travel Assistant Widget -->
<script>
  (function() {
    const widget = document.createElement('iframe');
    widget.src = '${domain}/widget-embed';
    widget.setAttribute('data-token', '${token}');
    widget.title = 'Travel Assistant Widget';
    widget.style.cssText = \`
      position: fixed !important;
      right: 20px !important;
      bottom: 20px !important;
      z-index: 2147483647 !important;
      height: 600px !important;
      width: 400px !important;
      border: 0 !important;
      border-radius: 16px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
      background: transparent !important;
      overflow: hidden !important;
      transition: all 0.3s ease !important;
    \`;
    widget.allow = 'microphone; camera';
    widget.loading = 'lazy';
    
    // Add mobile responsiveness
    function adjustForMobile() {
      if (window.innerWidth <= 768) {
        widget.style.width = 'calc(100vw - 40px)';
        widget.style.right = '20px';
        widget.style.height = '500px';
      } else {
        widget.style.width = '400px';
        widget.style.height = '600px';
      }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(widget);
        adjustForMobile();
      });
    } else {
      document.body.appendChild(widget);
      adjustForMobile();
    }
    
    window.addEventListener('resize', adjustForMobile);
  })();
</script>`,

    react: `// React Component Integration
import { useEffect, useRef } from 'react';

const TravelAssistantWidget = ({ token = '${token}' }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const widget = document.createElement('iframe');
    widget.src = '${domain}/widget-embed';
    widget.setAttribute('data-token', token);
    widget.title = 'Travel Assistant Widget';
    widget.style.cssText = \`
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 9999;
      height: 600px;
      width: 400px;
      border: 0;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
    \`;
    widget.allow = 'microphone; camera';
    widget.loading = 'lazy';

    if (widgetRef.current) {
      widgetRef.current.appendChild(widget);
    }

    return () => {
      if (widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    };
  }, [token]);

  return <div ref={widgetRef} />;
};

export default TravelAssistantWidget;`
  };

  const features = [
    {
      icon: 'heroicons:chat-bubble-left-right',
      title: 'Smart Conversations',
      description: 'AI-powered chat with travel expertise and local knowledge'
    },
    {
      icon: 'heroicons:device-phone-mobile',
      title: 'Mobile Responsive',
      description: 'Automatically adapts to different screen sizes and devices'
    },
    {
      icon: 'heroicons:shield-check',
      title: 'Secure & Private',
      description: 'Token-based authentication with privacy-first design'
    },
    {
      icon: 'heroicons:puzzle-piece',
      title: 'Easy Integration',
      description: 'Drop-in widget that works with any website or platform'
    },
    {
      icon: 'heroicons:paint-brush',
      title: 'Customizable Theme',
      description: 'iOS 18-inspired design that matches modern aesthetics'
    },
    {
      icon: 'heroicons:bolt',
      title: 'High Performance',
      description: 'Lightweight iframe with lazy loading and optimized assets'
    }
  ];

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
        >
          <motion.h1 
            variants={fadeInUp}
            className="ios18-title text-center text-4xl font-bold mb-2"
          >
            Embed Travel Assistant
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Add our intelligent travel assistant to your website with just a few lines of code. 
            Perfect for travel agencies, hotels, and tourism websites.
          </motion.p>

          {/* Features Grid */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                className="ios18-card p-6 text-center"
                variants={ios18Card}
              >
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon icon={feature.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Integration Options */}
          <motion.div 
            variants={fadeInUp}
            className="ios18-card p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Integration Method</h2>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
              <div className="ios18-card flex p-1 rounded-xl">
                {[
                  { id: 'basic', label: 'Basic HTML', icon: 'heroicons:code-bracket' },
                  { id: 'advanced', label: 'Advanced JS', icon: 'heroicons:cog-6-tooth' },
                  { id: 'react', label: 'React Component', icon: 'simple-icons:react' }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon icon={tab.icon} className="text-sm" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {activeTab === 'basic' && 'Simple HTML Iframe'}
                    {activeTab === 'advanced' && 'JavaScript with Mobile Support'}
                    {activeTab === 'react' && 'React Hook Component'}
                  </h3>
                  <motion.button
                    onClick={() => copyToClipboard(embedCodes[activeTab], activeTab)}
                    className="ios18-button px-3 py-2 text-sm flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      icon={copiedStates[activeTab] ? "heroicons:check" : "heroicons:clipboard"} 
                      className="text-sm" 
                    />
                    {copiedStates[activeTab] ? 'Copied!' : 'Copy Code'}
                  </motion.button>
                </div>
                
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-gray-900 p-6 text-sm leading-relaxed text-gray-100 max-h-96">
                    <code>{embedCodes[activeTab]}</code>
                  </pre>
                  
                  {copiedStates[activeTab] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <Icon icon="heroicons:check" className="text-sm" />
                      Copied!
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Configuration Options */}
          <motion.div 
            variants={fadeInUp}
            className="ios18-card p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuration Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Required Attributes</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">data-token</code>
                    <span>Your API authentication token</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">src</code>
                    <span>Widget iframe source URL</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Styling Options</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">position</code>
                    <span>fixed (recommended) or absolute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">z-index</code>
                    <span>High value (9999+) to stay on top</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">border-radius</code>
                    <span>16px for modern rounded appearance</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Requirements & Support */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="ios18-card p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon icon="heroicons:check-circle" className="text-green-500" />
                Requirements
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Icon icon="heroicons:check" className="text-green-500 text-xs" />
                  Modern web browser with JavaScript enabled
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="heroicons:check" className="text-green-500 text-xs" />
                  HTTPS website (recommended for security)
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="heroicons:check" className="text-green-500 text-xs" />
                  Minimum viewport width of 320px
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="heroicons:check" className="text-green-500 text-xs" />
                  Valid API token for authentication
                </li>
              </ul>
            </div>

            <div className="ios18-card p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon icon="heroicons:question-mark-circle" className="text-blue-500" />
                Need Help?
              </h2>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Icon icon="heroicons:book-open" className="text-gray-500" />
                  <span>View Documentation</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Icon icon="heroicons:chat-bubble-left-right" className="text-gray-500" />
                  <span>Contact Support</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Icon icon="heroicons:play" className="text-gray-500" />
                  <span>See Live Demo</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;