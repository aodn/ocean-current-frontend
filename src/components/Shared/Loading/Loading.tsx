import React from 'react';
import { cn } from '@/utils/classname-util/cn';
import { LoadingProps } from './types/loading.types';

const Loading: React.FC<LoadingProps> = ({ fullPage, loadingSize, className }) => {
  const isFullPage = fullPage ? 'fixed inset-0 bg-white/90 z-50' : '';
  const size = loadingSize || 'h-20 w-20';
  return (
    <div data-testid="loading-component" className={cn('flex items-center justify-center', isFullPage, className)}>
      <div className={`${size} border-t-imos-sea-blue animate-spin rounded-full border-4 border-gray-300`} />
    </div>
  );
};

export default Loading;
