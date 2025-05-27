// Next, React, Tw
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon
import { Icon } from '@iconify/react/dist/iconify.js';

// Others
import axios from '@/utils/axios';

const Chat = () => {
  // Standard and Vars
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatsList, setChatsList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageSent, setLastMessageSent] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSendQuery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setChatsList((prev) => [...prev, inputValue]);
      setInputValue('');
      setIsTyping(false);
      setLastMessageSent(Date.now());
      
      // Simulate API response
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  // Track mouse position for iOS 18 hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll('.ios18-element, .ios18-card');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (el as HTMLElement).style.setProperty('--x', `${x}%`);
        (el as HTMLElement).style.setProperty('--y', `${y}%`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex h-full flex-col justify-end px-6 py-16 bg-transparent relative">
      {/* Animated decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
          className="absolute w-5 h-5 rounded-full bg-[var(--color-primary)]/30 blur-sm"
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
          style={{ bottom: '10%', left: '5%' }}
        />
        
        {/* White glare effect */}
        <motion.div 
          className="absolute w-full h-24 bg-gradient-to-b from-white/10 to-transparent blur-xl"
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
      
      <motion.div 
        className="flex flex-grow flex-col justify-between py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-4">
          <motion.p 
            className="ios18-title text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Where to today?
          </motion.p>
          <motion.div 
            className="ios18-card flex items-start gap-3 rounded-lg border-l-4 border-[var(--color-primary)] bg-white/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.01, boxShadow: '0 10px 25px rgba(182, 1, 11, 0.1)' }}
          >
            <motion.div 
              className="flex-shrink-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[#ff0000] p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="ri:gemini-fill" className="text-[22px] text-white" />
            </motion.div>

            <p className="leading-relaxed text-gray-700">
              Hey there, where would you like to go? I&apos;m here to assist you in planning your
              experience. Ask me any travel related topic.
            </p>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {chatsList.length > 0 && (
            <motion.div 
              className="mt-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {chatsList.map((chat, index) => {
                const isNew = lastMessageSent && Date.now() - lastMessageSent < 1000 && index === chatsList.length - 1;
                
                return (
                  <motion.div
                    key={index}
                    className="flex justify-end"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: isNew ? 1.02 : 1 
                    }}
                    transition={{ 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    {isNew && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.03 }}
                        transition={{
                          repeat: 1,
                          repeatType: "reverse",
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    <div className="ios18-bubble ios18-bubble-user max-w-[80%]">
                      {chat}
                    </div>
                  </motion.div>
                );
              })}
              
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="ios18-card flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
                    <div className="ios18-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mt-6 flex items-center justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button 
            className="ios18-button flex cursor-pointer items-center gap-1 text-[var(--color-primary)] transition-colors bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-red-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="mdi:help-circle-outline" className="text-[18px]" />
            <span>What can I ask Midtrip?</span>
          </motion.button>
        </motion.div>
      </motion.div>
      
      <motion.form 
        className={`ios18-chat-input mt-4 flex flex-col gap-2 rounded-2xl p-3 transition-all duration-300 ${isTyping ? 'ring-2 ring-[var(--color-primary)]/20 border-[var(--color-primary)]' : 'border border-gray-200'}`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onSubmit={handleSendQuery}
      >
        <input
          ref={inputRef}
          className="w-full px-2 py-1.5 text-gray-700 focus:ring-0 focus:outline-none bg-transparent"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <div className="flex justify-between">
          <motion.button 
            type="button" 
            className="rounded-full p-2 transition-colors hover:bg-red-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon="ic:baseline-plus" className="text-[20px] text-[var(--color-primary)]" />
          </motion.button>
          <motion.button 
            type="submit" 
            className="rounded-full p-2 transition-colors hover:bg-red-50 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!inputValue.trim() || isLoading}
          >
            <Icon icon="pajamas:paper-airplane" className="text-[20px] text-[var(--color-primary)]" />
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Chat;
