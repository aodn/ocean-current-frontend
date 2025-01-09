import { forwardRef } from 'react';
import calendarIcon from '@/assets/icons/calendar-icon.svg';

interface CustomInputMobileProps {
  onClick?: () => void;
}

const CustomInputMobile = forwardRef<HTMLDivElement, CustomInputMobileProps>(({ onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="mr-5 mt-1 flex w-full cursor-pointer items-center justify-center"
    aria-hidden="true"
  >
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
  </div>
));

CustomInputMobile.displayName = 'CustomInputMobile';

export default CustomInputMobile;
