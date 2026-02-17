import { forwardRef } from 'react';
import { CalendarIcon } from '@/components/Shared/Icons/ui';

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
    <CalendarIcon color="imos-deep-blue" size="lg" className="mr-4" aria-label="calendar icon" />
  </div>
));

CustomInput.displayName = 'CustomInput';

export default CustomInput;
