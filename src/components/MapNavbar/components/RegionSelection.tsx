import React, { useState } from 'react';
import { RegionScope } from '@/constants/region';
import { regionSelectionButtonElements } from '../data/mapNavbar';
import { RegionSelectionProps } from '../types/regionSelection.types';
import RegionButton from './RegionButton';

const RegionSelection: React.FC<RegionSelectionProps> = ({ onChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionScope>(RegionScope.Local);

  const handleClick = (key: RegionScope) => () => {
    setSelectedRegion(key);
    if (onChange) onChange(key);
  };

  return (
    <ul className="flex items-center gap-4">
      {regionSelectionButtonElements.map(({ key, label, icon }) => (
        <li key={key} onClick={handleClick(key)} aria-hidden>
          <RegionButton label={label} icon={icon} selected={selectedRegion === key} />
        </li>
      ))}
    </ul>
  );
};

export default RegionSelection;
