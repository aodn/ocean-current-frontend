import React from 'react';
import { useSearchParams } from 'react-router';
import AppLayout from '@/layouts/AppLayout';
import ErrorContent from '@/errors/error-content/ErrorContent';

const COMING_SOON_PRODUCTS: Record<string, string> = {
  gliders: 'Gliders',
};

const ComingSoonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productName = COMING_SOON_PRODUCTS[searchParams.get('product') ?? ''];

  return (
    <AppLayout>
      <div className="max-w-8xl relative mx-auto mt-4 mb-4 flex w-full px-4 md:mb-9 md:min-h-200">
        <ErrorContent
          title={productName ? `${productName} is coming soon` : 'Coming soon'}
          description={`${productName ? `The ${productName} page` : 'This page'} is not available in the new OceanCurrent website yet. Please check back later.`}
        />
      </div>
    </AppLayout>
  );
};

export default ComingSoonPage;
