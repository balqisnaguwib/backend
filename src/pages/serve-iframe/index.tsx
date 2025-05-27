import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';

// Icon
import { Icon } from '@iconify/react';

// Others
import Chat from '@/components/Chat';

const Page = () => {
  // Standard and Vars
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const iframe = window.parent.document.querySelector('iframe[src*="serve-iframe"]');
    if (iframe) {
      const token = iframe.getAttribute('data-token');
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl sm:w-96">
          <div className="from-primary/90 to-primary flex items-center justify-between bg-gradient-to-r px-4 py-3 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20 backdrop-blur-sm">
                <Image
                  src="/demo-community/yb-fahmi-fadzil.webp"
                  alt="Assistant"
                  width={236}
                  height={236}
                  className="h-9 w-9 rounded-full object-cover"
                  unoptimized
                />
                <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="font-medium">Lembah Pantai Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10"
            >
              <Icon icon="mdi:close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-grow flex-col gap-4 overflow-y-auto p-4">
            <Chat token={token} />
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-primary hover:shadow-primary/20 relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <div className="from-primary/80 to-primary absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Image
            src="/demo-community/yb-fahmi-fadzil.webp"
            alt="Assistant"
            width={236}
            height={236}
            className="relative h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-95"
            unoptimized
          />
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" />
        </button>
      )}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => page;

export default Page;
