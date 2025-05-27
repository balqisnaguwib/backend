import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Icon
import { Icon } from '@iconify/react';

// Others
import DemoChat from '@/components/DemoChat';

const EmbedWidget = () => {
  // Standard and Vars
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const iframe = window.parent.document.querySelector('iframe[src*="widget-embed"]');
    if (iframe) {
      const token = iframe.getAttribute('data-token');
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 flex w-80 flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-lg shadow-2xl sm:w-96"
          >
            <motion.div 
              className="from-primary/90 to-primary flex items-center justify-between bg-gradient-to-r px-4 py-3 text-white shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Image
                    src="/demo-community/yb-fahmi-fadzil.webp"
                    alt="Assistant"
                    width={236}
                    height={236}
                    className="h-9 w-9 rounded-full object-cover"
                    unoptimized
                  />
                  <motion.div 
                    className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Travel Assistant</h3>
                  <motion.p 
                    className="text-xs text-white/90"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Online • Ready to help
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/15"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon icon="mdi:close" className="h-5 w-5" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex flex-grow flex-col gap-4 overflow-y-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DemoChat token={token} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="group bg-primary hover:shadow-primary/25 relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ 
              boxShadow: "0 10px 30px rgba(182, 1, 11, 0.3)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing background effect */}
            <motion.div 
              className="from-primary/80 to-primary absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Assistant image */}
            <motion.div
              className="relative"
              whileHover={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/demo-community/yb-fahmi-fadzil.webp"
                alt="Travel Assistant"
                width={236}
                height={236}
                className="relative h-16 w-16 rounded-full object-cover transition-transform duration-300"
                unoptimized
              />
              <motion.div 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-400 ring-2 ring-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Floating help icon */}
            <motion.div
              className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary shadow-md"
              animate={{ 
                y: [0, -2, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon icon="mdi:help" className="h-3 w-3" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmbedWidget;