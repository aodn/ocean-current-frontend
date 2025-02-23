import React, { useState } from 'react';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { CollapsibleSectionProps } from '../types';

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);

  return (
    <div className="px-4">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-2"
        onClick={() => setIsSectionCollapsed(!isSectionCollapsed)}
        aria-hidden
      >
        <h3 className="text-lg font-medium text-imos-grey">{title}</h3>
        <img
          src={ArrowIcon}
          alt="arrow icon"
          className={`h-4 w-4 transform transition-transform duration-300 ${isSectionCollapsed ? 'rotate-180' : ''}`}
        />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isSectionCollapsed ? 'max-h-0' : 'max-h-screen'}`}>
        <div className="mb-6 mt-2 flex flex-wrap gap-2">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
