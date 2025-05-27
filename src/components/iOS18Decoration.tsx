// Next, React
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useDynamicHeight from '@/hooks/useDynamicHeight';

interface iOS18DecorationProps {
  className?: string;
}

const iOS18Decoration: React.FC<iOS18DecorationProps> = ({ className = '' }) => {
  // Use our custom hook to make sure decoration adapts to dynamic height
  const dynamicHeight = useDynamicHeight();

  return (
    <div 
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ height: dynamicHeight ? `${dynamicHeight}px` : '100vh' }}
    >
      {/* Floating red circle */}
      <motion.div 
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-red-400/10 to-red-600/10 blur-xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: '15%', right: '10%' }}
      />
      
      {/* Small red dot */}
      <motion.div 
        className="absolute w-5 h-5 rounded-full bg-primary/30 blur-sm"
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: '35%', left: '15%' }}
      />
      
      {/* Red gradient beam */}
      <motion.div 
        className="absolute w-64 h-64 bg-gradient-to-r from-red-500/5 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ bottom: '20%', left: '5%' }}
      />
      
      {/* White glare effect */}
      <motion.div 
        className="absolute w-full h-24 bg-gradient-to-b from-white/20 to-transparent blur-xl"
        animate={{
          opacity: [0.1, 0.15, 0.1],
          y: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: '5%' }}
      />
    </div>
  );
};

export default iOS18Decoration;