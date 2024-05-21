import { useState, useEffect, useRef, useCallback } from 'react';
import arrowIcon from '@/assets/icons/arrow.svg';
import { useOutsideClick } from '@/hooks';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({ elements, initialSelectedId, onChange }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedElement, setSelectedElement] = useState<DropdownElement | undefined>();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useOutsideClick<HTMLDivElement>(dropdownRef, () => {
    setDropdownOpen(false);
  });

  const toggleDropdown = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectElement = useCallback(
    (id: string): void => {
      const element = elements.find((element) => element.id === id);
      if (element) setSelectedElement(element);
    },
    [elements],
  );

  const handleOnClick = (element: DropdownElement): void => {
    setDropdownOpen(false);
    selectElement(element.id);
    if (onChange) onChange(element);
  };

  useEffect(() => {
    if (!selectedElement && initialSelectedId) selectElement(initialSelectedId);
  }, [selectElement, selectedElement, initialSelectedId]);

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className="flex min-w-56 cursor-pointer items-center justify-between rounded-md border bg-background-gradient p-2 px-4 text-lg text-imos-title-blue shadow"
      >
        <span>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        <img className="ms-3 h-2.5 w-2.5" src={arrowIcon} alt="arrow icon" />
      </div>
      {isDropdownOpen && elements.length > 0 && (
        <div className="absolute w-full rounded-b-md bg-[#EFEFEF] p-4 shadow" data-testid="drop-down-menu">
          {elements.map((element) => (
            <div
              key={element.id}
              aria-hidden="true"
              className={`mb-4 flex cursor-pointer items-center rounded-md border border-[#c2c2c2] p-3 duration-300 hover:border-imos-black ${element.id === selectedElement?.id ? 'border-[#888888] bg-white' : ''}`}
              onClick={() => handleOnClick(element)}
            >
              <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />
              <span className="text-left text-base text-imos-grey">{element.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
