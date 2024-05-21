import React from 'react';
import { RegionButtonProps } from '../types/regionSelection.types';

const RegionButton: React.FC<RegionButtonProps> = ({ label, icon, selected }) => {
  const borderStyle = selected ? 'border-imos-sea-blue' : 'border-transparent';
  return (
    <div className={`flex cursor-pointer rounded-md border p-2  ${borderStyle}`}>
      <img src={icon} alt={`${label} logo`} />
      <span className="ml-3 whitespace-pre text-lg text-imos-sea-blue">{label}</span>
    </div>
  );
};

export default RegionButton;
