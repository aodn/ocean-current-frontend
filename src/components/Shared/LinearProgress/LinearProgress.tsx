import React from 'react';
import { cn } from '@/utils/classname-util/cn';

interface LinearProgressProps {
  className?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = ({ className }) => {
  return (
    <div data-testid="linear-progress" className={cn('relative h-1 w-full overflow-hidden bg-blue-100', className)}>
      <div className="absolute inset-y-0 w-1/2 animate-linear-progress bg-imos-sea-blue" />
    </div>
  );
};

export default LinearProgress;
