import React, { useRef, useState } from 'react';
import Arrow from '@/assets/icons/arrow.svg';
import { useOutsideClick } from '@/hooks';
import { Button, Checkbox } from '@/components/Shared';
import { DropdownButtonProps, SelectedItemsState } from './types/DropdownButton.types';

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, items, onSelect }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({});

  const toggleDropdown = () => setIsOpen(!isOpen);

  useOutsideClick<HTMLDivElement>(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleItemClick = (item: string) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [item]: !prevSelectedItems[item],
    }));
  };

  const handleApplyClick = () => {
    const selected = Object.keys(selectedItems).filter((item) => selectedItems[item]);
    onSelect(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button borderRadius="small" type="primary" onClick={toggleDropdown} size="auto">
        {label}
        <img
          src={Arrow}
          alt="arrow icon"
          className={`ml-2 h-4 w-4 duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <div
                aria-hidden="true"
                key={index}
                onClick={() => handleItemClick(item)}
                className="flex w-full cursor-pointer items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <Checkbox isChecked={!!selectedItems[item]} />
                <p className="ml-3 text-base text-imos-mid-grey">{item}</p>
              </div>
            ))}
          </div>
          <div className="my-2 flex justify-center">
            <Button onClick={handleApplyClick} type="secondary" size="auto">
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
