import React from 'react';
import { ErrorDisplayProps } from './types/errorUI.types';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, description, message }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-semibold text-red-600">{title}</h2>
      <p className="font-bold">{description}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
