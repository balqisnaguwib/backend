// Next, React, Tw
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

// PrimeReact
import { Sidebar } from 'primereact/sidebar';

// Icons
import { Icon } from '@iconify/react';

// Packages
import * as R from 'ramda';
import { motion, AnimatePresence } from 'framer-motion';

// Others
import AuthGuard from '../providers/AuthGuard';
import { logout } from '../stores/auth';
import { useMediaQuery } from '@/contexts/MediaQuery';

// Interfaces

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Standard and Vars
  const { push, asPath } = useRouter();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    // Set active tab based on current path
    const slicedPath = asPath?.split('?')?.[0];
    setActiveTab(slicedPath);
  }, [asPath]);

  // Others

  const TABS = [
    {
      path: '/assistant',
      label: 'Assistant',
      icon: 'wpf:assistant',
      userIsAllowedAccess: true,
    },
    {
      path: '/surveillance',
      label: 'Surveillance',
      icon: 'icon-park-outline:surveillance-cameras-two',
      userIsAllowedAccess: true,
    },
    {
      path: '/command-center',
      label: 'Command Center',
      icon: 'cil:center-focus',
      userIsAllowedAccess: true,
    },
    {
      path: '/demo-iframe',
      label: 'Widget',
      icon: 'mdi:chat',
      userIsAllowedAccess: true,
    },
  ];
  const TABS_ = R.indexBy(R.prop('path'), TABS);

  const RoleGuard: React.FC<LayoutProps> = ({ children }) => {
    const { asPath } = useRouter();
    const slicedPath = asPath?.split('?')?.[0]?.split('/')[1];

    if (TABS_?.[`/${slicedPath}`]?.userIsAllowedAccess) return children;
    return <div className="flex h-full items-center justify-center">Unauthorized</div>;
  };

  const sidePanels = (
    <>
      <motion.div 
        className="flex w-full items-center gap-2 px-2 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          type="button"
          className={twMerge(
            'flex h-[45px] items-center justify-center transition-all duration-300 hover:scale-105'
          )}
          onClick={() => push('/dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/logo.webp"
            alt="Logo"
            width={1024}
            height={768}
            className="h-[55px] w-[45px] rounded-lg"
          />
        </motion.button>
        <AnimatePresence>
          {sidebarIsOpen && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold text-white/90"
            >
              AI Community
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="flex flex-grow flex-col gap-3 px-3 py-4">
        {TABS?.map((o, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: i * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          >
            <Link
              href={o?.path}
              className={twMerge(
                'group relative flex items-center justify-center gap-3 rounded-xl p-2 transition-all duration-300',
                sidebarIsOpen && 'justify-start',
                asPath === o?.path 
                  ? 'bg-white/20 backdrop-blur-lg shadow-sm' 
                  : 'hover:bg-white/10 hover:backdrop-blur-md'
              )}
              onClick={() => setActiveTab(o?.path)}
              style={{
                border: asPath === o?.path ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                boxShadow: asPath === o?.path ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              {asPath === o?.path && (
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md"
                  layoutId="activeTab"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2
                    }
                  }}
                  animate={{
                    boxShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.2)', '0 0 0px rgba(255, 255, 255, 0)']
                  }}
                />
              )}
              <motion.div 
                className="relative flex w-[22px] items-center justify-center"
                whileHover={{ 
                  rotate: [0, -8, 8, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.6 }}
              >
                <Icon 
                  icon={o?.icon} 
                  className={twMerge(
                    'text-[22px] text-white/90 transition-transform duration-300',
                    asPath === o?.path ? 'text-white scale-110' : 'group-hover:scale-110'
                  )} 
                />
              </motion.div>
              <AnimatePresence>
                {sidebarIsOpen && (
                  <motion.p 
                    className={twMerge(
                      'relative text-sm font-medium',
                      asPath === o?.path ? 'text-white' : 'text-white/80'
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      textShadow: asPath === o?.path ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    {o?.label}
                  </motion.p>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mb-4 flex flex-col gap-2 px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {/* iOS 18-style collapse button */}
        <motion.button
          type="button"
          className={twMerge(
            'group flex items-center justify-center gap-3 rounded-xl px-2 py-2 transition-all duration-300 hover:bg-white/15 hover:backdrop-blur-md',
            sidebarIsOpen && 'justify-start'
          )}
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ 
            scale: 0.95,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '8px'
          }}
        >
          <motion.div 
            className="flex w-[22px] items-center justify-center"
            whileHover={{ 
              rotate: [0, -8, 8, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon 
              icon={sidebarIsOpen ? 'material-symbols:chevron-left-rounded' : 'material-symbols:chevron-right-rounded'} 
              className={twMerge('text-[22px] text-white/90 group-hover:scale-110 transition-transform duration-300')} 
            />
          </motion.div>
          <AnimatePresence>
            {sidebarIsOpen && (
              <motion.p 
                className="text-sm font-medium text-white/90"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {sidebarIsOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.button>
        
        <motion.button
          type="button"
          className={twMerge(
            'group flex items-center justify-center gap-3 rounded-xl px-2 py-2 transition-all duration-300 hover:bg-white/15 hover:backdrop-blur-md',
            sidebarIsOpen && 'justify-start'
          )}
          onClick={() => dispatch(logout())}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ 
            scale: 0.95,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div 
            className="flex w-[22px] items-center justify-center"
            whileHover={{ 
              rotate: [0, -15, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon 
              icon="material-symbols:logout" 
              className={twMerge('text-[22px] text-white/90 group-hover:scale-110 transition-transform duration-300')} 
            />
          </motion.div>
          <AnimatePresence>
            {sidebarIsOpen && (
              <motion.p 
                className="text-sm font-medium text-white/90"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Log Out
              </motion.p>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );

  return (
    <AuthGuard>
      <div className="relative flex h-screen w-full text-white">
        <motion.div
          className={twMerge(
            'bg-primary hidden h-full flex-col justify-between shadow-xl transition-all duration-500 ease-in-out md:flex relative overflow-hidden',
            sidebarIsOpen ? 'w-[200px]' : 'w-[70px]'
          )}
          initial={{ width: sidebarIsOpen ? 200 : 70 }}
          animate={{ width: sidebarIsOpen ? 200 : 70 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 40 
          }}
          style={{ 
            borderTopRightRadius: '24px', 
            borderBottomRightRadius: '24px',
            backgroundImage: 'linear-gradient(to bottom, rgba(182, 1, 11, 0.9), rgba(182, 1, 11, 1))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
          whileHover={{
            boxShadow: '0 6px 40px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* iOS 18 decorations for sidebar */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating glow effect */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-white/5 blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [5, 15, 5],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ top: '10%', right: '-10%' }}
            />
            
            {/* Red accent glow */}
            <motion.div 
              className="absolute w-32 h-16 bg-red-500/20 blur-2xl"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ bottom: '20%', left: '-10%' }}
            />
            
            {/* Light beam effect */}
            <motion.div 
              className="absolute w-full h-40 bg-gradient-to-b from-white/10 to-transparent blur-xl"
              animate={{
                opacity: [0.05, 0.1, 0.05],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ top: '0' }}
            />
          </div>
          
          {sidePanels}
        </motion.div>
        {isSmallScreen && (
          <Sidebar 
            visible={sidebarIsOpen} 
            onHide={() => setSidebarIsOpen(false)}
            className="ios18-sidebar"
          >
            <div
              className={twMerge(
                'bg-primary flex h-full w-full flex-col justify-between transition-all duration-300 ease-in-out relative overflow-hidden',
                'w-full rounded-r-2xl'
              )}
              style={{ 
                backgroundImage: 'linear-gradient(to bottom, rgba(182, 1, 11, 0.9), rgba(182, 1, 11, 1))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* iOS 18 decorations for mobile sidebar */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Floating glow effect */}
                <motion.div 
                  className="absolute w-24 h-24 rounded-full bg-white/5 blur-xl"
                  animate={{
                    y: [0, -20, 0],
                    x: [5, 15, 5],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{ top: '10%', right: '-10%' }}
                />
                
                {/* Red accent glow */}
                <motion.div 
                  className="absolute w-32 h-16 bg-red-500/20 blur-2xl"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{ bottom: '20%', left: '-10%' }}
                />
                
                {/* Light beam effect */}
                <motion.div 
                  className="absolute w-full h-40 bg-gradient-to-b from-white/10 to-transparent blur-xl"
                  animate={{
                    opacity: [0.05, 0.1, 0.05],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{ top: '0' }}
                />
              </div>
              
              {sidePanels}
            </div>
          </Sidebar>
        )}
        <div className="relative h-full flex-grow bg-gradient-to-b from-white to-red-50">
          {/* iOS 18 decorations for content area */}
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
              style={{ bottom: '10%', left: '5%' }}
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
          
          <div
            className={twMerge(
              'flex h-full w-full flex-col overflow-auto p-6 text-black transition-all duration-300 ease-in-out'
            )}
          >
            <div className="relative z-10">
              <RoleGuard>{children}</RoleGuard>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Layout;
