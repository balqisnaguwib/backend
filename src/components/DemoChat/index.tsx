// Next, React, Tw
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { Icon } from '@iconify/react/dist/iconify.js';

// Others
import axios from '@/utils/axios';
import { CHAT_ENDPOINT } from '@/utils/apiEndpoint';

const DemoChat = ({ token }: { token?: string }) => {
  // Standard and Vars
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentsList, setContentsList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessageSent, setLastMessageSent] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSendContent = async (content: string) => {
    const newContents = {
      role: 'user',
      content,
    };
    setContentsList((prev) => [...prev, newContents]);
    setInputValue('');
    setIsTyping(false);
    setLastMessageSent(Date.now());

    try {
      setIsLoading(true);
      
      if (token) {
        const response = await axios.post(CHAT_ENDPOINT, [...contentsList, newContents], {
          headers: {
            'x-api-token': token,
          },
        });
        setContentsList((prev) => [
          ...prev,
          { role: 'assistant', content: response?.data?.response },
        ]);
      } else {
        // Demo responses for showcase
        setTimeout(() => {
          const demoResponses = [
            "Hi there! I'm a demo assistant. I can help you with report and general questions about Lembah Pantai.",
            "That's a great question! As a demo, I can show you how I would respond to queries.",
            "I'd be happy to help you. This is just a demonstration of the chat interface.",
            "Thanks for trying out the demo! In the real version, I'd provide detailed insights."
          ];
          const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
          setContentsList((prev) => [
            ...prev,
            { role: 'assistant', content: randomResponse },
          ]);
          setIsLoading(false);
        }, 1200);
      }
    } catch (error) {
      console.error(error);
      setContentsList((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. This is a demo environment.' },
      ]);
    } finally {
      if (token) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef?.current?.focus();
  }, [contentsList?.length]);

  // Track mouse position for iOS 18 hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll('.ios18-element');
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
    <>
      <div className="flex min-h-[350px] flex-grow flex-col gap-4 overflow-y-auto p-4 bg-transparent relative">
        {/* Animated iOS 18 decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Floating red circle */}
          <motion.div 
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-red-400/10 to-red-600/10 blur-xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: '10%', right: '5%' }}
          />
          
          {/* Small red dot */}
          <motion.div 
            className="absolute w-3 h-3 rounded-full bg-[var(--color-primary)]/30 blur-sm"
            animate={{
              y: [0, 8, 0],
              x: [0, -3, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: '30%', left: '10%' }}
          />
        </div>
        
        <AnimatePresence>
          {[
            {
              role: 'assistant',
              content: token ? 'Salam Madani 👋' : 'Welcome to the demo! 👋 ',
            },
            ...contentsList,
          ]?.map((o: any, i: number) => {
            const isNew = lastMessageSent && Date.now() - lastMessageSent < 1000 && i === contentsList.length;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: isNew && o?.role === 'user' ? 1.02 : 1 
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className={twMerge('flex w-full mb-2', o?.role === 'user' && 'justify-end')}
                whileHover={{ y: -1, transition: { duration: 0.2 } }}
              >
                <div
                  className={twMerge(
                    'flex max-w-4/5 flex-col gap-2',
                    o?.role === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={twMerge(
                      'flex w-full items-start gap-2',
                      o?.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <motion.div 
                      className="flex h-8 w-8 shrink-0 items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {o?.role === 'user' ? (
                        <div className="ios18-element bg-gradient-to-br from-red-500 to-red-600 h-8 w-8 rounded-full flex items-center justify-center">
                          <Icon icon="material-symbols:person" className="text-white text-[18px]" />
                        </div>
                      ) : (
                        <div className="ios18-element overflow-hidden rounded-full">
                          <Image
                            src="/demo-community/yb-fahmi-fadzil.webp"
                            alt="Demo Assistant"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-cover"
                            priority
                            unoptimized
                          />
                        </div>
                      )}
                    </motion.div>
                    <div className="flex-grow">
                      <motion.div
                        className={twMerge(
                          'ios18-card rounded-xl px-3 py-2 text-sm',
                          o?.role === 'user'
                            ? 'rounded-tr-sm bg-white/90 text-gray-800 shadow-md shadow-red-50'
                            : 'rounded-tl-sm bg-white/90 text-gray-800 shadow-sm'
                        )}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        {o?.role === 'user' ? (
                          o?.content
                        ) : (
                          <TypeAnimation
                            sequence={[o?.content]}
                            wrapper="span"
                            speed={99}
                            cursor={false}
                          />
                        )}
                      </motion.div>
                      <div className={twMerge(
                        'text-xs text-gray-400 mt-1',
                        o?.role === 'user' ? 'text-right pr-1' : 'pl-1'
                      )}>
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            className="flex w-full items-center justify-start py-3 px-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="ios18-card flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5">
              <div className="ios18-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
      
      <motion.form
        className={twMerge(
          "ios18-chat-input sticky bottom-0 flex items-center gap-2 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 shadow-md transition-all duration-300",
          isTyping ? "border-[var(--color-primary)] ring-1 ring-red-50" : ""
        )}
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (inputValue.trim()) {
            handleSendContent(inputValue);
          }
        }}
      >
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            name="content"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Ask me or report"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 py-1.5 pl-2 pr-6"
            disabled={isLoading}
          />
          
          {inputValue && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setInputValue('');
                setIsTyping(false);
                inputRef.current?.focus();
              }}
            >
              <Icon icon="material-symbols:close" className="text-[16px]" />
            </motion.button>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className={twMerge(
            'ios18-button flex items-center justify-center rounded-lg p-2 text-sm font-medium text-white transition-all duration-200',
            (isLoading || !inputValue.trim())
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[var(--color-primary)]'
          )}
        >
          <Icon icon="material-symbols:arrow-upward" className="text-[18px]" />
        </motion.button>
      </motion.form>
    </>
  );
};

export default DemoChat;