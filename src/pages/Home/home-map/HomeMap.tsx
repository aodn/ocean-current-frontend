import React from 'react';
import BasicMap from '@/components/Map/BasicMap';
import ErrorBoundary from '@/errors/ErrorBoundary';

const HomeMap: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl drop-shadow-xy4">
      <ErrorBoundary>
        <BasicMap />
      </ErrorBoundary>
    </div>
  );
};

export default HomeMap;
