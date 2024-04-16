import { useState, useEffect, useRef } from 'react';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({ elements, initialSelectedId }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedElement, setSelectedElement] = useState<DropdownElement | undefined>();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectElement = (id: string): void => {
    const element = elements.find((element) => element.id === id);
    if (element) setSelectedElement(element);
  };

  useEffect(() => {
    if (!selectedElement && initialSelectedId) selectElement(initialSelectedId);
  }, [elements, initialSelectedId]);

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
    <div className="relative ml-3" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className="flex min-w-56 cursor-pointer items-center justify-between rounded-md border bg-background-gradient p-2 px-4 text-lg text-imos-title-blue shadow"
      >
        <span>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </div>
      {isDropdownOpen && (
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
