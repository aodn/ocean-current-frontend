import { useState, useEffect, useRef, useCallback } from 'react';
import arrowIcon from '@/assets/icons/arrow.svg';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({ elements, initialSelectedId }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedElement, setSelectedElement] = useState<DropdownElement | undefined>();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (!selectedElement && initialSelectedId) selectElement(initialSelectedId);
  }, [selectElement, selectedElement, initialSelectedId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20 ml-3" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className="flex min-w-56 cursor-pointer items-center justify-between rounded-md border bg-background-gradient p-2 px-4 text-lg text-imos-title-blue shadow"
      >
        <span>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        <img className="ms-3 h-2.5 w-2.5" src={arrowIcon} alt="arrow icon" />
      </div>
      {isDropdownOpen && elements.length > 0 && (
        <div className="absolute w-full rounded-b-md bg-background-gradient p-4 shadow">
          {elements.map((element) => (
            <div
              key={element.id}
              aria-hidden="true"
              className="mb-4 flex cursor-pointer items-center justify-between rounded-md border border-imos-black p-3"
              onClick={() => {
                selectElement(element.id);
                toggleDropdown();
              }}
            >
              <img src={element.icon} alt={`${element.label} icon`} />
              <span className="text-right text-base">{element.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
