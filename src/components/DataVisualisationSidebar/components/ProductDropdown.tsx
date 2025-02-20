import React from 'react';
import { Dropdown } from '@/components/Shared';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { SidebarProductDropdownProps } from '../types';

const SidebarProductDropdown: React.FC<SidebarProductDropdownProps> = ({ mainProductKey, handleDropdownChange }) => {
  return (
    <Dropdown
      showIcons
      header
      elements={sidebarProductsNav}
      selectedId={mainProductKey}
      onChange={handleDropdownChange}
    />
  );
};

export default SidebarProductDropdown;
