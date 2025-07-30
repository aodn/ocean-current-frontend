import { forwardRef } from 'react';
import calendarIcon from '@/assets/icons/calendar-icon.svg';

interface CustomInputProps {
  onClick?: () => void;
  disabled?: boolean;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(({ onClick, disabled = false }, ref) => (
  <div
    ref={ref}
    onClick={disabled ? undefined : onClick}
    className={`mr-5 mt-1 flex w-full items-center justify-center ${!disabled && 'cursor-pointer'}`}
    aria-hidden="true"
  >
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
    {/* <p className="font-medium text-imos-sea-blue">Time Range</p> */}
  </div>
));

CustomInput.displayName = 'CustomInput';

export default CustomInput;
