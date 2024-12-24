type ArrowIconProps = {
  stroke: string;
  strokeWidth?: number;
  className?: string;
};

const ArrowIcon = ({ className, stroke = 'currentColor', strokeWidth = 2 }: ArrowIconProps) => (
  <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="m1 1 4 4 4-4" />
  </svg>
);
export default ArrowIcon;
