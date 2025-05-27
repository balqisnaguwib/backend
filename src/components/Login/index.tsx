import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

// Others
import { login } from '@/stores/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessEffect, setShowSuccessEffect] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (username === 'admin' && password === 'password123') {
      setShowSuccessEffect(true);
      const TOKEN = 'zamzamzumzum';
      dispatch(
        login({
          user: {
            username: username,
          },
          token: TOKEN,
        })
      );
      
      // Delay redirection to show success animation
      setTimeout(() => {
        push('/assistant');
      }, 1200);
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  // iOS 18 inspired container animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Child animations
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  // Button hover effect
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(182, 1, 11, 0.2)",
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.98 }
  };

  // Input field focus animation
  const inputVariants = {
    rest: { borderColor: "#e5e7eb", boxShadow: "none" },
    focus: { 
      borderColor: "#b6010b", 
      boxShadow: "0 0 0 3px rgba(182, 1, 11, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ffe9e9] to-white overflow-hidden">
      {/* Background decorative elements - iOS 18 inspired */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#b6010b] opacity-30 blur-3xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#b6010b] to-[#ff5e00] opacity-20 blur-3xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />

      {/* Glass morphism card container */}
      <motion.div 
        className="relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl bg-white/80 backdrop-blur-lg p-10 shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and brand */}
        <motion.div 
          className="mb-8 flex flex-col items-center"
          variants={childVariants}
        >
          <motion.div 
            className="mb-3 flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="mr-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b6010b] to-[#ff5e00] shadow-md"
              whileHover={{ 
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.25 17.8 6 17.3 6 16.76C6 14.92 7.56 13.33 9.4 13.33H14.6C16.44 13.33 18 14.92 18 16.76C18 17.3 17.75 17.8 17.34 18.12C15.9 19.33 14.03 20 12 20Z" fill="white"/>
                {/* Neural network connections */}
                <circle cx="7.5" cy="7.5" r="1" fill="white"/>
                <circle cx="16.5" cy="7.5" r="1" fill="white"/>
                <circle cx="7.5" cy="16.5" r="1" fill="white"/>
                <circle cx="16.5" cy="16.5" r="1" fill="white"/>
                <path d="M7.5 7.5L12 6M7.5 7.5L7.5 16.5M7.5 7.5L16.5 7.5M16.5 7.5L12 6M16.5 7.5L16.5 16.5M7.5 16.5L12 18M7.5 16.5L16.5 16.5M16.5 16.5L12 18" stroke="white" strokeWidth="0.5"/>
              </svg>
            </motion.div>
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b6010b] to-[#ff5e00]">
              AI Community
            </span>
          </motion.div>
          <motion.p 
            className="text-gray-500 text-center text-sm"
            variants={childVariants}
          >
            Sign in to access your account
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form 
          className="flex w-full flex-col gap-5" 
          onSubmit={handleSubmit}
          variants={childVariants}
        >
          <motion.div 
            className="relative"
            variants={childVariants}
          >
            <motion.span 
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              animate={{ scale: username ? 0.95 : 1 }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </motion.span>
            <motion.input
              type="text"
              placeholder="Username"
              className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-11 bg-white/50 backdrop-blur-sm text-gray-800 transition-all duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              animate={username ? "focus" : "rest"}
            />
            {username && (
              <motion.span 
                className="absolute top-1/2 right-3 -translate-y-1/2 text-green-500"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            )}
          </motion.div>

          <motion.div 
            className="relative"
            variants={childVariants}
          >
            <motion.span 
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              animate={{ scale: password ? 0.95 : 1 }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </motion.span>
            <motion.input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-11 bg-white/50 backdrop-blur-sm text-gray-800 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              animate={password ? "focus" : "rest"}
            />
            {password && (
              <motion.span 
                className="absolute top-1/2 right-3 -translate-y-1/2 text-green-500"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            )}
          </motion.div>

          {/* Error message with animation */}
          <motion.div
            className="h-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: error ? 1 : 0,
              height: error ? 'auto' : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {error && (
              <motion.div 
                className="text-center text-sm text-[#b6010b]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="flex items-center justify-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  </svg>
                  {error}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Forgot password link */}
          <motion.div 
            className="self-end text-sm text-gray-500"
            variants={childVariants}
            whileHover={{ scale: 1.02, color: "#b6010b" }}
          >
            <a href="#" className="hover:text-[#b6010b] transition-colors">Forgot password?</a>
          </motion.div>

          {/* Sign in button with loading state */}
          <motion.button
            type="submit"
            className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl ${showSuccessEffect ? 'bg-green-500' : 'bg-gradient-to-r from-[#b6010b] to-[#ff5e00]'} py-3 font-semibold text-white shadow-md`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            disabled={isLoading || showSuccessEffect}
          >
            {showSuccessEffect ? (
              <motion.span 
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                SUCCESS
                <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            ) : isLoading ? (
              <motion.span 
                className="flex items-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="50 50" strokeDashoffset="0"/>
                </svg>
              </motion.span>
            ) : (
              <>
                SIGN IN
                <motion.span 
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Sign up option */}
        <motion.div 
          className="mt-6 text-sm text-gray-500 flex gap-1"
          variants={childVariants}
        >
          Don't have an account?
          <motion.span 
            className="font-medium text-[#b6010b] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign up
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
