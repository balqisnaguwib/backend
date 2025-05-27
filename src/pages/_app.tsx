import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

// Packages
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import store from '../stores';
import { SnackbarProvider } from 'notistack';
import NextAdapterPages from 'next-query-params/pages';
import { QueryParamProvider } from 'use-query-params';
import Loader from '@/providers/Loader';

// Layout
import Layout from '@/layouts/internal';

// Components
import AuthProvider from '@/providers/AuthProvider';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextPageWithLayout).getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <AuthProvider>
          <QueryParamProvider adapter={NextAdapterPages}>
            <Loader>
              <SnackbarProvider>{getLayout(<Component {...pageProps} />)}</SnackbarProvider>
            </Loader>
          </QueryParamProvider>
        </AuthProvider>
      </Provider>
    </PrimeReactProvider>
  );
}
