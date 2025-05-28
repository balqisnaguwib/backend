import { useState, useEffect, useRef, MouseEvent, CSSProperties } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Icon
import { Icon } from '@iconify/react';

// Others
import DemoChat from '@/components/DemoChat';

const EmbedWidget = () => {
  // Standard and Vars
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Colors - defined here for easy theming
  const colors = {
    primary: '#b6010b',
    primaryLight: 'rgba(182, 1, 11, 0.1)',
    primaryLighter: 'rgba(182, 1, 11, 0.05)',
    white: '#ffffff',
    whiteTransparent: 'rgba(255, 255, 255, 0.9)',
    gray: '#f1f1f1',
    grayDark: '#888888',
    shadow: 'rgba(182, 1, 11, 0.2)'
  };

  // Effect to detect token from parent iframe
  useEffect(() => {
    try {
      const iframe = window.parent.document.querySelector('iframe[src*="widget-embed"]');
      if (iframe) {
        const token = iframe.getAttribute('data-token');
        if (token) {
          setToken(token);
        }
      }
    } catch (e) {
      console.log('Running in secure context, cannot access parent frame');
    }
  }, []);

  // Effect to handle outside clicks for closing widget
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node) && isOpen) {
        // Don't close immediately on outside click, add a small delay for better UX
        setTimeout(() => setIsMinimized(true), 100);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside as any);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [isOpen]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Custom styles without iOS18 dependencies
  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'fixed', 
      right: '16px', 
      bottom: '16px', 
      zIndex: 50, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end'
    },
    chatWindow: {
      marginBottom: '16px',
      display: 'flex',
      height: '500px',
      width: '350px',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: '16px',
      border: `1px solid ${colors.primaryLighter}`,
      backgroundColor: colors.whiteTransparent,
      backdropFilter: 'blur(10px)',
      boxShadow: `0 10px 40px ${colors.shadow}`,
      transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: `linear-gradient(to right, ${colors.primary}, #ff5e00)`,
      color: colors.white,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'move',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    avatarContainer: {
      position: 'relative',
      display: 'flex',
      height: '40px',
      width: '40px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(4px)'
    },
    avatar: {
      height: '36px',
      width: '36px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    onlineIndicator: {
      position: 'absolute',
      right: '-2px',
      bottom: '-2px',
      height: '12px',
      width: '12px',
      borderRadius: '50%',
      backgroundColor: '#4ade80',
      border: '2px solid white'
    },
    headerText: {
      fontWeight: 600
    },
    headerSubText: {
      fontSize: '12px',
      opacity: 0.9
    },
    headerButtons: {
      display: 'flex',
      gap: '8px'
    },
    headerButton: {
      borderRadius: '50%',
      padding: '6px',
      color: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    chatContent: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      overflow: 'hidden',
      height: 'calc(100% - 64px)'
    },
    scrollContainer: {
      height: '100%',
      overflowY: 'auto',
      padding: '16px',
      scrollbarWidth: 'thin'
    } as any, // Using any here because scrollbarWidth is not in standard CSSProperties
    minimizedBar: {
      marginBottom: '16px',
      backgroundColor: colors.white,
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.gray}`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      width: '300px'
    },
    minimizedAvatar: {
      position: 'relative',
      display: 'flex',
      height: '32px',
      width: '32px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    minimizedOnlineIndicator: {
      position: 'absolute',
      right: '-2px',
      bottom: '-2px',
      height: '8px',
      width: '8px',
      borderRadius: '50%',
      backgroundColor: '#4ade80',
      border: '2px solid white'
    },
    minimizedText: {
      fontSize: '14px',
      color: '#333',
      fontWeight: 500
    },
    minimizedButtons: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '4px'
    },
    minimizedButton: {
      color: colors.grayDark,
      backgroundColor: 'transparent',
      border: 'none',
      padding: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    toggleButton: {
      position: 'relative',
      display: 'flex',
      height: '64px',
      width: '64px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: colors.primary,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    },
    toggleImage: {
      height: '64px',
      width: '64px',
      borderRadius: '50%',
      objectFit: 'cover'
    } as CSSProperties,
    toggleOnlineIndicator: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      backgroundColor: '#4ade80',
      border: '2px solid white'
    },
    pulseRing: {
      position: 'absolute',
      inset: '-8px',
      borderRadius: '50%',
      border: `2px solid ${colors.primaryLight}`
    },
    helpIcon: {
      position: 'absolute',
      top: '-8px',
      left: '-8px',
      display: 'flex',
      height: '24px',
      width: '24px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: colors.white,
      color: colors.primary,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    helpBubble: {
      position: 'absolute',
      top: '-24px',
      right: '-8px',
      backgroundColor: colors.white,
      color: colors.primary,
      fontSize: '12px',
      padding: '4px 12px',
      borderRadius: '999px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {isOpen && !isMinimized && (
          <motion.div 
            ref={chatContainerRef}
            drag={isDragging}
            dragConstraints={{ left: -300, right: 20, top: -400, bottom: 20 }}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              ...styles.chatWindow,
              x: position.x,
              y: position.y
            }}
          >
            {/* Header section with drag handle */}
            <motion.div 
              style={styles.chatHeader}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onPointerDown={handleDragStart}
            >
              <div style={styles.headerLeft}>
                <motion.div 
                  style={styles.avatarContainer}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Image
                    src="/demo-community/yb-fahmi-fadzil.webp"
                    alt="Assistant"
                    width={236}
                    height={236}
                    style={styles.avatar as any}
                    unoptimized
                  />
                  <motion.div 
                    style={styles.onlineIndicator}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 style={styles.headerText}>Assistant</h3>
                  <motion.p 
                    style={styles.headerSubText}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Online • Ready to help
                  </motion.p>
                </div>
              </div>
              <div style={styles.headerButtons}>
                <motion.button
                  onClick={() => setIsMinimized(true)}
                  style={styles.headerButton}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon icon="mdi:minus" width="20" height="20" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  style={styles.headerButton}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon icon="mdi:close" width="20" height="20" />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat content with proper scrolling */}
            <motion.div 
              style={styles.chatContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={styles.scrollContainer}>
                <DemoChat token={token} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Minimized state */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={styles.minimizedBar}
            onClick={() => setIsMinimized(false)}
          >
            <div style={styles.minimizedAvatar}>
              <Image
                src="/demo-community/yb-fahmi-fadzil.webp"
                alt="Assistant"
                width={32}
                height={32}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover'
                } as CSSProperties}
                unoptimized
              />
              <motion.div 
                style={styles.minimizedOnlineIndicator}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div style={styles.minimizedText}>
              <p>Assistant is waiting...</p>
            </div>
            <div style={styles.minimizedButtons}>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                style={styles.minimizedButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon icon="mdi:arrow-expand" width="16" height="16" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                style={styles.minimizedButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon icon="mdi:close" width="16" height="16" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main toggle button when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => {
              setIsOpen(true);
              setPosition({ x: 0, y: 0 }); // Reset position when opening
            }}
            style={styles.toggleButton}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(182, 1, 11, 0.3)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated pulse ring */}
            <motion.div
              style={styles.pulseRing}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            {/* Assistant image */}
            <motion.div
              style={{ position: 'relative' }}
              whileHover={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/demo-community/yb-fahmi-fadzil.webp"
                alt="Assistant"
                width={236}
                height={236}
                style={styles.toggleImage}
                unoptimized
              />
              <motion.div 
                style={styles.toggleOnlineIndicator}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Floating chat bubble */}
            <motion.div
              style={styles.helpBubble}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.8],
                y: [0, -5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.1, 0.9, 1],
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              Need help?
            </motion.div>
            
            {/* Floating help icon */}
            <motion.div
              style={styles.helpIcon}
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
              <Icon icon="mdi:help" width="12" height="12" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmbedWidget;