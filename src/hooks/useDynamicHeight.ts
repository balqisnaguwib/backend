import { useState, useEffect } from 'react';

export const useDynamicHeight = () => {
  // Start with a reasonable default before measurement
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      // Use window.innerHeight which is more reliable than 100vh on mobile
      const windowHeight = window.innerHeight;
      setHeight(windowHeight);
      
      // Update CSS custom property for use in non-JS contexts
      document.documentElement.style.setProperty('--dynamic-height', `${windowHeight}px`);
    };

    // Initial measurement
    updateHeight();

    // Add event listeners for various scenarios that might change the viewport height
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    // For mobile browsers where address bar shows/hides during scrolling
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return height;
};

export default useDynamicHeight;