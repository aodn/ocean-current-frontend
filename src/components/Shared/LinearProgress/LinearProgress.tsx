import React from 'react';
import { cn } from '@/utils/classname-util/cn';

interface LinearProgressProps extends React.AriaAttributes {
  className?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = ({ className, ...aria }) => {
  return (
    <div
      data-testid="linear-progress"
      role="progressbar"
      className={cn('relative h-1 w-full overflow-hidden bg-blue-100', className)}
      {...aria}
    >
      <div className="animate-linear-progress bg-imos-sea-blue absolute inset-y-0 w-1/2" />
    </div>
  );
};

export default LinearProgress;
