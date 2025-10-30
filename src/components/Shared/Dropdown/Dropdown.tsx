import { useState, useEffect, useRef, useCallback } from 'react';
import { useOutsideClick } from '@/hooks';
import { ArrowIcon } from '@/components/Shared/Icons';
import { DropdownElement, DropdownProps } from './types/dropdown.types';

const Dropdown = <T,>({
  showIcons = false,
  elements,
  selectedId,
  onChange,
  header,
  smallDropdown,
  isOpen = false,
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
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        aria-hidden="true"
        className={`${header ? 'rounded-t-lg bg-imos-deeper-blue p-2 md:p-3' : 'rounded-md border-2 border-[#3a6f8f80] bg-white p-2 md:p-3'} ${
          smallDropdown ? 'min-w-28' : 'min-w-56'
        } flex items-center justify-between px-3 text-lg text-imos-title-blue shadow md:px-4 ${
          processingItemId ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-center">
          {showIcons &&
            selectedElement &&
            (() => {
              const { Icon, SelectedIcon } = selectedElement;
              const RenderedIcon = SelectedIcon || Icon;
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
          className={`absolute z-40 w-full rounded-b-lg border border-gray-600 bg-white shadow-[0_2px_4px_0_rgba(97,97,97,0.25)] md:border-none md:shadow-none ${!header ? 'max-h-60 overflow-y-auto' : ''}`}
          data-testid="drop-down-menu"
        >
          {elementsWithLoading.map((element) => {
            const { id, isLoading, Icon, disabled, label } = element;
            return (
              <div
                key={String(id)}
                aria-hidden="true"
                className={`${!showIcons ? 'justify-center' : ''} m-1 flex cursor-pointer items-center rounded p-3 duration-300 ${
                  id === selectedElement?.id ? 'bg-imos-deep-blue' : 'hover:bg-imos-hover-blue hover:bg-opacity-20'
                } ${disabled || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={(e) => {
                  if (disabled || isLoading) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  handleOnClick(element);
                }}
              >
                {showIcons && Icon && (
                  <Icon className="mr-4" size="xl" color={id === selectedElement?.id ? 'imos-white' : 'imos-grey'} />
                )}
                <span
                  className={`flex items-center text-left text-base ${id === selectedElement?.id ? 'text-white' : 'text-imos-dark-grey'}`}
                >
                  {label}
                  {isLoading && (
                    <svg
                      className="ml-2 h-4 w-4 animate-spin text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
