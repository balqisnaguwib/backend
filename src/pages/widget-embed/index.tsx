import { ReactNode, useEffect } from 'react';
import Head from 'next/head';

// Components
import EmbedWidget from '@/components/EmbedWidget';

const Page = () => {
  useEffect(() => {
    // Force transparency on all elements
    if (typeof document !== 'undefined') {
      // Remove all backgrounds
      document.documentElement.style.background = 'transparent';
      document.documentElement.style.backgroundColor = 'transparent';
      document.body.style.background = 'transparent';
      document.body.style.backgroundColor = 'transparent';
      
      // Ensure no margins or padding
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      
      // Remove all borders and shadows
      document.documentElement.style.border = 'none';
      document.body.style.border = 'none';
      document.documentElement.style.boxShadow = 'none';
      document.body.style.boxShadow = 'none';
    }
  }, []);

  return (
    <>
      <Head>
        <title>Widget</title>
        <style jsx global>{`
          html, body, #__next {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            overflow: hidden !important;
          }
          
          /* Override any iOS18 decorations */
          .ios18-decoration {
            display: none !important;
          }
        `}</style>
      </Head>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        backgroundColor: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <EmbedWidget />
        </div>
      </div>
    </>
  );
};

// Skip layout
Page.getLayout = (page: ReactNode) => page;

export default Page;