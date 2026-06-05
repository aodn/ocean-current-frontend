import { cn } from '@/utils/classname-util/cn';
import { DropdownElement } from '../Dropdown/types/dropdown.types';
import { MenuListProps } from './types';

const MenuList = <T,>({
  elements,
  selectedId,
  showIcons = false,
  onItemClick,
  testId,
  widePadding = false,
}: MenuListProps<T>): JSX.Element => {
  const handleClick = (e: React.MouseEvent, element: DropdownElement<T>): void => {
    if (element.disabled || element.isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onItemClick(element);
  };

  return (
    <ul className={cn('flex flex-col gap-1 bg-white', widePadding ? 'p-2' : 'p-1')} data-testid={testId}>
      {elements.map((element) => {
        const { id, isLoading, Icon, disabled, label } = element;
        const isSelected = id === selectedId;
        return (
          <li
            key={String(id)}
            aria-hidden="true"
            className={cn(
              'flex cursor-pointer items-center rounded p-3 duration-300',
              !showIcons && 'justify-center',
              isSelected ? 'bg-imos-deep-blue' : 'hover:bg-imos-hover-blue/20',
              (disabled || isLoading) && 'cursor-not-allowed opacity-50',
            )}
            onClick={(e) => handleClick(e, element)}
          >
            {showIcons && Icon && <Icon className="mr-4" size="xl" color={isSelected ? 'imos-white' : 'imos-grey'} />}
            <span
              className={cn('flex items-center text-left text-base', isSelected ? 'text-white' : 'text-imos-dark-grey')}
            >
              {label}
              {isLoading && (
                <svg
                  className="ml-2 h-4 w-4 animate-spin text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;
