import React from 'react';
import { LoadingProps } from './types/loading.types';

const Loading: React.FC<LoadingProps> = ({ fullPage, loadingSize }) => {
  const isFullPage = fullPage ? 'fixed inset-0 bg-white bg-opacity-90 z-50' : '';
  const size = loadingSize || 'h-20 w-20';
  return (
    <div data-testid="loading-component" className={`flex items-center justify-center ${isFullPage}`}>
      <div className={`${size} animate-spin rounded-full border-4 border-gray-300 border-t-imos-sea-blue`} />
    </div>
  );
};

export default Loading;
