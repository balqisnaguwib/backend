// Next, React, Tw
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  // Standard and Vars
  const { replace } = useRouter();

  useEffect(() => {
    replace('/assistant');
  }, [replace]);

  return '';
};

Page.getLayout = (page: any) => page;

export default Page;
