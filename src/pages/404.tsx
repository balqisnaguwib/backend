import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4 text-center">
        <Icon icon="mdi:alert-circle-outline" className="text-primary text-[100px]" />
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-lg text-gray-600">Page not found</p>
        <button
          onClick={() => router.push('/assistant')}
          className={twMerge(
            'bg-primary hover:bg-primary/90 mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200'
          )}
        >
          <Icon icon="mdi:arrow-left" className="text-[20px]" />
          Back to Assistant
        </button>
      </div>
    </div>
  );
};

export default Page;
