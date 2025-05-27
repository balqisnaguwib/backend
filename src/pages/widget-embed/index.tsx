import { ReactNode, useEffect } from 'react';

// Components
import EmbedWidget from '@/components/EmbedWidget';

const Page = () => {
  useEffect(() => {
    // Add some debugging to check if the page loads
    console.log('Widget embed page loaded');
    
    // Ensure the page works in an iframe context
    try {
      if (window.self !== window.top) {
        console.log('Running inside iframe');
      } else {
        console.log('Running in top window');
      }
    } catch (e) {
      console.log('Cannot access parent window - likely in secure iframe');
    }
  }, []);

  return (
    <div className="h-screen w-full bg-transparent">
      <EmbedWidget />
    </div>
  );
};

Page.getLayout = (page: ReactNode) => page;

export default Page;