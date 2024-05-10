import React from 'react';
import { RegionButtonProps } from '../types/regionSelection.types';

const RegionButton: React.FC<RegionButtonProps> = ({ label, icon, selected }) => {
  const borderStyle = selected ? 'rounded-md border-2 border-imos-sea-blue' : 'rounded-md border-2  border-transparent';
  return (
    <div className={`flex cursor-pointer p-2 ${borderStyle}`}>
      <img src={icon} alt={`${label} logo`} />
      <span className="ml-3 whitespace-pre text-lg text-imos-sea-blue">{label}</span>
    </div>
  );
};

export default RegionButton;
