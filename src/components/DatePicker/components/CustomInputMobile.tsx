import { forwardRef } from 'react';
import calendarIcon from '@/assets/icons/calendar-icon.svg';

interface CustomInputMobileProps {
  onClick?: () => void;
  disabled?: boolean;
}

const CustomInputMobile = forwardRef<HTMLDivElement, CustomInputMobileProps>(({ onClick, disabled = false }, ref) => (
  <div
    ref={ref}
    onClick={disabled ? undefined : onClick}
    className={`mr-5 mt-1 flex w-full items-center justify-center ${!disabled && 'cursor-pointer'}`}
    aria-hidden="true"
  >
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
  </div>
));

CustomInputMobile.displayName = 'CustomInputMobile';

export default CustomInputMobile;
