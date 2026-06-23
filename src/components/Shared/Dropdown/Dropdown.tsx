import { useState, useEffect, useRef, useCallback } from 'react';
import { useOutsideClick } from '@/hooks';
import { ArrowIcon } from '@/components/Shared/Icons';
import { cn } from '@/utils/classname-util/cn';
import MenuList from '../MenuList/MenuList';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown = <T,>({
  showIcons = false,
  elements,
  selectedId,
  onChange,
  header,
  smallDropdown,
  isOpen = false,
  toggleBorder = true,
  menuBorder = false,
  menuShadow = true,
  widePaddingMenu = false,
}: DropdownProps<T>): JSX.Element => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedElement, setSelectedElement] = useState<DropdownElement<T> | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(isOpen);
  const [processingItemId, setProcessingItemId] = useState<T | null>(null);

  useOutsideClick<HTMLDivElement>(dropdownRef, () => {
    if (!processingItemId) {
      setDropdownOpen(false);
    }
  });

  const toggleDropdown = (): void => {
    if (!processingItemId) {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  const selectElement = useCallback(
    (id: T): void => {
      const element = elements.find((element) => element.id === id);
      if (element) setSelectedElement(element);
    },
    [elements],
  );

  const handleOnClick = async (element: DropdownElement<T>): Promise<void> => {
    if (processingItemId || element.disabled) {
      return;
    }

    selectElement(element.id);

    if (onChange) {
      try {
        setProcessingItemId(element.id);
        await onChange(element);
      } finally {
        setProcessingItemId(null);
        setDropdownOpen(false);
      }
    } else {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (selectedId) {
      selectElement(selectedId);
    } else {
      setSelectedElement(null);
    }
  }, [selectElement, selectedId]);

  const elementsWithLoading = elements.map((element) => ({
    ...element,
    isLoading: processingItemId === element.id,
    disabled: processingItemId !== null && processingItemId !== element.id,
  }));

  return (
    <div className="relative h-full w-full" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className={cn(
          'text-imos-dark-grey flex h-full items-center justify-between shadow-sm',
          header
            ? 'bg-imos-deeper-blue rounded-t-lg px-3 py-2 text-lg md:px-4 md:py-3'
            : 'rounded-md bg-white px-3 py-1 text-base md:px-4 md:py-2',
          toggleBorder && !header && 'border-imos-calypso-blue/50 border',
          smallDropdown ? 'min-w-28' : 'min-w-56',
          processingItemId ? 'cursor-not-allowed opacity-75' : 'cursor-pointer',
        )}
      >
        <div className="flex items-center">
          {showIcons &&
            selectedElement &&
            (() => {
              const { Icon: RenderedIcon } = selectedElement;
              return (
                RenderedIcon && <RenderedIcon className="mr-4" size="xl" color={header ? 'imos-white' : 'imos-grey'} />
              );
            })()}
          <span className={header ? 'text-white' : ''}>{selectedElement ? selectedElement.label : 'Select Item'}</span>
        </div>
        <ArrowIcon
          className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${header ? 'h-4 w-4' : 'h-3 w-3'} ms-3`}
          color={header ? 'imos-white' : 'imos-grey'}
        />
      </div>
      {isDropdownOpen && elementsWithLoading.length > 0 && (
        <div
          className={cn(
            'absolute z-40 w-full overflow-hidden',
            menuShadow ? 'shadow-menu' : '',
            header ? 'rounded-b-lg border border-gray-600 md:border-none' : 'mt-1 rounded-lg',
            menuBorder ? 'border border-gray-600' : '',
          )}
        >
          <div className={cn(!header && 'max-h-60 overflow-y-auto')}>
            <MenuList
              elements={elementsWithLoading}
              selectedId={selectedElement?.id}
              showIcons={showIcons}
              onItemClick={handleOnClick}
              testId="dropdown-menu"
              widePadding={widePaddingMenu}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
