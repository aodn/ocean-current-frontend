import React from 'react';
import BasicMap from '@/components/Map/BasicMap';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { INITIAL_MAP_VIEW_STATE } from '@/configs/map';

const HomeMap: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl drop-shadow-xy4">
      <ErrorBoundary>
        <BasicMap minZoom={INITIAL_MAP_VIEW_STATE.mapViewState.zoom} />
      </ErrorBoundary>
    </div>
  );
};

export default HomeMap;
