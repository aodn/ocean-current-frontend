import { useState, useEffect, useRef, useCallback } from 'react';
import arrowIcon from '@/assets/icons/arrow.svg';
import { useOutsideClick } from '@/hooks';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({
  showIcons,
  elements,
  selectedId,
  onChange,
  header,
  smallDropdown,
  isOpen = false,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialElement = elements.find((element) => element.id === selectedId);
  const [selectedElement, setSelectedElement] = useState<DropdownElement | undefined>(initialElement);
  const [isDropdownOpen, setDropdownOpen] = useState(isOpen);

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
    if (selectedId) selectElement(selectedId);
  }, [selectElement, selectedId]);

  return (
    <div className="relative " ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className={`${header ? 'bg-[#3A6F8F] p-3' : 'rounded-md bg-background-gradient p-2'} ${smallDropdown ? 'min-w-28' : 'min-w-56'} flex  cursor-pointer items-center justify-between  border px-4 text-lg text-imos-title-blue shadow`}
      >
        <div className="flex items-center">
          {showIcons && selectedElement && (
            <img className="mr-4 h-9 w-9" src={selectedElement.icon} alt={`${selectedElement.label} icon`} />
          )}
          <span className={header ? 'text-white' : ''}>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        </div>
        <img
          className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ms-3 h-4 w-4 text-white`}
          src={arrowIcon}
          alt="arrow icon"
        />
      </div>
      {isDropdownOpen && elements.length > 0 && (
        <div className="absolute z-40 w-full rounded-b-md bg-[#EFEFEF] p-4 shadow" data-testid="drop-down-menu">
          {elements.map((element) => (
            <div
              key={element.id}
              aria-hidden="true"
              className={`${!showIcons ? 'justify-center' : ''} mb-4 flex cursor-pointer items-center rounded-md border border-[#c2c2c2] p-3 duration-300 hover:border-imos-black ${element.id === selectedElement?.id ? 'border-[#888888] bg-white' : ''}`}
              onClick={() => handleOnClick(element)}
            >
              {showIcons && <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />}

              <span className="text-left text-base text-imos-grey">{element.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
