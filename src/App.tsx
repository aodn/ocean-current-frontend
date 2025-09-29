/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './routers/rootRouter';
import './configs/dayjs';
import { queryClient } from './configs/query';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function App() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!gaId) return;

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];

    function gtag(..._args: any[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
