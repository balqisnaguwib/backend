// iOS 18 Animation Variants
import { Variants } from 'framer-motion';

// Fade In Up animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

// Scale In animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

// Container with staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// iOS 18 card animation
export const ios18Card: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(182, 1, 11, 0.1)",
    transition: { 
      duration: 0.3,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

// Float animation
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.02, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};