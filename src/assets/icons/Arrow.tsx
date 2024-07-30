type ArrowIconProps = {
  stroke: string;
  className?: string;
};

const ArrowIcon = ({ className, stroke = 'currentColor' }: ArrowIconProps) => (
  <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
  </svg>
);
export default ArrowIcon;
