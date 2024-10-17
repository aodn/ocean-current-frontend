import { useState, useEffect, useRef, useCallback } from 'react';
import { useOutsideClick } from '@/hooks';
import ArrowIcon from '@/assets/icons/Arrow';
import { color } from '@/styles/colors';
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
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className={`${header ? 'rounded bg-[#182C3A] p-3' : 'rounded-md border-2 border-[#3a6f8f80] bg-white p-2'} ${
          smallDropdown ? 'min-w-28' : 'min-w-56'
        } flex cursor-pointer items-center justify-between px-4 text-lg text-imos-title-blue shadow`}
      >
        <div className="flex items-center">
          {showIcons && selectedElement && (
            <img className="mr-4 h-9 w-9" src={selectedElement.selectedIcon} alt={`${selectedElement.label} icon`} />
          )}
          <span className={header ? 'text-white' : ''}>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        </div>
        <ArrowIcon
          className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${header ? 'h-4 w-4' : 'h-3 w-3'} ms-3  text-white`}
          stroke={`${header ? '#fff' : '#182C3A'}`}
        />
      </div>
      {isDropdownOpen && elements.length > 0 && (
        <div
          className={`absolute z-40 mt-2 w-full rounded-md border-2 border-[#737373] bg-white ${!header ? 'max-h-60 overflow-y-auto' : ''}`}
          data-testid="drop-down-menu"
        >
          {elements.map((element) => (
            <div
              key={element.id}
              aria-hidden="true"
              className={`${
                !showIcons ? 'justify-center' : ''
              } flex cursor-pointer items-center p-3 duration-300 hover:opacity-65 hover:bg-[${color.primary5}] ${
                element.id === selectedElement?.id ? 'm-1 rounded border-2 border-[#52BDEC] bg-[#52BDEC80]' : ''
              }`}
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
