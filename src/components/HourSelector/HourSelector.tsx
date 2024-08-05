import React from 'react';
import { Dropdown } from '@/components/Shared';
import { HourSelectorProps } from './types/hourSelector.types';

const TimeDropdown: React.FC<HourSelectorProps> = ({ onChange, selectedId, hours }) => {
  return (
    <Dropdown
      smallDropdown
      showIcons={false}
      elements={hours}
      selectedId={selectedId}
      onChange={onChange}
      header={false}
    />
  );
};

export default TimeDropdown;
